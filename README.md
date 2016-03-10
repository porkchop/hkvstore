# hkvstore

A small Node.js web service that takes in JSON on a POST request and returns the SHA256 hash of that data.  Then stores the JSON data and returns it on a GET request to /<hash>

## Install

```
$ npm install
```

## Run

cd into the repo and run the app:

```
$ npm start
```

In another terminal POST some json:

```
$ curl -H "Content-Type: application/json" -X POST -d '{"test":"data"}' http://localhost:3000/ | jq .
```

And query for the data with the hash returned:

```
$ curl -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3000/e1d7c49f3a04e1ec1a5b150ec68041c903cd75fda52aa1239fd586439ef1154b | jq .
```

## Tests

```
$ npm test
```
