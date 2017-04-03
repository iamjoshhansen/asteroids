module.exports = function (grunt) {

	var path = require('path'),
		config = require('load-grunt-config')(grunt, {
			config: {
				app: grunt.file.readJSON('config.json'),
				pkg: grunt.file.readJSON('package.json')
			},
			configPath: path.join(process.cwd(), 'grunt'),
			init: false
		});


	/*	Recording Task Times
	------------------------------------------*/
		require("time-grunt")(grunt, require('./logGruntTime'));


	/*	Grunt Tasks
	------------------------------------------*/
		grunt.registerTask('default', [
			'build'
		]);

		grunt.registerTask('build', "Generate .js", [
			'clean:build',
			'webpack:asteroids',
			'copy:static',
			'notify:build_complete'
		]);


	/*	Init Config
	------------------------------------------*/
		grunt.initConfig(config);

};
