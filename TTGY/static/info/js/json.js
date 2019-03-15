$(function(){
    var goodIndex = location.search.replace("?","");

    if( goodIndex=="" ){
        alert("没有产品")
    }else{
        goodOp(goodIndex)
    }

    function goodOp(index){

        $.get({
            "url":"json/json.goods",
            "success":function(res){

                //res 是ajax请求成功时的返回值
                //刷新页面  更新详情
                callback(res[index]);

            }
        })
    }




    function callback(data){
        var main_left = $("#main_left")
    /*      <div id="main_left">
            <img src="img/fruit_small_1.0.jpg">
            <img src="img/fruit_small_1.1.jpg">
            <img src="img/fruit_small_1.2.jpg">
            </div>*/

        var img1 = ("<img/>").attr("src",data.img5);
        var img2 = ("<img/>").attr("src",data.img6);
        var img3 = ("<img/>").attr("src",data.img7);

        main_left.append(img1).append(img2).append(img3);
        /*$("<img/>").attr("src",data.img).appendTo(goodinfoNode);

        $("<h2/>").text(data.tittle).appendTo(goodinfoNode);

        $("<span></span>").text(data.price).appendTo(goodinfoNode);*/


    }



})
