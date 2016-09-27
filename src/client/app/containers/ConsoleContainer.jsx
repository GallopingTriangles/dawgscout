import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommandLine from '../components/CommandLine.jsx';
import styles from '../../styles/ConsoleContainerStyles.js';
import LogsContainer from './LogsContainer.jsx';

class Console extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className='col-md-7' id='phaser_game' style={ styles.phaser }></div>
        <div className='col-md-5' style={ styles.container } >
          <CommandLine />
          <LogsContainer level={ this.props.level } />
        </div>
      </div>
    )
  }
}

var mapStateToProps = state => {
  return {
    level: state.level
  }
}

// connect() provides a link between the store and the component through the props
export default connect(mapStateToProps)(Console);