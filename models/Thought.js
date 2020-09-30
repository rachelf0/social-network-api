const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: String,
            required: true
        },

        // use ReactionSchema to validate data
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virutals: true,
            getters: true
        },
        id: false
    }
);