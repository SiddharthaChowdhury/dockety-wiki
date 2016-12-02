module.exports = {
	schema:{
		author: String,
		title: String,
		desc: String,
		path: String,
		oftype: {
			type:String,
			enum: ['dir', 'file']
		},
		body: String,
		comments:[
			{
				author: String, // slug
				desc:String,
				date:{
					type: Date,
					default: Date.now
				}
			}
		],
		meta:{
			upvote: Number,
			downvote: Number,
			fabs: Number
		}
	}
}