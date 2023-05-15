const User = require("../../models/User");

module.exports = async function authenticate(strategy, email, displayName, done) {
  if(!email) {
    return done(null, false, "Не указан email");
  }

  try {
    const user = await User.findOne({ email: email });

    if(user) {
      return done(null, user);
    }
 
    const newUser = new User({ email: email, displayName: displayName });

    await newUser.save();

    return done(null, newUser);

  } catch(e){
    return done(e)
  }

  done(null, false, `функция аутентификации с помощью ${strategy} не настроена`);
};
