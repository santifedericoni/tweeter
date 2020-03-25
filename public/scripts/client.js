
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//import { text } from "express";

$(document).ready(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const renderTweets = function(tweets) {
    // loops through tweets
    for (tweet of tweets) {
      $('#tweets-container').append(createTweetElement(tweet));
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

  renderTweets(data);
});