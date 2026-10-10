@echo off
setlocal
where mvn.cmd >nul 2>&1
if %ERRORLEVEL% EQU 0 (
  call mvn.cmd %*
  exit /b %ERRORLEVEL%
)
echo Maven is not available on PATH.
echo Please install Maven 3.9.16 or use the Maven Wrapper bootstrap from a Maven-enabled environment.
exit /b 1
