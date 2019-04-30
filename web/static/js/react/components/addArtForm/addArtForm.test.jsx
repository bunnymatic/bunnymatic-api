import React from "react";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import ImageFactory from "../../testSupport/factories/images";
import mockStore from "../../testSupport/mockStore.js";

import { AddArtForm } from "./addArtForm";

import ImageUploader from "../imageUploader/imageUploader";

jest.mock("../imageUploader/imageUploader");

describe("AddArtForm", () => {
  const requiredProps = {
    uploadedFiles: [],
  };

  let wrapper;

  describe("with no uploaded images", () => {
    beforeEach(() => {
      jest.resetAllMocks();
      const store = mockStore({ imageUploader: {} });
      wrapper = mount(
        <Provider store={store}>
          <AddArtForm {...requiredProps} />
        </Provider>,
      );
    });

    it("renders an empty form", () => {
      expect(wrapper.find(".add-art__form").text()).toEqual("");
    });
  });
});
