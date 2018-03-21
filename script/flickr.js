$(function() {
  function rechercheJSONFlickr(query, parPage) {
    var url = "http://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=e33c23d5049a7016254b86a01201e648&text="+query+"&per_page="+parPage+"&format=json";
    var images = $.getJSON(url);
    return images;
  }

  $('#formRecherche').submit(function(event) {
    event.preventDefault();
    // var res = rechercheJSONFlickr($('#nomCommune').val(), $('#nbPhotos').val());
    // console.log(res);
    $.ajax({
       url : 'http://api.flickr.com/services/rest/',
       type : 'GET',
       dataType : 'json',
       data : {
         method : "flickr.photos.search",
         api_key : "e33c23d5049a7016254b86a01201e648",
         tags : $('#nomCommune').val(),
         per_page : $('#nbPhotos').val(),
         format : "json",
       },
       jsoncallback : 1,
       success : function(data) {
           $("<p>Salut</p>").appendTo("#resultats"); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
       }
    });
  })

})
