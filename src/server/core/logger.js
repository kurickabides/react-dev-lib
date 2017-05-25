import fs from 'fs';
import path from 'path';
import rfs from 'rotating-file-stream';
import morgan from 'morgan';
import winston from 'winston';
import moment from 'moment';
let s_logger = Symbol('winston');
let instance = null;
//If cfg is not set then these values will be used
//you can add other options if you would like to expand what can be configured
//@todo add a way to email error logs and custom log type
let defaultcfg = {
    consoleLevel: 'info',
    fileLevel: 'error'
}
//module service with singleton pattern
export default class loggerService{
  get timeStamp(){ return this._timeStamp}
   /** @cfg = {consoleLevel: 'info', fileLevel = 'error'}
      pass in a config object to change the level of the server only set this once in the system
      It will apply to all loggers on the entire server the last one in wins here */
  constructor(){
    if (!instance)
    {

      //Setup Logger
       // to test whether we have singleton or not
      this._timeStamp = this.time;
      let time = ()=>{ return moment().format('YYYY-MM-DD h:mm:ss a')}

      //set up custom token for req:id and log with Morgan
      morgan.token('id', function getId (req) {
               return req.id
         })
      //Make Morgan Write to a file
      var logDirectory = path.join(__dirname, 'log')

      // ensure log directory exists
      fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

       // create a rotating write stream this keep our log files from getting to big
       var accessLogStream = rfs('request.log', {
        interval: '1d', // rotate daily
       path: logDirectory
      })

      //set up winston
      /** @todo: remove config options if they are being Set
          using the defaultcfg let updateConfig handle this. */
      this[s_logger] = new winston.Logger({
          transports: [
              new winston.transports.File({
                  level: defaultcfg.fileLevel,
                  filename: 'app.log',
                  handleExceptions: true,
                  json: true,
                  maxsize: 5242880, //5MB
                  maxFiles: 5,
                  colorize: false,
                  timestamp: true,
                  prettyprint:true
              }),
              new winston.transports.Console({
                  level: defaultcfg.consoleLevel,
                  handleExceptions: true,
                  json: false,
                  colorize: true
              })
          ],
          exitOnError: false
      });
      /** @todo change this to loop through cfg properties and only assign if properties match  */
      let updateConfig= (cfg) =>
      {
        defaultcfg = cfg;
        this[s_logger].transports.console.level = cfg.consoleLevel ;
        this[s_logger].transports.file.level = cfg.fileLevel;

      }


      let logger ={
        timeStamp: this._timeStamp,
        time: time,
        log:(message,category = 'info')=>{ this[s_logger].log(category,message)},
        cfg: updateConfig,
        dev: morgan(':id :method :status :url :response-time[3]',{stream: accessLogStream})
      }


      instance = logger;
    }





    return instance;
  }


}
