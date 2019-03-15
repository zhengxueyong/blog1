$(function(){
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


    //最近浏览过的商品tab切换

    $(".interest_top a").click(function(){
        console.log("kkk");
        var index = $(this).index();
        $(this).closest(".interest").find(".interest_bottom").css({
            "display":"none"
        });
        $(this).siblings("a").removeClass("active");
        $(this).addClass("active");
        $(".interest_bottom").eq(index).css("display","block");
    });

    //感兴趣的商品鼠标移入加边框
    $(".interest_list").find("li").mouseover(function(){
        $(this).css("border","1px solid #eeeeee");
        //var r_height = $(this).css("height");
        //console.log(r_height);
        $(this).css("height","223px");
        $(this).css("width","178px");
    })
    $(".interest_list").find("li").mouseout(function(){
        $(this).css("border","none")
        $(this).css("height","225px");
        $(this).css("width","180px");
    })


    //动态添加
    //var aGood = JSON.parse($.cookie("good"));
    var aGood = $.cookie('good');
    if(aGood){
        aGood = JSON.parse(aGood);

        //表示商品存在
        $.each(aGood,function(index,obj){

            var trNode = $("<tr/>").attr("index",index);
            var td1 = $("<td><img src='"+obj.data.img+"'></td>");
            var td2 = $(" <td class='goods_name'>"+obj.tittle+"</td>");
            var td3 = $("<td class='goods_norms'>4个</td>");
            var td4 = $("<td class='goods_price'>"+obj.data.price+"</td>");
            var td5 =$("<td class='number'>"+
                "<input type='button'"+ "class='cut' "+"value='-'>"+
                "<input class='num_number'"+ "type='button'"+" value='"+obj.num+"'>"+
                "<input type='button'"+"class='add'"+" value='+'></td>");
            var td6 = $("<td class='r_price'>￥249.5</td>");
            var td7 = $("<td class='del'><a>删除</a></td>");

            trNode.append(td1).append(td2).append(td3).append(td4).append(td5).append(td6).append(td7);
            trNode.appendTo( $("#t_cart_list") );

        })
        sum();
    }

    //购物车中加减按钮
        $("body").on("click",".cut",function(){
            console.log('11111111');
            var cutNum = $(this).parent(".number").find(".num_number").val();
            cutNum--;
            if (cutNum <= 1){
                cutNum=1;
            }
            $(this).parent(".number").find(".num_number").val(cutNum);
            sum();


            var goodsId = $(this).parent().parent().attr("index");
            console.log(goodsId);
            var num = $(this).siblings(".num_number").val();
            console.log(num);
            var arr = $.cookie("good") ? JSON.parse( $.cookie("good") ) : [];
            arr[goodsId].num = num;
            $.cookie("good", JSON.stringify(arr), {expires:7, path:"/"});

        });
        $("body").on("click",".add",function(){
            var cutNum = $(this).parent(".number").find(".num_number").val();
            cutNum++;
            $(this).parent(".number").find(".num_number").val(cutNum);
            sum();

            var goodsId = $(this).parent().parent().attr("index");
            console.log(goodsId);
            var num = $(this).siblings(".num_number").val();
            console.log(num);
            var arr = $.cookie("good") ? JSON.parse( $.cookie("good") ) : [];
            arr[goodsId].num = num;
            $.cookie("good", JSON.stringify(arr), {expires:7, path:"/"});

        });
        /*计数*/
    var aTr =$("#t_cart_list").find("tr");
    function sum(){
        var aTr =$("#t_cart_list").find("tr");
        //console.log($(aTr).eq(1).find(".number").find(".num_number").val());
        var goods_num = 0;
        for(var i=1;i<aTr.length;i++){
            var one_num = parseInt($(aTr).eq(i).find(".number").find(".num_number").val());
            goods_num += one_num;
        }
        $("#sum_num").html(goods_num);

        //商品总价格
        var goods_price = 0;

        for(var i=1;i<$(aTr).length;i++){
             var one_price =parseInt($(aTr).eq(i).find(".goods_price").html().replace("￥",""));
             var one_num = parseInt($(aTr).eq(i).find(".number").find(".num_number").val());

            var all_price = one_price * one_num;

            goods_price += all_price;
        }
        $("#sum_price").html("￥"+goods_price+".00");



    }

   // console.log($(aTr).eq(1).find(".goods_price").html());


    //购物车中删除
    $('.del').click(delLi);

    function delLi(){


        var index = parseInt($(this).parent().attr("index"));
        $(this).parent().remove();

        var arr = $.cookie("good") ? JSON.parse( $.cookie("good") ) : [];
        //删除该商品
        arr.splice(index,1);
        //删掉后重新覆盖cookie
        $.cookie("good", JSON.stringify(arr), {expires:10, path:"/"});
        //account($(this));
        sum();
    }

})