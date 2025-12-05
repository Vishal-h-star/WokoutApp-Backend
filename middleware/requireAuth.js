const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");

const requireAuth =  async (req, res, next) => {
  const { authorization} = req.headers;

  if (!authorization) {
    res.status(401).json({ error: "Authentication token required" });
  }
//   Bearer 692444cfe1414f638459fd4b
//   console.log(authorization)

  const token = authorization.split(" ")[1];

  try {
    //    jwt.verify return the entire token
    //         {
    //   "_id": "12345",
    //   "role": "user",
    //   "iat": 17134563,
    //   "exp": 17134593
    // }
    //  here i  destructuring id directily other wise  const user._id
    const { _id } =  jwt.verify(token, process.env.SECRET);
     
    // req = request object
    // req.user = a custom property I add to store the logged-in user.
    //  can be write as   cosnt user =  userModel.findOne(_id).select("_id") then  req.user= user 
    req.user = await userModel.findOne({_id}).select("_id");
     next()
  } catch (err) {
     console.log(err)
     res.status(401).json( { error: "Request is not authorised"})
  }
};


module.exports = requireAuth ;