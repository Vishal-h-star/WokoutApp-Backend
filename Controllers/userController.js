const { userModel } = require("../Models");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
   try{
      const user  =  await userModel.login(email, password)
      const token = createToken(user._id)
      res.status(200).json({email, token})
   }catch(err){
       res.status(400).json({ error: err.message });
   }
};

// signup user

exports.signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.signup(email, password);

    //     create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
