/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  const data = [
    // {
    //   "user": {
    //     "name": "Newton",
    //     "avatars": "https://i.imgur.com/73hZDYK.png"
    //     ,
    //     "handle": "@SirIsaac"
    //   },
    //   "content": {
    //     "text": "If I have seen further it is by standing on the shoulders of giants"
    //   },
    //   "created_at": 1461116232227
    // },
    // {
    //   "user": {
    //     "name": "Descartes",
    //     "avatars": "https://i.imgur.com/nlhLi3I.png",
    //     "handle": "@rd" },
    //   "content": {
    //     "text": "Je pense , donc je suis"
    //   },
    //   "created_at": 1461113959088
    // }
  ]

  const renderTweets = function(tweets) {
    tweets.forEach(tweet => {
      $('.tweet-container').append(createTweetElement(tweet));
    });
  }
  // render function using map
  // const renderTweets = function(tweets) {
  //   const result = tweets.map(tweet => {
  //     $('.tweet-container').append(createTweetElement(tweet));
  //   });
  // }

  const createTweetElement = function(tweet) {
    let $tweet = $(`
      <article>
      <div class="tweeter-user">
        <div>
          <span>${tweet.user.avatars}</span>
          <span>${tweet.user.name}</span>
        </div>
        <div>
          <span>${tweet.user.handle}</span>
        </div>
      </div>
      
      <div class="actual-tweet">
        <p>${tweet.content.text}</p>
      </div>
      
      <div class="timestamp-engagement">
        <div>
          <span>${tweet.created_at}</span>
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
    `)
    return $tweet;
  };

  renderTweets(data);

  const $form = $(`.load-tweets`);
  $form.on("submit", function (event) {
    event.preventDefault();
    const serializedData = $(`#tweet-text`).serialize();
    console.log($(`#tweet-text`).serialize());

    $.post("/tweets/", serializedData, function(data, status) {
      console.log(data, status);
    })
  })

  const loadTweets = function() {
    $.ajax({
      url: "/tweets/",
      type: "GET",
      dataType: "json",
      success: function(res) {
        console.log(res);
        renderTweets(res);
      } 
    })
  }

  loadTweets();

});

