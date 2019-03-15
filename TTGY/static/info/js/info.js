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

    //购物车小图标
    var url;
    $("#nav_right_cart").on("click",function(){

        if($(this).css("background-image") != url){
            $(this).css("background-image","url(img/orangeCar.png)");
            url = $(this).css("background-image");

            $("#cart_content").css("display","block");

        }else {
            $(this).css("background-image","url(img/greenCar.png)");
            //url = $(this).css("background-image");
            $("#cart_content").css("display","none");
        }

        sum();
    });

    //动态获取数据
    var goodIndex = location.search.replace("?","");
    if( goodIndex=="" ){
        alert("没有产品")
    }else{
        goodOp(goodIndex)
    }

    function goodOp(index){

        $.get({
            "url":"json/goods.json",
            "success":function(res){

                //res 是ajax请求成功时的返回值
                //刷新页面  更新详情
                callback(res[index]);

            }
        })
    }
    function callback(data){

        var img1 = $("<img/>").attr("src",data.img5);
        var img2 = $("<img/>").attr("src",data.img6);
        var img3 = $("<img/>").attr("src",data.img7);

        $("#main_left").append(img1).append(img2).append(img3);

        var img4 = $("<img class='cart_img' class='smallImg'/>").attr("src",data.img2);
        var img5 = $("<img class='smallImg'/>").attr("src",data.img3);
        var img6 = $("<img class='smallImg'/>").attr("src",data.img4);
        var oSmallArea = $('<div id="smallArea"></div>');

        $("#main_center").append(img4).append(img5).append(img6).append(oSmallArea);

       /* var oBigImg = $("<img id='bigImg'/>").attr("src",data.img2);
        $("#bigArea").append(oBigImg);*/

        var GoodsName = $("<h3 id='name'>"+data.name+"</h3>")
        var introduce_text = $("<p id='introduce_text'>"+data.intro+"</p>")

        $(".introduce").append(GoodsName).append(introduce_text);

        var oPrice = $("<b id='i_price'>"+data.price+"</b>");
        $(".price_left").append(oPrice);

/*    <div class="norms"><h5>规格</h5> <input type="button" value="4个"></div>*/
        var oBtn =$("<input type = 'button' value="+"'"+data.norms+"'>"+"</div>")
        $(".norms").append(oBtn);

        var oSpan = $("<span>"+data.name+"</span>");
        $(".main_nav").append(oSpan);





        //鼠标移入时更换图片
        //图片自动轮播

        var oList = document.getElementById("main_center");
        var aImg = oList.getElementsByTagName("img");//大图片
        var oList2 = $("#main_left");
        var aImg2 = oList2.find("img");
        //console.log(aImg2);

        var i =0;
        var timer = setInterval(move,3000);

        //切换图片
        function move(){
            i++;
            if(i>2){//如果超出了aLi的最大下标，则修改为0
                i=0;
            }
            for(var j=0;j<aImg.length;j++){
                if(j==i){
                    //对应显示的大图片
                    aImg[j].style.display = "block";
                    aImg2.eq(j).addClass("active_img");
                    _bigImg.attr("src",aImg2.eq(j).attr("src"));

                }else{
                    //把其他的大图片隐藏
                    aImg[j].style.display = "none";
                    aImg2.eq(j).removeClass("active_img");
                    /* aImg2[j].className = ""*/
                }
            }
            //============鼠标移入切换图片
            for(var j=0;j<aImg2.length;j++){
                aImg2[j].index = j;
                aImg2[j].onmouseover = function(){
                    i = this.index -1;//因为move中i会+1
                    _bigImg.attr("src",$(this).attr("src"));
                    //切换图片
                    move();
                    clearInterval(timer);
                    timer  = setInterval(move,3000);
                }
            }
        }


        /*放大镜*/
        var _smallDiv =$("#main_center")//装小图片的盒子
        var _smallImg = $(".smallImg");//小图片
        var _smallArea = $("#smallArea"); //小区域
        var _bigImg = $("#bigImg"); //大图
        var _bigArea = $("#bigArea"); //大区域
        _smallArea.width( _bigArea.width() * _smallDiv.width() / _bigImg.width() );
        _smallArea.height( _bigArea.height() *_smallDiv.height() / _bigImg.height() );

        //放大系数/放大倍数
        var scale = _bigImg.width() /_smallDiv.width();


        _smallDiv.mousemove(function(e){
            clearInterval(timer);

            // _bigImg.attr("src",_smallImg.attr("src"));
            _smallArea.show();
            _bigArea.show();
            var x = e.pageX - _smallDiv.offset().left - _smallArea.width()/2;
            var y = e.pageY - _smallDiv.offset().top - _smallArea.height()/2;

            //控制小区域范围在小图内
            if (x <= 0) { //不超出左边
                x = 0;
            }
            else if (x >= _smallDiv.width()-_smallArea.width()) { //不超出右边
                x =_smallDiv.width()-_smallArea.width();
            }
            if (y <= 0) { //不超出上边
                y = 0;
            }
            else if (y >= _smallDiv.height()-_smallArea.height()) { //不超出下边
                y = _smallDiv.height()-_smallArea.height();
            }
            //移动小区域
            _smallArea.css({left: x, top: y});

            //移动大图
            _bigImg.css({left: -x*scale, top: -y*scale});

        })

        _smallDiv.mouseleave(function(){
            timer  = setInterval(move,3000);
            _smallArea.hide(); //隐藏小区域
            _bigArea.hide();
        })



        /*点击加入购物车*/
        $("#add_car").click(function(){

            $("#add_cart").css("display","block")

            //以添加到cookie的方式添加购物
            //cookie为空的时候


            var name = "good";

            //cookie的  value

            var goodlist = $.cookie( name )?JSON.parse($.cookie(name)) : [];

            var goodName =$(this).parent().parent().find("h3").text();
            var goodPirce = $(this).parent().parent().find(".price").find("b").text();
            var goodImg = $(".cart_img").attr("src");
            var goodNum = parseInt($("#num_number").val());
            //console.log(goodImg);
            //console.log("jjj");

            var isExit =false;//不存在



            for(var i=0;i<goodlist.length;i++){
                //找到每一个对象的tittle
                if(goodlist[i].tittle == goodName){
                    goodlist[i].num += goodNum;
                    isExit = true;
                }

            }

            //商品不存在 添加商品对象到数组里面
            if(!isExit){
                var ogj = {
                    tittle:goodName,
                    num:goodNum,
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


    //点击加入购物车关闭按钮
        $(".close").click(function(){
            $("#add_cart").css("display","none");
        })


    /*tab切换*/

    var oBtnTop = $("#btn_top");
    var aInput = oBtnTop.find("input");

    aInput.eq(0).click(function(){
        $(this).addClass("active_tab");
        aInput.eq(1).removeClass("active_tab");
        $("#recommend").css("display","block");
        $("#evaluation").css("display","none");
    });
    aInput.eq(1).click(function(){
        $(this).addClass("active_tab");
        aInput.eq(0).removeClass("active_tab");
        $("#recommend").css("display","none");
        $("#evaluation").css("display","block");
    });




    //顶部悬浮
    window.onscroll = function() {

        var oBox = document.getElementById("btn_top");
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        if (scrollTop > 800) {
            oBox.style.position = "fixed";
            oBox.style.top = "0";
        }
        else {
            oBox.style.position = "";
            oBox.style.top = "";
        }

    }

    //回到顶部
    $("#back_top").click(function(){
        $("body,html").animate({scrollTop:0},1000)

    })


    //购物车小区域动态创建
    var aGood = JSON.parse($.cookie("good"));

    if(aGood.length>0){
        //表示商品存在
        $.each(aGood,function(index,obj){
            var liNode = $("<li/>");
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
    //商品详情中加减按钮
       $(".info_cut").click(function(){
            //console.log($(this).parent(".cart_num").find(".num_number").val());
            var cutNum = $("#num_number").val();
            cutNum--;
            if (cutNum <= 1){
                cutNum=1;
            }
            $("#num_number").val(cutNum);

        });
        $(".info_add").click(function(){
            var cutNum = $("#num_number").val();
            cutNum++;
            $("#num_number").val(cutNum);

        });

    //购物车中加减按钮
    $("body").on("click",".cut",function(){
        //console.log($(this).parent(".cart_num").find(".num_number").val());
        var cutNum = $(this).parent(".cart_num").find(".num_number").val();
        cutNum--;
        if (cutNum <= 1){
            cutNum=1;
        }
        $(this).parent(".cart_num").find(".num_number").val(cutNum);
        sum();
    });
    $("body").on("click",".add",function(){
        var cutNum = $(this).parent(".cart_num").find(".num_number").val();
        cutNum++;
        $(this).parent(".cart_num").find(".num_number").val(cutNum);
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
        $(this).parent().parent().remove();
        sum();
    }


})