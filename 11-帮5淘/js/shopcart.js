$(function(){
	var phone = $(".phone").eq(0);
	var phoneCode = $(".code").eq(0);
	
	phone.mouseenter(function(){
		phoneCode.show();
		phoneCode.click(function(){
			phoneCode.find("a").attr("href","http://app.b5m.com/")
		})
		phoneCode.mouseenter(function(){
			phoneCode.show();
		}).mouseleave(function(){
			phoneCode.hide();
		})
	}).mouseleave(function(){
		phoneCode.hide();
	})
	
	//右侧导航栏
	var barItem = $(".bar-item");
	var bartop = $(".bar-item-top");
	
	barItem.mouseenter(function(){
		
		if ($(this).index(".bar-item") == 2) {
			$(this).find(".bar-item-tip").finish().show().animate({opacity:1,left:-115},300);
		}
		else {
			$(this).children().eq(1).finish().show().animate({opacity:1,left:-115},300);
		}
	})
	barItem.mouseleave(function(){

		if ($(this).index(".bar-item") == 2) {
			$(this).find(".bar-item-tip").finish().animate({opacity:0,left:-200},300).hide(300);
		}
		else  {
			$(this).children().eq(1).finish().animate({opacity:0,left:-200},300).fadeOut();
		}
	})
	
	bartop.click(function(){
		$("body, html").stop().animate({scrollTop: 0}, 1000);
	})
	
	//购物车主体
	var icons = $(".icons");
	icons.children().mouseenter(function(){
		$(this).find("p").show();
	}).mouseleave(function(){
		$(this).find("p").hide();
	})
	

	//获取用户名
	var users = $.cookie("users");
	if(users){
		users = JSON.parse(users);
		$("#userName").html("<img src='img/top/kiss.gif'/>");
		$(".loginQQ").hide();
		$(".loginWeixin").hide();
		$(".loginWeibo").hide();
		$(".register").html("消息"+"<img src='img/top/信息.png'/>");
		$(".register").mouseenter(function(){
			$(".message").fadeIn();
			$(".message").mouseenter(function(){
				$(".message").show();
			}).mouseleave(function(){
				$(".message").fadeOut();
			})
		}).mouseleave(function(){
			$(".message").hide();
		})
	}else{
		$(".loginQQ").show();
		$(".loginWeixin").show();
		$(".loginWeibo").show();
	}
	
	
	var cartsnum = 0;
	var cartstotalprice = 0;
	var carts = $.cookie("carts");
	carts = JSON.parse(carts);
	
	//创建购物车标题栏
	cartThead = $("<div></div>");
	checked = $("<a></a>");
	checkBox = $("<em id='all'></em>");
	all = $("<span>全选</span>");
	brandname = $("<span>商品名称</span>");
	postage = $("<span>商品规格</span>");
	price = $("<span>单价(元)</span>");
	quantity = $("<span>数量</span>");
	amount = $("<span>小计(元)</span>");
	operation = $("<span>操作</span>");
	checked.append(checkBox);
	cartThead.append(checked,all,brandname,postage,price,quantity,amount,operation);
	cartThead.addClass("cart-thead");
	checkBox.addClass("icon-checkbox");
	checked.addClass("check-all");
	all.addClass("all");
	brandname.addClass("name");
	postage.addClass("postage");
	price.addClass("price");
	quantity.addClass("quantity");
	amount.addClass("amount");
	operation.addClass("operation");
	cartThead.insertBefore($("#footer"));

	//购物车内容
	if(carts){
		$(".cart-no-list").hide();
		$("#footer").css({width : "1200px", margin : "auto"});
		
		for(var i=0; i<$(".items-quantity").length; i++){
			var sub = 0;
			sub =sub + $(".items-quantity").eq(i).html();
		}
		console.log($(".items-quantity"))
		//购物车头部
		for(var i=0; i<carts.length; i++){
			
			$(".cart-num").html(sub);
			cartMain = $("<div class='major'></div>");
			cartMcon = $("<div></div>");
			conTitle = $("<h3>"+ carts[i].name +"</h3>");
			conchecked = $("<a></a>");
			concheckBox = $("<em id='"+ i +"'></em>");
			conchecked.append(concheckBox);
			conTitle.prepend(conchecked);
			cartMcon.append(conTitle);
			cartMain.append(cartMcon);
			cartMcon.addClass("cartMain");
			conTitle.addClass("carth3");
			conchecked.addClass("check-all-items");
			concheckBox.addClass("icon-checkbox");
			
			//购物车内容
			cartItems = $("<div></div>");
			cartItemscon = $("<ul></ul>");
			itemsCheck = $("<li></li>");
			itemsCbox = $("<em></em>");
			itemsPic = $("<li><img src="+ carts[i].img +"/></li>");
			itemsName = $("<li>"+ carts[i].name +"</li>");
			itemsPostage = $("<li>"+ carts[i].spec +"</li>");
			itemsPrice = $("<li>"+ "￥" + carts[i].unitprice +"</li>");
			itemsQuantity = $("<li>"+ carts[i].num +"</li>");
			itemsAmount = $("<li>￥<span id='itemPrice'>"+ carts[i].totalprice +"</span></li>");
			itemsOperations = $("<li><a>删除</a></li>");
			itemsCheck.append(itemsCbox);
			cartItemscon.append(itemsCheck,itemsPic,itemsName,itemsPostage,itemsPrice,itemsQuantity,itemsAmount,itemsOperations);
			cartItems.append(cartItemscon);
			cartItems.addClass("cart-items");
			cartItemscon.addClass("cart-items-content");
			itemsCheck.addClass("check-box");
			itemsCbox.addClass("icon-checkbox");
			itemsPic.addClass("items-pic");
			itemsName.addClass("items-name");
			itemsPostage.addClass("items-postage");
			itemsPrice.addClass("items-price");
			itemsQuantity.addClass("items-quantity");
			itemsAmount.addClass("items-amount");
			itemsOperations.addClass("items-operations");
			cartMain.append(cartItems);
			cartMain.insertBefore($("#footer"));
			
			//删除购物车
			itemsOperations.children().click(function(){
				for(var i=0; i<carts.length; i++){	
				var index = $(this).parents(".major").children().eq(0).find("em").attr("id")
					carts.splice(index,1);
					if(carts.length == 0){
						$(".cart-no-list").show();	
						$("#footer").css({width:"100%"})
						cartThead.hide();
						cartFootSelect.hide();
						cartFoot.hide();
						$.cookie("carts", "", {expires:-1, path:"/"});
						console.log($.cookie("carts"))
					}
					$.cookie("carts", JSON.stringify(carts), {expires:30, path:"/"});
					$(this).parents(".major").hide();
					$(".cart-num").html(carts.num);
					if($(".total-select-amount").html() == 0){
						return;
					}
					$(".total-select-amount").html($(".total-select-amount").html()-$(this).parent().siblings().eq(5).html());
					$("#price_total").html($("#price_total").html()-$(this).parent().siblings().eq(6).find("span").html());
				}
			})
		}
	}else{
		$(".cart-no-list").show();
	}


	//购物车全选、删除
	cartFootSelect = $("<div class='cart-foot-select'><div class='f-left'><a class='checkd-all'><em class='icon-checkbox'></em></a>全选</div></div>");
	removeBtn = $("<a href='javascript:;'class='remove-goods-btn'>删除</a>")
	cartFootSelect.append(removeBtn)
	cartFootSelect.insertBefore($("#footer"));
	summaryBox = $("<div></div>")

	//全选事件
	$("#all").click(function(){
		if($(this).attr("class") == "icon-checkbox"){
			$(".icon-checkbox").removeClass().addClass("icon-checkbox-change");
			var sum = 0;
			var price = 0;
			for(var i=0; i<carts.length; i++){
				sum = sum + carts[i].num;
				price = price + carts[i].totalprice;
			}
			$(".total-select-amount").html(sum);
			$("#price_total").html(price);
			$(".major").find("em").removeClass().addClass("icon-checkbox-change");
			$(".cartMain").css({background :"#fffcef"});
			$(".cart-items").css({background :"#fffcef"});
			$(".major").css({background :"#fffcef"});
			
		}else if($(this).attr("class") == "icon-checkbox-change"){
			$(".icon-checkbox-change").removeClass().addClass("icon-checkbox");
			$(".total-select-amount").html(0);
			$("#price_total").html(0);
			$(".major").find("em").removeClass().addClass("icon-checkbox");
			$(".cartMain").css({background :"#f8f8f8"});
			$(".cart-items").css({background :"#f8f8f8"});
			$(".major").css({background :"#f8f8f8"});
		}

	});
	
	var a = 0;
	var b = 0;
	var n = 0;
	//单键点击
	$("em:gt(0)").click(function(){
		if($(this).attr("class") == "icon-checkbox"){
			$(this).removeClass().addClass("icon-checkbox-change");
		}else if($(this).attr("class") == "icon-checkbox-change"){
			$(this).removeClass().addClass("icon-checkbox");
		}
		
		if($(".icon-checkbox-change").length == $("em:gt(0)").length){
			$("#all").removeClass().addClass("icon-checkbox-change");
		}
		
		if($(".icon-checkbox-change").length != ($("em:gt(0)").length+1)){
			$("#all").removeClass().addClass("icon-checkbox");
		}
		
		if($(this).attr("id")){
			
			if($(this).attr("class") != "icon-checkbox"){
				a = a + carts[$(this).attr("id")].num
				b = b + carts[$(this).attr("id")].totalprice
				$(".total-select-amount").html(a);
				$("#price_total").html(b);
				$(this).parents(".major").find("em").removeClass().addClass("icon-checkbox-change");
				$(this).parents(".cartMain").css({background :"#fffcef"});
				$(this).parents(".cartMain").siblings().css({background :"#fffcef"});
				$(this).parents(".major").css({background :"#fffcef"});
			}else{
				$(this).parents(".major").find("em").removeClass().addClass("icon-checkbox");
				$(this).parents(".cartMain").css({background :"#f8f8f8"});
				$(this).parents(".cartMain").siblings().css({background :"#f8f8f8"});
				$(this).parents(".major").css({background :"#f8f8f8"});
				a = a - carts[$(this).attr("id")].num;
				b = b - carts[$(this).attr("id")].totalprice;
				$(".total-select-amount").html(a);
				$("#price_total").html(b);
			}
			
		}
		
		
	})
	
	
	//结算
	cartFoot = $("<div class='cart-foot'></div>");
	summaryBox =$("<div class='summary-box'></div>");
	rpadBox = $("<div class='rpad'><span>已选</span><span class='total-select-amount'>"+ cartsnum +"</span><span>件直邮商品</span></div>")
	rpad = $("<div class='rpad-sel'><span class='total-money'>商品总额</span><strong class='size24'>¥<font id='price_total'>"+ cartstotalprice +"</font></strong></div>")
	btnOrange = $("<a class='btn-orange'>境外结算</a>");
	summaryBox.append(rpadBox,rpad,btnOrange);
	cartFoot.append(summaryBox);
	cartFoot.insertBefore($("#footer"));
	$(".btn-orange").click(function(){
		$(".successbox").show();
		$(".success").show();
		
	})
	$(".close").click(function(){
		$(".successbox").hide();
		$(".success").hide();
		cartItems.hide();
		cartThead.hide();
		$(".major").hide();
		cartFootSelect.hide();
		cartFoot.hide();
		$(".cart-num").html(0)
		$(".cart-no-list").show();
		$.cookie("carts", "", {expires:-1, path:"/"});
	})




})
