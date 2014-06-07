module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		uglify: {
			build: {
				files: {
					'public/assets/js/production.min.js': [
															'public/packages/select2/select2.js',
															'../../../../../toolbox/web/jquery-cookie/jquery.cookie.js',
															'assets/js/core/*.js'
														],
					'public/assets/js/profiles.min.js':'assets/js/profiles.js',
					'public/assets/js/profiles.basic.min.js':'assets/js/profiles.basic.js',
					'public/assets/js/sms.min.js':'assets/js/sms.js'
				}
			}
		},
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'assets/imgs/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'public/assets/imgs/'
				}]
			}
		},
		watch: {
			options: {
				livereload: true
			},
			scripts: {
				files: [
					'public/packages/select2/select2.js',
					'Gruntfile.js',
					'assets/js/**/*' ],
				tasks: ['uglify'],
				options: {
					spawn: false,
				},
			},
			css: {
				files: ['assets/sass/*.scss'],
				tasks: ['sass'],
				options: {
					spawn: false,
				}
			},
			images: {
				files: ['assets/imgs/*.{png,jpg,gif}'],
				tasks: ['imagemin'],
				options: {
					spawn: false,
				}
			}
		},
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'public/assets/css/master.css': 'assets/sass/master.scss'
				}
			}
		}
    });
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['uglify', 'imagemin', 'sass', 'watch']);

};
