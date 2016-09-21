'use strict'

const PKG = 'wolfram-alpha-api-js'

const uglifyConfig = {
  build: {
    src: ['src/index.js'],
    dest: `dist/${PKG}.js`
  }
}

const bundleCmd = () => {
  return `browserify dist/${PKG}.js > dist/${PKG}.min.js -s wajs; rm dist/${PKG}.js`
}

const shellConfig = {
  bundle: {
    command: bundleCmd()
  }
}

const gruntConfig = {
  uglify: uglifyConfig,
  shell: shellConfig
}

module.exports = function(grunt) {
  grunt.initConfig(gruntConfig)
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-shell')
  grunt.registerTask('minify', ['uglify'])
  grunt.registerTask('build', ['minify', 'shell:bundle'])
}
