const LocalStrategy = require('passport-local').Strategy;
const { default: mongoose } = require('mongoose');
const User = require("../../models/User")

module.exports = new LocalStrategy(
    {usernameField: 'email', session: false},
    function(email, password, done) {
      User.findOne({ email: email }, async function (err, user) {
        if (err) { return done(err) }
       
        if (!user) { return done(null, false, 'Нет такого пользователя') }
       
        if (!await user.checkPassword(password)) { return done(null, false, 'Неверный пароль') }
   
        return done(null, user);
        
        done(null, false, 'Стратегия подключена, но еще не настроена');
      });
    },
);
