module.exports = {
	schema:{
		full_name: String,
		about_me: String,
		email: String,
		avatar: String,
		password: String,
		createdAt:{
			type: Date,
			default: Date.now
		},
		last_login: Date,
		articles:[
			{
				_id: String,
				title: String,
				parent: String,
				path: String,
				body: String,
				doctype:{
					type:String,
					enum:['md', 'wysiwyg']
				},
				// comments:[
				// 	{
				// 		author: String, // slug
				// 		desc:String,
				// 		date:{
				// 			type: Date,
				// 			default: Date.now
				// 		}
				// 	}
				// ],
				// meta:{
				// 	upvote: Number,
				// 	downvote: Number,
				// 	fabs: Number
				// },
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
		],
		contributions:[
			{
				article_id: String,
				dated: Date
			}
		]
	}
}