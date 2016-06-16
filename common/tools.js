var moment = require('moment');
var bcrypt = require('bcryptjs');

moment.locale('zh-cn');

exports.formatDate = function (date, friendly) {
	date = moment(date);

	if(friendly) {
		return date.fromNow();
	} else {
		return date.format('YYYY-MM-DD HH:mm');
	}
};

exports.bhash = function (str, callback) {
  bcrypt.hash(str, 10, callback);
};

exports.bcompare = function (str, hash, callback) {
  bcrypt.compare(str, hash, callback);
};