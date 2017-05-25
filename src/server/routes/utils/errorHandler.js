/*eslint-disable no-console */
import {default as Logger} from '../../../server/core/logger';
let logger = new Logger();
//ES6 modules errorHandler
let errorHandler  = function() {
    let service = {
        init: init,
        logErrors: logErrors
    };
    return service;

    function init(err, req, res, next) {
      if (err.message) {
        res.render('pages/error', {
        message: err.message,
        error: err,
        stack: err.stack
      });
    }
    else {
      res.render('pages/error', {
      message: err,
      error: err
    });
    }
        next();
    }

    /* Our fall through error logger and errorHandler  */
    function logErrors(err, req, res, next) {
        res.status(err.statusCode || 500);
        logger.log(err.message,'error');
        if (err.stack) {
            logger.log(err.stack,'error');
        }
        next(err);
    }
};

export default errorHandler
