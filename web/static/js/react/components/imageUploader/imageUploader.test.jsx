import React from "react";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import ImageFactory from "../../testSupport/factories/images";
import mockStore from "../../testSupport/mockStore.js";
import UppyWrapper from "../../services/uppyWrapper";

jest.mock("../../services/uppyWrapper", () => {
  return jest.fn(() => {
    return {
      run: jest.fn(),
      uppy: {
        use: jest.fn(),
        getPlugin: jest.fn(),
      },
    };
  });
});

import { ImageUploader } from "./imageUploader";

describe("ImageUploader", () => {
  const requiredProps = {
    isUploading: false,
    uploadedFiles: [],
  };

  let wrapper;

  describe("with no uploaded images", () => {
    beforeEach(() => {
      const store = mockStore({
        imageUploader: {
          isLoading: false,
          uploadedFiles: [],
        },
      });
      wrapper = mount(
        <Provider store={store}>
          <ImageUploader {...requiredProps} />
        </Provider>,
      );
    });

    it("renders", () => {
      expect(wrapper.find("div.image-loader div")).toBeTruthy();
    });
  });
});
