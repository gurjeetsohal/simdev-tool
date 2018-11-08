@echo off
set abs-path-to-sim5service=%1
set repo[0]=%abs-path-to-sim5service%\app\Comps
set repo[1]=%abs-path-to-sim5service%\app\Controls
set repo[2]=%abs-path-to-sim5service%\app\Comps2016
set repo[3]=%abs-path-to-sim5service%\app\Controls2016
set repo[5]=%abs-path-to-sim5service%\app\Comps2019
set repo[6]=%abs-path-to-sim5service%\app\Controls2019
set repo[7]=%abs-path-to-sim5service%
set repo[8]=%abs-path-to-sim5service%\XMLs
set repo[9]=%abs-path-to-sim5service%\XMLs\TaskXmls2016
set repo[10]=D:\SIM_GIT\trunk\Modules

set root=%repo[7]%

for /F "tokens=2 delims==" %%s in ('set repo[') do (
    
    echo.
    echo.
    echo Navigating to dir %%s
    
    cd /d %%s

    git pull

)

cd %repo[7]%

pause