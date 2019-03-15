$(function(){
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

    //手机号验证
    var flag=flag1=flag2=flag3=false;
    $("#phone_num").blur(function(){
        var parent=/^1[34578]\d{9}$/;
        var value=this.value;
        var istrue=parent.test(value)&&this.value!="";
        if(!istrue){
            flag = false;
            $("#i_phone_num").show();
            $("#i_phone_num").find("img").attr("src","img/no.png");
            $(this).css("border","1px solid red")

        }else {
            flag = true;
            $("#i_phone_num").show();
            $("#i_phone_num").find("img").attr("src","img/yes.png");
            $(this).css("border","1px solid #999999")
        }
    });

    //随机数
    var randomNum=document.getElementById("new_num_text");
    $("#new_num").click(function(){
        var str="";
        for(var i=0;i<4;i++){
            var isNum=parseInt(Math.random()*10);
            str +=isNum;
        }
        randomNum.innerHTML=str;
    });

    //验证码匹配
    var codeInput=document.getElementById("code");
    codeInput.onblur=function(){
        if(codeInput.value != randomNum.innerHTML/*&&this.value ==""*/){
            flag1 = false;
            $("#i_code").show();
            $("#i_code").find("img").attr("src","img/no.png");
            $(this).css("border","1px solid red")
        }else{
            flag1 = true;
            $("#i_code").show();
            $("#i_code").find("img").attr("src","img/yes.png");
            $(this).css("border","1px solid #999999")
        }
    };

    //密码
    $("#password").blur(function(){
        var parent=/^[A-Za-z0-9.*]{6,20}$/;
        var value=this.value;
        var istrue=parent.test(value)&&this.value!="";
        if(!istrue){
            flag2 = false;
            $("#i_password").show();
            $("#i_password").find("img").attr("src","img/no.png");
            $(this).css("border","1px solid red")
        }else {
            flag2 = true;
            $("#i_password").show();
            $("#i_password").find("img").attr("src","img/yes.png");
            $(this).css("border","1px solid #999999")
        }
    });

    //重复密码
    $("#r_password").blur(function(){
        var value = this.value;
        if(this.value == $("#password").val()&&this.value!=""){
            flag3 = true;
            $("#i_r_phone_num").show();
            $("#i_r_phone_num").find("img").attr("src","img/yes.png");
            $(this).css("border","1px solid #999999")
        }else {
            flag3 = false;
            $("#i_r_phone_num").show();
            $("#i_r_phone_num").find("img").attr("src","img/no.png");
            $(this).css("border","1px solid red")
        }
    })
    $("#register_btn").parent("a").css("text-decoration","none");

    $("#register_btn").click(function(){

        //if($("#phone_num").val().length == 0){
        //    alert("用户名不能为空")
        //}else {
        if(flag == true){
            $(this).parent("a").attr("href","../index/index.html");
        }else{

            alert("输入不合法，请重新输入！");
            return;
        }
        /*     }*/


        //先获取之前保存在cookie中的用户
        var users = $.cookie("users") ? JSON.parse($.cookie("users")) : [];
        //遍历users数组, 判断是否存在该用户,如果存在则不能注册
        for(var i=0; i<users.length; i++) {
            if ( $("#phone_num").val() == users[i].name ) {
                alert("该用户已经存在, 不能注册!");
                return;
            }
        }
        //需要注册的用户(需要保存到cookie中的用户)
        var user = {
            name: $("#phone_num").val(), //用户名
            pwd: $("#password").val() //密码
        };
        users.push(user); //添加新用户

        //保存到cookie中
        $.cookie("users", JSON.stringify(users), {expires:30, path:"/"});
        console.log( $.cookie("users") );
    });


})