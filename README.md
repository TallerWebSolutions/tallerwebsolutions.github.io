# Taller's cool [new website](http://tallerwebsolutions.github.io/)

> This branch holds website's building code. Check out the latest build released at [master branch](https://github.com/TallerWebSolutions/tallerwebsolutions.github.io/tree/master).

## Project Structure

- *[./src](./src)*: contains everything that is used to make a new build;
- *[./gulp](./gulp)*: organizes the [Gulp.js](http://gulpjs.com/)-based tasks used to build the project;
- *./tmp*: created by the gulp `build` task;

## Running Locally

### Dependencies
```
git clone https://github.com/nodejs/website.git
npm install
```

### Local Development
```
npm run gulp develop
```

Or just run `gulp develop` if you have it installed globally. You can also run `npm run gulp build` to run the build script, if you don't wish to have a dev server running.

Runs a local HTTP server on port 3000 with live-reload, which will update
your browser immediately with content, script, style, or translation changes. Generated assets
are provided to the `.tmp` directory for publishing.

## Deployment

The website is currently hoster as a [GitHub page](https://pages.github.com/), which serves the code found on this repository's `master` branch. We currently use the [gh-pages](https://github.com/tschaub/gh-pages) module to deploy from the build `.tmp` directory to the `master` branch automatically.

To deploy new changes, run `npm run gulp deploy`, with an optional parameter `-m` (or `--message`) for the commit message. Changes are automatically accessible after the branch has beeing update.
