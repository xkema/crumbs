/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */

const directoryOutputPlugin = require('@11ty/eleventy-plugin-directory-output');
const { EleventyI18nPlugin } = require('@11ty/eleventy');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');

const path = require('path');

const postcss = require('postcss');
const postcssrc = require('postcss-load-config');

const lucideIcons = require('@grimlink/eleventy-plugin-lucide-icons');

const i18n = require('eleventy-plugin-i18n');
const translations = require('./src/assets/i18n/translations.js');

module.exports = function (eleventyConfig) {

  /* plugin: "@11ty/eleventy-plugin-directory-output" */
  eleventyConfig.setQuietMode(true);
  eleventyConfig.addPlugin(directoryOutputPlugin);

  /* plugin: "EleventyI18nPlugin" */
  eleventyConfig.addPlugin(EleventyI18nPlugin, { defaultLanguage: 'en' });

  /* plugin: "eleventy-plugin-i18n" */
  eleventyConfig.addPlugin(i18n, {
    translations,
    fallbackLocales: {
      '*': 'en'
    },
  });

  /* plugin: "@11ty/eleventy-navigation" */
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  
  /* plugin: "@grimlink/eleventy-plugin-lucide-icons" */
  eleventyConfig.addPlugin(lucideIcons, {});

  /* static assets */
  eleventyConfig.addPassthroughCopy({ 'src/assets/img': 'img' });

  /* add support for PostCSS */
  eleventyConfig.addTemplateFormats('css');
  eleventyConfig.addExtension('css', {
    outputFileExtension: 'css',
    compileOptions: {
      permalink: function (contents, inputPath) {
        const pathDetails = path.parse(inputPath);
        if (!pathDetails.name.startsWith('_')) {
          return (data) => `/css/${data.page.fileSlug}.css`;
        }
      },
      cache: false,
    },
    compile: async function (inputContent, inputPath) {
      const pathDetails = path.parse(inputPath);
      if (pathDetails.name.startsWith('_')) {
        return;
      }
      const postCCSSConfig = await postcssrc();
      const result = await postcss(postCCSSConfig.plugins).process(inputContent, { ...postCCSSConfig.options, from: inputPath });
      result.warnings().forEach(warn => (console.warn(warn.toString())));
      return async (data) => result.css;
    },
  });

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
