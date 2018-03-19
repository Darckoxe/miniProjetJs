$(function() {
  function rechercheJSONFlickr(query, parPage) {
    var url = "http://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=e33c23d5049a7016254b86a01201e648&text="+query+"&per_page="+parPage+"&format=json";
    var images = $.getJSON(url);
    return images;
  }

  $('#recherche').click(function() {
    var res = rechercheJSONFlickr($('#nomCommune').val(), $('#nbPhotos').val());
    console.log(res.photos);
  })

})
