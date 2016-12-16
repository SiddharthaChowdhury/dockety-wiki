// UserController.js

module.exports = {

	createUser: function(req, res){
		var raw = req.params.all();
		// return res.json(raw);
		if(!raw.email || !raw.name || !raw.pass1 || !raw.pass2){
			req.addFlash('signup_error', 'Hey sorry but all fields are mandetory.');
			return res.redirect('/signup');
		}

		if( raw.pass1 != raw.pass2){
			req.addFlash('signup_error', 'Password confirmation failed.');
			return res.redirect('/signup');
		}

		if(raw.phone){
			req.addFlash('signup_success', 'Your account is created!');
			return res.redirect('/signup');
		}
		var bcrypt = require('bcrypt-nodejs');
		User.count({email: raw.email}, function(err, count){
			if(err) return res.negotiate(err);
			else{
				if(count > 0){
					req.addFlash('signup_error', 'Your email is already registered! Please <a href="/login">login</a>. If you don\'t remember yor password - You can always <a href="/forgot-password">RESET Password.</a>');
					return res.redirect('/signup');
				}
				else{
					var data_e = {
						full_name: raw.name,
						email: raw.email,
						avatar: '/images/gravatar/'+Math.floor(Math.random()*(8-1+1)+1)+'.png',
						password: bcrypt.hashSync(raw.pass1),
					};
					User.create(data_e, function(err, user){
						if(err) return res.negotiate(err);
						else{
							req.addFlash('signup_success', 'Your account is created!');
							return res.redirect('/signup');
						}
					});
				}
			}
		})
	},

	getDashboardView: function(req, res){
		return res.view('private/dashboard', {layout: 'layout_private'})
	},
}