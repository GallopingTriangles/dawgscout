var vm = require('vm');

// == USE TESTING FRAMEWORK ===============================
var runTestSuite = require('../TestingFramework');
// == USE GTA SANDBOX =====================================
var gtaSandbox = require('../gtaSandbox');

	// == EXPECTED USER INPUT ===============================
	// 
	// enable('engine');
	//
	// setColor('white / black / red / blue');
  // 
  // setSpeed(100);
  //
  // enable('sensor');
  //
  // enable('route');
  // 
  // route(['left', 'left']);
  //
	// ======================================================

	// == CASES =============================================
	// case 1: success, left turn followed by left turn
	// case 2: fail, invalid engine or speed
	// case 3: fail, drove straight at first intersection
	// case 4: fail, turned left at first intersection but drove straight at second intersection
	// case 5: fail, turned right at first intersection
	// case 6: fail, turned left at first intersection and turned right at second intersection

var level7 = function(req, res, next) {

	// == TESTING USER INPUT LEVEL 7 ========================
	runTestSuite(function UserInputTestLevel7(t) {

	  // USER INPUT
		var userInput = req.body.log;
	  // == NEW GTA SANDBOX == //
    var context = new gtaSandbox().create(userInput);

	  var setCaseCount = 1;
	  var setCase = function(caseNo, errorMessage) {
	  	if (setCaseCount === 1) {
	      req.body.phaser.case = caseNo;
	      req.body.bugs.push(errorMessage);
	      setCaseCount++;
	  	}
	  };

	  // == ENABLED TESTS == //
	  runTestSuite(function EnabledInputTest(t) {
	  	var enabled = context.testEnabled.values;
	  	var calls = context.testEnabled.calls;
	  	this.testEnableCalledThreeTimes = function() {
	  		t.assertTrue(
	  		  calls === 3,
	  		  'Expect enable() to be called 3 times, bug got called ' + calls + ' times',
	  		  function(error) {
	  		  	setCase(3, error);
	  		  }
	  		);
	  	};

	  	this.testEnableCalledWithArgument = function() {
        t.assertTrue(
          enabled[2],
          'Expected enable() to be called with an argument, but got called with ' + enabled[2],
          function(error) {
          	setCase(3, error);
          }
        );
	  	};

	  	this.testEnableCalledWithArgumentTypeString = function() {
	  		t.assertTrue(
          typeof enabled[2] === 'string',
          'Expected enable() to be called with an argument of type string, but got called with argument of type ' + typeof enabled[2],
          function(error) {
          	setCase(3, error);
          }
	  		);
	  	}

	  	// test if route is enabled thirdly
	  	this.testRouteEnabledThirdly = function() {
	  	  t.assertTrue(
	  	    enabled[2] === 'route',
	  	    'Expected "route" to be enabled thirdly, but got ' + enabled[2] + ' enabled thirdly',
	  	    function(error) {
	  	      setCase(3, error); // syntax error, route not enabled. car crashes
	  	    }
	  	  );
	  	};
	    // end enabled tests
	  });

	  // == ROUTE TESTS == //
	  runTestSuite(function RouteInputTest(t) {
	  	var route = context.testSetRoute.value;
	  	var calls = context.testSetRoute.calls;
	  	// test if the set route function is called
	  	this.testRouteCalled = function() {
	      t.assertTrue(
	        calls,
	        'Expected function setRoute() to be called, but got not called',
	        function(error) {
	        	setCase(3, error);
	        }
	      );
	  	};

	  	this.testRouteCalledOnce = function() {
        t.assertTrue(
          calls === 1,
          'Expected function setRoute() to be called once, but got called ' + calls + ' times',
          function(error) {
          	setCase(2, error);
          }
        );
	  	};

	  	this.testRouteCalledWithArgument = function() {
        t.assertTrue(
          route,
          'Expected function setRoute() to be called with an argument, but got called with ' + route,
          function(error) {
          	setCase(3, error);
          }
        );
	  	};

	  	// test if the setRoute input is of data type array
	  	this.testRouteArray = function() {
	  	  t.assertTrue(
	  	    Array.isArray(route),
	  	    'Expected setRoute() input to be an array, but got ' + typeof route,
	  	    function(error) {
	  	      setCase(3, error); // route is not defined, car crashes straight
	  	    }
	  	  );
	  	};

	  	// test if the array is not empty
	  	this.testRouteArrayNotEmpty = function() {
	  		var array = route || [];
	  		var length = array.length;
	  	  t.assertTrue(
	  	    length !== 0,
	  	    'Expect setRoute() input array to be not empty, but got ' + length + ' input',
	  	    function(error) {
	  	    	setCase(3, error); 
	  	    }
	  	  );
	  	};

	  	this.testRouteArrayElementsString = function() {
	  		var array = route || [];
	  		t.assertTrue(
          typeof array[0] === 'string',
          'Expected setRoute() input array elements to be of type string, but got ' + typeof array[0],
          function(error) {
          	setCase(3, error);
          }
	  		);
	  	}

	  	// test if the array element is set to right or left
	  	this.testRouteArrayFirstValueLeftOrRight = function() {
	  		var array = route || [];
	  	  t.assertTrue(
	  	    array[0] === 'left' || array[0] === 'right',
	  	    'Expected setRoute() input array elements to be "left" or "right", but got ' + array[0],
	  	    function(error) {
	  	    	setCase(3, error);
	  	    }
	  	  );
	  	};

	  	this.testRouteArrayFirstValueLeft = function() {
      	var array = route || [];
        t.assertTrue(
          array[0] === 'left',
          'Expected setRoute() first element of input array to be "left", but got ' + array[0],
          function(error) {
            if (array[0] === 'right') {
            	setCase(5, error);
            } else {
            	setCase(3, error);
            }
          }
        );
      };

      // test if the array consists of one element
      this.testRouteArrayNotOneElement = function() {
      	var array = route || [];
        t.assertTrue(
          array.length !== 1,
          'Expect setRoute() input array to have more than 1 element, but got ' + array.length + ' element',
          function(error) {
          	if (array[0] === 'left') {
              setCase(4, error);
          	} else if (array[0] === 'right') {
              setCase(5, error);
          	}
          }
        );
      };

      // test if the array has two elements [or three elements for EASTER EGG]
      this.testRouteArrayTwoElements = function() { // compare length to 3 for EASTER EGG
        var array = route || [];
        t.assertTrue(
          array.length === 2,
          'Expect setRoute() input array to have length of 2, but got ' + array.length + ' ',
          function(error) {
          	setCase(4, error);
          }
        );
      };

      this.testRouteArraySecondElementTypeString = function() {
        var array = route || [];
        t.assertTrue(
          typeof array[1] === 'string',
          'Expected setRoute() second element in input array to be of type string, but got ' + typeof array[1],
          function(error) {
          	setCase(4, error);
          }
        );
      };

      this.testRouteArraySecondValueLeftOrRight = function() {
      	var array = route || [];
        t.assertTrue(
          array[1] === 'left' || array[1] === 'right',
          'Expected setRoute() input array elements to be "left" or "right", but got ' + array[1],
          function(error) {
          	setCase(4, error);
          }
        );
      };

      // test if the it is a success!
      this.testRouteArraySecondValueLeft = function() {
      	var array = route || [];
        t.assertTrue(
          array[1] === 'left',
          'Expected setRoute() second element of input array to be "left", but got ' + array[1],
          function(error) {
          	if (array[1] === 'right') {
          		setCase(6, error);
          	} else {
          		setCase(4, error);
          	}
          }
        );
      };	

	  }); // end route input test

	});

  next();

};

module.exports = level7;