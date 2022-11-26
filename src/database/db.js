const mongoose = require("mongoose");
require("dotenv").config();

const uri =
  "mongodb+srv://" +
  process.env.DB_USERNAME +
  ":" +
  process.env.DB_PASSWORD +
  "@cluster0.kmgizju.mongodb.net/" +
  process.env.DB_NAME +
  "?retryWrites=true&w=majority";

// console.log(uri);

const connect = async function () {
  // Connect to MongoDB
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
};

const usersSchema = mongoose.Schema(
  {
    _id: String,
    team: { id: String, name: String },
    enterprise: { id: String, name: String },
    user: {
      token: String,
      scopes: [String],
      id: String,
      refreshToken: String,
      expiresAt: Number,
    },
    tokenType: String,
    isEnterpriseInstall: Boolean,
    appId: String,
    authVersion: String,
    bot: {
      scopes: [String],
      token: String,
      userId: String,
      id: String,
      refreshToken: String,
      expiresAt: Number,
    },
    incomingWebhook: {
      url: String,
      channel: String,
      channelId: String,
      configurationUrl: String,
    },
  },
  { _id: false }
);

const channelsSchema = mongoose.Schema({
  _id: String, //team id of client workspace
  fromChannelId: String, //channel id of admin workspace
  toChannelId: String, //channel id of client workspace
});

const User = mongoose.model("User", usersSchema);
const Channel = mongoose.model("Channel", channelsSchema);

module.exports = {
  User,
  Channel,
  connect,
};
