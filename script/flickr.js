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
      url: 'http://api.flickr.com/services/rest/',
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
        $('#resultats').empty();
        console.log(data);
        data.photos.photo.forEach(function(index) {
          // $('#resultats').append('<img src="https://farm'+index.farm+'.staticflickr.com/'+index.server+'/'+index.id+'_'+index.secret+'.jpg" alt="Photo" onclick="openModalImage();" class="">');
          $('#resultats').append('<div style="background-image:url(\'https://farm'+index.farm+'.staticflickr.com/'+index.server+'/'+index.id+'_'+index.secret+'.jpg\');cursor:pointer;" onclick="openModalImage(\'https://farm'+index.farm+'.staticflickr.com/'+index.server+'/'+index.id+'_'+index.secret+'.jpg\', \''+index.owner+'\', \''+index.title+'\', \''+index.id+'\');" class="imageGalerie"></div>');
        });
      },
      error:function () {
        console.error("Erreur ajax");
      }
    });
  })

})
