import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import Header from "./header/header";
import ImageList from "./imageList/imageList";
import AddArtForm from './addArtForm/addArtForm';

const App = () => {
  return (
    <Fragment>
      <Header/>
      <main role="main">
        <AddArtForm />
        <ImageList />
      </main>
    </Fragment>
  );
};

App.contextTypes = { store: PropTypes.object };

export default App;
