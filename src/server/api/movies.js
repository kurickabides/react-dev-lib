import {default as Database} from  "../../server/data/db";
import {default as Logger} from '../../server/core/logger';
import mongodb from 'mongodb';
let logger = new Logger();

export default class MovieService
{
  constructor(){


  logger.log('Starting Movie AP', 'debug')
// ADD OR EDIT MOVIE


// GET MOVIES
let getMovieCollection = (req, res, next) => {
    Database.db.collection('movies').find().toArray().then((movies) => {
        res.json(movies);
    }).
    catch((error) => {
         logger.log(`Mongo has a problem: ${error}`, 'debug')
           next(error);
    });
};

let save = (req, res, next) => {
    let movie = req.body;
    if(movie._id)movie._id = new mongodb.ObjectID(movie._id.trim());
    Database.db.collection('movies').save(req.body).then((result) => {
    if(result === null)
    {
      logger.log(`Errror on Save adding Movie to the database`, 'debug')
      next(`Result was null`);
    }
    else {
        res.json(result);

    }
    }).
    catch((error) => {
     logger.log(`Mongo has a problem: ${error}`, 'debug')
       next(error);
});
}

// DELETE MOVIE
let remove = (req, res, next) => {
    let movieId = new mongodb.ObjectID(req.params['id'].trim());
    Database.db.collection('movies').remove({ _id: movieId }).then(() => {
        res.sendStatus(200);
    }).
      catch((error) => {
     logger.log(`Mongo has a problem: ${error}`, 'debug')
       next(error);
})
};
let getMoviebyId = (req, res, next) =>
  {
    let movieId = new mongodb.ObjectID(req.params['id']);
    Database.db.collection('movies').findOne(movieId).then((result)=> {
        logger.log(`the movie is ${JSON.stringify(result)}`, 'debug')
        if(result === null)
        {
          logger.log(`No record Found`, 'debug')
          next(`Result was null`);
        }
        else {
          res.json(result);
        }
        }).
         catch((error) => {
         logger.log(`Mongo has a problem: ${error}`, 'debug')
           next(error);
         });
};
let service = {
    get: getMovieCollection,
    getbyId: getMoviebyId,
    save: save,
    remove: remove
};
//return service
return service;
}

}
