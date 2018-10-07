# manytwitch
## Multiple Twitch stream viewer

Live at www.danielhearn.co.uk/manytwitch
Currently being rebuilt with Vue and a new design on the V3 branch.

Built with AngularJS, SCSS, CSS Variables, BEM for CSS, gulp for workflow tools.
Hosted on github pages.

To specify a channel within the url use 'manytwitch/?stream=channel1,channel2' creating a list of the channels seperated with commas.

![Example image](readme-assets/manytwitch1.png)

### TODO
- Implement js minify to gulp build task
- Ensure consistency across all input elements, e.g dropdowns are currently different height to text inputs and buttons

### Dependencies
- angular-sortable-view to handle AngularJS model updating on list reorder.
- screenfull.js for quick and clean access to browser fullscreen api.

### Gulp tasks
- Watch: Use browsersync to reload files and compiles scss.
- Build: Builds files from src to dist, including compressing images, js, css

### Contributions

Contributions are welcome especially those which improve functionality and user experience.
To contribute please fork and send a pull request, to request a feature or report bugs please open an issue.
