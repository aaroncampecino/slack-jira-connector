const mongoose = require("mongoose");

const channelsSchema = mongoose.Schema(
  {
    _id: String,
    channels: [String],
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const Channel = mongoose.model("Channel", channelsSchema);

module.exports = {
  Channel,
};
