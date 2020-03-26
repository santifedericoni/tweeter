/* eslint-disable no-undef */

$(document).ready(function() {
  let result = $('.counter').val();
  $('#tweet-text').keyup(function() {
    let text = $('#tweet-text').val();
    $('.counter').val(result - text.length);
    if (text.length > 140) {
      $('.counter').css('color','red');
    } else {
      $('.counter').css('color','black');
    }
  });
});

