var frisby = require('frisby');

var baseURL = "https://chorescore-pljhll.c9users.io/api/chores"; // see issue #15

frisby.create('Add chore')
  .post(baseURL, {
    name: "test-chore",
    who: "test-person",
    when: Date.now()
  })
  .inspectJSON()
  .expectStatus(200)
  .expectHeaderContains("content-type", "application/json")
  .expectJSON({ success: 'true' })
.toss();