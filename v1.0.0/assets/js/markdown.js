$(function(){
    $(".panel-left").resizable({
       handleSelector: ".splitter",
       resizeHeight: false
    });

    $(".panel-top").resizable({
       handleSelector: ".splitter-horizontal",
       resizeWidth: false
    });

    // ====================== Initing  MARKDOWN
    var converter = new showdown.Converter();

    $('#editor').keyup(function(){
        var text = $(this).val();
        $('#viewer').html(converter.makeHtml(text))    
    });
})