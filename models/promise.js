(function () {
	var i = 0;
	function run() {
		return new Promise((resolve, reject) => {
			if( i % 10000 === 0) console.log(i);
			i++;

			setTimeout(function() {
				if(i === 10000 * 10) return resolve();
				resolve(run());
			}, 0);
		}).then(function(){});
	}
	run();
})();