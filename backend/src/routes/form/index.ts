import express from 'express';
import formConfig from './formConfig';
import formsubmit from './formSubmit';

const router = express.Router();

router.use('/formConfig', formConfig);
router.use('/formSubmit', formsubmit);

export default router;
