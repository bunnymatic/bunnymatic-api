import { combineReducers } from "redux";
import imageUploader from "./imageUploader";
const UppyStore = require('uppy/lib/store/ReduxStore');

export default combineReducers({
  imageUploader: imageUploader,
  uppy: UppyStore.reducer
});
