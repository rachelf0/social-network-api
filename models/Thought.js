const { Schema, model, Types } = require('mongoose');
// import moment for the date to read correctly
const moment = require('moment');

const ReactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
            trim: true
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            defualt: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

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

// create the Thought model using the ThoughtSchema
const Thought = model('ThoughtSchema')

// export the Thought model
module.exports = Thought;