const nodemailer = require('nodemailer');

function getTimeForMail() {
	const date = new Date();
	const dateString = `${date.getDate().toString()}/${(date.getMonth() + 1).toString()}/${date.getFullYear().toString()}`;
	const timeString = date.toLocaleTimeString();

	return `${timeString}, ${dateString}`;
}

module.exports = function email(app) {
	app.post('/contato/email', (req, res) => {
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true, // use SSL
			auth: {
				user: process.env.SMTP_EMAIL,
				pass: process.env.SMTP_PASSW,
			},
		});

		const time = getTimeForMail();
		const mailOptions = {
			from: `${req.body.emailname} &lt;${req.body.emailaddress}&gt;`,
			to: 'contato.coopercomics@gmail.com',
			subject: `${req.body.emailsubject}/${time}`,
			text: req.body.emailtext,
			html: `Email de ${req.body.emailname} &lt;${req.body.emailaddress}&gt;<br>Envio às ${time}<br><br><br>Corpo:<br>${req.body.emailtext}<br><hr>Esse é um e-mail gerado automaticamente.`,
			replyTo: req.body.emailaddress,
		};
		transporter.sendMail(mailOptions, (error) => {
			if (error) {
				console.log('Erro ocorreu ao enviar e-mail!');
				console.error(error.message);
				res.status(500).render('contato.ejs', {
					message: {
						text: error.message,
						type: 'error',
					},
				});
				return;
			}

			console.log(`${time}: Email enviado de ${req.body.emailname} corretamente!`);
			res.status(200).render('contato.ejs', {
				message: {
					text: 'E-mail enviado corretamente!',
					type: 'success',
				},
			});
		});
	});
};
