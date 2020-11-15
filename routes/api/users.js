const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../../models/User');
const keys = require('../../config/keys');

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  User.findOne({email: req.body.email })
    .then(user => {
      if (user){
        return res.status(400).json({email: 'Email already exists'});
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar
        });
        console.log(req.body);
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        });

      }
    })
    .catch(err => console.log(err));
});


// @route   POST api/users/login
// @desc    Login user / return JWT token
// @access  Public
router.post('/login', (req, res) => {

  User.findOne({email: req.body.email})
    .then(user => {
      if (!user){
        return res.status(404).json({email: 'User not found'});
      } else {
        bcrypt.compare(req.body.password, user.password)
          .then(isMatch => {
            if (isMatch){
              const payload = {
                id: user.id,
                name: user.name,
                avatar: user.avatar
              };

              //sign token
              jwt.sign(
                payload, 
                keys.secretOrKey,
                {expiresIn: 3600},
                (err, token) => {
                  return res.json({token: 'Bearer ' + token})
                }
                );

            } else {
              return res.status(400).json({password: 'Invalid password'});
            }
          });
      }
    })
    .catch(err => console.log(err));
})


module.exports = router;



////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////





// const express = require('express');
// const gravatar = require('gravatar');
// const bcrypt = require('bcryptjs');
// const jwt = require('passport-jwt');
// const router = express.Router(); //accessing router in express
// const keys = require('../../config/keys');
// const User = require('../../models/User');
// const { hash } = require('bcryptjs');
// const { ExtractJwt } = require('passport-jwt');

// //@route: POST api/users/register
// //@desc Registers User to Db
// //@access Public
// router.post('/register', (req, res) => {
//   //check to see if user already exists
//   User.findOne({ email: req.body.email }) //mathcing email from req body to the one in db
//   .then(user => {
//     if(user) {
//       return res.status(400).json({ email: 'email already exists'});
//     }
//     else{
//       const avatar = gravatar.url(req.body.email, {
//         s: '200',
//         r: 'pg',
//         d: 'mm'
//       });

//       const newUser = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//         avatar: avatar
//       });

//       //revisit bcryt
//       bcrypt.genSalt(10, (err, salt) => { 
//         bcrypt.hash(req.body.password, salt, (err, hash) => {
//           if(err) throw err;
//           newUser.password = hash;
//           newUser.save()
//             .then(user => res.json(user))
//             .catch(err => console.log(err));
//         })
//       });

     
//     }
//   })
//   .catch(err => console.log(err));
// }
// );

// //@route: POST api/users/login
// //@desc login User to Db
// //@access Public
// router.post('/login', (req, res) => {
//   User.findOne({ email: req.body.email })
//   .then(user => {
//     if(!user) 
//       return res.status(404).json({email: "User is not found"});
//     else
//       {
//         bcrypt.compare(req.body.password, user.password)
//           .then(isMatch => {
//             if(isMatch) {
//               const payLoad = {
//                 id: user.id,
//                 name: user.name,
//                 avatar: user.avatar
            
//               };

//               //sign token
//               jwt.sign(
//                 payLoad, 
//                 keys.secretOrKey,
//                 {expiresIn: 3600},
//                 (err, token) => {
//                   return res.json({token: 'Bearer ' + token})
//                 }
//                 )

//               // return res.json({msg: 'Success'});
//             } 
//             else
//              return res.status(404).json({ password: "Invalid Password" });
//           })
//           .catch(err => console.log(err));
//       }
//     }
//   )
//   .catch(err => console.log(err));
// });
  

// module.exports = router;

