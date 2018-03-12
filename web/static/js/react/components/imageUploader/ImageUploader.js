import React, { Component } from 'react';

const Uppy = require('uppy/lib/core');
const Tus = require('uppy/lib/plugins/Tus');
const DragDrop = require('uppy/lib/react/DragDrop');

import configureStore from "../../../store/configureStore";

const store = configureStore({});

const uppy = Uppy({
  meta: {
    type: 'image'
  },
  restrictions: { maxNumberOfFiles: 1 },
  autoProceed: true
});

uppy.use(Tus,
         {
           endpoint: '/images/uploads',
           headers: {
             'X-CSRF-Token': window._csrf
           }
         }
        );

uppy.on('complete', (result) => {
  const url = result.successful[0].uploadURL;
  console.log("success",result.successful[0]);
  store.dispatch({ type: "images/UPLOAD_COMPLETE", payload: { url: url }});
});

uppy.run();

const ImageUploader = (props) => {
  return <div>
    <h1>image uplader</h1>
    <DragDrop uppy={uppy} locale={{ strings: { chooseFile: "Choose an image" } }} />
    </div>;
};

export default ImageUploader;
