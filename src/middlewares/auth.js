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
			res.status(401).send({code:402, 'error':'Invalid token'});
		}
	} catch (err) {
		res.status(401).send({code:403, 'error':'Access to this resource on the server is denied!'});
	}
}