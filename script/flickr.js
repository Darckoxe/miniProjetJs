$(function() {
  function rechercheJSONFlickr(query, parPage) {
    var url = "http://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=e33c23d5049a7016254b86a01201e648&text="+query+"&per_page="+parPage+"&format=json&nojsoncallback=1";
    var images = $.getJSON(url);
    return images;
  }

  $('#formRecherche').submit(function(event) {
    event.preventDefault();

    $.ajax({
      type: 'GET',
      url: 'https://api.flickr.com/services/rest/',
      data: {
        method : "flickr.photos.search",
        api_key : "e33c23d5049a7016254b86a01201e648",
        tags : $('#nomCommune').val(),
        per_page : $('#nbPhotos').val(),
        format : "json",
        nojsoncallback : 1
      },
      dataType: 'json',
      success: function(data) {
        $('#tabs-1 #resultats').empty();
        data.photos.photo.forEach(function(index) {
          $('#tabs-1 #resultats').append('<div style="background-image:url(\'https://farm'+index.farm+'.staticflickr.com/'+index.server+'/'+index.id+'_'+index.secret+'.jpg\');cursor:pointer;" onclick="openModalImage(\'https://farm'+index.farm+'.staticflickr.com/'+index.server+'/'+index.id+'_'+index.secret+'.jpg\', \''+index.owner+'\', \''+index.title+'\', \''+index.id+'\');" class="imageGalerie"></div><br><br>');
        });
      },
      error: function () {
        console.error("Erreur ajax");
      }
    });
  })

})
