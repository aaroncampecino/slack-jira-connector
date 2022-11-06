const model = require("./db");

const findUser = async (id) => {
  try {
    console.log(`id ${id}`);
    const user = await model.User.findById(id);
    // // return first user we find
    console.log(user);
    if (user !== undefined) {
      return user;
    }
  } catch (error) {
    console.error(error);
  }
  return false;
};

module.exports = {
  findUser,
};
