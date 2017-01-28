// This spec will test whether we successfully return a list of chores

var frisby = require('frisby');

// no idea how to dynamically acquire the URL, so having to hardcode for now
var baseURL = "https://chorescore-pljhll.c9users.io/api/chores";


frisby.create('List chores')
  .get(baseURL)
  .expectStatus(200)
  .expectHeaderContains("content-type", "application/json")
  .expectJSONTypes('*', {
    name: String
  })
.toss();

frisby.create('Add chore')
  .post(baseURL, {"name": "test-chore"})
  .expectStatus(200)
  .expectHeaderContains("content-type", "application/json")
  .expectJSON({
    message: "Chore created!"
  })
.toss();