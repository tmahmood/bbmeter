module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		webdev_sync: {
			options: {
				local_path: ['app', 'public', '.htaccess', 'bootstrap' ],
				remote_path: 'ssh://192.168.3.107:/srv/http/bbmeter/'
			}
		},
		copy: {
			build: {
				files: [
					{ expand: true, dest:'public/data/', src: ['assets/data/*'], flatten: true },
					{ expand: true, dest:'../html/data/', src: ['assets/data/*'], flatten: true }
				]
			}
		},
		concat: {
			build: {
				files: {
					'public/assets/js/libs.min.js': [
							'components/select2/select2.js',
							'components/jquery-ui/jquery-ui-built.js',
							],
					'public/assets/js/core.min.js': [ 'assets/js/core/*.js' ],
					'public/assets/js/graphcore.min.js': [ 'assets/js/graphs.js', 'assets/js/visualizer.js'],
					'public/assets/css/static.css': [
						'vendor/ivaynberg/select2/select2.css',
						'assets/static/*.css'
					],
					'public/assets/js/d3_nvd3.min.js': ['vendor/mbostock/d3/d3.min.js', 'assets/js/nv.d3.js'],
					'public/assets/js/visual.min.js': 'assets/js/visual.js',
					'../html/assets/js/visual.min.js': 'assets/js/visual.js',
					'../html/assets/js/libs.min.js': [ 'vendor/mbostock/d3/d3.min.js', 'assets/js/nv.d3.js',
															 'components/select2/select2.js', 'components/jquery-ui/jquery-ui-built.js', ],
					'../html/assets/js/core.min.js': ['assets/js/core/*.js'],
					'../html/assets/js/graphcore.min.js': [ 'assets/js/graphs.js', 'assets/js/visualizer.js'],
					'../html/assets/css/static.css': [
						'vendor/ivaynberg/select2/select2.css',
						'assets/static/*.css'
					],
				}
			}
		},
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'assets/imgs/',
					src: ['**/*.{png,jpg,gif,svg}'],
					dest: 'public/assets/imgs/'
				}, {
					expand: true,
					cwd: 'assets/imgs/',
					src: ['**/*.{png,jpg,gif,svg}'],
					dest: '../html/assets/imgs/'
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
				files: ['assets/imgs/*.{png,jpg,gif,svg}'],
				tasks: ['imagemin'],
				options: {
					spawn: false,
				}
			},
			copy: {
				files: ['assets/data/*.json'],
				tasks: ['copy'],
				options: {
					spawn: false
				}
			}
		},
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'public/assets/css/master.css': 'assets/sass/master.scss',
					'../html/assets/css/master.css': 'assets/sass/master.scss'
				}
			}
		}
    });
	grunt.loadNpmTasks('grunt-webdav-sync');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['concat', 'copy', 'imagemin', 'sass', 'watch']);

};
