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
					$('#feedWrapper').append(
						'<div class="feedContent" id="articleNum'+i+'">'
						+'<p class="title"><a href="'+entry.link+'">'+entry.title+'</a></p>'
						+'<p class="date">'+fmtDate+'</p>'
						+'<p>'+entry.contentSnippet+'</p>'
						//+'<img src="'+entryImageUrl+'" />'
						//+'<div class="mainContent">'+entry.content+'</div>'
						+'</div>'
					);
				// }
			}
		}
	});
}