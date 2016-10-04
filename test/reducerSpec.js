import { expect } from 'chai';
import { createStore } from 'redux';
import reducer from '../src/client/app/reducers/reducer';
import changeLevel from '../src/client/app/actions/changeLevel';
import changeUser from '../src/client/app/actions/changeUser';
import setCode from '../src/client/app/actions/setCode';

describe('Reducer function', function() {

  var store;
  beforeEach(() => {
    store = createStore(reducer);
  })

  it('should be a function', function() {
    expect(reducer).to.be.a('function');
  });

  it('should generate a store with user, level, currentCode', () =>{
    var store = createStore(reducer);

    expect(store.getState()).to.be.an('object');

    expect(store.getState()).to.have.property('user')
      .that.is.a('string');

    expect(store.getState()).to.have.property('level')
      .that.is.a('number');

    expect(store.getState()).to.have.property('currentCode')
      .that.is.a('string');
  });

  describe('Store created by the reducer', () => {
    var store;
    beforeEach(() => {
      store = createStore(reducer);
    })


    it('should handle dispatched actions', () => {

    })

  })

})