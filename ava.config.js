export default {
  verbose: true,
  failFast: true,
  extensions: [
    'js'
  ],
  files: [
    'test/**/*.spec.js'
  ],
  watchMode: {
    ignoreChanges: [
      'temp'
    ]
  }
}
