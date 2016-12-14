module.exports = {
	schema:{
		author: String,
		title: String,
		desc: String,
		parent: String,
		path: String,
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
		},
		tags:[],
		contributers: [{
			name: String,
			c_id: String,
			permissions:{
				type: String,
				enum:['R', 'W', 'X'],
				default: 'R'
			}
		}],
		scope: {
			type: String,
			enum: ['public', 'private'],
			default: 'private'
		}
	}
}