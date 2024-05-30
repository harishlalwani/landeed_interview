import express from 'express';
import fs from 'fs';
import path from 'path';
import asyncHandler from '../../helpers/asyncHandler';

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    let filename = path.resolve(path.dirname(__filename) , 'form.json');
    //console.log('dirnam', filename);
    fs.readFile(filename, 'utf8', (err, data) => {
      if(err) {
        console.log(err);
        res.send( "error Reading Config file" );
      }
      else {
        console.log(data);
        res.send( data );
      }
    });
    
    
  })
);



export default router;
