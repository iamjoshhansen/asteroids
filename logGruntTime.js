var fs = require('fs');

module.exports = function(stats, done) {

	var totalTimeAndTasks = [
			stats.reduce(function(acc, stat) {
				return acc + stat[1]
			}, 0) / 1000,
			's -- ',
			stats.length,
			' tasks ',
			'(' + Date.now() + ')',
			'\n'
		].join('');


	var counter = 0;
	fs.appendFile('grunt-time-log.txt', totalTimeAndTasks, function(err) {
		counter++;
		if (err) {
			console.log('writing grunt time log failed');
		}

		if (counter === 2) {
			done();
		}
	});
	
	/*
	var completeData = [
		'# ' + totalTimeAndTasks,
		stats.map(function(stat) {
			return '+ ' + stat.join(' -- ') + 'ms\n';
		}).join(''),
		'\n\n'
	].join('');
	
	fs.appendFile('grunt-time-log-full.md', completeData, function(err) {
		counter++;
		if (err) console.log('writing grunt time log full failed');
		if (counter === 2) done();
	});
	*/
};
