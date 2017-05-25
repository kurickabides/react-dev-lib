/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/** Restful Movie API routes */
import express from 'express';
import  {default as MovieService}  from '../api/movies';
import {default as Logger} from '../../server/core/logger';

let router = express.Router();
let movieService = new MovieService();
let logger = new Logger();


// GET MOVIES
router.get('/', movieService.get);

// ADD
router.post('/', movieService.save);

//EDIT MOVIE
router.put('/', movieService.save);

//get movie details
router.get('/:id', movieService.getbyId);


// DELETE MOVIE
router.delete('/:id', movieService.remove);




export default router;
