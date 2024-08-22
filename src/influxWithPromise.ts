import { InfluxTypes } from "./common";
import { influx } from "./influx";
import { replacePathParams, addQueryParams } from "./utils";

export function influxWithPromise(obj: InfluxTypes, words: { input: string, replace: string }[]) {
  const parsedObj = influx(obj, words);

  let { type, method, headers, body, queryParams, action, pathParams } = parsedObj
  let url = action

  if (type === "form") {
    body = new URLSearchParams(JSON.parse(body)).toString();
  } else {
    if (pathParams)
      url = replacePathParams(url, pathParams)
    if (queryParams)
      url = addQueryParams(url, queryParams)
  }

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: method,
      headers: headers,
      body: method === 'POST' || method === 'PUT' ? body : null
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response;
      })
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}
