$(function(){
	var code = $(".code").eq(0);
	var change = $(".change").eq(0);
	
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
	
	//各种验证
	var p = $("<p></p>");
	var rePhone = $(".rePhone").eq(0);
	var picCode = $(".picCode").eq(0);
	var rePwd = $(".rePwd").eq(0);
	var reverse = $(".reverse").eq(0);
	var telAry = /^1(3|5|4|7|8)\d{9}$/;
	var pwdAry = /^[a-zA-Z]\w{5,17}$/;
	console.log() 
	var exist = true;
	//手机验证
	rePhone.children().focus(function(){
		p.show();
		p.removeClass().addClass("active");
		p.html("完成验证后，您可以用该手机号登录和找回密码")
		p.appendTo(rePhone);
	}).blur(function(){
		p.removeClass();
		p.html(" ");
		if($(this).val().length == 0){
			p.show();
			p.removeClass().addClass("wrong");
			p.html("手机号码不能为空");
			p.delay(2000).hide(0);
			p.appendTo(rePhone);
			exist = false;
			
		}else if(!telAry.test($(this).val())){
			p.show();
			p.removeClass().addClass("wrong");
			p.html("手机号码格式有误，请输入正确的手机号");
			p.delay(2000).hide(0);
			p.appendTo(rePhone);
			exist = false;
			
		}
	})
	//验证码验证
	picCode.find("input").focus(function(){
		p.show();
		p.removeClass().addClass("active");
		p.html("输入右边图片文字，验证通过后获得短信验证码");
		p.appendTo(picCode);
		console.log($(this));
	})
	//密码验证
	rePwd.children().focus(function(){
		p.show();
		p.removeClass().addClass("active");
		p.html("6-15位字母，建议字母、数字及下划线两种以上组合");
		p.appendTo(rePwd);
	}).blur(function(){
		if($(this).val().length == " "){
			p.show();
			p.removeClass().addClass("wrong");
			p.html("密码不能为空");
			p.delay(2000).hide(0);
			p.appendTo(rePwd);
			exist =false;
		}else if($(this).val().length < 6 || $(this).val().length >15){
			p.show();
			p.removeClass().addClass("wrong");
			p.html("密码的长度只能在6-15位之间");
			p.delay(2000).hide(0);
			p.appendTo(rePwd);
			exist =false;
		}else if(!pwdAry.test($(this).val())){
			p.show();
			p.removeClass().addClass("wrong");
			p.html("密码格式不正确");
			p.delay(2000).hide(0);
			p.appendTo(rePwd);
			exist =false;
		}
	})
	
	//二次密码验证
	reverse.children().focus(function(){
		p.show();
		p.removeClass().addClass("active");
		p.html("请再次输入密码");
		p.appendTo(reverse);
	}).blur(function(){
		if($(this).val() != rePwd.children().val()){
			p.show();
			p.removeClass().addClass("wrong");
			p.html("2次密码输入不一致");
			p.delay(2000).hide(0);
			p.appendTo(reverse);
			exist = false;
		}
	})
	
	//注册
	var registerBtn = $(".registerBtn").eq(0);
	registerBtn.children().click(function(){
		
		if($("#rePh").val().length == 0){
			console.log("11: " + $("#rePh").val());
			return;
		}
		var users = $.cookie("users") ? JSON.parse($.cookie("users")) : [];
		for(var i=0; i<users.length; i++){
			 if(users[i].name == $("#rePh").val()){
				p.show();
				p.removeClass().addClass("wrong");
				p.html("该用户已注册");
				p.delay(2000).hide(0);
				p.appendTo(rePhone);
				return;
			}
		}
		
		if(exist == false){
			exist = true;
			return;
		}
		
		var user = {
			name : $("#rePh").val(),
			pwd : $(".rePwd").children().val()
		}
		users.push(user);
		$.cookie("users", JSON.stringify(users), {expires:30, path:"/"});
		var timer = setTimeout(function(){ location.href="login.html"; },3000);
	})

})