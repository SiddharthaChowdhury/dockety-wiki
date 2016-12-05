$(function(){
    // Preload TREE
    // https://jsfiddle.net/Austin4Silvers/jjn9rh70/10/
    if($('#tree').length > 0 ){
        var MenuTree = {
            collapse: function(element) {
                element.slideToggle(200);
            },
            walk: function() {
                $('.tree-parent-anchor', '#tree').each(function() {
                    var $a = $(this);
                    var $li = $a.parent();
                    if ($a.next().is('ul')) {
                        var $ul = $a.next();
                        $a[0].addEventListener('click', function(e){
                            e.preventDefault();
                            MenuTree.collapse($ul);
                            $a.toggleClass('active');
                        });
                    }
                });
            }
        };
        MenuTree.walk();

        // initiating context-menu
        var x = new _contextMenu();              
        x.config({                               
              contextBoxClass : 'context-box',
              clickedOnClass : 'get_context_menu',
              closeBtnClass : '_close',
              // popupBesideClass : 'className',
              // disableErrorLog: true,
              box_position : 'bot-left',
              displacement_px : [10,0]
        })
        x.run();

        $('.get_context_menu').click(function(){
            var path = $(this).attr('data-path');
            $('.context-box').find('.create_new_btn').attr('data-path', path);
        })
    }

	if($('#document_view').length == 1){

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
	}

    

})

