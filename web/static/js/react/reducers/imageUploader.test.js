import reducer from "./imageUploader";
import { onUpload, onUploadSuccess, onAddArtSuccess } from "../actions/images";

const defaultState = {
  isLoading: false,
  uploadedFiles: [],
};

describe("ImageUploader reducer", () => {
  it("has a default state", () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(defaultState);
  });

  it("UPLOAD sets isLoading", () => {
    const state = reducer(undefined, onUpload({}));
    expect(state.isLoading).toEqual(true);
  });

  it("UPLOAD_ART_SUCCESS sets isLoading false and sets the file location", () => {
    const state = reducer(
      { isLoading: true, uploadedFiles: [] },
      onUploadSuccess({ location: "file/location/is/here.jpg" }),
    );
    expect(state.isLoading).toEqual(false);
    expect(state.uploadedFiles).toEqual(["file/location/is/here.jpg"]);
  });

  it("ADD_ART_SUCCESS sets isLoading false and removes image from the uploaded file list", () => {
    const state = reducer(
      { isLoading: false, uploadedFiles: ["uploaded_file.jpg"] },
      onAddArtSuccess({ image: { file: "uploaded_file.jpg" } }),
    );
    expect(state.isLoading).toEqual(false);
    expect(state.uploadedFiles).toEqual([]);
  });
});
