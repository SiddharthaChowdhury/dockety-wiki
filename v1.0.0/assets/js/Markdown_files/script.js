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
            var path = $(this).attr('data-path');
            $('#createNewModal').find('#path').val(path);
            path = path.substr(1).replace('root', '<i class="glyphicon glyphicon-home"></i>')+"/?"
            $('#createNewModal').find('.modal_mike').html( "New document in "+'<small>'+path+'</small>' );
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


    //======================= Facilate <TAB> press on editor
    $(document).delegate('#editor', 'keydown', function(e) { 
        var keyCode = e.keyCode || e.which; 

        if (keyCode == 9) { 
            e.preventDefault(); 
            var start = $(this).get(0).selectionStart;
            var end = $(this).get(0).selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
            $(this).val($(this).val().substring(0, start)
                        + "\t"
                        + $(this).val().substring(end));

            // put caret at right position again
            $(this).get(0).selectionStart = 
            $(this).get(0).selectionEnd = start + 1;
        } 
    });
    //======================= Facilate <Ctrl> + s
    window.addEventListener('keydown', function(event) {
        if (event.ctrlKey || event.metaKey) {
            switch (String.fromCharCode(event.which).toLowerCase()) {
            case 's':
                event.preventDefault();
                saveDocument();
                break;
            case 'f':
                event.preventDefault();
                alert('ctrl-f');
                break;
            case 'g':
                event.preventDefault();
                alert('ctrl-g');
                break;
            }
        }
    });

    $('#set_location').click(function(e){
        e.preventDefault();
        get_location_modal();
    })

    function saveDocument(){
        var location = $('body').find('#location').val();
        if(location == '')
            get_location_modal();
    }

    function get_location_modal(){
        // get tree details
        $.ajax({
            url: '/rest/get-tree',
            type: "POST",
            data: {type:'async'}
            success: function(data) {
                 console.log(data)            },
            error: function(err) {
                console.log(err)
            }
        });


        // render tree in modal
        // add event listener to each doc
        // display the modal
        $('#SaveAs').modal('show');
    }
})

