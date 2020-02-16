export const UPLOAD_ERROR = "images/UPLOAD_ERROR";
export const UPLOAD_SUCCESS = "images/UPLOAD_SUCCESS";
export const UPLOAD = "images/UPLOAD";

export const onUpload = data => ({ type: UPLOAD, data });
export const onUploadSuccess = data => ({ type: UPLOAD_SUCCESS, data });
export const onUploadError = data => ({ type: UPLOAD_ERROR, data });

export const ADD_ART_ERROR = "images/ADD_ART_ERROR";
export const ADD_ART_SUCCESS = "images/ADD_ART_SUCCESS";
export const ADD_ART = "images/ADD_ART";

export const onAddArtSuccess = data => ({ type: ADD_ART_SUCCESS, data });
export const onAddArtError = data => ({ type: ADD_ART_ERROR, data });

export const FETCH_ART_ERROR = "images/FETCH_ART_ERROR";
export const FETCH_ART_SUCCESS = "images/FETCH_ART_SUCCESS";

export const onFetchArtSuccess = data => ({ type: FETCH_ART_SUCCESS, data });
export const onFetchArtError = data => ({ type: FETCH_ART_ERROR, data });

export const DELETE_ART = "images/DELETE_ART";
export const DELETE_ART_SUCCESS = "images/DELETE_ART_SUCCESS";
export const DELETE_ART_ERROR = "images/DELETE_ART_ERROR";

export const onDeleteArtSuccess = data => ({ type: DELETE_ART_SUCCESS, data });
export const onDeleteArtError = data => ({ type: DELETE_ART_ERROR, data });

export const EDIT_ART = "images/EDIT";

export const onEditArt = data => ({ type: EDIT_ART, data });

export const UPDATE_ART = "images/UPDATE_ART";
export const UPDATE_ART_SUCCESS = "images/UPDATE_ART_SUCCESS";
export const UPDATE_ART_ERROR = "images/UPDATE_ART_ERROR";

export const onUpdateArtSuccess = data => ({ type: UPDATE_ART_SUCCESS, data });
export const onUpdateArtError = data => ({ type: UPDATE_ART_ERROR, data });

export const SUBMITTING_ART = "images/SUBMITTING_ART";

export const onSubmittingArt = _ => ({ type: SUBMITTING_ART, data: {} });

import { get, put, post, destroy } from "../services/ajax";

/** thunks go below here */
export const onDeleteArt = id => {
  return dispatch => {
    dispatch(onSubmittingArt());

    const url = `/api/images/${id}`;
    destroy(url)
      .then(response => response.json())
      .then(result => dispatch(onDeleteArtSuccess(result)))
      .catch(error => dispatch(onDeleteArtError(error)));
  };
};

export const onUpdateArt = data => {
  return dispatch => {
    dispatch(onSubmittingArt());

    const url = `/api/images/${data.id}`;
    put(url, { image: data })
      .then(response => response.json())
      .then(result => dispatch(onUpdateArtSuccess(result)))
      .catch(error => dispatch(onUpdateArtError(error)));

    return null;
  };
};

export const fetchArt = data => {
  return dispatch => {
    dispatch(onSubmittingArt());
    const url = "/api/images";
    return get(url, data)
      .then(response => response.json())
      .then(result => dispatch(onFetchArtSuccess(result)))
      .catch(error => dispatch(onFetchArtError(error)));
  };
};

export const onAddArt = data => {
  return dispatch => {
    dispatch(onSubmittingArt());

    const url = "/api/images";
    post(url, { image: data })
      .then(response => response.json())
      .then(result => dispatch(onAddArtSuccess(result)))
      .catch(error => dispatch(onAddArtError(error)));
  };
};
