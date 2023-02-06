$(document).ready(function() {
  $("#tweet-text").keyup(function() {
    let $counter = $(".counter");
    const counterValue = 140 - $(this).val().length;
    $counter.text(counterValue);
    if (counterValue < 0) {
      $counter.addClass("red");
    } else {
      $counter.removeClass("red");
    }
  });
});
