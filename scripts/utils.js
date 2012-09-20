// global async loader for google feed JSAPI
google.load("feeds", "1");
google.setOnLoadCallback(initialize);

// parse the feed and append the results to the
function initialize() {
	var feed = new google.feeds.Feed(feedURL);
	feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
	feed.setNumEntries(10);
	feed.load(function(result) {
		if (!result.error) {
			for (var i = 0; i < result.feed.entries.length; i++) {
				var entry = result.feed.entries[i];
				// if($.inArray('gng', entry.categories) !== -1) {
					var fmtDate = entry.publishedDate.substring(0, parseInt(entry.publishedDate.length-15, 10));
					var entryImageUrl = $(entry.content).find('img').eq(0).attr('src');
					$('#post_list').append(
						'<li id="articeNum'+i+'"><div class="wrapper"><div class="thumb_container"><a class="thumbLink" href="'+entry.link+'"><img class="thumb" src="'+entryImageUrl+'" width="60" alt=""></a></div></div><div class="text"><span class="date" style="opacity: 1; display: block;">'+fmtDate+'</span><a class="headline" href="'+entry.link+'"><span class="headline-txt">'+entry.title+'</span></a></div><div class="clear"></div></li>'
						);
				// }
			}
		} else {
			$('#feedWrapper').html("oops, something went wrong with our feed, please click <a href='http://www.sydneylovesfashion.com/'>here</a> to visit Sydney's blog");
		}
	});
}