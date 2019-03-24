## manytwitch
### Multiple Twitch stream viewer

Live at www.danielhearn.co.uk/manytwitch

Built with VueJS, SCSS, webpack for workflow automation.
Hosted on github pages.

## Features
- Watch multiple twitch streams and chats
- Recent stream history
- Stream presets -> For quick acess to regularly watched streams

To specify a channel within the url use 'manytwitch/?stream=channel1,channel2' creating a list of the channels seperated with commas.

![Example image of app](readme-assets/manytwitch1.png)

## TODO
- Improved styling with consistently design components
- Mobile/ Tablet support
- Layouts
- Notifications - E.g. preset saved, stream add or deleted, history cleared
- Home page content via the Twitch API
- Reduce dependencies

## Dependencies
- vue draggable to handle model updating on list reorder with drag and drop.
- date fns for readable relative date for stream history.
- webpack for bundling and building

## Tasks
- 'npm run watch': Watch with webpack dev server
- 'npm run build': Build production files 

## Gulp tasks
- Watch: Use browsersync to reload files and compiles pug and scss.
- Build: Compiles pug and scss and builds files from src to dist, including compressing images, js, css

## Contributions

Contributions are welcome especially those which improve functionality and user experience.
To contribute please fork and send a pull request, to request a feature or report bugs please open an issue.
