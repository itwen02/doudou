footerSetting();
onHrefListener();
/**
 * 底部导航栏跳转设置
 */
function footerSetting() {
	var footer = document.getElementById("footer");
	if(!footer){
		return;
	}
	var index = footer.getAttribute("data-index");

	console.log(index);
	var tab = new auiTab({
		element: footer,
		index: index
	}, function(ret) {
		console.log(ret);
		location.href = ret.dom.getAttribute("data-href");
	});
}

/**
 * 获取加载元素
 * @param {Object} loaddingText
 */
function getLoadding(loaddingText) {
	var html = "<div class = 'm-loadding'>" + loaddingText + "</div>";
	return html;
}

/**
 * 删除加载元素
 * @param {Object} el
 */
function closeLoadding(el) {
	var loadding = el.getElementsByClassName("m-loadding")[0];
	if(loadding) {
		loadding.remove();
	}
}

/**
 * tab 监听跳转
 */
function onHrefListener(){
	var hrefs = document.getElementsByClassName("m-href");
	
	for(var i= 0; i < hrefs.length; i++){
		hrefs[i].addEventListener("click", function(){
			//console.log(this);
			var href = this.getAttribute("data-href");
			if(href){
				location.href = href;
			}
		}, false);
	}
}
