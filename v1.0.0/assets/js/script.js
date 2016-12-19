$(function(){
    // ------------------------ COMMON JS -----------------------------

    function render_tree(tree_data){
        var dom = '<ul id="tree">'
                dom+= '<li><a href="#" data-docId="root" data-path="/Home/" class="si_getPath" ><i class="fa fa-home" aria-hidden="true"></i> Home</li>';
                function get_tree(tree_data){
                    dom += '<ul>';
                        for(var i in tree_data){
                            if(tree_data[i].children.length > 0){
                                dom += '<li>';
                                    dom += '<a href="#" data-docId="'+tree_data[i]._id+'" data-path="'+tree_data[i].path.replace('root', 'Home')+'/'+tree_data[i].title+'/" class="si_getPath" ><i class="fa fa-angle-double-right" aria-hidden="true"></i> '+tree_data[i].title+'</a>';
                                    get_tree(tree_data[i].children);
                                dom += '<li>';
                            }
                            else{
                                dom += '<li><a href="#" data-docId="'+tree_data[i]._id+'" data-path="'+tree_data[i].path.replace('root', 'Home')+'/'+tree_data[i].title+'/" class="si_getPath" > <i class="fa fa-angle-right" aria-hidden="true"></i> '+tree_data[i].title+'</a></li>'
                            }
                        }
                    dom+= '</ul>'
                }
                get_tree(tree_data);
            dom+= '</ul>';
        return dom;
    }

    $('.tip-close').click(function(e){
        $(this).closest('.tip').slideUp(300);
    });

    // ------------------------------EDITORS [WYSIWYG & Markdown] -------------------------------


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

    // ------------------------------ ASYNC[Tree container] -------------------------------


    if($('.tree_container').length > 0 ){
        setTimeout(function(){ 
                $.ajax({
                    url: '/rest/get-tree',
                    type: "POST",
                    data: {type:'async'},
                    success: function(data) {
                        var tree = render_tree(data);
                        $('.tree_container').html(tree);
                        $('.tree_container').find('li').each(function(){
                            if($(this).text() == '')
                                $(this).remove()
                        })
                    },
                    error: function(err) {
                        var warning = '<h5><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Could\'nt reach out for help. Please check your internet connection </h5>'
                        $('.tree_container').html(warning);
                    }
                });
        }, 1000);

        $(document).on('click', '.si_getPath', function(e){
            e.preventDefault();
            var doc_id = $(this).attr('data-docid') 
            window.location = '/edit-doc/'+doc_id;
        })
    }

})

