module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'source/stylesheets/main.css': 'source/stylesheets/main.scss'
        }
      }
    },

    watch: {
      css: {
        files: ['source/stylesheets/main.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  //grunt.registerTask('sass', ['sass']);
  //grunt.registerTask('watch', ['watch']);
};