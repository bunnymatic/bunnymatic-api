import { post } from "./ajax";

const presignDocument = file => {
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

export { presignDocument };
