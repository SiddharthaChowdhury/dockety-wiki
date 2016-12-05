$(function(){
    // Preload TREE
    // http://jsfiddle.net/gabrieleromanato/Te6yX/
    var MenuTree = {
        collapse: function(element) {
            element.slideToggle(200);
        },
        walk: function() {
            $('a', '#tree').each(function() {
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

        
        $('.trigger_context_menu').click(function(){
            var path = $(this).attr('data-path');
            $('.context-box').find('.create_new_btn').attr('data-path', path);
        })
	}

    

})

