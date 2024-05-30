import express from 'express';
import asyncHandler from '../../helpers/asyncHandler';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const d = new Date();
    let filename = d.toString() + '.txt';
    filename = path.resolve(path.dirname(__filename) , filename);
    fs.writeFile(filename, JSON.stringify(req.body), (err)=> {
      res.send('success');
    });
  })
);



export default router;