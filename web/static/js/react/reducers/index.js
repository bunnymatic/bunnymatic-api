import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import imageUploader from "./imageUploader";
import images from "./images";

const UppyStore = require('uppy/lib/store/ReduxStore');

export default combineReducers({
  imageUploader,
  images,
  form: formReducer,
  uppy: UppyStore.reducer
});
