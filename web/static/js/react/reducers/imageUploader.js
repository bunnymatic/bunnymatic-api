import { UPLOAD, UPLOAD_SUCCESS, ADD_ART_SUCCESS } from "../actions/images";

const defaultState = {
  isLoading: false,
  uploadedFiles: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPLOAD:
      return { ...state, isLoading: true };
    case UPLOAD_SUCCESS: {
      const { location } = action.data;
      return { ...state, uploadedFiles: state.uploadedFiles.concat(location), isLoading: false };
    }
    case ADD_ART_SUCCESS: {
      const image = action.data.image;
      return {
        ...state,
        uploadedFiles: state.uploadedFiles.filter(file => file !== image.file),
        isLoading: false,
      };
    }
    default:
      return state;
  }
};
