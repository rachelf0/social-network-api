const { Schema, model } = require('mongoose');
const moment = require('moment');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique:true,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
        
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

// get total count of comments and replies on retrieval
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// create the Pizza model using the PizzaSchema
const User = model('User', UserSchema);

// export the Pizza model
module.exports = User;