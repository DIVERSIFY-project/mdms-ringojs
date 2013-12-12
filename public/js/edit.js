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

  // when page is loaded, update content
  $(function () { update(editor); });

  // register listener for save button
  $('#save').click(function () {
    var id = parseInt($(this).attr('data-article'));
    var title = $('#title').val();
    var content = editor.getValue();

    if (title.length > 0 && content.length > 0) {
      $.ajax({
        type: 'POST',
        url: 'save',
        data: {
          id: id,
          title: title,
          content: content
        },
        success: function () {
          window.location.replace("index");
          return false;
        },
        error: function (err) {
          console.log('Save failed', err);
          $('#form-alert').removeClass('hide');
          return false;
        }
      });
    } else {
      $('#form-alert').removeClass('hide');
    }

    return false;
  });

  // register listener for alert .close button
  $('.close').click(function () {
    $(this).parent().addClass('hide');
  });
})();