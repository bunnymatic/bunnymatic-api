import {
  UPLOAD,
  UPLOAD_SUCCESS,
  ADD_ART_SUCCESS
} from "../actions/images";

const defaultState = {
  loading: false,
  uploadedFiles: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
  case UPLOAD:
    console.log("caught UPLOAD", action);
    return { ...state, loading: true }
  case UPLOAD_SUCCESS:
    const { location } = action.data;
    return { ...state, uploadedFiles: state.uploadedFiles.concat(location), loading: false }
  case ADD_ART_SUCCESS:
    const image = action.data.image;
    return {
      ...state,
      uploadedFiles: state.uploadedFiles.filter( (file) => file !== image.file),
      loading: false
    };
  default:
    return state;
  }
}
