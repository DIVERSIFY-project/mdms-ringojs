(function () {
  // hover article show edit buttons
  $('.article').hover(function () {
    $(this).find('.article-btn').toggleClass('hide');
  });
})();