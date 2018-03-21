$(function() {
  function rechercheJSONFlickr(query, parPage) {
    var url = "http://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=e33c23d5049a7016254b86a01201e648&text="+query+"&per_page="+parPage+"&format=json&nojsoncallback=1";
    var images = $.getJSON(url);
    return images;
  }

  $('#formRecherche').submit(function(event) {
    event.preventDefault();
    // var res = rechercheJSONFlickr($('#nomCommune').val(), $('#nbPhotos').val());
    //
    // // console.log(res.responseText.photos.photo[0]);
    // console.log(res.responseJSON.photos.photo[0]);
    // console.log(res);

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
        console.log(data.photos.photo[0]);
      },
      error:function () {
        console.error("Erreur ajax");
      }
    });
    // $.ajax.done()
  })

})
