// globals for tracking load status and sorting posts
var p_mergedPosts = [];
var numOfLoads = 0;

// load the google feed API
google.load("feeds", "1");

// check to see if we're all done loading the content, then display it
var refreshTimer = setInterval(function() {
	if(numOfLoads === 2) {
		displayFeeds();
	}
}, 500);

// get the feed content from both RSS feeds, if more are needed, add the atom urls to this array
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
					p_perBlogPosts.push('<li id="articeNum' + i + '"><div class="text"><span class="date" style="opacity: 1; display: block;">' + fmtDate + '</span><a class="headline" target="_blank" href="' + entry.link + '"><span class="headline-txt">' + entry.title + '</span></a><br/><span class="postBody">'+ entry.contentSnippet +'</span></div><div class="clear"></div></li>');
				}
			}
			p_mergedPosts.push(p_perBlogPosts);
			numOfLoads++;
		});
	}
	google.setOnLoadCallback(init);
})();

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