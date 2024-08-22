import { InfluxTypes } from "./common";
import { replace } from "./replace";

export function influx(obj: InfluxTypes, words: { input: string, replace: string }[]) {
  console.log("obj", obj)
  let parsedObj = obj;
  parsedObj.body = replace(obj.body, words);
  if (obj.type === 'api') {
    if (obj.queryParams)
      parsedObj.queryParams = replace(obj.queryParams, words);
    if (obj.pathParams)
      parsedObj.pathParams = replace(obj.pathParams, words)
  }
  return parsedObj;
}
