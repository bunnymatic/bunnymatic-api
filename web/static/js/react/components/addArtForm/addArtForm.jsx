import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import classnames from "classnames";
import Uppy from "@uppy/core";
import AwsS3 from "@uppy/aws-s3";
import { DragDrop } from "@uppy/react";
import ReduxStore from "@uppy/store-redux";
import ArtForm from "../artForm/artForm";
import ImageUploader from "../imageUploader/imageUploader";

import "./addArt.scss";

import {
  onUpload,
  onUploadSuccess,
  onUploadError,
  onAddArt,
  onAddArtSuccess,
  onAddArtError,
} from "../../actions/images";

const host = "http://localhost:4000";

class AddArtForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUploader: true,
    };
  }

  onSubmit = formValues => {
    this.props.onAddArt(formValues);
  };

  parameterize = s => s.replace(/[^\w\s]|_/g, " ").replace(/\s+/g, "-");

  renderForms() {
    return this.props.uploadedFiles.map(file => {
      const fileKey = this.parameterize(file);
      return (
        <div className="add-art">
          <div className="add-art__item">
            <img className="add-art__item__uploaded-image" src={file} />
            <ArtForm key={fileKey} form={`AddArtForm-${fileKey}`} initialValues={{ file }} onSubmit={this.onSubmit} />
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="add-art__form">
        {this.renderForms()}
        {this.state.showUploader && <ImageUploader />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.imageUploader.loading,
  uploadedFiles: state.imageUploader.uploadedFiles,
  form: state.form,
});

const mapDispatchToProps = dispatch => {
  return {
    onAddArt: data => dispatch(onAddArt(data)),
  };
};

export { AddArtForm };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddArtForm);
