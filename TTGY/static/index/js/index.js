$(function(){
        $('.home').width(innerWidth)
     var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false
    });

 ///*   //获取COOKIE中num
    var aGood = $.cookie("good")?JSON.parse($.cookie("good")):[];
    var all_num=0;
    if(aGood.length){
        for(var i=0;i<aGood.length;i++){
            var one_num = aGood[i].num;
            all_num += one_num;
        }
        $("#nav_cart_num").html(all_num);
    }

    //获取用户名

    var aName = $.cookie("users1");
    //console.log(aName.length);
    if (aName){
            aName = JSON.parse(aName);
            $(".user").css("display","block");
            $(".user").html(aName.name1+",欢迎您");
            $(".aaa").css("color","#eeeeee")

    }

    //top果园公告鼠标移入显示
    $("#notice").on("mouseover",function(){
        $(this).css("background","white");
        $("#top_right_notice").show();
    }).on("mouseout",function(){
        $(this).css("background","#eeeeee");
        $("#top_right_notice").hide();
    });

    //top手机果园鼠标移入显示
    $("#phone").on("mouseover",function(){
        $(this).css("background","white");
        $("#top_right_phone").show();
    }).on("mouseout",function(){
        $(this).css("background","#eeeeee");
        $("#top_right_phone").hide();
    });

    //购物车小图标
    var url;
    $("#nav_right_cart").on("click",function(){

        if($(this).css("background-image") != url){
            $(this).css("background-image","url(img/orangeCar.png)");
            url = $(this).css("background-image");


            if ($("#nav_cart_num").html() ==0){
                $("#cart_no_content").css("display","block");
                $("#cart_content").css("display","none");
            }else {
                $("#cart_content").css("display","block");
                $("#cart_no_content").css("display","none");
            }


        }else {
            $(this).css("background-image","url(img/greenCar.png)");
            //url = $(this).css("background-image");
            $("#cart_content").css("display","none");
            $("#cart_no_content").css("display","none");
        }
        sum();
    });


    //轮播图
    $.get("json/lunbo.json", function(data){

        //console.log(data);

        //2, 显示数据到页面上
        //遍历data数组, 将每个图片显示在页面上
        for (var i=0; i<data.length; i++) {
            var obj = data[i];
            var img = obj.img; //img
            var id = obj.id; //id

            //将创建的节点添加到页面上
            $("#list").append( "<li><img src=" + img +" /></li>" );
            $("#list2").append( "<li></li>" );


            //初始化把第一个li的样式变成选中状态
            if (i == 0) {
                $("#list2 li").addClass("active");
            }
        }

        //开启自动轮播
        lunbo();
    })

    //轮播图
    function lunbo() {
        //
        var _list1 = $("#list");
        var _list2 = $("#list2");
        var _li1 = $("#list li");
        var _li2 = $("#list2 li");
        //复制第1张图到最后
        _li1.first().clone().appendTo(_list1);

        var size = $("#list li").length;
        //console.log(size); //5

        //var  oWidth =$("#list li").eq(0).width;
        // $("#list").css("width",size*oWidth);
        var i = 0; //即将显示的图片的下标

        //开启定时器, 自动轮播
        var timer = setInterval(function(){
            i++;
            move();
        }, 3000);
        //移动
        function move(){
            //如果超出左边界
            if (i < 0) {
                _list1.css("left", -(size-1)*1263); //瞬间移动到第5张图(i=4的图片)
                i = size-2; //即将移动到第4张图(i=3的图)
            }
            //如果超出右边界
            if (i >= size) {
                _list1.css("left", 0); //瞬间移动到第1张图(非动画)
                i = 1; //即将移动到第2张图(i=1的图)
            }
            //动画移动
            _list1.stop().animate({left: -i*1263}, 500);

            //更改按钮的选中状态
            _li2.removeClass().eq(i).addClass("active");
            if (i == size-1) {
                _li2.removeClass().eq(0).addClass("active");
            }
        }
        //按钮的移入事件
        _li2.mouseenter(function(){
            i = $(this).index();
            move();
        })


        $("#banner").hover(
            function(){ //mouseenter
                clearInterval(timer); //停止定时器
            },
            function(){ //mouseleave
                clearInterval(timer);
                timer = setInterval(function(){
                    i++;
                    move();
                }, 3000)
            })

    }


    //回到顶部
    $("#back_top").click(function(){
        $("body,html").animate({scrollTop:0},1000)

    })

    //鼠标移入时图片变大

    $("body").on("mouseover", ".same_img",function(){
        $(this).stop().animate({
            "width":235,
            "height":235,
            "top":-10,
            "left":-10
        })
    }).on("mouseout",".same_img",function(){
        $(this).stop().animate({
            "width":215,
            "height":215,
            "top":0,
            "left":0
        })
    })




    //点击加入购物车关闭按钮
    $(".close").click(function(){
        $("#add_cart").css("display","none");
        $(".same_cart").animate({top:"0"});
    })

    //获取数据
    $.get({
        "url":"../info/json/goods.json",
        "success":function(res){
           // console.log(res);

            //更新界面的回调函数
            callBack(res);
        }
    })

    function callBack(json){
        //data 是json里面的每一个单独对象
        $.each(json,function(index,data){
            var obj = data;
            var img = obj.img5;
            var id =obj.id;
            var name =obj.name;
            var price =obj.price;
            var aNode = $('<a></a>').attr("href","../info/info.html?"+index);
            aNode.addClass("a_fruit_list");
            var divNode = $("<div></div>");
            divNode.addClass("fruit_list");
            var imgNode = $("<div class='fruit_list_img'><img class='same_img' src="+img+"/></div>");
            aNode.append(imgNode);
            var pNode =$( "<p>"+name+"</p>");
            var spanNode = $("<span>"+price+"</span>");
            var iNode = $("<i class='fruit_cart'><img class='same_cart' src='img/cart.png'/></i>");
            iNode.addClass("fruit_cart");
            divNode.append(aNode).append(pNode).append(spanNode).append(iNode)
           // aNode.append(divNode);
            $(".fruit_content").append(divNode);
        })


        //点击商品购物车图标购物车
        $("body").on("click",".same_cart",function(){
            $(this).animate({top:"-35px"});

            //console.log(num);
            $("#add_cart").css("display","block")

            //以添加到cookie的方式添加购物

            //cookie为空的时候
            var name = "good";

            //cookie的  value

            var goodlist = $.cookie( name )?JSON.parse($.cookie(name)) : [];

            var goodName = $(this).parent().parent().find("p").text();
            var goodPirce = $(this).parent().parent().find("span").text();
            var goodImg = $(this).parent().parent().find(".same_img").attr("src");
            //var goodNum =$(".num_number").val();

            var isExit =false;//不存在



            for(var i=0;i<goodlist.length;i++){
                //找到每一个对象的tittle
                if(goodlist[i].tittle == goodName){
                    goodlist[i].num++;
                    isExit = true;
                }

            }

            //商品不存在 添加商品对象到数组里面
            if(!isExit){
                var ogj = {
                    tittle:goodName,
                    num:1,
                    data:{
                        tittle:goodName,
                        price: goodPirce,
                        img:goodImg
                    }
                }

                goodlist.push(ogj);
            }

            //购买过的商品的数组
            //解析后的字符串  是作为cookie value
            $.cookie(name,JSON.stringify(goodlist),{expires:7,path:'/'});
            //console.log	($.cookie(name));


            //获取cookie

            //var arr1 = $.cookie(name);
            //
            //arr1 = JSON.parse(name)

            //获取cookie

           /* console.log($(".add_cart_num").html());
            var all_num = 0;*/

            //$.each(aGood,function(index,obj){
            //
            //    var one_num = parseInt(aGood[index].obj.num)
            //
            //
            //}

            var all_num = 0;
            for(var i=0;i<goodlist.length;i++){
                all_num += goodlist[i].num;
            }
           $(".add_cart_num").html(all_num);

            var all_price = 0;
            for(var i=0;i<goodlist.length;i++){
                var one_price = parseInt(goodlist[i].data.price.replace("￥",""));
                var one_all_price = one_price*goodlist[i].num;
                all_price += one_all_price;
            }
            $(".add_cart_sum").html("￥"+all_price+".00");


        })
    }



    var aGood = JSON.parse($.cookie("good"));

    if(aGood.length>0){
        //表示商品存在
        $.each(aGood,function(index,obj){
            var liNode = $("<li/>").attr("index",index);
            liNode.addClass("cart_list_same");
            var cart_list_left = $("<div class='cart_list_left'><img src="+obj.data.img+"/></div>");
            var cart_list_center =$("<div class='cart_list_center'></div>");
            var cart_price = $("<p class='cart_price'>"+obj.data.price+"</p>");
            var cart_name = $('<p class="cart_name">'+obj.tittle+"</p>");
            var cart_num =$("<div class='cart_num'>"+
                             "<input type='button'"+ "class='cut' "+"value='-'>"+
                             "<input class='num_number'"+ "type='button'"+" value='"+obj.num+"'>"+
                             "<input type='button'"+"class='add' "+" value='+'></div>");
            cart_list_center.append(cart_name).append(cart_price).append(cart_num);
            var cart_list_right = $("<div class='cart_list_right'> <a class='del'>删除</a> </div>")

            liNode.append(cart_list_left).append(cart_list_center).append(cart_list_right);
            liNode.appendTo( $("#cart_list") );

        })
    }else{
        //商品不存在
    }


    //购物车中加减按钮
    $("body").on("click",".cut",function(){
        //console.log($(this).parent(".cart_num").find(".num_number").val());
       var cutNum = $(this).parent(".cart_num").find(".num_number").val();
        cutNum--;
        if (cutNum <= 1){
            cutNum=1;
        }
        $(this).parent(".cart_num").find(".num_number").val(cutNum);
        aGood = JSON.parse($.cookie("good"));
        if (aGood[$(this).parents("li").index()].num>1){
            aGood[$(this).parents("li").index()].num--;
        }
        $.cookie("good",JSON.stringify(aGood),{expires:7,path:'/'});

        sum();
    });
    $("body").on("click",".add",function(){
        var cutNum = $(this).parent(".cart_num").find(".num_number").val();
        cutNum++;
        $(this).parent(".cart_num").find(".num_number").val(cutNum);
        aGood = JSON.parse($.cookie("good"));
        aGood[$(this).parents("li").index()].num++;
        $.cookie("good",JSON.stringify(aGood),{expires:7,path:'/'});

        sum();
    });

    /*计数*/
    var aLi =$("#cart_list").find("li");
    function sum(){
        var aLi =$("#cart_list").find("li");
        //console.log($(aTr).eq(1).find(".number").find(".num_number").val());
        var goods_num = 0;
        for(var i=0;i<aLi.length;i++){
            var one_num = parseInt($(aLi).eq(i).find(".cart_num").find(".num_number").val());
            goods_num += one_num;
        }
        $(".add_cart_num").html(goods_num);

        //商品总价格
        var goods_price = 0;

        for(var i=0;i<$(aLi).length;i++){
            var one_price =parseInt($(aLi).eq(i).find(".cart_price").html().replace("￥",""));
            var one_num = parseInt($(aLi).eq(i).find(".cart_num").find(".num_number").val());

            var all_price = one_price * one_num;

            goods_price += all_price;
        }
        $(".add_cart_sum").html("￥"+goods_price+".00");

        $("#nav_cart_num").html(goods_num);

    }
    //购物车中删除
    $('.del').click(delLi);

        function delLi(){
            var index = parseInt($(this).parent().parent().attr("index"));
            $(this).parent().parent().remove();
            var arr = $.cookie("good") ? JSON.parse( $.cookie("good") ) : [];
            //删除该商品
            arr.splice(index,1);
            //删掉后重新覆盖cookie
            $.cookie("good", JSON.stringify(arr), {expires:10, path:"/"});


            sum();
         }
})
