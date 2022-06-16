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
		type: ObjectID,
		ref: 'TeamMatch'
	},
	R2: {
		type: ObjectID,
		ref: 'TeamMatch'
	},
	R3: {
		type: ObjectID,
		ref: 'TeamMatch'
	},
	B1: {
		type: ObjectID,
		ref: 'TeamMatch'
	},
	B2: {
		type: ObjectID,
		ref: 'TeamMatch'
	},
	B3: {
		type: ObjectID,
		ref: 'TeamMatch'
	}
})

//Create a model from the schema and export it.
export default mongoose.model('Match', matchSchema);