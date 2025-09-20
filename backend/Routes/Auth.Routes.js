import express from 'express';
import {LoginHandler,RegisterHandler} from '../Controllers/Auth.Controller.js';
const router = express.Router();
router.post('/register',RegisterHandler);
router.post('/login',LoginHandler);
export default router;