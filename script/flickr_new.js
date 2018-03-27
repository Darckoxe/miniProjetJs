$(function() {
  $('#formRecherche').submit(function(event) {
    event.preventDefault();
    $('#resultats').empty();
    // var nb_photos = $('#nbPhotos').val();

    // On regarde le nombre de photos voulus.
    // On créé le nombre de div associé
    // On rempli les divs avec les ids qui correspondent via la variable id

    var nb_photos = $('#nbPhotos').val();
    var id = 1;
    var tabIdPhotos = [];

    while (id <= nb_photos) {
      $('#resultats').append('<div id="photo_vue_liste'+id+'" class="photo_vue_liste">');
      $('#photo_vue_liste'+id).append('<div id="info'+id+'" class="info">');
      $('#photo_vue_liste'+id).append('<div id="photo'+id+'" class="photo">');
      id++;
    }

    id = 1;

      $.ajax({
        type: 'GET',
        url: 'https://api.flickr.com/services/rest/',
        data: {
          method : "flickr.photos.search",
          api_key : "e33c23d5049a7016254b86a01201e648",
          tags : $('#nomCommune').val(),
          per_page : nb_photos,
          format : "json",
          nojsoncallback : 1
        },
        dataType: 'json',

        success: function(data) {
          $('#barreRecherche').switchClass("barreRechercheFixed","barreRechercheNormal", 500);
          data.photos.photo.forEach(function(index){
             $('#photo'+id).css({
               'background-image' : 'url(https://farm'+index.farm+'.staticflickr.com/'+index.server+'/'+index.id+'_'+index.secret+'.jpg)',
               'background-position' : 'center',
               'background-size' : 'cover',
               'height' : '300px',
               'width' : '65%',
             });
             var url =  'https://farm'+index.farm+'.staticflickr.com/'+index.server+'/'+index.id+'_'+index.secret+'.jpg';
             $('#photo'+id).attr('onclick','openModalImage("'+url+'",'+index.id+')');

             tabIdPhotos.push(index.id);
             id++;
          });
          id = 1;
          for (var i = 0; i < tabIdPhotos.length; i++) {
            $.ajax({
              type: 'GET',
              async : false,
              url: "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=e33c23d5049a7016254b86a01201e648&photo_id="+tabIdPhotos[i]+"&format=json&nojsoncallback=1",
              dataType: 'json',
              success: function(data) {
                var titre = data.photo.title._content;
                var auteur = data.photo.owner.username;
                var arrayString = data.photo.dates.taken.split(" ");
                var arrayDate = arrayString[0].split("-");
                var date = arrayDate[2]+"/"+arrayDate[1]+"/"+arrayDate[0] + " à " + arrayString[1];
                $('#info'+id).append("<p>Titre : "+titre+"</p>");
                $('#info'+id).append("<p>Photo prise le  : "+date+"</p>");
                $('#info'+id).append("<p>Photo prise par : "+auteur+"</p>");
                id++;
              },
              error : function () {
                console.log("erreur ajax 2");
              }
            });
          }
        },
        error: function () {
          console.error("Erreur ajax");
        }
      });



    // $.ajax({
    //   type: 'GET',
    //   url: 'https://api.flickr.com/services/rest/',
    //   data: {
    //     method : "flickr.photos.search",
    //     api_key : "e33c23d5049a7016254b86a01201e648",
    //     tags : $('#nomCommune').val(),
    //     per_page : $('#nbPhotos').val(),
    //     format : "json",
    //     nojsoncallback : 1
    //   },
    //   dataType: 'json',
    //   success: function(data) {
    //     $('#resultats').empty();
    //     var id = 1;
    //
    //     data.photos.photo.forEach(function(index) {
    //       // console.log(index);
    //       console.log(id);
    //       $('#resultats').append('<div id="photo_vue_liste'+id+'" class="photo_vue_liste">');
    //       $('#photo_vue_liste'+id).append('<div id="photo'+id+'" class="photo" style="background-image:url(\'https://farm'+index.farm+'.staticflickr.com/'+index.server+'/'+index.id+'_'+index.secret+'.jpg\');cursor:pointer;" onclick="openModalImage(\'https://farm'+index.farm+'.staticflickr.com/'+index.server+'/'+index.id+'_'+index.secret+'.jpg\', \''+index.owner+'\', \''+index.title+'\', \''+index.id+'\');">');
    //       $('#photo_vue_liste'+id).append('<div style="" id="info'+id+'" class="info">');
    //
    //       $.ajax({
    //         type: 'GET',
    //         url: "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=e33c23d5049a7016254b86a01201e648&photo_id="+index.id+"&format=json&nojsoncallback=1",
    //         dataType: 'json',
    //         success: function(data) {
    //           var arrayString = data.photo.dates.taken.split(" ");
    //           var arrayDate = arrayString[0].split("-");
    //           var date = arrayDate[2]+"/"+arrayDate[1]+"/"+arrayDate[0] + " à " + arrayString[1];
    //           $('#info'+id_info).append("<p>Titre : "+index.title+"</p>");
    //           $('#info'+id_info).append("<p>Photo prise par : "+data.photo.owner.realname+"</p>");
    //           $('#info'+id_info).append("<p>Photo prise le  : "+date+"</p>");
    //           id_info++;
    //         }
    //       });
    //
    //       id++;
    //     });
    //     $('#barreRecherche').switchClass("barreRechercheFixed","barreRechercheNormal", 500);
    //   },
    //
    //   error: function () {
    //     console.error("Erreur ajax");
    //   }
    // });




  })

})