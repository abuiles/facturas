module.exports = function(grunt) {
  grunt.initConfig({
    hashres: {
      // Global options
      options: {
        encoding: 'utf8',
        fileNameFormat: '${hash}.${name}.cache.${ext}',
        renameFiles: true
      },
      prod: {
        options: {
        },
        src: [
          'dist/assets/vendor.css',
          'dist/assets/client.css',
          'dist/assets/client.js'
        ],
        // File that refers to above files and needs to be updated with the hashed name
        dest: 'dist/index.html'
      }
    }});
  grunt.loadNpmTasks('grunt-hashres');
};
