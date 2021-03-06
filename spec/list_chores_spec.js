var frisby = require('frisby');

var baseURL = "https://chorescore-pljhll.c9users.io/api/chores"; // see issue #15

frisby.create('List chores')
  .get(baseURL)
  .expectStatus(200)
  .expectHeaderContains("content-type", "application/json")
  .expectJSONTypes('*', {
    name: String,
    who: String,
    when: Number
  })
.toss();
