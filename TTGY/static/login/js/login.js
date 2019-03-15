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


    //登录

    $("#login_btn").click(function(e){
        e.preventDefault();
        //获取cookie中注册过的所有用户
        var users = $.cookie("users");
        var users1 = $.cookie("users1") ? JSON.parse($.cookie("users1")) : [];
        if (users) {
            users = JSON.parse(users);
            //遍历查找是否有匹配的用户
           // var isExist = false; //表示是否存在该用户
            for (var i=0; i<users.length; i++) {
                if ( $("#phone_num").val() == users[i].name &&$("#phone_num").val()!=0 &&$("#password").val() == users[i].pwd ) {
                    alert("登录成功!");
                   // isExist = true; //表示存在该用户

                    //需要登录的用户(需要保存到cookie中的用户)
                    var user1 = {
                        "name1":$("#phone_num").val()
                    };
                    $.cookie("users1", JSON.stringify(user1), {expires:null, path:"/"});
                   location.href = "../index/index.html";
                }
                else {
                    alert("用户名或密码错误!");
                }
            }
            //if (!isExist) {
            //
            //}
        }
    })
})
