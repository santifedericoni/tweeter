
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

$(document).ready(function() {
  const $form = $('form');

  const renderTweets = function(tweets) {
    // loops through tweets
    for (tweet of tweets) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  };

  const createTweetElement = function(tweetData) {
    const $article = $('<article>');
    const $sectionProfile = $('<section>');
    const $divProfile = $('<div>');
    const $imgProfile = $('<img>');
    const $labelName = $('<label>');
    const $divTag = $('<div>');
    const $labelTag = $('<label>').addClass('tag');
    const $sectionTweet = $('<section>').addClass('old-tweet-text');
    const $labelTweet = $('<label>');
    const $sectionBelow = $('<section>').addClass('below');
    const $labelTimeAgo = $('<label>');
    const $sectionIcons = $('<section>');
    const $flag = $('<i>').addClass('fas fa-flag');
    const $share = $('<i>').addClass('fas fa-retweet');
    const $like = $('<i>').addClass('fas fa-heart');

  
    $labelName.text(tweetData.user.name);
    $imgProfile.attr("src", tweetData.user.avatars);
    $labelTag.text(tweetData.user.handle);
    $labelTweet.text(tweetData.content.text);
    $labelTimeAgo.text(moment(new Date(tweetData.created_at)).fromNow());

    $divTag.append($labelTag);

    $divProfile.append($imgProfile, $labelName);

    $sectionProfile.append($divProfile, $divTag);
    
    $sectionTweet.append($labelTweet);

    $sectionIcons.append($flag, $share, $like);
    $sectionBelow.append($labelTimeAgo, $sectionIcons);

    $article.append($sectionProfile, $sectionTweet, $sectionBelow);

    return $article;
  };

  $form.on('submit', (event) => {
    $('.error').css('display','none');
    $('.error2').css('display','none');
    event.preventDefault();
    const formData = $form.serialize();
    if (formData.length === 5) {
      $('.error').css('display','contents');
    } else if (formData.length > 145) {
      $('.error2').css('display','contents');

    } else {
      $('.error').css('display','none');
      $.post('/tweets', formData)
        .then((res) => {
          $('#tweet-text').val('');
          $('#tweets-container').empty();
          loadTweets();
        });
    }
  });
  
  const loadTweets = () => {
    $.get("/tweets")
      .then((data) => {
        renderTweets(data);
      });
  };

  loadTweets();

});