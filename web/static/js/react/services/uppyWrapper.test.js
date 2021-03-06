import UppyWrapper from "./uppyWrapper";

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
  const setup = () => {
    const host = "host";
    const store = "store";
    const callbacks = {};
    const getUploadParams = jest.fn();
    return {
      service: new UppyWrapper(host, store, getUploadParams, callbacks),
    };
  };
  it("sets up a bunch of stuff on the Uppy object", () => {
    const { service } = setup();
    service.run();
    expect(service.uppy.run).toHaveBeenCalled();
  });
});
