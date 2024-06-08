import User from "../../models/user/index.js";

const isAdmin = (req, res, next) => {
    // Ensure req.userId is valid
    if (!req.userId) {
        return res.status(400).json({ message: 'User ID is missing in request' });
    }

    User.findOne({ _id: req.userId }).then(user => {
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access forbidden: Admins only' });
        }

        next();
    }).catch(err => {
        return res.status(500).json({ message: 'Server error while fetching user' });
    });
};

export default isAdmin;
