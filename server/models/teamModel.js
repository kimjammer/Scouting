import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectID = Schema.Types.ObjectId;

//This schema is the layout for the objects stored in the database.
//It's basically a blueprint
const teamSchema = new Schema({
	teamNumber: {
		type: Number,
		required: [true, 'All teams need a number'],
		min: [1, 'Team numbers must be positive'],
	},
	matches : [
		{
			type: ObjectID,
			ref: 'TeamMatch'
		}
	]
})

//Create a model from the schema and export it.
export default mongoose.model('Team', teamSchema);