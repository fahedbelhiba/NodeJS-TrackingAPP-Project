import jwt from 'jsonwebtoken';
import fs from 'fs';

const publicKey = fs.readFileSync("public_key.pem", "utf8");

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token not provided" });
  }

  jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, decodedToken) => {
    if (err) {
      console.error('JWT Verification Error:', err);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    
    req.userId = decodedToken._id;

    next();
  });
};

export default isAuthenticated;
