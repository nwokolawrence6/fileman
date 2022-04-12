// noinspection JSUndefinedPropertyAssignment
module.exports = (allowedOrigins) => (req, res, next) => {
	const origin = req.headers.origin;
	if (allowedOrigins.includes(origin)) {
		res.setHeader('Access-Control-Allow-Origin', origin);
	}
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,authorization, Content-Type, Accept");
	res.header('Access-Control-Allow-Credentials', true);
	if (req.method === 'OPTIONS') {
		res.status(200).end();
	} else {
		next();
	}
};
