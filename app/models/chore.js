var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChoreSchema = new Schema({
    name: { type: String, required: true, default: "chore" },
    who: { type: String, required: true, default: "chorey" },
    when: { type: Number, required: true, default: 0 }
})

module.exports = mongoose.model('Chore', ChoreSchema);
