$(function(){
    $(".panel-left").resizable({
       handleSelector: ".splitter",
       resizeHeight: false
    });

    $(".panel-top").resizable({
       handleSelector: ".splitter-horizontal",
       resizeWidth: false
    });

    // ====================== Initing  WYSIWYG

    $('#wysiwygeditor').summernote({
      callbacks: {                    
          // onImageUpload : function(file, editor, welEditable) {
          //   console.log('initiated')
          //   saveFile(file[0], editor, welEditable);
          // },
          onChange : function($editable, sHtml){
              $("#viewer").html( $editable );
          },
        },
        height: 300,
    });
    
})