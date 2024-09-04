import { InfluxTypes } from "./common";
import { replace } from "./replace";
import { createForm } from "./createForm";
import { replacePathParams, addQueryParams } from "./utils";
import { HttpError } from "./error";

export function influx(obj: InfluxTypes, replacements: { [target: string]: string }) {
  let parsedObj = obj;

  if (obj.body)
    parsedObj.body = replace(obj.body, replacements);

  if (obj.type === 'api') {
    if (obj.queryParams)
      parsedObj.queryParams = replace(obj.queryParams, replacements);
    if (obj.pathParams)
      parsedObj.pathParams = replace(obj.pathParams, replacements)
  }
  return parsedObj;
}

influx.call = function (obj: InfluxTypes, replacements: { [target: string]: string }) {
  const parsedObj = influx(obj, replacements);

  let { type, method, headers, body, queryParams, action, pathParams } = parsedObj
  let url = action

  if (type === "form") {
    let parsedBody;
    if (body)
      parsedBody = JSON.parse(body);
    return createForm(url, "post", parsedBody, "_top");
  } else {
    if (pathParams)
      url = replacePathParams(url, pathParams)
    if (queryParams)
      url = addQueryParams(url, queryParams)

    return new Promise((resolve, reject) => {
      fetch(url, {
        method: method,
        headers: headers,
        body: method === 'POST' || method === 'PUT' ? body : null
      })
        .then(response => {
          if (!response.ok) {
            return response.json().then(errorData => {
              const error = new HttpError(
                'HTTP error',
                response.status,
                response.statusText,
                errorData,
                response.url
              );
              throw error;
            });
          }
          return response;
        })
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }
}
