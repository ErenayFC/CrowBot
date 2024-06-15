const path = require("path");

const renderTemplate = (res, req, template, data = {}) => {
  const baseData = {
    path: req.path,
    user: req.user || null,
    bot: req.client,
  };

  res.render(path.join(__dirname, "..", "views", template), {
    ...baseData,
    ...data,
  });
};

module.exports = renderTemplate;
