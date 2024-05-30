import express from 'express';
import form from './form';


const router = express.Router();

router.use('/form', form);

export default router;
