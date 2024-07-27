const path = require("path");
const config = require('../../config');

const renderTemplate = (res, req, template, data = {}) => {
  const baseData = {
    path: req.path,
    user: req.user || null,
    bot: req.client,
    sponsorBanner: config.sponsor.banner,
    sponsorLink: config.sponsor.link
  };

  res.render(path.join(__dirname, "..", "views", template), {
    ...baseData,
    ...data,
  });
};

module.exports = renderTemplate;
