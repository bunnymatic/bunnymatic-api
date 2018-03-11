import React, { Component } from 'react';
import { connect } from 'react-redux';

import ImageUploader from './imageUploader/ImageUploader.js';

const App = (props) => {
    return <ImageUploader {...props} />
};

const mapStateToProps = (state) => {
  return {
    value: state
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: () => { dispatch({type: 'INCREMENT'}) },
    onDecrement: () => { dispatch({type: 'DECREMENT'}) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)