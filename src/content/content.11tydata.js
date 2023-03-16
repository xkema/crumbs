const contentPathPattern = /content\/(\w+)\/([a-z]{2})\/([\w+|-]+)\/\3/;

/*
Covers a single type of "filePathStem": (The pattern above matches this.)
  1. /content/miniseries/en/resident-alien/resident-alien
*/

module.exports = {
  permalink: function (data) {
    const result = contentPathPattern.exec(data.page.filePathStem);
    if (result !== null) {
      const [, contentType, locale, fileName] = result;
      return `/${locale}/${contentType}/${fileName}/`;
    } else {
      return false;
    }
  },
  layout: 'content-detail.njk',
};
