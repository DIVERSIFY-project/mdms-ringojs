(function () {
  function update(e) {
    document.getElementById('out').innerHTML = marked(e.getValue());
  }

  var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
    mode: 'gfm',
    lineNumbers: true,
    matchBrackets: true,
    lineWrapping: true,
    theme: 'default',
    onChange: update
  });

  // register listener for save button
  $('#save').click(function () {
    var title = $('#title').val();
    var content = editor.getValue();

    if (title.length > 0 && content.length > 0) {
      $.ajax({
        type: 'POST',
        url: 'save',
        data: {
          title: title,
          content: editor.getValue()
        },
        success: function () {
          window.location.replace("index");
          return false;
        },
        error: function (err) {
          console.log('Add failed', err);
          $('#form-alert').removeClass('hide');
          return false;
        }
      });
    } else {
      $('#form-alert').removeClass('hide');
    }

    return false; // prevent form from being submitted
  });

  // register listener for alert .close button
  $('.close').click(function () {
    $(this).parent().addClass('hide');
  });
})();