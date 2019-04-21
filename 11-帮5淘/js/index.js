$(function(){
	
	var slide = $("#slide");
	var btn = $("#btn");
	var btnLi = $("#btn li");
	
	//轮播图
	$.getJSON("json/slideShow.json", function(data){
		for (var i=0; i<data.length; i++) {
			var obj = data[i];			
			li = $("<li><a href=‘#’><img src=" + obj.img + " /></a></li>");
			li.addClass("active");
			slide.append(li);
		}	
		var slideLi = $("#slide li");
		slideLi.first().clone().appendTo(slide);
		var size=slideLi.length;
		var i=0;
		var timer=setInterval(function(){
			i++;
			move();
		},3000)
		
		function move() {	
			if (i < 0) {
				slide.css("left", -(size-1)*955); 
				i = size-1; 
			}
			if (i >= size+1 ) {
				slide.css("left", 0); 
				i = 1; 
			}
			slide.stop().animate({left: -i*955},500);
			//按钮的选中状态改变
			btnLi.eq(i).removeClass().addClass("active").siblings().removeClass("active")
			if (i == size) {
				btnLi.eq(0).removeClass().addClass("active").siblings().removeClass("active")
			}
		}
		
		btnLi.mouseenter(function(){
			clearInterval(timer);
			var index = $(this).index();
				i = index;
				move();
		})
		
		slide.mouseenter(function(){
			clearInterval(timer);
		}).mouseleave(function(){
			clearInterval(timer);
			timer=setInterval(function(){
				i++;
				move();
			},3000)
		})
	})

	//限时抢购
	var item = $(".item");
	var itemImg = $(".itemImg");
	var itemTitle = $(".itemTitle");
	var itemSub = $(".itemSub");
	var newPrice = $(".newPrice");
	var oldPrice = $(".oldPrice");

	$.getJSON("json/timeLimit.json",function(tdata){
			for (var i=0; i<tdata.length; i++) {
				var obj = tdata[i];
				img = $("<img src=" + obj.img + " />");
				Title = obj.itemTitle; 
				Sub = obj.itemSub;
				nPrice = obj.newPrice;
				oPrice = obj.oldPrice;
				img.addClass("img");
				itemImg.eq(i).append(img);
				itemTitle.eq(i).html(Title);
				itemSub.eq(i).html(Sub);
				newPrice.eq(i).html(nPrice);
				oldPrice.eq(i).html(oPrice);
				
			}
	})
		
	//人气热销	
    var proImg = $(".pro-img");
    var proTitle = $(".pro-title");
    var psnPrice = $(".psnPrice");
    var psoPrice = $(".psoPrice");
    var proPic = $(".pro-pic");
    var infoTitle = $(".info-title");
    var pnPrice = $(".pn-price");
    var poPrice = $(".po-price");
	var pTitle = $(".p-title");
	var pShow = $(".p-show");
	var lt = $(".lt");
	var gt = $(".gt");
	var bSlide = $(".b-slide");
	var bShow = $(".b-show");
	
	pTitle.find("li").children().mouseenter(function(){
		var index = $(this).parent().index();
		$(this).removeClass().addClass("p-tab");
		$(this).parent().siblings().children().removeClass("p-tab");
		pShow.children().eq(index).show().siblings().hide();
	})
	
	$.getJSON("json/popular.json",function(pdata){
		for(var i=0; i<pdata.length; i++){
			var obj = pdata[i];
			img = $("<img src=" + obj.img + " />");
			pTitle = obj.title;
			pSnPrice = obj.psnPrice;
			pSoPrice = obj.psoPrice;
			proImg.eq(i).append(img);
			proTitle.eq(i).html(pTitle);
			psnPrice.eq(i).html(pSnPrice);
			psoPrice.eq(i).html(pSoPrice);
		}
	})

	$.getJSON("json/pbrand.json",function(pbdata){
		for(var i=0; i<pbdata.length; i++){
			var obj = pbdata[i];
			img = $("<img src=" + obj.img + " />");
			pTitle = obj.title;
			img.addClass("proimg")
			pSnPrice = obj.psnPrice;
			pSoPrice = obj.psoPrice;
			proPic.eq(i).append(img);	
			infoTitle.eq(i).html(pTitle);
			pnPrice.eq(i).html(pSnPrice);
			poPrice.eq(i).html(pSoPrice);
		}
	})
	
	lt.click(function(){
		bSlide.find("a").first().hide();
		bSlide.find("a").last().show();
		lt.css({color : "lightgray"});
		gt.css({color : "#7b7c7d"});
		bShow.find("li").last().show();
		bShow.find("li").first().hide();
	})
	
	gt.click(function(){
		bSlide.find("a").last().hide();
		bSlide.find("a").first().show();
		gt.css({color : "lightgray"});
		lt.css({color : "#7b7c7d"});
		bShow.find("li").last().hide();
		bShow.find("li").first().show();
	})
	
	//新品上架
	var goodsMajor = $(".goodsMajor");
	var goodsTab = $("#goodsTab").find("li");
	var lwing = $(".lwing");
    var cbody = $(".cbody");
    var rwing = $(".rwing");
    var glwing = $(".glwing");
    var gcbody = $(".gcbody");
    var grwing = $(".grwing");
    var nroImg = $(".nro-img");
    var nroTitle = $(".nro-title");
    var nsnPrice = $(".nsnPrice");
    var nsoPrice = $(".nsoPrice");
	var j = 0;

	goodsTab.children().mouseenter(function(){
		var index = $(this).parent().index();
		$(this).removeClass().addClass("p-tab");
		$(this).parent().siblings().children().removeClass("p-tab");
		goodsMajor.eq(index).show();
		goodsMajor.eq(1-index).hide();
		
	})
	
	$.getJSON("json/newscom.json",function(ndata){
		lwing.append($("<img src=" + ndata[0].img + " />"));
		cbody.append($("<img src=" + ndata[1].img + " />"));
		rwing.append($("<img src=" + ndata[2].img + " />"));
		for(var i=3; i<ndata.length; i++){
			var obj = ndata[i];
			img = $("<img src=" + obj.img + " />");
			nTitle = obj.title;
			img.addClass("nproimg")
			nSnPrice = obj.psnPrice;
			nSoPrice = obj.psnPrice;
			nroImg.eq(j).append(img);	
			nroTitle.eq(j).html(pTitle);
			nsnPrice.eq(j).html(pSnPrice);
			nsoPrice.eq(j).html(pSoPrice);
			j++;
		}
	})
	
	$.getJSON("json/newsclothe.json",function(ncdata){
		glwing.append($("<img src=" + ncdata[0].img + " />"));
		gcbody.append($("<img src=" + ncdata[1].img + " />"));
		grwing.append($("<img src=" + ncdata[2].img + " />"));
		for(var i=3; i<ncdata.length; i++){
			var obj = ncdata[i];
			img = $("<img src=" + obj.img + " />");
			nTitle = obj.title;
			img.addClass("nproimg")
			nSnPrice = obj.psnPrice;
			nSoPrice = obj.psnPrice;
			nroImg.eq(j).append(img);	
			nroTitle.eq(j).html(pTitle);
			nsnPrice.eq(j).html(pSnPrice);
			nsoPrice.eq(j).html(pSoPrice);
			j++;
		}
	})
	
	//随便看看
	var seeRight = $(".seeRight");
	var seeList = $(".seeList");
	var purchase = $(".purchase")
	$.getJSON("json/havelook.json",function(data){
		for(var i=0; i<8; i++){
			var obj = data[i];
			li = $("<li><a href=‘#’><img src=" + obj.img + " /></a></li>");
			h4 = $("<h4>"+ obj.title +"</h4>");
			div = $("<div></div>");
			newPrice = $("<span>"+ obj.newprice +"</span>");
			oldPrice = $("<span>"+ obj.oldprice +"</span>");
			newPrice.addClass("seenewprice");
			oldPrice.addClass("seeoldprice");
			seeList.eq(0).append(li);
			li.find("a").append(h4);
			li.find("a").append(div);
			div.append(newPrice);
			div.append(oldPrice);
		}
		for(var i=8; i<data.length; i++){
			var obj = data[i];
			li = $("<li><a href=‘#’><img src=" + obj.img + " /></a></li>");
			h4 = $("<h4>"+ obj.title +"</h4>");
			div = $("<div></div>");
			newPrice = $("<span>"+ obj.newprice +"</span>");
			oldPrice = $("<span>"+ obj.oldprice +"</span>");
			newPrice.addClass("seenewprice");
			oldPrice.addClass("seeoldprice");
			seeList.eq(1).append(li);
			li.find("a").append(h4);
			li.find("a").append(div);
			div.append(newPrice);
			div.append(oldPrice);
			purchase.eq(1).css({marginTop : "20px"})
		}
	})
	
	//品牌推荐
	var litbrand = $(".litbrand");
	$.getJSON("json/brandshow.json",function(data){
		for(var i=0; i<data.length; i++){
			var obj = data[i];
			a = $("<a href=‘#’><img src=" + obj.img + " /></a>");
			litbrand.append(a);
		}
	})
	
	//倒计时 
	var timer=setInterval(function(){
		var endtime = new Date($(".lxftime").attr("endtime")).getTime();
		var nowtime = new Date().getTime();
		var youtime = endtime-nowtime;
		var seconds = youtime/1000;
		var minutes = Math.floor(seconds/60);
		var hours = Math.floor(minutes/60);
		var days = Math.floor(hours/24);
		var CDay= days ;
		var CHour= hours % 24;
		var CMinute= minutes % 60;
		var CSecond= Math.floor(seconds%60);
			seconds--;
		$(".lxftime").html("<i>剩余时间：</i><span>"+days+"</span><em>天</em><span>"+CHour+"</span><em>时</em><span>"+CMinute+"</span><em>分</em><span>"+CSecond+"</span><em>秒</em>");	
	},1000)
	
	var timer=setInterval(function(){
		var endtime = new Date($(".lxftime1").attr("endtime")).getTime();
		var nowtime = new Date().getTime();
		var youtime = endtime-nowtime;
		var seconds = youtime/1000;
		var minutes = Math.floor(seconds/60);
		var hours = Math.floor(minutes/60);
		var days = Math.floor(hours/24);
		var CDay= days ;
		var CHour= hours % 24;
		var CMinute= minutes % 60;
		var CSecond= Math.floor(seconds%60);
			seconds--;
		$(".lxftime1").html("<span>"+CHour+"</span><em>时</em><span>"+CMinute+"</span><em>分</em><span>"+CSecond+"</span><em>秒</em>");	
	},1000)

	$(".popularity").find("a").mouseenter(function(){
		console.log()
		$(this).find("img").animate({width:"100%",height:"100%"},200)
	}).mouseleave(function(){
		$(this).find("img").animate({width:"90%",height:"90%"},200)
	})

	//获取购物车
	var carts = $.cookie("carts");
	var cartNum = $(".cart-num");
	carts = JSON.parse($.cookie("carts"));
	for(var i=0; i<carts.length; i++){
		cartNum.html(carts[i].num);
	}

	
	

	
	
	
	
	
	
	

	
	
})
