const {format} = require('date-fns');
const {v4:uuid} = require('uuid');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const DEFAULT_DIRECTORY = 'logs'
const DEFAULT_FILENAME = 'customLogs.txt'

//an event entry should look like this
//11/02/2023 00:55:23 dfwf-dfhbhf-sdjhbsdh-sddhvbhsdb log message

/**
 * 
 * @param {*} message input message
 * 
 */
const logEvent = (message, fileName=DEFAULT_FILENAME) => {
  let finalLogString = transformMessageToLog(message);
  logMessageToFile(finalLogString, fileName);
}

/**
 * 
 * @param {*} message message which needed to be logged as event
 * @returns transforms given message into an log entry
 */
const transformMessageToLog = (message) => {
  const stringFormat = `dd/mm/yyyy\thh:mm:ss`
  const dateTimeEntry = format(new Date(), stringFormat);
  let eventLogEntry = `${dateTimeEntry}\t\t${uuid()}\t${message}\n`;
  return eventLogEntry;
}

/**
 * 
 * @param {*} message input message for log
 * @param {*} fileName file in which this log should be entered
 */
const logMessageToFile = async(message, fileName) => {
  //check if directory exists;
  try{
    const directoryExists = fs.existsSync(path.join(__dirname, DEFAULT_DIRECTORY));
    if(!directoryExists)await fsPromises.mkdir(path.join(__dirname, DEFAULT_DIRECTORY));
  
    //log message entry
    await fsPromises.appendFile(path.join(__dirname, DEFAULT_DIRECTORY, fileName), message);
  }catch(error){
    console.log(error);
  }

}

module.exports = logEvent;