#!/bin/bash

#consts
APP_NAME=UnagiAPI
API_PATH=/var/wwww/Server
MONGODB_SERVICE=mongod.service
NGINX_SERVICE=nginx.service

#get api server current status
pm2 describe $APP_NAME &>/dev/null 
APP_RUNNING=$?

echo
echo "********************************************"

echo "Stopping API..."
pm2 stop ${APP_NAME}

cd ${API_PATH}
if git pull
then
    echo "checking and installing new dependencies..."
    if npm install
    then 
        echo "Starting API..."
        pm2 start ${APP_NAME}
    else
        echo "an error occurred while checking and installing new deps (npm)."
    fi
else
    echo "an error occurred while pulling from git."
fi


echo "********************************************"
echo