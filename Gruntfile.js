module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		concat: {
			build: {
				files: {
					'public/assets/js/production.min.js': [
							'components/select2/select2.js',
							'components/jquery-ui/jquery-ui-built.js',
							'assets/js/core/*.js',
							],
					'public/assets/css/static.css': [
						'vendor/ivaynberg/select2/select2.css',
						'assets/static/*.css'
					],
					'public/assets/js/d3_nvd3.min.js': ['vendor/mbostock/d3/d3.min.js', 'assets/js/nv.d3.js'],
					'public/assets/js/dataproc.min.js': 'assets/js/dataproc.js',
					'public/assets/js/compendium.min.js': 'assets/js/compendium.js',
					'public/assets/js/demography.min.js': 'assets/js/demography.js',
					'public/assets/js/visual.min.js': 'assets/js/visual.js',
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
					'assets/js/**/*' ],
				tasks: ['concat'],
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
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['concat', 'imagemin', 'sass', 'watch']);

};
