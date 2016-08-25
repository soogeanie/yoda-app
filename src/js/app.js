$(function() {
  firebase.database().ref('yodaisms/').on('value', renderYodaism);

  var yodaismSource   = $("#results-template").html();
  var yodaismTemplate = Handlebars.compile(yodaismSource);

  $resultContainer = $('#yodaism-results');
  $submitBtn = $('#submit-yodaism');
  $yodaismInput = $('#input-sentence');

  $resultContainer.on('click', '.favorite-ism', favoriteYodaism);
  $resultContainer.on('click', '.delete-ism', deleteYodaism);

  $('#create-yodaism').submit(function(event) {
    event.preventDefault();

    var humanPhrase = $('#create-yodaism').find('input[name="plain-speak"]').val();

    createYodaism(humanPhrase);
  });

  function createYodaism(phrase) {
    $.ajax({
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-Mashape-Key', 'PRWWlW5pzKmshjnG01V87RxYvFoBp1nO8KUjsnBIZhGQeiE8Bk');

        $submitBtn.attr('disabled', 'disabled');
      },
      url: 'https://yoda.p.mashape.com/yoda',
      data: {
        sentence: phrase
      },
      method: 'GET',
      success: function(response) {
        saveYodaism(response);

        $submitBtn.removeAttr('disabled');
        $yodaismInput.val('');
      },
      error: function() {
        console.log('Something went wrong');
      }
    });
  }

  function saveYodaism(yodaism) {
    firebase.database().ref('yodaisms/').push({
      sentence: yodaism,
      favorite: false
    });
  }

  function renderYodaism(data) {
    $resultContainer.empty();

    var isms = data.val();

    for(var id in isms) {
      var ism = isms[id];

      $resultContainer.append(yodaismTemplate({
        id: id,
        sentence: ism.sentence,
        favorite: ism.favorite
      }));
    }
  }

  function favoriteYodaism() {
    var id = $(this).data('id');
    var sentence = $(this).parent().find('span').text();
    var favorite = false;

    if(!$(this).hasClass('active')) {
      favorite = true;
    }

    firebase.database().ref('yodaisms/' + id).set({
      favorite: favorite,
      sentence: sentence
    });
  }

  function deleteYodaism() {
    var id = $(this).data('id');

    firebase.database().ref('yodaisms/' + id).remove();
  }
});
