// globals for tracking load status and sorting posts
var p_mergedPosts = [];
var numOfLoads = 0;

// load the google feed API
google.load("feeds", "1");

// do as soon as the box model is sorted in memory
jQuery(document).ready(function() {
	headerImageRandomizer();
	getBlogRolls();
	var myFeed = new FeedPuller('sydlovesfashion');
	// animation stuff for the image nav section
	$('#servicesNavItem').bind('mouseenter', function() {
		$('#servicesFloat').animate({'top': '475px'}, 300);
		$('#servicesDetail').show(300);
	});
	$('#servicesNavItem').bind('mouseleave', function() {
		$('#servicesFloat').animate({'top': '535px'}, 300);
		$('#servicesDetail').hide(300);
	});

	$('#blogNavItem').bind('mouseenter', function() {
		$('#blogFloat').animate({'top': '285px'}, 300);
		$('#blogDetail').show(300);
	});
	$('#blogNavItem').bind('mouseleave', function() {
		$('#blogFloat').animate({'top': '345px'}, 300);
		$('#blogDetail').hide(300);
	});

	$('#contactNavItem').bind('mouseenter', function() {
		$('#contactFloat').animate({'top': '670px'}, 300);
		$('#contactDetail').show(300);
	});
	$('#contactNavItem').bind('mouseleave', function() {
		$('#contactFloat').animate({'top': '730px'}, 300);
		$('#contactDetail').hide(300);
	});

	$('#aboutNavItem').bind('mouseenter', function() {
		$('#aboutFloat').animate({'top': '670px'}, 300);
		$('#aboutDetail').show(300);
	});
	$('#aboutNavItem').bind('mouseleave', function() {
		$('#aboutFloat').animate({'top': '730px'}, 300);
		$('#aboutDetail').hide(300);
	});
});

// check to see if we're all done loading the content, then display it
var refreshTimer = setInterval(function() {
	if(numOfLoads === 2) {
		displayFeeds();
	}
}, 500);

// get the feed content from both RSS feeds, if more are needed, add the atom urls to this array
function getBlogRolls () {
	(function() {
		function init() {
			var feedURLS = [
					'http://www.blogger.com/feeds/6937616696067509797/posts/default?start-index=1',
					'http://www.blogger.com/feeds/7373101913773587202/posts/default?start-index=1'
				];
			for(var i = 0; i < feedURLS.length; i++) {
				loadFeed({
					url: feedURLS[i],
					divId: 'feed',
					noOfFeed: 10
				});
			}
		}

		function loadFeed(opt_options) {
			var p_perBlogPosts = [];
			var feed = new google.feeds.Feed(opt_options.url);
			feed.setNumEntries(opt_options.noOfFeed);
			feed.load(function(result) {
				if(!result.error) {
					var feeddiv = $('#' + opt_options.divId),
						li = '<li>' + result.feed.link + '</li>',
						divOne = '';
					$('#vtab ul').append(li);
					for(var i = 0; i < result.feed.entries.length; i++) {
						var entry = result.feed.entries[i];
						var fmtDate = entry.publishedDate.substring(0, parseInt(entry.publishedDate.length - 15, 10));
						var entryImageUrl = $(entry.content).find('img').eq(0).attr('src');
						//p_perBlogPosts.push('<li id="articeNum' + i + '"><div class="wrapper"><div class="thumb_container"><a class="thumbLink" target="_blank" href="' + entry.link + '"><img class="thumb" src="' + entryImageUrl + '" width="60" alt=""></a></div></div><div class="text"><span class="date" style="opacity: 1; display: block;">' + fmtDate + '</span><a class="headline" target="_blank" href="' + entry.link + '"><span class="headline-txt">' + entry.title + '</span></a></div><div class="clear"></div></li>');
						p_perBlogPosts.push('<li id="articeNum' + i + '"><div class="text"><span class="date" style="opacity: 1; display: block;">' + fmtDate + '</span><a class="headline" target="_blank" href="' + entry.link + '"><span class="headline-txt">' + entry.title + '</span></a><br/><span class="postBody">'+ entry.contentSnippet +'</span></div><div class="clear" style="border-bottom: 1px solid #EEE;"></div></li>');
					}
				}
				p_mergedPosts.push(p_perBlogPosts);
				numOfLoads++;
			});
		}
		google.setOnLoadCallback(init);
	})();
}

