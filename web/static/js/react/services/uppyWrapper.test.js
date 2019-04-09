import React from "react";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import UppyWrapper from "./uppyWrapper";
import Uppy from "uppy/lib/core";
import ReduxStore from "uppy/lib/store/ReduxStore";

jest.mock("uppy/lib/store/ReduxStore");

jest.mock("uppy/lib/core", () => {
  const mockOn = {
    on: () => ({
      on: () => ({
        on: () => ({
          on: () => ({
            on: () => ({
              run: jest.fn(),
            }),
          }),
        }),
      }),
    }),
  };
  return jest.fn().mockImplementation(() => {
    return {
      use: jest.fn().mockReturnValue(mockOn),
    };
  });
});

describe("uppyWrapper", () => {
  const requiredProps = {
    uploadedFiles: [],
  };

  const setup = () => {
    const host = "host";
    const store = "store";
    const callbacks = {};
    const getUploadParams = jest.fn();
    return {
      service: new UppyWrapper(host, store, getUploadParams, callbacks),
    };
  };
  let wrapper;

  it("sets up a bunch of stuff on the Uppy object", () => {
    const { service } = setup();
    service.run();
    expect(service.uppy.run).toHaveBeenCalled();
  });
});
