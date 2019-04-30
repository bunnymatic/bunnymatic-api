import React from "react";
import { shallow } from "enzyme";
import ImageFactory from "../../testSupport/factories/images";
import { ImageList } from "./imageList";

describe("ImageList", () => {
  const requiredProps = {
    fetchArt: jest.fn(),
    onDeleteArt: jest.fn(),
    onEditArt: jest.fn(),
    onUpdateArt: jest.fn(),
  };

  let images = {};
  let wrapper;

  describe("with no uploaded images", () => {
    beforeEach(() => {
      jest.resetAllMocks();

      wrapper = shallow(<ImageList {...requiredProps} uploaded={images} />);
    });

    it("renders nothing", () => {
      expect(wrapper.html()).toEqual(null);
    });
  });

  describe("with uploaded images", () => {
    beforeEach(() => {
      images = ImageFactory.buildList(2).reduce((acc, image) => {
        acc[image.id] = image;
        return acc;
      }, {});
      wrapper = shallow(<ImageList {...requiredProps} uploaded={images} />);
    });
    it("renders 2 images", () => {
      expect(wrapper.find(".image-list__images .image-list__item-wrapper")).toHaveLength(2);
    });
  });
});
