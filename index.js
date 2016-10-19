const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const helmet = require('helmet');
const compression = require('compression');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);
const routes = require('./server/routes/index');

const app = express();

dotenv.load();
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

app.use(helmet());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view options', { layout: false });
app.engine('html', require('ejs').renderFile);

app.set('views', `${__dirname}/public/views`);
app.set('view engine', 'ejs');

if (app.get('env') === 'production') {
	console.log('Server funcionando no modo de produção.');
	app.use(morgan('tiny'));
	app.use(compression());
} else {
	console.log('Server funcionando no modo de desenvolvimento.');
	app.use(morgan('dev'));
}

// passport
const connection = mongoose.createConnection(process.env.MONGODB_URI);
app.use(session({
	secret: process.env.SESSION_SECRET,
	name: 'coopercomics',
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({ mongooseConnection: connection }),
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// pass passport auth for configuration
// require('./server/auth/passport')(passport);

// pass routes
routes(app, __dirname, passport);

const port = process.env.PORT || 3000;
const listener = app.listen(port, () => {
	console.log(`Ouvindo na porta ${listener.address().port}`);
});
