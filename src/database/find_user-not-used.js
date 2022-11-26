const model = require("./db");

const findUser = async (id) => {
  try {
    // console.log(`id ${id}`);
    const user = await model.User.findById(id);
    // // return first user we find
    // console.log(user);
    if (user !== undefined) {
      return user;
    }
  } catch (error) {
    console.error(error);
  }
  return false;
};

const deleteUser = async (id) => {
  try {
    // console.log(`id ${id}`);
    await model.User.findByIdAndDelete(id);
    return true;
  } catch (error) {
    console.error(error);
  }
  return false;
};

module.exports = {
  findUser,
  deleteUser,
};
