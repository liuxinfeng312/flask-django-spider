$(function(){
	//商品详情主题
	var showInner = $(".show-inner");
	var prev = $(".prev");
	var next = $(".next");
	var bgImg = $(".bg-img");

	showInner.children().mouseenter(function(){
		var index = $(this).index();
		$(this).addClass("pactive").siblings().removeClass("pactive");
		bgImg.find("img").attr("src","img/gooddetail/bg-img"+ (index+1) +".jpg");
		_bigImg.attr("src","img/gooddetail/bg-img"+ (index+1) +".jpg");
		prev.click(function(){
			showInner.children().eq(index-1).addClass("pactive").siblings().removeClass("pactive");
//			bgImg.find("img").attr("src","img/gooddetail/bg-img"+ (index+1) +".jpg");
			console.log(index-1)
		})
		next.click(function(){
			showInner.children().eq(index+1).addClass("pactive").siblings().removeClass("pactive");
			bgImg.find("img").attr("src","img/gooddetail/bg-img"+ (index+1) +".jpg");
			console.log(index+1)
		})
	})
	
	//右侧商品
	var rightImg = $(".right-img");
	var rImgContent = $(".r-img-d");
	var rPrice = $(".price");
	var rightView = $(".right-view");
	var rImgd = $(".r-img-d");
	$.getJSON("json/g-r-v.json",function(data){
		for(var i=0; i<data.length; i++){
			var obj =data[i];
			img = $("<img src=" + obj.img + " />");
			content = obj.content;
			price = obj.price;
			rightImg.eq(i).append(img);
			rImgContent.eq(i).append(content);
			rPrice.eq(i).append(price);
		}
	})

	rightView.find('li').mouseenter(function(){
		$(this).children("div").show();
		$(this).siblings().children("div").hide();
	}).mouseleave(function(){
		$(this).children("div").hide();
	})
	
	
	//放大镜
	var _smallImg = $(".bg-img"); //小图
	var _smallArea = $("#smallArea"); //小区域
	var _bigImg = $("#bigImg"); //大图
	var _bigArea = $("#bigArea"); //大区域
	_smallArea.width(_smallImg.width() / _bigImg.width() * _bigArea.width());
	_smallArea.height(_smallImg.height() / _bigImg.height() * _bigArea.height());
	
	//放大系数(放大倍数)
	var scale = _bigImg.width() / _smallImg.width();
	
	//鼠标移动
	_smallImg.mousemove(function(e) {
	
		_smallArea.show(); //显示小区域
		_bigArea.show();
		//移动小区域, 跟随鼠标移动
		var x = e.pageX - _smallImg.offset().left - _smallArea.width() / 2;
		var y = e.pageY - _smallImg.offset().top - _smallArea.height() / 2;
		//判断x不超出左边界,也不超出右边界
		if(x < 0) {
			x = 0;
		} else if(x > _smallImg.width() - _smallArea.width()) {
			x = _smallImg.width() - _smallArea.width();
		}
		//判断y不超出上边界,也不超出下边界
		if(y < 0) {
			y = 0;
		} else if(y > _smallImg.height() - _smallArea.height()) {
			y = _smallImg.height() - _smallArea.height();
		}
		_smallArea.css({
			left: x,
			top: y
		});
		//移动大图
		_bigImg.css({
			left: -x * scale,
			top: -y * scale
		});
	
	})
	
	//鼠标移出
	_smallImg.mouseleave(function() {
		_smallArea.hide(); //隐藏小区域
		_bigArea.hide();
	})
				
	//相关产品
	var product = $(".product");
	
	$.getJSON("json/g-m-l.json",function(data){
		for(var i=0; i<data.length; i++){
			var obj = data[i];
			img = $("<img src="+ obj.img + "/>");
			a = $("<a href='#'></a>");
			divContent = $("<div></div>");
			divPrice = $("<div></div>");
			a.append(img);
			a.append(divContent);
			a.append(divPrice);
			divContent.append(obj.content);
			divPrice.append(obj.price);
			a.addClass("productA");
			img.addClass("productImg");
			divContent.addClass("productTitle");
			divPrice.addClass("productPrice");
			product.append(a);
		}
	})
	
	//商品参数
	var parmasImg = $(".parmasImg");
	var parmasList = $(".parmasList");
	
	$.getJSON("json/g-m-r.json",function(data){
		for(var i=0; i<data.length; i++){
			var obj= data[i];
			img= $("<img src="+ obj.img +"/>");
			address = $("<li>"+ obj.address +"</li>");
			brand = $("<li>"+ obj.brand +"</li>");
			fit = $("<li>"+ obj.fit +"</li>");
			type = $("<li>"+ obj.type +"</li>");
			parmasImg.append(img);
			parmasList.append(address);
			parmasList.append(brand);
			parmasList.append(fit);
			parmasList.append(type);
		}
	})
	
	//吸顶	
	var majorTabBox = $(".major-tab-box");
	var majorTop = majorTabBox.offset().top;
	var majorTab = $(".major-tab");
	var fixdAddCart = $(".fixd-add-cart");
	
	$(window).off("scroll"); //移除window的scroll事件
	$(window).scroll(function(){
		var scrolltop = $(document).scrollTop();
		if(scrolltop > majorTop){
			majorTabBox.removeClass().addClass("major-tab-box-change");
			majorTab.addClass("major-tab-change");
			fixdAddCart.show();
		}else{
			majorTabBox.removeClass().addClass("major-tab-box");
			majorTab.removeClass().addClass("major-tab");
			fixdAddCart.hide();
		}
	})
	
	//跳转
	var productH2 = $(".product-t");
	var appicon = $(".app-small-icon");
	var bhpicon = $(".bhp-cart-app-icon");
	var triangledown = $(".triangle-icon-down");
	var triangleup = $(".triangle-icon-up");
	
	majorTab.children().click(function(){
		$(this).addClass("curr").siblings().removeClass("curr");
		var index = $(this).index();
		var top = productH2.eq(index).offset().top-100;
		$("body, html").stop().animate({scrollTop: top},500)
	})
	
	appicon.mouseenter(function(){
		bhpicon.show();
		triangledown.hide();
		triangleup.show();
	}).mouseleave(function(){
		bhpicon.hide();
		triangleup.hide();
		triangledown.show();
	})
	
	//购物车添加
	var btnCart = $(".btn-cart");
	var offset = $(".bar-item-cart").offset();  //结束的地方的元素
	var btnoffset = btnCart.offset();
	var cartNum = $(".cart-num");
	var j = 0;
	var dTitle = $(".d-title").children().last();
	var sum = 0;	
	btnCart.click(function(event){
		var addcar = $(this);
		var img = _smallImg.find('img').attr('src');
		var flyer = $('<img class="u-flyer" src="'+img+'">');
//		cartNum.html(++j);
		flyer.fly({
			start: {
				left: btnoffset.left,
				top: (btnoffset.top - $(document).scrollTop())
			},
			
			end: {
				left: offset.left,
				top: 324,
				width: 0,
				height: 0
			}
		});
		
		var carts = $.cookie("carts") ? JSON.parse($.cookie("carts")) : [];
		for(var i=0; i<carts.length; i++){
			sum = cartNum.html();
			if(dTitle.html() == carts[i].name){
				sum++
				num = parseInt(cartNum.html());		
				var num = parseInt(carts[i].num);
				num++;
				console.log(num)
				carts[i].num = num;
				carts[i].totalprice = ($(".newPrice").html()) * num;
				cartNum.html(sum);
				$.cookie("carts", JSON.stringify(carts), {expires:30, path:"/"});
				return;
			}
		}
			
		var cart = {
			img : $(".show-inner").find("img").eq(0).attr("src"),
			name : dTitle.html(),
			spec : $(".sku-selected").html(),
			unitprice : $(".newPrice").html(),
			num : $(".num").val(),
			totalprice : $(".num").val()*$(".newPrice").html()
		}
		carts.push(cart);
		$.cookie("carts", JSON.stringify(carts), {expires:30, path:"/"});
		console.log($.cookie("carts"));
	});
	
	

	$("#another").click(function(){
		var carts = $.cookie("carts") ? JSON.parse($.cookie("carts")) : [];	
		sum = cartNum.html();
		console.log(sum)
		for(var i=0; i<carts.length; i++){
			if($(".d-title").children().first().html() == carts[i].name){
				sum++ ;
				var num = parseInt(carts[i].num);
				num++;			
				carts[i].num = num;
				carts[i].totalprice = ($(".newPrice").html()) * num;
				cartNum.html(sum);
				$.cookie("carts", JSON.stringify(carts), {expires:30, path:"/"});
				
				console.log(carts[i].sum)
				return;
			}
			
		}
		
		var cart = {
			img : $(".show-inner").find("img").eq(0).attr("src"),
			name : $(".d-title").children().first().html(),
			spec : $(".sku-selected").html(),
			unitprice : $(".newPrice").html(),
			num : $(".num").val(),
			totalprice : $(".num").val()*$(".newPrice").html()
		}
		carts.push(cart);
		$.cookie("carts", JSON.stringify(carts), {expires:30, path:"/"});
		
	})
	

	
	
	
	
	
	
	
	
	
	
	var carts = $.cookie("carts");
	carts = JSON.parse(carts);
	for(var i=0; i<carts.length; i++){
		cartNum.html(carts[i].num);
	}
	
	
})