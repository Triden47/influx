import { InfluxTypes } from "./common";
import { replace } from "./replace";

export function influx(obj: InfluxTypes, replacements: { [target: string]: string }) {
  let parsedObj = obj;
  parsedObj.body = replace(obj.body, replacements);
  if (obj.type === 'api') {
    if (obj.queryParams)
      parsedObj.queryParams = replace(obj.queryParams, replacements);
    if (obj.pathParams)
      parsedObj.pathParams = replace(obj.pathParams, replacements)
  }
  return parsedObj;
}
