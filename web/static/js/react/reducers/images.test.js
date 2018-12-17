import reducer from "./images";
import {
  onAddArtError,
  onAddArtSuccess,
  onDeleteArtError,
  onDeleteArtSuccess,
  onEditArt,
  onFetchArtError,
  onFetchArtSuccess,
  onUpdateArtError,
  onUpdateArtSuccess,
  onSubmittingArt,
} from "../actions/images";

import { objectContaining } from "expect";

const defaultState = {
  isLoading: false,
  uploaded: {},
  editing: {},
  errors: [],
};

describe("Images reducer", () => {
  it("has a default state", () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(defaultState);
  });

  it("SUBMITTING_ART sets isLoading true ", () => {
    const state = reducer(undefined, onSubmittingArt());
    expect(state).toMatchObject({
      isLoading: true,
    });
  });

  it("EDIT_ART sets the editing image ", () => {
    const image = { id: 4, title: "new title" };
    const state = reducer({ ...defaultState, uploaded: { [image.id]: image } }, onEditArt(image.id));
    expect(state).toMatchObject({
      isLoading: false,
      editing: image,
    });
  });

  it("ADD_ART_SUCCESS adds the new art to uploaded ", () => {
    const newImage = { id: 4, title: "new title" };
    const state = reducer({ ...defaultState, isLoading: true, uploaded: {} }, onAddArtSuccess({ image: newImage }));
    expect(state).toMatchObject({
      isLoading: false,
      uploaded: {
        4: newImage,
      },
    });
  });

  it("DELETE_ART_SUCCESS removes the art from uploaded ", () => {
    const images = { 4: { id: 4, title: "new title" }, 3: { id: 3, title: "other" } };
    const state = reducer(
      { ...defaultState, isLoading: true, uploaded: images },
      onDeleteArtSuccess({ image: images[4] }),
    );
    expect(state).toMatchObject({
      isLoading: false,
      uploaded: {
        3: images[3],
      },
    });
  });

  it("FETCH_ART_SUCCESS sets the uploaded list ", () => {
    const images = [{ id: 4, title: "new title" }, { id: 3, title: "other" }];
    const state = reducer(
      { ...defaultState, isLoading: true },
      onFetchArtSuccess({
        images,
      }),
    );
    expect(state).toMatchObject({
      isLoading: false,
      uploaded: {
        4: images[0],
        3: images[1],
      },
    });
  });

  it("UPDATE_ART_SUCCESS updates the art ", () => {
    const image = { id: 4, title: "new title" };
    const state = reducer(
      { ...defaultState, isLoading: true },
      onUpdateArtSuccess({
        image,
      }),
    );
    expect(state).toMatchObject({ isLoading: false, uploaded: { 4: image } });
  });

  it("DELETE_ART_ERROR sets the errors", () => {
    const state = reducer({ ...defaultState, isLoading: true }, onDeleteArtError({ this_field: "is wrong" }));
    expect(state).toMatchObject({ isLoading: false, errors: { this_field: "is wrong" } });
  });

  it("FETCH_ART_ERROR sets the errors", () => {
    const state = reducer({ ...defaultState, isLoading: true }, onFetchArtError({ this_field: "is wrong" }));
    expect(state).toMatchObject({ isLoading: false, errors: { this_field: "is wrong" } });
  });

  it("ADD_ART_ERROR sets the errors", () => {
    const state = reducer({ ...defaultState, isLoading: true }, onAddArtError({ this_field: "is wrong" }));
    expect(state).toMatchObject({ isLoading: false, errors: { this_field: "is wrong" } });
  });

  it("UPDATE_ART_ERROR sets the errors", () => {
    const state = reducer({ ...defaultState, isLoading: true }, onUpdateArtError({ this_field: "is wrong" }));
    expect(state).toMatchObject({ isLoading: false, errors: { this_field: "is wrong" } });
  });
});
