import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectID = Schema.Types.ObjectId;
const Mixed = Schema.Types.Mixed;

//A schema is the layout for the objects stored in the database.
//It's basically a blueprint
const teamMatchSchema = new Schema({
	team: {
		type: ObjectID,
		ref: 'Team'
	},
	match: {
		type: ObjectID,
		ref: 'Match'
	},
	position: {
		type: String,
		enum: ['R1', 'R2', 'R3', 'B1', 'B2', 'B3'],
	},
	//Since the exact layout of the data collected changes every year with every new game, the type is "Mixed", which
	//allows any kind of data, including objects. Read more at: https://mongoosejs.com/docs/schematypes.html#mixed
	data: {
		type: Mixed
	}
})

//Create a model from the schema and export it.
export default mongoose.model('TeamMatch', teamMatchSchema);