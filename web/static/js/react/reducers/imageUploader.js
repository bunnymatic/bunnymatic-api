import { UPLOAD, UPLOAD_SUCCESS } from "../actions/images";

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
  default:
    return state;
  }
}
