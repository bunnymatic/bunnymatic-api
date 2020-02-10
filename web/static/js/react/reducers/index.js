import { combineReducers } from "redux";
import imageUploader from "./imageUploader";
import images from "./images";

const UppyStore = require("uppy/lib/store/ReduxStore");

export default combineReducers({
  imageUploader,
  images,
  uppy: UppyStore.reducer,
});
