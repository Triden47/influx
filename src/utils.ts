export function replacePathParams(url: string, params: string) {
  params = JSON.parse(params);
  return url.replace(/:([^\/]+)/g, (_, key) => params[key] || `:${key}`);
}

export function addQueryParams(url: string, queryParams: string) {
  const queryString = new URLSearchParams(JSON.parse(queryParams)).toString();
  return queryString ? `${url}?${queryString}` : url;
}
