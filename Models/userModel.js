const mongosse = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Shema = mongosse.Schema;

const userSchema = new Shema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method
userSchema.statics.signup = async function (email, password) {
  const exists = await this.findOne({ email });

  if (!email || !password) {
    throw Error("All fields are required ");
  }

  if (exists) {
    throw Error("Email is already exists");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

// static login method

userSchema.statics.login = async function (email, password) {
  
  if (!email || !password) {
    throw Error("All fields are required ");
  }


  const user = await this.findOne({ email });

    if (!user) {
        throw Error("Incorrect Email");
    }

    const match =  await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect password !')
    }

    return user;


};

module.exports = mongosse.model("User", userSchema);
