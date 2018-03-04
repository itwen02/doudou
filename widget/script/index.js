var recomendScroll = 0;
var followScroll = 0;
var currentTab = 1;
var recomendRefreshEnable = true;
var followRefreshEnable = true;

var pullRefresh;

apiready = function() {
	api.parseTapmode();
}

window.onload = function() {
	tabSetting();
	//滚动监听
	scrollListener();
	pullRefreshSetting();

	//加载推荐选项内容
	pullRecommendRefresh();
	//加载关注选项内容
	pullFollowRefresh();

};

/**
 * 选项卡设置
 */
function tabSetting() {
	var tab = new auiTab({
		element: document.getElementById("tab"),
	}, function(ret) {
		currentTab = ret.index;

		//记录滚动位置
		if(currentTab == 1) {
			scrollTo(0, recomendScroll);
		} else if(currentTab == 2) {
			scrollTo(0, followScroll);
		}

		//tab 显示与隐藏
		var contentItems = document.getElementsByClassName("m-tab-content-item");
		for(var i = 0; i < contentItems.length; i++) {
			contentItems[i].classList.remove("m-show");
			contentItems[i].classList.add("m-hide");
		}

		var name = ret.dom.getAttribute("data-name");
		var currentTabContent = document.getElementsByClassName(name)[0];
		currentTabContent.classList.remove("m-hide");
		currentTabContent.classList.add("m-show");
	});
}

/**
 * 页面滚动监听
 */
function scrollListener() {
	/**
	 * 滚动监听
	 */
	var scroll = new auiScroll({
		listen: true,
		distance: 100, //判断到达底部的距离，isToBottom为true,
	}, function(ret) {

		/**
		 * 判断选项 上拉加载
		 */
		if(currentTab == 1) {
			recomendScroll = ret.scrollTop;

			if(ret.isToBottom && ret.scrollTop > 0 && recomendRefreshEnable) {
				recomendRefreshEnable = false;
				recomendRefresh();
			}

		} else if(currentTab == 2) {
			followScroll = ret.scrollTop;

			if(ret.isToBottom && ret.scrollTop > 0 && followRefreshEnable) {
				followRefreshEnable = false;
				followRefresh();
			}
		}
	});

}

/**
 * 下拉刷新设置
 */
function pullRefreshSetting() {
	/**
	 * 下拉刷新设置
	 */
	pullRefresh = new auiPullToRefresh({
		container: document.querySelector('.m-tab-content'),
		triggerDistance: 100
	}, function(ret) {

		console.log(ret);

		if(ret.status == "success") {

			// 判断刷新选项
			if(currentTab == 1) {
				pullRecommendRefresh();
			} else if(currentTab == 2) {
				pullFollowRefresh();
			}

		}
	});
}

/**
 * 加载推荐选项卡
 */
function recomendRefresh() {
	var wrap = document.getElementById("recommend-group-data");
	wrap.insertAdjacentHTML("beforeEnd", getLoadding("加载中……"));
	setTimeout(function() {
		console.log("加载推荐成功");
		recomendRefreshEnable = true;

		//closeLoadding(wrap);//刷新成功后调用此方法隐藏
	}, 1500);
}

/**
 * 加载关注选项卡
 */
function followRefresh() {
	var wrap = document.getElementById("follow-group-data");
	wrap.insertAdjacentHTML("beforeEnd", getLoadding("加载中……"));
	setTimeout(function() {
		console.log("加载关注成功");
		followRefreshEnable = true;

		//closeLoadding(wrap);//刷新成功后调用此方法隐藏
	}, 1500);
}

/**
 * 推荐选项刷新
 */
function pullRecommendRefresh() {
	setTimeout(function() {
		console.log("推荐刷新成功");
		if(pullRefresh) {

			pullRefresh.cancelLoading(); //刷新成功后调用此方法隐藏
		}

	}, 1500);
}

/**
 * 关注选项刷新
 */
function pullFollowRefresh() {
	var wrap = document.getElementById("follow-group-data");
	setTimeout(function() {
		console.log("关注刷新成功");
		if(pullRefresh) {
			pullRefresh.cancelLoading(); //刷新成功后调用此方法隐藏
		}
	}, 1500)
}