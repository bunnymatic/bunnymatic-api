import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import classnames from "classnames";

import Uppy from "@uppy/core";
import AwsS3 from "@uppy/aws-s3";
import { DragDrop } from "@uppy/react";
import ReduxStore from "@uppy/store-redux";

import { onUpload, onUploadSuccess, onUploadError } from "../../actions/images";
import "./ImageUploader.scss";

import { post } from "../../services/ajax";

const host = "http://localhost:4000";

class ImageUploader extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.uppy.close();
  }

  componentWillMount() {
    const getUploadParameters = this.getUploadParameters;

    const { store } = this.context;

    this.uppy = Uppy({
      meta: {
        type: "image",
      },
      store: ReduxStore({ store: store }),
      autoProceed: true,
    })
      .use(AwsS3, { host, getUploadParameters })
      .run();

    const uppy = this.uppy;
    this.uppy
      .on("upload", data => {
        // data object consists of `id` with upload id and `fileIDs` array
        // with file ids in current upload
        // data: { id, fileIDs }
        store.dispatch(onUpload(data));
      })
      .on("upload-progress", (_file, _progress) => {
        // file: { id, name, type, ... }
        // progress: { uploader, bytesUploaded, bytesTotal }
      })
      .on("upload-success", (_file, response) => {
        // const file = uppy.getFile(file.id);
        const url = response.uploadURL.split("?")[0];
        store.dispatch(onUploadSuccess({ location: url }));
      })
      .on("upload-error", (_file, error, _response) => {
        store.dispatch(onUploadError({ error }));
      })
      .on("complete", _result => {})
      .run();
  }

  getUploadParameters = file => {
    const { onUpload, onUploadSuccess } = this.props;

    return post("/s3/sign", {
      filename: file.name,
      contentType: file.type,
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        // Return an object in the correct shape.
        return {
          method: "PUT",
          url: data.url,
          fields: {},
        };
      });
  };

  render() {
    if (this.props.loading) {
      return <div className={classnames("spinner", { "spinner--active": this.props.loading })} />;
    } else {
      return (
        <div className="image-uploader">
          <DragDrop uppy={this.uppy} locale={{ strings: { chooseFile: "Choose an image" } }} />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    loading: state.imageUploader.loading,
    uploadedFiles: state.imageUploader.uploadedFiles,
  };
};

ImageUploader.contextTypes = { store: PropTypes.object };

const mapDispatchToProps = dispatch => ({ onUpload, onUploadSuccess });

export { ImageUploader };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImageUploader);
