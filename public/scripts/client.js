/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Prepends each tweet to the tweet-container section
  const renderTweets = function(tweets) {
    tweets.forEach(tweet => {
      $('.tweet-container').prepend(createTweetElement(tweet));
    });
  };

  // escape function to prevent cross site scripting
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Turn tweet object into HTML format
  const createTweetElement = function(tweet) {
    
    // Implementation of timeago function
    const ago = timeago.format(tweet.created_at);

    // HTML script for each tweet
    const $tweet = $(`
      <article>
      <div class="tweeter-user">
        <div>
          <img src="${tweet.user.avatars}" alt="${tweet.user.name} avatar" class="tweeter-avatar">
          <span>${tweet.user.name}</span>
        </div>
        <div>
          <span>${tweet.user.handle}</span>
        </div>
      </div>
      
      <div class="actual-tweet">
        <p>${escape(tweet.content.text)}</p>
      </div>
      
      <div class="timestamp-engagement">
        <div>
          <span>${ago}</span>
        </div>
        <div>
          <span>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </span>
        </div>
      </div>
      </article>
    `);
    return $tweet;
  };

  const $form = $(`.load-tweets`);
  // Event listener for the "submit" event
  $form.on("submit", function(event) {
    event.preventDefault();
    // Serialize form data to JSON string before sending to server
    const serializedData = $(this).serialize();

    const tweetLength = $("#tweet-text").val().length;

    // Display error if user tries to post empty tweet
    if (tweetLength === 0) {
      return $('.error-container-empty').slideDown();
    }

    // Display error if user tries to post tweet over 140 characters
    if (tweetLength > 140) {
      return $('.error-container-lengthy').slideDown();
    }

    // AJAX POST request that sends form data to the server
    $.post("/tweets/", serializedData, function(data, status) {})
      .then(function(tweet) {
        // Displays necessary error message(s) if necessary
        $('.error-container-empty').slideUp();
        $('.error-container-lengthy').slideUp();
      })
      .then(function(tweet) {
        // Reloads tweets after a new tweet is posted
        loadTweets();
      })
      .then(function(tweet) {
        // Clears textarea after tweet is posted
        $('textarea').val('');
        // Reset character counter
        $('.counter').text(140);
      });
  });

  // AJAX GET request to get data and prepend tweet to tweet-container section
  const loadTweets = function() {
    $.ajax({
      url: "/tweets/",
      type: "GET",
      dataType: "json",
      success: function(res) {
        $('.tweet-container').empty();
        renderTweets(res);
      }
    });
  };

  // Load existing tweets upon page load
  loadTweets();

});
