import utils from "./utils.js";

const notFound = (req, res) => {
  return utils.responseFail(res, "Not Found", 404);
};

export default notFound;
