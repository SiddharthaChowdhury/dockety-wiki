module.exports = {
	view: function(req, res){
		Document.find({}, function(err, docs){
			if(err) return res.negotiate(err);
			else{

				var set = quicksort(docs);
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
		var p_arr = raw.path.split('/');

		var data_e = {
			author: 'annonymous',
			title: raw.title,
			parent: p_arr[(p_arr.length - 1)],
			desc: raw.summary,
			path: raw.path
		}
		Document.create(data_e, function(err, data){
			if(err) return res.negotiate(err);
			else{
				req.addFlash('success', '"'+raw.title+'" was created successfully!');
				return res.redirect('/documents');
			}
		})
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
		return res.view('editors/wysiwyg',{layout: 'layout_wysiwyg'});
	} 
}