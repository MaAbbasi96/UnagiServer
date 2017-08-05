export default function verifyType(req, res, next) {
  if (!req.headers.type)
    return res.status(401).send("please specify request type");
  if (!req.body.username)
    return res.status(400).send("You must send the username and the password");
  req.mydata = {};
  if (req.headers.type == "password") return verifyPass(req, res, next);
  else if (req.headers.type == "token") return verifyToken(req, res, next);
  else return res.status(400).send("please specify a correct request type");
  return next();
}

function verifyToken(req, res, next) {
  if (!req.headers.refreshtoken || req.headers.refreshtoken === "")
    return res.status(400).send("You must send the refreshtoken");
  req.mydata.obj = { refreshtoken: req.headers.refreshtoken };
  req.mydata.msg = "refresh token is wrong";
  return next();
}

function verifyPass(req, res, next) {
  if (!req.body.password)
    return res.status(400).send("You must send the username and the password");
  req.mydata.obj = { password: req.body.password };
  req.mydata.msg = "The username or password don't match";
  return next();
}
