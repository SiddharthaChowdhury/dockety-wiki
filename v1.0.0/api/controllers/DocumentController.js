module.exports = {
	view: function(req, res){
		Document.find({}, function(err, docs){
			if(err) return res.negotiate(err);
			else{
				
				var menuItemsTree = createTree( docs );
				// console.log( menuItemsTree );
				// var dom = render_tree(menuItemsTree)


				// return res.json(menuItemsTree)
				return res.view('homepage', {data: menuItemsTree});
			}
		})
		// Add an item node in the tree, at the right position
		function addToTree( node, treeNodes ) {

		    // Check if the item node should inserted in a subnode
		    for ( var i=0; i<treeNodes.length; i++ ) {
		        var treeNode = treeNodes[i];

		        // "/store/travel".indexOf( '/store/' )
		        if ( node.path.indexOf( treeNode.path + '/' ) == 0 ) {
		            addToTree( node, treeNode.children );

		            // Item node was added, we can quit
		            return;
		        }
		    }

		    // Item node was not added to a subnode, so it's a sibling of these treeNodes
		    treeNodes.push({
		        title: node.title,
		        path: node.path,
		        children: []
		    });
		}

		//Create the item tree starting from menuItems
		function createTree( nodes ) {
		    var tree = [];

		    for ( var i=0; i<nodes.length; i++ ) {
		        var node = nodes[i];
		        addToTree( node, tree );
		    }

		    return tree;
		}

	},
	createNew: function(req, res){
		var raw = req.params.all();
		var data_e = {
			author: 'annonymous',
			title: raw.title,
			desc: raw.summary,
			oftype: raw.type,
			path: raw.path
		}
		Document.create(data_e, function(err, data){
			if(err) return res.negotiate(err);
			else{
				req.addFlash('success', '"'+raw.title+'" was created successfully!');
				return res.redirect('/documents');
			}
		})
	}
}