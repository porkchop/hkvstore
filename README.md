The response to these challenges can be implemented in your strongest programming language (with a preference for Python 2.7, if possible).  We ask that you either send the results back via email or post them on a public repo which can be accessed by our team for evaluation.

2. Write a small web service that takes in JSON on a POST request and returns the SHA256 hash of that data.  Then stores the JSON data and returns it on a GET request to /<hash>


```
$ npm install
```

```
$ npm start
```

```
$ curl -H "Content-Type: application/json" -X POST -d '{"test":"data"}' http://localhost:3000/ | jq .
```

```
$ curl -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3000/e1d7c49f3a04e1ec1a5b150ec68041c903cd75fda52aa1239fd586439ef1154b | jq .
```
