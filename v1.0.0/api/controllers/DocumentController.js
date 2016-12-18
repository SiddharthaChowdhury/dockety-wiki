module.exports = {
	view: function(req, res){
		var uid = req.session.User._id;
		User.find({_id: uid}, 'articles' , function(err, docs){
			if(err) return res.negotiate(err);
			else{

				var articles = docs[0].articles
				var set = quicksort(articles);
				var menuItemsTree = createTree(set);
				if(req.param('type') == 'async')
					return res.json(menuItemsTree);
				return res.view('homepage', {tree: menuItemsTree});
			}
		})
		/////////////////////////// QUICKSORTING THE RESULT
		function quicksort(arr) {
		  //if array is empty
			if (arr.length === 0) {
			    return [];
			}
			var left = [];
			var right = [];
			var pivot = arr[0];
			for (var i = 1; i < arr.length; i++) {
			    if (arr[i].path.split('/').length < pivot.path.split('/').length) {
				    left.push(arr[i]);
			    } else {
			    	right.push(arr[i]);
			    }
			}
			                              // Concats pivot to right
		  return quicksort(left).concat(pivot, quicksort(right));
		}

		function addToTree(node, treeNodes) {
		  	var parentNode = GetTheParentNodeChildArray(node.path, treeNodes) || treeNodes;

		  	parentNode.push({
		    	title: node.title,
		    	path: node.path,
		    	children: []
		  	});
		}

		function GetTheParentNodeChildArray(path, treeNodes) {
		  	for (var i = 0; i < treeNodes.length; i++) {
			    var treeNode = treeNodes[i];

			    if (path === (treeNode.path + '/' + treeNode.title)) {
			      	return treeNode.children;
			    } 
			    else if (treeNode.children.length > 0) {
			      	var possibleParent = false;

			      	treeNode.children.forEach(function(item) {
			        	if (path.indexOf(item.path + '/' + item.title) == 0) {
			          		possibleParent = true;
			          		return false;
			        	}
			      	});

			      	if (possibleParent) {
			    	    return GetTheParentNodeChildArray(path, treeNode.children)
				    }
			    }
			}
		}

		//Create the item tree starting from menuItems
		function createTree(nodes) {
		  	var tree = [];
		  	for (var i = 0; i < nodes.length; i++) {
		    	var node = nodes[i];
		    	addToTree(node, tree);
		  	}
		  	return tree;
		}
	},

	createNew: function(req, res){
		var raw = req.params.all();
		var uid = req.session.User._id;
		if(!raw.title || !raw.path){
			res.status(404);
			return res.json("Title or Location is missing");
		}
		raw.path = '/'+raw.path.replace(/(^\/)|(\/$)/g, "").replace('Home', 'root');
		raw.tags = raw.tags.replace(/(^,)|(,$)/g, "")

		var tags = [], tag_arr = raw.tags.split(',');
		for(var i = 0; i < tag_arr.length; i++){
			var tg = tag_arr[i].trim();
			if( tg != '' )
				tags.push(tg)
		}

		if(raw.path != '/root'){
			var p_arrr = raw.path.split('/');
			var ttl = p_arrr.pop()
			User.find({_id: uid, 'articles.title': ttl, 'articles.path': p_arrr.join('/')}, function(err, par){
				if(err) return res.negotiate(err);

				if(par.length > 0){
					proceed_save();
				}
				else{
					res.status(400)
					return res.json("Data manipulation is not allowed. Further attempt will block your account.");
				}
			})
		}else
			proceed_save();


		function proceed_save(){
			var p_arr = raw.path.split('/');
			var randomID = require("random-id");
			var _id = randomID(30);
			var data_e = {
				_id: _id,
				doctype: raw.typee,
				title: raw.title,
				parent: p_arr[(p_arr.length - 1)],
				body: raw.content,
				path: raw.path,
				tags: tags
			}
			if(raw._id){
				data_e['_id'] = raw._id;
				User.count({_id: uid,'articles._id': raw._id, 'articles.parent': data_e.parent}, function(err, count){
					if(count == 1){
						User.update({_id: uid }
						,{ $pull: { 'articles': { _id: raw._id } } }
						, function(err, data){
							if(err) return res.negotiate(err);
							else{
								User.findByIdAndUpdate(uid, {$push:{'articles': data_e}}, function(err, data){
									if(err) return res.negotiate(err);
									else{
										// console.log(_id)
										res.status(200);
										return res.json({msg:"Data saved", data: _id});
									}
								});
							}
						})
					}
					else{
						res.status(400)
						return res.json("Data manipulation is not allowed. Further attempt will block your account.");
					}
				});
			}
			else{
				User.findByIdAndUpdate(uid, {$push:{'articles': data_e}}, function(err, data){
					if(err) return res.negotiate(err);
					else{
						// console.log(_id)
						res.status(200);
						return res.json({msg:"Data saved", data: _id});
					}
				});
			}
		}
			
	},

	markdownPage: function(req, res){
		var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890";
	    var newstr = "";
	    for (var x = 0; x < 8; x++) {
	        var i = Math.floor(Math.random() * chars.length);
	        newstr += chars.charAt(i);
	    }
		return res.view('editors/markdown',{title:newstr,layout: 'layout_markdown'})
	},

	wysiwygPage: function(req, res){
		var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890";
	    var newstr = "";
	    for (var x = 0; x < 8; x++) {
	        var i = Math.floor(Math.random() * chars.length);
	        newstr += chars.charAt(i);
	    }
		return res.view('editors/wysiwyg',{title: newstr, layout: 'layout_wysiwyg'});
	} 
}