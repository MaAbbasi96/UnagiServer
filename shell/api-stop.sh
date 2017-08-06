#!/bin/bash

#consts
APP_NAME=UnagiAPI
MONGODB_SERVICE=mongod.service
NGINX_SERVICE=nginx.service

#get api server current status
pm2 describe $APP_NAME &>/dev/null 
APP_RUNNING=$?

#check if api is in list , then stops api
if [ "${APP_RUNNING}" = "0" ]
then
    pm2 stop ${APP_NAME}
fi

#stops nginx and mongodb services
systemctl stop ${MONGODB_SERVICE}
systemctl stop ${NGINX_SERVICE}