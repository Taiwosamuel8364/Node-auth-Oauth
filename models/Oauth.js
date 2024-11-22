const mongoose = require('mongoose');

const oauthuserSchema = new mongoose.Schema({
  username: {
    type: String
  },
  googleId: {
    type: String
  }
});

const user = mongoose.model('Oauthuser', oauthuserSchema);
module.exports = user;