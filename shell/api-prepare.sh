#!/bin/bash

MONGODB_SERVICE=mongod.service
NGINX_SERVICE=nginx.service

if [ "`systemctl is-active $MONGODB_SERVICE`" != "active" ]
then
    echo "Starting MongoDB service"
    systemctl start $MONGODB_SERVICE
else
    echo "MongoDB service is already running"
fi

if [ "`systemctl is-active $NGINX_SERVICE`" != "active" ]
then
    echo "Starting NginX service"
    systemctl start $NGINX_SERVICE
else
    echo "NginX service is already running"
fi
