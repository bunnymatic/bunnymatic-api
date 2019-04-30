import Uppy from "uppy/lib/core";
import AwsS3 from "uppy/lib/plugins/AwsS3";
import ReduxStore from "uppy/lib/store/ReduxStore";

export default class UppyWrapper {
  constructor(store, host, getUploadParameters, eventCallbacks) {
    this.uppy = Uppy({
      meta: {
        type: "image",
      },
      store: ReduxStore({ store: store }),
      autoProceed: true,
    })
      .use(AwsS3, { host, getUploadParameters })
      .on("upload", eventCallbacks.upload || (() => {}))
      .on("upload-progress", eventCallbacks.uploadProgress || (() => {}))
      .on("upload-success", eventCallbacks.uploadSuccess || (() => {}))
      .on("upload-error", eventCallbacks.uploadError || (() => {}))
      .on("complete", eventCallbacks.complete || (() => {}));
  }

  run() {
    return this.uppy.run();
  }

  close() {
    return this.uppy.close();
  }
}
