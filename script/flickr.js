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
        $('#resultats').empty();
        var id_photo = 1;
        var id_info = 1;

        data.photos.photo.forEach(function(index) {
          $('#resultats').append('<div id="photo_vue_liste'+id_photo+'" class="photo_vue_liste">');
          $('#photo_vue_liste'+id_photo).append('<div style="background-image:url(\'https://farm'+index.farm+'.staticflickr.com/'+index.server+'/'+index.id+'_'+index.secret+'.jpg\');cursor:pointer;" onclick="openModalImage(\'https://farm'+index.farm+'.staticflickr.com/'+index.server+'/'+index.id+'_'+index.secret+'.jpg\', \''+index.owner+'\', \''+index.title+'\', \''+index.id+'\');" id="photo'+id_photo+'" class="photo">');
          $('#photo_vue_liste'+id_photo).append('<div id="info'+id_photo+'" class="info">');


          $.ajax({
            type: 'GET',
            url: "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=e33c23d5049a7016254b86a01201e648&photo_id="+index.id+"&format=json&nojsoncallback=1",
            dataType: 'json',
            success: function(data) {
              console.log("photo : "+id_photo+" info : "+id_info);
              var arrayString = data.photo.dates.taken.split(" ");
              var arrayDate = arrayString[0].split("-");
              var date = arrayDate[2]+"/"+arrayDate[1]+"/"+arrayDate[0] + " à " + arrayString[1];
              $('#info'+id_info).append("<p>Titre : "+index.title+"</p>");
              $('#info'+id_info).append("<p>Photo prise par : "+data.photo.owner.realname+"</p>");
              $('#info'+id_info).append("<p>Photo prise le  : "+date+"</p>");
              id_info++;
            }
          });
          id_photo++;
        });
        $('#barreRecherche').switchClass("barreRechercheFixed","barreRechercheNormal", 500);
      },

      error: function () {
        console.error("Erreur ajax");
      }
    });
  })

})
