$(function(){
	//手机APP下载
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
	
	
	//导航栏
	var navcon = $(".navcon").eq(0);
	var navInner = $("#navcontent");
	var navSlider = $("#slider");
	navcon.find("li:gt(0)").mouseenter(function(){
		var index = $(this).index()-1;
	    navInner.children().eq(index).show().siblings().hide();
	    navInner.children().eq(index).mouseenter(function(){
	    	$(this).show();
	    }).mouseleave(function(){
			$(this).hide();
		})
	    navSlider.mouseenter(function(){
	    	navInner.children().eq(index).show().siblings().hide();
	    })
	    console.log($(this).offset().left)
	     console.log(navSlider.width())
	      console.log($(this).width())
	    console.log($(this).offset().left-navSlider.width()-$(this).width())
	    navSlider.animate({left:($(this).offset().left-navSlider.width()-$(this).width()-31)},100);
	}).mouseleave(function(){
		navInner.children().hide();
	})    
    //导航栏吸顶
    var nav=$("#nav");
    if (nav.offset()) {
    	var navTop = nav.offset().top;
		var phoneNum = $(".phoneNum").eq(0);
		var cart = $(".cart").eq(0);
		
		$(window).scroll(function(){
			var _scrollTop = $(document).scrollTop();
				if(_scrollTop >= navTop) {
					nav.removeClass().addClass("ceiling")//显示
					navcon.find("ul").find("li:gt(0)").children().css({color:"black"})
					phoneNum.show();
					cart.show();
					navcon.find("ul").find("li").eq(0).addClass("menuNew");
					navcon.find("ul").find("li").eq(0).children().css({fontSize:0});
					
				}
				else{
					nav.removeClass("ceiling"); //隐藏
					navcon.find("ul").find("li").children().css({color:"white"})
					phoneNum.hide();
					cart.hide();
					navcon.find("ul").find("li").eq(0).removeClass("menuNew");
					navcon.find("ul").find("li").eq(0).children().css({fontSize:14});
				}
		})
    }
	
	
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

	
})
