import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectID = Schema.Types.ObjectId;

//This schema is the layout for the objects stored in the database.
//It's basically a blueprint
const matchSchema = new Schema({
	matchNumber: {
		type: Number,
		required: [true, 'Match must have number'],
		min: [1, 'Match number must be positive']
	},
	R1: {
		teamMatch: {
			type: ObjectID,
			ref: 'TeamMatch'
		},
		team: {
			type: ObjectID,
			ref: 'Team'
		}
	},
	R2: {
		teamMatch: {
			type: ObjectID,
			ref: 'TeamMatch'
		},
		team: {
			type: ObjectID,
			ref: 'Team'
		}
	},
	R3: {
		teamMatch: {
			type: ObjectID,
			ref: 'TeamMatch'
		},
		team: {
			type: ObjectID,
			ref: 'Team'
		}
	},
	B1: {
		teamMatch: {
			type: ObjectID,
			ref: 'TeamMatch'
		},
		team: {
			type: ObjectID,
			ref: 'Team'
		}
	},
	B2: {
		teamMatch: {
			type: ObjectID,
			ref: 'TeamMatch'
		},
		team: {
			type: ObjectID,
			ref: 'Team'
		}
	},
	B3: {
		teamMatch: {
			type: ObjectID,
			ref: 'TeamMatch'
		},
		team: {
			type: ObjectID,
			ref: 'Team'
		}
	},
})

//Create a model from the schema and export it.
export default mongoose.model('Match', matchSchema);