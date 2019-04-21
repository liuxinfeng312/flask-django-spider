$(function(){
	var name = $(".name").eq(0);
	var telAry = /^1(3|5|4|7|8)\d{9}$/;
	var mailAry = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	var stop = $(".stop").eq(0);
	var picCode = $(".picCode").eq(0);
	var code = $(".code").eq(0);
	var change = $(".change").eq(0);
	var loginBtn = $(".loginBtn").eq(0);
	var p = $("<p></p>");
	var exist = true;
	
	//用户名验证
	name.children().blur(function(){
		if(!telAry.test(name.children().val()) && !mailAry.test(name.children().val())){
			$(this).parent().animate({left:"15px"},500);
			$(this).parent().animate({left:"-15px"},500);
			$(this).parent().animate({left:"0px"},500);
			stop.show();
			stop.delay(2000).hide(0);
		}
	})

	//更换验证码
	var strs = "";
	for(var i=0;i<4;i++){
		var num=parseInt(Math.random()*100%10+48);
		var stra=String.fromCharCode(num);
		strs=strs.concat(stra);
	}
	code.html(strs);
	
	code.click(function(){
		var strSum = "";
		for(var i=0;i<4;i++){
			var num=parseInt(Math.random()*100%10+48);
			var str=String.fromCharCode(num);
				strSum=strSum.concat(str);
		}
		code.html(strSum);
	})
	
	change.click(function(){
		var strSum = "";
		for(var i=0;i<4;i++){
			var num=parseInt(Math.random()*100%10+48);
			var str=String.fromCharCode(num);
				strSum=strSum.concat(str);
		}
		code.html(strSum);
	})

	picCode.find("input").blur(function(){
		if(picCode.find("input").val() != code.html()){
			$(this).attr("placeholder","请重新输入验证码");
			 exist = false;
		}
	})
	
	if(picCode.find("input").val() == ""){
		exist = false;
	}
	
	//登录
	loginBtn.children().click(function(){
		if(exist == true){	
		var users = $.cookie("users");
		if(users){
			users = JSON.parse(users);
			var isExists = false;
			for(var i=0; i<users.length; i++){
				if(users[i].name == $("#nameIn").val() && users[i].pwd == $("#pwdIn").val()){
					console.log($("#nameIn").val());
					p.show();
					p.removeClass().addClass("active");
					p.html("登陆成功");
					p.appendTo(name);
					isExists = true;
					var timer = setTimeout(function(){ location.href="index.html"; },3000);
					
				}
			}
			if(!isExists){
				p.show();
				p.removeClass().addClass("wrong");
				p.html("用户名或密码错误, 请重新输入!");
				p.delay(2000).hide(0);
				p.appendTo(name);
			}
		}else{
			p.show();
			p.removeClass().addClass("wrong");
			p.html("用户不存在请注册!");
			p.delay(2000).hide(0);
			p.appendTo(name);
		}
		}else{
			exist = true;
		}
	})

})
