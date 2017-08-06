api-prepiare -- starts ngninx and mongodb service
api-start -- checks for ngninx and mongodb then starts the api from json thorugh pm2 
api-stop -- stops API, MongoDB and NginX
api-hardstop -- deletes API from pm2 list , stops ngninx and mongodb
api-reload -- reloads API only without delay