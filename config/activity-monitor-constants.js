// Module 2. Standart Library
// Constants for activity monitor task

export const MAC_OS_TYPE = "Darwin";
export const LINUX_OS_TYPE = "Linux";
export const WINDOWS_OS_TYPE = "Windows_NT";

export const MOST_INTENSIVE_PROCESS_UNIX = "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1";
export const MOST_INTENSIVE_PROCESS_WIN = `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`;

export const ACTIVITY_LOG_FILE_NAME = "activityMonitor.log";
