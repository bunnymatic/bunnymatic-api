import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import classnames from "classnames";

import DragDrop from "uppy/lib/react/DragDrop";

import UppyWrapper from "../../services/uppyWrapper";
import { presignDocument } from "../../services/s3Helper";

import { onUpload, onUploadSuccess, onUploadError } from "../../actions/images";
import "./ImageUploader.scss";

const host = "http://localhost:4000";

class ImageUploader extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.uppyWrapper.close();
  }

  componentWillMount() {
    const { onUpload, onUploadSuccess, onUploadError } = this.props;
    const getUploadParameters = this.getUploadParameters;

    const { store } = this.context;

    this.uppyWrapper = new UppyWrapper(store, host, getUploadParameters, {
      upload: data => store.dispatch(onUpload(data)),
      uploadSuccess: (fileId, data, uploadUrl) => {
        const file = this.uppyWrapper.uppy.getFile(fileId);
        const url = data.location.split("?")[0];
        store.dispatch(onUploadSuccess({ location: url }));
      },
      uploadError: (_file, error) => {
        console.error("Failed to upload", error);
        store.dispatch(onUploadError(error));
      },
    });
    this.uppyWrapper.run();
  }

  getUploadParameters = file => {
    return presignDocument(file);
  };

  render() {
    if (this.props.isLoading) {
      return <div className={classnames("spinner", { "spinner--active": this.props.isLoading })} />;
    }
    return (
      <div className="image-uploader">
        <DragDrop uppy={this.uppyWrapper.uppy} locale={{ strings: { chooseFile: "Choose an image" } }} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.imageUploader.isLoading,
    uploadedFiles: state.imageUploader.uploadedFiles,
  };
};

ImageUploader.contextTypes = { store: PropTypes.object };

const mapDispatchToProps = dispatch => ({ onUpload, onUploadSuccess, onUploadError });

export { ImageUploader };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImageUploader);
