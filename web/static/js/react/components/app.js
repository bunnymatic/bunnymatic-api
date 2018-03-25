import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import ImageUploader from './imageUploader/ImageUploader.js';

const App = () => {
    return <ImageUploader />
};

App.contextTypes = { store: PropTypes.object };

export default App;
