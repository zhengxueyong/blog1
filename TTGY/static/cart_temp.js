$(function(){
    $('img').each(function(){
    var img_path=$(this).attr('src')
    img_path="{% static '"+ img_path +"'%}"
    $(this).attr('src',img_path)
    })
    console.log($('body').html())
})

