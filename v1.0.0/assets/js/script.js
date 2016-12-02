$(function(){
    // Preload TREE
    renderableTree = function(data , parent){
        // console.log(parent)
        

        for(var i in data){
            if(data[i].children.length == 0){
                var li = document.createElement('li');
                li.innerHTML = data[i].title;
                parent.append(li);
                return parent;
            }
            else{
                var ul = document.createElement('ul');
                var li = document.createElement('li');
                var a = document.createElement('a');
                a.innerHTML = data[i].title;
                a.setAttribute("href", "#");
                li.append(a);
                li.append(ul);
                parent.append(li);
                renderableTree(data[i].children, ul);
            }
        }
    }

    var treeJson = JSON.parse($('#tree-data-json').text());
    // console.log(treeJson);
    var ul = document.createElement('ul');
    ul.setAttribute("id", "tree");
    var tree =  renderableTree(treeJson, ul);
    $('#rendered-tree-cont').append(tree)
    var MenuTree = {
        collapse: function(element) {
            element.slideToggle(600);
        },
        walk: function() {
            $('a', '#tree').each(function() {
                var $a = $(this);
                var $li = $a.parent();
                if ($a.next().is('ul')) {
                    var $ul = $a.next();
                    // console.log($a);
                    $a[0].addEventListener('click', function(e){
                        e.preventDefault();
                        // alert("sdsdsd")
                        MenuTree.collapse($ul);
                        $a.toggleClass('active');
                    })
                    // $(document).on('click', $a, function(e){
                        // e.preventDefault();
                        // alert("sdsdsd")
                        // MenuTree.collapse($ul);
                        // $a.toggleClass('active');
                    // })
                    // $a.click(function(e) {
                        
                    // });
                }
            });
        }
    };
    MenuTree.walk();

	if($('#document_view').length == 1){
		 // --context_menu implementation
        var x = new _contextMenu();              
        x.config({                               
              contextBoxClass : 'context-box',
              clickedOnClass : 'trigger_context_menu',
              closeBtnClass : '_close',
              // popupBesideClass : 'className',
              disableErrorLog: true,
              box_position : 'bot-left',
              displacement_px : [10,0]
        })
        x.run();  

        $('.create_new_btn').click(function(e){
            var type = $(this).attr('data-type');
            var path = $(this).attr('data-path');
            $('#createNewModal').find('.modal_mike').text( type == 'dir' ? "Create new directory" : "Create new document" );
            $('#createNewModal').find('#doctype').val(type);
            $('#createNewModal').find('#path').val(path);
            $('#createNewModal').find('.form-control').val("");
            
            $('.context-box').hide();
        });

        $('#createNewtypeForm').validate({
            rules: {
                title: "required",
                summary:{
                    required: true
                }
            }
        })

        
        $('.trigger_context_menu').click(function(){
            var path = $(this).attr('data-path');
            $('.context-box').find('.create_new_btn').attr('data-path', path);
        })
	}

    

})

