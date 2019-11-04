@echo off
Setlocal EnableDelayedExpansion

:: Title cua cai window
title Git Update

:: Print console
echo Start Update Git

set list="my-common-utils" "my-rn-select-language"

cd src/external-libs
IF ERRORLEVEL 1 (
    ECHO fail cd
   ) ELSE (
    echo !cd!
        git pull origin master
    cd ..
   )


