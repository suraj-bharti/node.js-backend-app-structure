const jwt_key = process.env.JWT_KEY;
const jwt = require('jsonwebtoken');

// Validate key
module.exports = (req, res, next) => {
	try {
		const header = req.header('Authorization');
		const [type, token] = header.split(" ");
		if(type === 'Bearer' && typeof token !== 'undefined'){
			let payload = jwt.verify(token, jwt_key);
			next();
		}else{
			res.status(401).send('Access denied.');
		}
	} catch (err) {
		res.status(403).send('Invalid token.');
	}
}