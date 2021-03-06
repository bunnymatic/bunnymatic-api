import {
  ADD_ART_SUCCESS,
  ADD_ART_ERROR,
  FETCH_ART_SUCCESS,
  FETCH_ART_ERROR,
  DELETE_ART_SUCCESS,
  DELETE_ART_ERROR,
  EDIT_ART,
  UPDATE_ART_SUCCESS,
  UPDATE_ART_ERROR,
  SUBMITTING_ART,
} from "../actions/images";
import { mergeDeepRight, mergeRight } from "ramda";
import omit from "lodash/omit";

const defaultState = {
  isLoading: false,
  uploaded: {},
  editing: {},
  errors: [],
};

export default (state = defaultState, action) => {
  let image;
  switch (action.type) {
    case SUBMITTING_ART:
      return mergeDeepRight(state, { isLoading: true });
    case EDIT_ART:
      return mergeDeepRight(state, { editing: state.uploaded[action.data] });
    case ADD_ART_SUCCESS:
      image = action.data.image;
      return mergeDeepRight(state, { isLoading: false, errors: [], uploaded: { [image.id]: image } });
    case DELETE_ART_SUCCESS:
      image = action.data.image;
      const newImages = omit(state.uploaded, image.id)
      return mergeRight(state, {
        isLoading: false,
        errors: [],
        uploaded: newImages,
      });
    case FETCH_ART_SUCCESS: {
      const imagesKeyedById = action.data.images.reduce((memo, image) => {
        memo[image.id] = image;
        return memo;
      }, {});
      return mergeDeepRight(state, { isLoading: false, uploaded: imagesKeyedById });
    }
    case UPDATE_ART_SUCCESS:
      image = action.data.image;
      state.uploaded[image.id] = image;
      return mergeDeepRight(state, { isLoading: false, errors: [], editing: null, uploaded: state.uploaded });
    case DELETE_ART_ERROR:
    case FETCH_ART_ERROR:
    case ADD_ART_ERROR:
    case UPDATE_ART_ERROR:
      return mergeDeepRight(state, { isLoading: false, errors: action.data });
    default:
      return state;
  }
};
