export function createForm(action: string, method: string, data: any, _target: string) {
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
};