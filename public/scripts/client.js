
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//import { text } from "express";

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
    $labelTimeAgo.text(new Date(tweetData.created_at));

    
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
    event.preventDefault();
    const formData = $form.serialize();
    if (formData.length === 5) {
      $('.error').css('visibility','visible');
    } else if (formData.length > 145) {
      $('.error').css('visibility','visible');

    } else {
      $('.error').css('visibility','hidden');
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