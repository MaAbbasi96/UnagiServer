# UNAGI-Rahnema-Team2-Server

A Location-Based Social Network

## How to run unit test

First you need to install mocha
```
sudo apt install mocha
```
After this you can test the server by using command bellow:
```
mocha /test/[testfile name]
```

## Built With

* [Node.js](https://nodejs.org/) - Javascript Framework

## List of API's

### Send Post

* Method: POST
* URL: /post
* Headers: <br />
    accesstoken: token given by server <br />
    location: Stringified JSON
* Body:<br />
    text: JSON
* Response:<br />
    {<br />
        text: String<br />
        location: JSON<br />
    }
* Status Success: 200
* Status Failed: 401

### Get Posts

* Method: GET
* URL: /post
* Headers: <br />
    accesstoken: token given by server<br />
    location: Stringified JSON
* Response:<br />
    a List of<br />
    {<br />
        text: String<br />
        location: JSON<br />
    }
* Status Success: 200
* Status Failed: 401

### Register

* Method: POST
* URL: /auth/register
* Body:<br />
    {<br />
        username: String<br />
        password: String<br />
    }
* Response:<br />
    {<br />
        accesstoken: Access token given by server<br />
        refreshtoken: Refresh token given by server<br />
    }
* Status Success: 201
* Status Failed: 400

### Login

* Method: POST
* URL: /auth/login
* Headers: <br />
    type: "token" or "password" <br />
    refreshtoken: Refresh token given by server(Optional) <br />
    accesstoken: Access token given by server(Optional) 
* Body:<br />
    {<br />
        username: String<br />
        password: String<br />
    }
* Response:<br />
    {<br />
        accesstoken: Access token given by server<br />
        refreshtoken: Refresh token given by server<br />
    }
* Status Success: 200
* Status Failed: 401

### Like

* Method: PUT
* URL: /post/:postId/like
* Headers:<br />
    accesstoken: Access token given by server<br />
    location: Stringified JSON
* Status Success: 200
* Status Failed: 401

### Unlike

* Method: DELETE
* URL: /post/:postId/like
* Headers:<br />
    accesstoken: Access token given by server<br />
    location: Stringified JSON
* Status Success: 200
* Status Failed: 401

### Get Hot Posts

* Method: GET
* URL: /post/hot
* Headers: <br />
    accesstoken: token given by server<br />
    location: Stringified JSON
* Response:<br />
    a List of<br />
    {<br />
        text: String<br />
        location: JSON<br />
    }
* Status Success: 200
* Status Failed: 401

### Send Reply

* Method: POST
* URL: /post/:postId/reply
* Headers:<br />
    location: Stringified JSON<br />
    accesstoken: Access token given by server
* Body:<br />
    text: JSON
* Response:<br />
    {<br />
        text: String<br />
        location: JSON<br />
    }
* Status Success: 200
* Status Failed: 401

### Get Replies

* Method: GET
* URL: /post/:postId
* Headers: <br />
    type: "token"<br />
    accesstoken: token given by server<br />
    location: Stringified JSON
* Response:<br />
    a List of<br />
    {<br />
        text: String<br />
        location: JSON<br />
    }
* Status Success: 200
* Status Failed: 401