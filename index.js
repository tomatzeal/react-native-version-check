const axios = require('axios');

exports.getPlaystoreReleaseVersion = function (packageName) {
  const appstoreUrl = `https://play.google.com/store/apps/details?id=${packageName}&hl=en`;

  return axios.get(appstoreUrl).then(function (response) {
    const match = response.data.match(/Current Version.+?>([\d.-]+)<\/span>/);
    if (match) {
      const latestVersion = match[1].trim();
      return Promise.resolve({ version: latestVersion, appstoreUrl });
    }
  });
};

exports.getAppleReleaseVersion = function (packageName) {
  const dateNow = new Date().getTime();
  const appstoreUrl = `https://itunes.apple.com/lookup?bundleId=${packageName}&date=${dateNow}`;

  return axios.get(appstoreUrl).then(function (response) {
    return {
      version: response.data.results[0].version,
      currentVersionReleaseDate:
        response.data.results[0].currentVersionReleaseDate,
      minimumOsVersion: response.data.results[0].minimumOsVersion,
    };
  });
};
