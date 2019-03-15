import hashlib
import random


import time
from django.shortcuts import render, redirect
from django.core.cache import cache
# Create your views here.
from app.models import Goods, User


def index(request):
    return render(request,'index.html')

def cart(request):
    return render(request,'cart.html')

def info(request):
    return render(request,'info.html')



def goods(request, num=1):
    goods_List = Goods.objects.all()

    # 缓存
    # value = cache.get(key)
    token = cache.get('token', '不存在')
    print(token)


    return render(request, 'goods.html', context={'goods_List':goods_List})

def login(request):
    if request.method == 'GET':
        return render(request, 'login.html')
    elif request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        # 重定向位置
        back = request.COOKIES.get('back')

        users = User.objects.filter(email=email)
        if users.exists():  # 存在
            user = users.first()
            if user.password == generate_password(password):  # 验证通过
                # 更新token
                token = generate_token()

                # 状态保持
                cache.set(token, user.id, 60 * 60 * 24 * 3)

                # 传递客户端
                request.session['token'] = token

                # 根据back
                if back == 'mine':
                    return redirect('axf:mine')
                else:
                    return redirect('axf:marketbase')
            else:  # 密码错误
                return render(request, 'login.html', context={'ps_err': '密码错误'})
        else:  # 不存在
            return render(request, 'login.html', context={'user_err': '用户不存在'})


def logout(request):
    request.session.flush()

    return redirect('axf:mine')


def generate_password(password):
    md5 = hashlib.md5()
    md5.update(param.encode('utf-8'))
    return md5.hexdigest()


def generate_token():
    temp = str(time.time()) + str(random.random())
    md5 = hashlib.md5()
    md5.update(temp.encode('utf-8'))
    return md5.hexdigest()


def register(request):
    if request.method == 'GET':
        return render(request, 'register.html')
    elif request.method == 'POST':
        # 获取数据
        phone = request.POST.get('phone')

        passoword = generate_password(request.POST.get('password'))

        # 存入数据库
        user = User()
        user.phone = phone
        user.password = passoword
        user.save()

        # 状态保持
        token = generate_token()
        # key-value  >>  token:userid
        cache.set(token, user.id, 60 * 60 * 24 * 3)

        request.session['token'] = token

        return redirect('index')