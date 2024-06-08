import jwt from 'jsonwebtoken';
import fs from 'fs';

const publicKey = fs.readFileSync("public_key.pem", "utf8");



  
const isAuthenticated = (req, res, next) => {
      
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, publicKey, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized"});
    }
    
    req.userId = decodedToken._id;

    // Token is valid, proceed to the next middleware
    next();
  });
};

export default isAuthenticated;
