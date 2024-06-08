import User from "../../../models/user/index.js";

 const addUser = async (email, hashedPassword, role) => {
  const user = new User({ email, password: hashedPassword, role: role});
  return await user.save();
};



 const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};
const findAllUsers = async () => {
  return await User.find();
};


export { addUser, findUserByEmail, deleteUser, findAllUsers };