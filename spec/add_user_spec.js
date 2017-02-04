var frisby = require('frisby');

var baseURL = "https://chorescore-pljhll.c9users.io/api/users"; // see issue #15

frisby.create('Add user')
  .post(baseURL, {
    username: "test-username",
    password: "test-password",
  })
  .inspectJSON()
  .expectStatus(200)
  .expectHeaderContains("content-type", "application/json")
  .expectJSON({ success: 'true' })
.toss();