"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: Schema.Types.String},
    sounds: {
        type: Schema.Types.Map,
        of: Schema.Types.String
    }
});

UserSchema.statics.create = function(obj) {
    const User = mongoose.model("User", UserSchema);
    const user = new User();
    user.username = obj.username;
    user.sounds = obj.sounds;
    return user;
}

module.exports = mongoose.model("User", UserSchema);
// module.exports = UserSchema;
