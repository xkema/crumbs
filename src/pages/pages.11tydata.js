const pagesPathPattern = /pages\/([a-z]{2})\/(?:([\w+|-]+)\/\2|(index))/;

/*
Covers only two type of "filePathStem"s: (The pattern above matches these.)
  1. /pages/en/about/about
  2. /pages/en/index
*/

module.exports = {
  permalink: function (data) {
    const result = pagesPathPattern.exec(data.page.filePathStem);
    if (result !== null) {
      const [, locale, fileName, indexFileName] = result;
      if(fileName !== undefined) {
        return `/${locale}/${fileName}/`;
      } else if (indexFileName === 'index') {
        return `/${locale}/index.html`;
      }
    } else {
      return false;
    }
  },
  layout: 'default.njk',
};
