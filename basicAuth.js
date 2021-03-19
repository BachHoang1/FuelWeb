const { ROLE, users } = require('./data')

function authUser(req, res, next) {
  if(!req.session.userId){
    return res.redirect(303, "/login");
  }
  // else{ 
    next()
  // }
}

function authRole(role) {
  console.log("call middleware authRole")
  return (req, res, next) => {
    console.log("This link need authRole:" + role.Name)
    console.log("User session Role:" + req.session.userRole)
    if (req.session.userRole !== role.Name) {
      // res.status(401)
      // return res.send('Not allowed')
      console.log("need to be redirected to: "+req.session.userPath)
      return res.redirect(303, req.session.userPath);
    }
    // else{
      next()
    // }
  }
}