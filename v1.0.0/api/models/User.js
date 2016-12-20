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
				},
				createdAt:{
					type: Date,
					default: Date.now
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