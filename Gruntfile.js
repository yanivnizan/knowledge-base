module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  var gruntConfig = require('./grunt-config.json');
  grunt.initConfig(gruntConfig);
  grunt.registerTask('default', ['uglify', 'concat', 'cssmin']);
};