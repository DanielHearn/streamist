import { configure } from '@storybook/vue'

// automatically import all files ending in *.stories.js
// const req = require.context('../src/js/components', true, /\.stories\.js$/)

import registerRequireContextHook from 'babel-plugin-require-context-hook/register'
registerRequireContextHook()

const req = global.__requireContext(
  __dirname,
  '../src/js/components',
  true,
  /\.stories\.js$/
)

function loadStories () {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
