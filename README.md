# Taller's awesome [new website](http://tallerwebsolutions.github.io/)

> This branch holds website's building code. Check out the latest build released at [master branch](https://github.com/TallerWebSolutions/tallerwebsolutions.github.io/tree/master).

## Project Structure

- *[./src](./src)*: contains everything that is used to make a new build;
- *[./gulp](./gulp)*: organizes the [Gulp.js](http://gulpjs.com/)-based tasks used to build the project;
- *./tmp*: created by the gulp `build` task;

## Running Locally

### Dependencies
```
git clone https://github.com/TallerWebSolutions/tallerwebsolutions.github.io.git
npm install
```

### Local Development
```
npm run gulp develop
```

Or just run `gulp develop` if you have it installed globally. 

Either runs a local HTTP server on port 3000 with live-reload, which will update
your browser immediately with content, script, style, or translation changes. Generated assets
are provided to the `.tmp` directory for publishing.

You can also run `npm run gulp build` to run only the build script if you don't wish to have a dev server running.

## i18n

Translated variations of the website are automatically created by reading all files in *[./src/i18n](./src/i18n)* and creating corresponding index directories for each language during build process. Every language will inherit phrases from `pt-br` language - which is used in the homepage.

To create a new language one can simply add a file to the directory mentioned above, following the pattern `[language-code].json` (e.g. `es.json`, for spanish).

All referenced assets from the `ìndex.html` (or it's stylesheets, for that matter) must be absolute, so that they can be referenced from the translated pages, which will be served, e.g., at [http://tallerwebsolutions.github.io/en](http://tallerwebsolutions.github.io/en) (english version).

## Deployment

The website is currently hosted as a [GitHub page](https://pages.github.com/), which serves the code found on this repository's `master` branch. We currently use the [gh-pages](https://github.com/tschaub/gh-pages) module to deploy from the build `.tmp` directory to the `master` branch automatically.

To deploy new changes, run `npm run gulp deploy`, with an optional parameter `-m` (or `--message`) for the commit message. Changes are automatically accessible at [http://tallerwebsolutions.github.io](http://tallerwebsolutions.github.io)  after the branch has been updated.
