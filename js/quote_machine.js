<!--include twitter website widget-->
window.twttr = (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0], t = window.twttr || {};
      if (d.getElementById(id)) return t;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);
      t._e = [];
      t.ready = function(f) {
          t._e.push(f);
      };
      return t;
}(document, "script", "twitter-wjs"));
//get random quote JSON file
var twitterPrefix = "https://twitter.com/intent/tweet?text="
var getQuote = function(){
    $.ajax({
        url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=mycallback",
        dataType: "jsonp",
        jsonpCallback: "mycallback", //important! specify the callback function name corresponding to the url link
        success: function(data) {
            var quote = "";
            var post = data.shift(); // The data is an array of posts. Grab the first one.

            quote = ('"' + $(post.content).html() + '"  ' + post.title);//console.log(quote);

            $('#quote-author').text(post.title);
            $('#quote-text').html(post.content);

            $('#twitter-share-button').attr("href",twitterPrefix+encodeURIComponent(quote)); //change twitter intent default
            //console.log($(".twitter-share-button").html());
            // If the Source is available, use it. Otherwise hide it.
            if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
                $('#quote-source').html('Source:' + post.custom_meta.Source);
            } else {
                $('#quote-source').text('');
            }
        },
        cache: false,
        error: function(){
            console.log("error!!");
        }
    });
};
//$(".twitter-share-button").attr("href", twitterPrefix+quote)
$(document).ready(function(){
    getQuote(); //initial quote
    $("#get-another-quote").on("click", getQuote); //change Quote when click on botton
    });
