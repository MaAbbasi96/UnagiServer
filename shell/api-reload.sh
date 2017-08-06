#!/bin/bash

#consts
APP_NAME=UnagiAPI

#get api server current status
pm2 describe $APP_NAME &>/dev/null 
APP_RUNNING=$?

#check if api is in list , then stops api
if [ "${APP_RUNNING}" = "0" ]
then
    echo "Reloading API ..."
    pm2 reload ${APP_NAME}
else
    echo "Couldnt find API proccess in pm2 list"
fi