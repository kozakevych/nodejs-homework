import childProcess from "child_process";
import fs from "fs";
import os from "os";

const MAC_OS_TYPE = "Darwin";
const LINUX_OS_TYPE = "Linux";
const WINDOWS_OS_TYPE = "Windows_NT";

const MOST_INTENSIVE_PROCESS_UNIX = "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1";
const MOST_INTENSIVE_PROCESS_WIN = `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`;

const writeLogRate = 60000;
let refreshRate = 100; // Ten times per second

let currentProcessInfo;
let processCommand;

const setSystemProcessCommand = () => {
  switch (os.type()) {
    case MAC_OS_TYPE:
    case LINUX_OS_TYPE:
      processCommand = MOST_INTENSIVE_PROCESS_UNIX;
      break;
  
    case WINDOWS_OS_TYPE:
      processCommand = MOST_INTENSIVE_PROCESS_WIN;

      // My windows machine was very slow when executing process command above
      // It was so much better with refresh rate 1000 ¯\_(ツ)_/¯
      refreshRate = 1000;
      break;

    default:
      throw new Error('System OS is not supported!');
  }
}

const execProcess = (command) => {
  childProcess.exec(command, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    currentProcessInfo = stdout;

    console.clear();
    console.log(currentProcessInfo);
  });
}

const writeLog = () => {
  const fileName = "activityMonitor.log";
  const logText = `${Date.now()} : ${currentProcessInfo}`;

  fs.appendFile(fileName, logText, (err) => {
    if (err) throw err;
  });
}

setSystemProcessCommand();

// Write Log Interval
setInterval(() => {
  writeLog();
}, writeLogRate);

// Activity Interval
setInterval(() => {
  execProcess(processCommand);
}, refreshRate);
