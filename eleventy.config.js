/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */

const directoryOutputPlugin = require('@11ty/eleventy-plugin-directory-output');
const { EleventyI18nPlugin } = require('@11ty/eleventy');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');

module.exports = function (eleventyConfig) {

  /* plugin: "@11ty/eleventy-plugin-directory-output" */
  eleventyConfig.setQuietMode(true);
  eleventyConfig.addPlugin(directoryOutputPlugin);

  /* plugin: "EleventyI18nPlugin" */
  eleventyConfig.addPlugin(EleventyI18nPlugin, { defaultLanguage: 'en' });

  /* plugin: "@11ty/eleventy-navigation" */
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  /* configuration */
  return {
    dir: {
      input: 'src',
      layouts: '_layouts',
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  }
};
