const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    // sequence is important: runtime -> polyfills -> main
    './dist/personal-assistant/runtime.js',
    './dist/personal-assistant/polyfills.js',
    './dist/personal-assistant/main.js'
  ]

  try {
    await fs.ensureDir('elements')
    console.log('success!')
  } catch (err) {
    console.error(err)
  }

  await concat(files, 'output/personal-assistant.js')
})()
