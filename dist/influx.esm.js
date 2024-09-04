function replace(inputString, replacements) {
    for (const targetWord in replacements) {
        inputString = inputString.replace(targetWord, replacements[targetWord]);
    }
    return inputString;
}

function createForm(action, method, data, _target) {
    const form = document.createElement("form");
    form.setAttribute("id", "checkout-cf-form" + Math.floor(Math.random() * 1000000));
    form.setAttribute("method", method);
    form.setAttribute("action", action);
    form.setAttribute("target", _target);
    form.style.width = "0px";
    form.style.height = "0px";
    form.style.display = "none";
    for (const name in data) {
        if (Object.hasOwnProperty.call(data, name)) {
            const value = data[name];
            let FN = document.createElement("input");
            FN.setAttribute("type", "hidden");
            FN.setAttribute("name", name);
            FN.setAttribute("value", value);
            form.appendChild(FN);
        }
    }
    document.body.appendChild(form);
    return form;
}

function replacePathParams(url, params) {
    params = JSON.parse(params);
    return url.replace(/:([^\/]+)/g, (_, key) => params[key] || `:${key}`);
}
function addQueryParams(url, queryParams) {
    const queryString = new URLSearchParams(JSON.parse(queryParams)).toString();
    return queryString ? `${url}?${queryString}` : url;
}

// Define a custom error class extending Error
class HttpError extends Error {
    constructor(message, status, statusText, data, url) {
        super(message); // Call the parent constructor (Error)
        this.status = status;
        this.statusText = statusText;
        this.data = data;
        this.url = url;
        // Set the prototype explicitly (only necessary when targeting ES5 or below)
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}

function influx(obj, replacements) {
    let parsedObj = obj;
    if (obj.body)
        parsedObj.body = replace(obj.body, replacements);
    if (obj.type === 'api') {
        if (obj.queryParams)
            parsedObj.queryParams = replace(obj.queryParams, replacements);
        if (obj.pathParams)
            parsedObj.pathParams = replace(obj.pathParams, replacements);
    }
    return parsedObj;
}
influx.call = function (obj, replacements) {
    const parsedObj = influx(obj, replacements);
    let { type, method, headers, body, queryParams, action, pathParams } = parsedObj;
    let url = action;
    if (type === "form") {
        let parsedBody;
        if (body)
            parsedBody = JSON.parse(body);
        return createForm(url, "post", parsedBody, "_top");
    }
    else {
        if (pathParams)
            url = replacePathParams(url, pathParams);
        if (queryParams)
            url = addQueryParams(url, queryParams);
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: method,
                headers: headers,
                body: method === 'POST' || method === 'PUT' ? body : null
            })
                .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        const error = new HttpError('HTTP error', response.status, response.statusText, errorData, response.url);
                        throw error;
                    });
                }
                return response;
            })
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    }
};

var index = {
    parseText: replace,
    parseJSON: influx
};

export { index as default, influx as parseJSON, replace as parseText };
//# sourceMappingURL=influx.esm.js.map
