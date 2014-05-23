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
          'dist/assets/*.js',
          'dist/assets/*.css'
        ],
        dest: 'dist/index.html'
      },
      images: {
        src: [
          'dist/assets/images/*'
        ],
        dest: ['dist/assets/*.css', 'dist/assets/*.js']
      }
    }});
  grunt.loadNpmTasks('grunt-hashres');
};
