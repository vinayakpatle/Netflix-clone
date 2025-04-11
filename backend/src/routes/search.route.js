import express from 'express';

const router=express.Router();
import { searchPerson,searchMovie,searchTv} from '../controllers/search.controller.js';

router.get('/person/:query',searchPerson)
router.get('/movie/:query',searchMovie)
router.get('/tv/:query',searchTv)

export default router;