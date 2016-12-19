$(function(){
    // Preload TREE
    // https://jsfiddle.net/Austin4Silvers/jjn9rh70/10/
    // 
 //    var MenuTree = {
 //        collapse: function(element) {
 //            element.slideToggle(200);
 //        },
 //        init: function() {
 //            $('a', '#tree').each(function() {
 //                var $a = $(this);
 //                var $li = $a.parent();
 //                if ($a.next().is('ul')) {
 //                    var $ul = $a.next();
 //                    $(document).on('click', $a, function(e){
 //                        e.preventDefault();
 //                        MenuTree.collapse($ul);
 //                        $a.toggleClass('active');
 //                    });
 //                }
 //            });

 //        }
 //    };

 //    if($('#tree').length > 0 ){

 //        MenuTree.init();

 //        // initiating context-menu
 //        var x = new _contextMenu();              
 //        x.config({                               
 //              contextBoxClass : 'context-box',
 //              clickedOnClass : 'get_context_menu',
 //              closeBtnClass : '_close',
 //              // popupBesideClass : 'className',
 //              // disableErrorLog: true,
 //              box_position : 'bot-left',
 //              displacement_px : [10,0]
 //        })
 //        x.run();

 //        $('.get_context_menu').click(function(){
 //            var path = $(this).attr('data-path');
 //            $('.context-box').find('.create_new_btn').attr('data-path', path);
 //        })
 //    }

	// if($('#document_view').length == 1){

 //        $('.create_new_btn').click(function(e){
 //            var path = $(this).attr('data-path');
 //            $('#createNewModal').find('#path').val(path);
 //            path = path.substr(1).replace('root', '<i class="glyphicon glyphicon-home"></i>')+"/?"
 //            $('#createNewModal').find('.modal_mike').html( "New document in "+'<small>'+path+'</small>' );
 //            $('#createNewModal').find('.form-control').val("");
 //            $('.context-box').hide();
 //        });

 //        $('#createNewtypeForm').validate({
 //            rules: {
 //                title: "required",
 //                summary:{
 //                    required: true
 //                }
 //            }
 //        })
	// }

    if($('.editors').length > 0){
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
            if(location == ''){
                get_location_modal();
            }
            else{
                var data = {};
                $('form').find('.si_input').each(function(){
                    data[$(this).attr('name')] = $(this).val();
                })
                if($('input[name="typee"]').val() == 'wysiwyg'){
                    data['content'] = $('#wysiwygeditor').summernote('code');
                }

                $.ajax({
                    url: '/rest/save-doc',
                    type: 'POST',
                    data: data,
                    success: function(data){
                        $('#_id').val(data.data);
                        alert("Document is saved successfully")
                    },
                    error: function(data){
                        alert(data)
                    }
                })
            }
        }

        function get_location_modal(){
            if($('#async_flag').val() == 'false'){
                // get tree details
                $.ajax({
                    url: '/rest/get-tree',
                    type: "POST",
                    data: {type:'async'},
                    success: function(data) {
                        var tree = render_tree(data);
                        $('#SaveAs').find('.tree_cont').html(tree);
                        $('#async_flag').val('true')
                        $('#SaveAs').find('.tree_cont').find('li').each(function(){
                            if($(this).text() == '')
                                $(this).remove()
                        })
                    },
                    error: function(err) {
                        var warning = '<h5><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Could\'nt reach out for help. Please check your internet connection </h5>'
                        $('#SaveAs').find('.tree_cont').html(warning);
                    }
                });
            }
                $('#SaveAs').find('.si_doctitle').val($('#title').val());
                $('#SaveAs').modal('show');
        }

        function render_tree(tree_data){
            // var tree_data = JSON.parse($('pre').text());
            var dom = '<ul id="tree">'
                    dom+= '<li><a href="#" data-path="/Home/" class="si_getPath" ><i class="fa fa-home" aria-hidden="true"></i> Home</li>';
                    function get_tree(tree_data){
                        dom += '<ul>';
                            for(var i in tree_data){
                                if(tree_data[i].children.length > 0){
                                    dom += '<li>';
                                        dom += '<a href="#" data-path="'+tree_data[i].path.replace('root', 'Home')+'/'+tree_data[i].title+'/" class="si_getPath" ><i class="fa fa-angle-double-right" aria-hidden="true"></i> '+tree_data[i].title+'</a>';
                                        get_tree(tree_data[i].children);
                                    dom += '<li>';
                                }
                                else{
                                    dom += '<li><a href="#" data-path="'+tree_data[i].path.replace('root', 'Home')+'/'+tree_data[i].title+'/" class="si_getPath" > <i class="fa fa-angle-right" aria-hidden="true"></i> '+tree_data[i].title+'</a></li>'
                                }
                            }
                        dom+= '</ul>'
                    }
                    get_tree(tree_data);
                dom+= '</ul>';
            return dom;
        }

        $('.saveDoc').click(function(e){
            e.preventDefault();
            if($(this).hasClass('saveDoc-modal'))
                $('#title').val($('.si_doctitle').val())
            saveDocument();
        });

        $(document).on('click', '.si_getPath', function(e){
            e.preventDefault();
            $('.si_docLocation').val($(this).attr('data-path'))
        });
    }

})

