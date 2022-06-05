const express = require('express');
const {registerUser, loginUser, logoutUser} = require('./user.controller');

const UserRoutes = express.Router();


UserRoutes.post('/register', registerUser);
UserRoutes.post('/login', loginUser);
UserRoutes.post('/logout', logoutUser);




module.exports = UserRoutes;