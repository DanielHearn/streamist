# manytwitch
## Multiple Twitch stream viewer

Live at www.danielhearn.co.uk/manytwitch

Built with AngularJS, SCSS, CSS Variables, BEM for CSS, gulp for workflow tools.
Hosted on github pages.

To specify a channel within the url use 'manytwitch/?stream=channel1,channel2' creating a list of the channels seperated with commas.

### Dependencies
- angular-sortable-view to handle AngularJS model updating on list reorder.
- screenfull for quick and clean access to browser fullscreen api.

### Gulp tasks
- Watch: Use browsersync to reload files and compiles scss.
- Build: Builds files from src to dist, including compressing images, js, css
