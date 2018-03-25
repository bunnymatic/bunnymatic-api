import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import classnames from "classnames";

import Uppy from "uppy/lib/core";
import AwsS3 from 'uppy/lib/plugins/AwsS3';
import DragDrop from 'uppy/lib/react/DragDrop';
import ReduxStore from 'uppy/lib/store/ReduxStore';

import { onUpload, onUploadSuccess, onUploadError } from "../../actions/images";

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
        type: 'image'
      },
      store: ReduxStore({ store: store }),
      restrictions: { maxNumberOfFiles: 1 },
      autoProceed: true
    })
      .use(AwsS3, { host, getUploadParameters })
      .run();

    const uppy = this.uppy;
    this.uppy
      .on('upload', (data) => {
        // data object consists of `id` with upload id and `fileIDs` array
        // with file ids in current upload
        // data: { id, fileIDs }
        console.log("upload event", data);
        store.dispatch(onUpload(data));
      })
      .on('upload-progress', (file, progress) => {
        // file: { id, name, type, ... }
        // progress: { uploader, bytesUploaded, bytesTotal }
        console.log("upload progress", file, progress);
      })
      .on("upload-success", (fileId, data, uploadUrl) => {
        const file = uppy.getFile(fileId);
        console.log("upload success", file); // the S3 object key of the uploaded file
        const url = data.location.split("?")[0];
        store.dispatch(onUploadSuccess({location: url}));
      })
      .on('upload-error', (file, error) => {
        console.log('error with file:', file);
        console.log('error message:', error);
      })
      .on('complete', (result) => {
        console.log("complete", result);

      })
      .run();
  }

  getUploadParameters = (file, props) => {

    console.log("PROPS", props);
    const { onUpload, onUploadSuccess } = this.props;

    return fetch('/s3/sign', {
      method: 'post',
      // Send and receive JSON.
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'Authorization': 'Basic ' + btoa("bunny:matic")
      },
      body: JSON.stringify({
        filename: file.name,
        contentType: file.type
      })
    }).then((response) => {
      console.log("first then", response);
      // return presigned url
      return response.json();
    }).then((data) => {
      // Return an object in the correct shape.
      console.log("data", data);
      return {
        method: "PUT",
        url: data.url,
        fields: {}
      };
    });
  };

  renderUploadedFiles = () => {
    return this.props.uploadedFiles.map((file, index) => {
      console.log(file, index);
      return (
        <li key={index}>
          <span>{file}</span>
          <img src={file} style={ { maxHeight: "100px", maxWidth: "100px" } } />
        </li>
      );
    });
  }

  render() {
    return (
      <div className="image-uploader">
        <h1>image uplader</h1>
        <main>
          <ul>
            { this.renderUploadedFiles() }
          </ul>
        </main>
        <div className={ classnames("spinner", {"spinner--active": this.props.loading}) }>
          spinner { this.props.loading }
        </div>
        <div className="image-uploader__info">
          { JSON.stringify(this.props) }
        </div>
        {
          ( this.props.uploadedFiles.length <= 0 ) &&
          <DragDrop
            uppy={this.uppy}
              locale={{ strings: { chooseFile: "Choose an image" } }} />
        }
      </div>
    );
  };
};

const mapStateToProps = state => {
  console.log('state', state);
  return {
    loading: state.imageUploader.loading,
    uploadedFiles: state.imageUploader.uploadedFiles
  };
}

ImageUploader.contextTypes = { store: PropTypes.object };

const mapDispatchToProps = (dispatch) => ({ onUpload, onUploadSuccess });

export { ImageUploader };

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader);
