import jwt from 'jsonwebtoken';
export default function (req, res, next) {
  const accessToken = req.headers['x-access-token'];
  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, 'SECRET_KEY');
      req.payloadToken = decoded;
      next();
    } catch (error) {
      console.log(error);
      return res.json({
        message: 'Invalid accessToken'
      });
    }
  } else {
    return res.json({
      message: 'AccessToken not found'
    })
  }
}