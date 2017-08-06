#!/bin/bash

PM2_CFG=/var/www/Server/pm2cfg/UnagiAPI.json
APP_NAME=UnagiAPI
MONGODB_SERVICE=mongod.service
NGINX_SERVICE=nginx.service

pm2 describe $APP_NAME &>/dev/null 
APP_RUNNING=$?

MONGODB_STATUS="`systemctl is-active $MONGODB_SERVICE`"
NGINX_STATUS="`systemctl is-active $NGINX_SERVICE`"

if [ "${APP_RUNNING}" -ne 0 ];
then
    if [ $MONGODB_STATUS = "active" ] && [ $NGINX_STATUS = "active" ]
    then
        echo "NginX and MongoDB Running"
        echo "Starting Api"
        pm2 start $PM2_CFG
    else
        echo "Cant start api : "
        echo "Mongodb Status ${MONGODB_STATUS}"
        echo "NginX Status ${NGINX_STATUS}"
        echo "First run api-prepare"
    fi 
else
    echo "Api Is Already inside pm2 procces list try pm2 status"
fi
