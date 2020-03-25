/* eslint-disable no-undef */

$(document).ready(function() {
  let result = $('.counter').val();
  $('#tweet-text').keyup(function() {
    let text = $('#tweet-text').val();
    $('.counter').val(result - text.length);
    text.length > 140 ?  $('.counter').css('color','red') : $('.counter').css('color','black');
  });
});

