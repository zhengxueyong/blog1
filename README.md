def register(request):
    if request.method=='GET':

        return render(request,'register.html')
    elif request.method=='POST':
        tel=request.POST.get('tel')
        name=request.POST.get('name')
        password=request.POST.get('password')
        try:
            user=User()
            user.u_tel=tel
            user.u_name=name
            user.u_password=genrate_password(password)
            user.token=genrate_token()
            user.save()
            response=redirect("pet:homepage")
            request.session['token']=user.token
            return response
        except:
            return render(request,'register.html')
