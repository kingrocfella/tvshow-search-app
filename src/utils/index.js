import checkPropTypes from "check-prop-types";

export const findClassAtrr = (component, attr) => component.find(`.${attr}`);

export const findItembyId = (component, id) => component.find(id);

export const checkProps = (component, expectedProps) =>
  checkPropTypes(component.propTypes, expectedProps, "props", component.name);
