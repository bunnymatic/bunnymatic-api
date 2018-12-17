const callServer = (method, url, data = null) => {
  let attrs = {
    method: method,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json; charset=utf-8"
    }
    // mode: "cors", // no-cors, cors, *same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, same-origin, *omit
    // redirect: "follow", // manual, *follow, error
    // referrer: "no-referrer", // no-referrer, *client
  };

  if (data) {
    attrs.body = JSON.stringify(data);
  };
  return fetch(url, attrs);
};

export const get = (url) => callServer("GET", url);
export const put = (url, data) => callServer("PUT", url, data);
export const post = (url, data) => callServer("POST", url, data);
export const destroy = (url, data) => callServer("DELETE", url, data);
