var fs = require('fs');

describe('File', function() {
	describe('#readFile()', function() {
		it.skip('should read test.ls without error', function(done) {
			fs.readFile('test/mocha.js', function(err) {
				if (err) throw err;
				done();
			});
		});
		it('should read test.js without error', function() {

		});
	});
});