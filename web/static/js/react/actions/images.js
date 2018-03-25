export const UPLOAD_ERROR = "images/UPLOAD_ERROR";
export const UPLOAD_SUCCESS = "images/UPLOAD_SUCCESS";
export const UPLOAD = "images/UPLOAD";

export const onUpload = (data) => ({ type: UPLOAD, data});
export const onUploadSuccess = (data) => ({ type: UPLOAD_SUCCESS, data});
export const onUploadError = (data) => ({ type: UPLOAD_ERROR, data});
