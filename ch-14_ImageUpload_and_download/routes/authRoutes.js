const express = require('express');
const authRoutes = express.Router();
const authControllers = require('../controller/authControllers');


authRoutes.get('/signup', authControllers.getSignUp);
authRoutes.post('/signup', authControllers.postSignUp);
authRoutes.get('/login', authControllers.getLogin);
authRoutes.post('/login', authControllers.postLogin);
authRoutes.post('/logout', authControllers.postLogout);
module.exports = authRoutes;
