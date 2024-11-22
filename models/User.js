const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema ({
  email: {
    type: String,
    required: [true, 'Please enter a password'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters']
  },
});

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = bcrypt.compare(password, user.password);
    if (auth) {
      return user
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
}

userSchema.pre('save', async function(next) {
  const Salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, Salt);
  next();
});

const User = mongoose.model('user', userSchema);
module.exports = User;