// display the content from both feeds by interlacing the 2 arrays together ordered by post date
function displayFeeds () {
	clearInterval(refreshTimer);
	var len0 = p_mergedPosts[0].length, len1 = p_mergedPosts[1].length;
	var lenToLoop = (len0 >= len1) ? len0 : len1;
	for (var i = 0; i < lenToLoop; i++) {
		$('#post_list').append(p_mergedPosts[0][i]);
		$('#post_list').append(p_mergedPosts[1][i]);
	}
}

function FeedPuller (searchStr) {

	var userVisitTime = new Date();
	var userVisitStamp = userVisitTime.getTime();
	var runCount = 0;
	var p_baseURL = 'http://search.twitter.com/search.json';
	var p_searchStr = '?q='+searchStr;
	var callback = '&callback=getFeed&count=7&rpp=7';
	var refreshURL = '';
	var unreadCount = 0;

	callRestService = function(){
		if (runCount === 0) {
			feedURL = p_baseURL+p_searchStr+callback;
		} else {
			feedURL = refreshURL+callback;
		}
	    var script = document.createElement("script");
	    script.setAttribute("type", "text/javascript");
	    script.setAttribute("src", feedURL);
	    script.setAttribute("style", 'display:none;');
	    script.setAttribute("id", 'feedInjection'+runCount);
	    document.body.appendChild(script);
	};
	

	getFeed = function(result) {
	    var output = [], currLink;
	    var articleIsNew = false;
		runCount++;
		for (var i = 0, len = result.results.length; i < len; i++) {
			var fmtDate = result.results[i].created_at.substring(0, parseInt(result.results[i].created_at.length-6, 10));
			var articleStamp = new Date(result.results[i].created_at);
		    var articleTimeStamp = articleStamp.getTime();
			var urlParser = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
		    var tweetContent = result.results[i].text;
		    var currentTweetLinks = urlParser.exec(tweetContent);
		    if(currentTweetLinks !== null) {
			    if (currentTweetLinks[2].indexOf('http') !== -1) {
					currLink = currentTweetLinks[2];
					tweetContent = tweetContent.replace(currLink, '<a href="'+currLink+'">'+currLink+'</a>');
			    }
			}
		    if (articleTimeStamp > userVisitStamp) {
				unreadCount++;
				articleIsNew = true;
				output.push('<li id="'+i+'_'+runCount+'" class="articleNew"><div class="wrapper"><div class="thumb_container"><span id="newFlag_'+i+'_'+runCount+'" class="date new showing"></span></div></div><div class="text"><span class="date" style="opacity: 1; display: block;">'+fmtDate+'</span><span class="headline-txt">'+tweetContent+'</span></div><div class="clear"></div></li>');
			} else {
				output.push('<li class="articleNum"><div class="wrapper"><div class="thumb_container"></div></div><div class="text"><span class="date" style="opacity: 1; display: block;">'+fmtDate+'</span><span class="headline-txt">'+tweetContent+'</span></div><div class="clear"></div></li>');
			}
	    }
	    $("#tweet_list").prepend(output.join(''));
		$('.articleNew').click(function(){
			$(this).css({'background':'#999'}, 'slow');
			var p_id = $(this).attr('id');
			if ($('#newFlag_'+p_id).hasClass('showing')) {
				$('#newFlag_'+p_id).animate({'opacity': 0.0},1000).removeClass('showing');
				unreadCount--;
			}
		});
	    refreshURL = p_baseURL+result.refresh_url;
	};

	var refreshTimer = setInterval(function() {
				callRestService();
			}, 60000);
	
	callRestService();
}

function headerImageRandomizer () {
	var randomnumber=Math.floor(Math.random()*3);
	$('#tpBanner').attr('src', 'images/topBanner00'+randomnumber+'.jpg');
}