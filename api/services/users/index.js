import User from "../../../models/user/index.js";

 const addUser = async (email, hashedPassword) => {
  const user = new User({ email, password: hashedPassword });
  return await user.save();
};



 const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};


export { addUser, findUserByEmail, deleteUser };