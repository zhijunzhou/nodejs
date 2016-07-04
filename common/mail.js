var mailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var util          = require('util');
var mail_opts = {
    host: 'smtp.163.com',
    port: 25,
    auth: {
      user: 'dongfeng192@163.com',
      pass: ''
    }
  };
var transporter = mailer.createTransport(smtpTransport(mail_opts));

var sendMail = function (data) {
	transporter.sendMail(data, function (err) {
		if(err) {
			console.log(err);
		}
		console.log('发送邮件成功！');
	});
};

exports.sendMail = sendMail;

exports.sendActiveMail = function (who, token, name) {
	  var from = util.format('%s <%s>', 'Time Note', mail_opts.auth.user);
	  var to = who;
	  var subject = "Time Note 账号激活";
	  var html = "<p>Test send email!</p>";

	  exports.sendMail({
	  	from: from,
	  	to: to,
	  	subject: subject,
	  	html: html
	  });
};