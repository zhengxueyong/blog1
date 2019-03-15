from django.db import models

# Create your models here.
class Goods(models.Model):
    # 商品名称
    name = models.CharField(max_length=20)
    # 商品图片
    icon = models.CharField(max_length=255)
    # 商品价格
    price = models.IntegerField()
    # 商品描述
    detail = models.CharField(max_length=255)

    class Meta:
        db_table = 'goods'


class User(models.Model):
    # 电话号码
    phone_num = models.CharField(max_length=40, unique=True)
    # 密码
    password = models.CharField(max_length=256)


    class Meta:
        db_table = 'ttgy_user'

