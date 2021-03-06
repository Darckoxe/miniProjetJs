$(function() {
  $("#progressBar").hide();
  $('#formRecherche').submit(function(event) {
    event.preventDefault();

    $('#resultats').empty();

    /*
    On regarde le nombre de photos voulus.
    On créé le nombre de div associé
    On rempli les divs avec les ids qui correspondent a la variable id
    */

    var nb_photos = $('#nbPhotos').val();
    var id = 1;
    var tabIdPhotos = [];

    while (id <= nb_photos) {
      $('#resultats').append('<div id="photo_vue_liste'+id+'" class="photo_vue_liste">');
      $('#photo_vue_liste'+id).append('<div id="photo'+id+'" class="photo">');
      $('#photo_vue_liste'+id).append('<div id="info'+id+'" class="info">');
      id++;
    }

    id = 1;

    /*
    Cette requete AJAX effectue une demande a l'api pour recuperer sous un format JSON toutes les donnees
    necessaires a l'affichage d'une photo
    */

      $.ajax({
        type: 'GET',
        url: 'https://api.flickr.com/services/rest/',
        /*
        La requete ajax suivante est en mode synchrone.
        On affiche un logo de chargement pour faire patienter l'utilisateur
        */
        xhr: function() {
          var xhr = new window.XMLHttpRequest();


          $('#resultats').hide();
          $("#progressBar").show();

          // Download progress
          xhr.onprogress = function(e){
            var percentComplete = Math.round((e.loaded / e.total) * 100);
            console.log("PCT : "+percentComplete);
          };

          /*
          Lorsque la requête est terminé
          on affiche les photos et on
          cache le titre et les auteurs ainsi que le logo de chargement
          */
          xhr.onload = function(e) {
            $('#resultats').show();
            $("#progressBar").hide();
            $('#mainTitre').hide();
            $('#mainAuteurs').hide();
          }

          return xhr;
        },
        data: {
          method : "flickr.photos.search",
          api_key : "e33c23d5049a7016254b86a01201e648",
          tags : $('#nomCommune').val(),
          per_page : nb_photos,
          format : "json",
          nojsoncallback : 1
        },
        dataType: 'json',
        /*
        Quand la requête est un succes on change l'apparence du formulaire de recherche
        en changeant sa classe et on peuple nos div avec les photos en utilisant le JSON récupéré par
        AJAX.

        On stocke chaque id des photos récupérés car elles vont reservir pour afficher les informations des photos
        (titre, date, auteur)
        */
        success: function(data) {
          $('#barreRecherche').switchClass("barreRechercheFixed","barreRechercheNormal", 500);
          data.photos.photo.forEach(function(index){
             $('#photo'+id).css({
               'background-image' : 'url(https://farm'+index.farm+'.staticflickr.com/'+index.server+'/'+index.id+'_'+index.secret+'.jpg)',
               'background-position' : 'center',
               'background-size' : 'cover',
             });
             var url =  'https://farm'+index.farm+'.staticflickr.com/'+index.server+'/'+index.id+'_'+index.secret+'.jpg';
             $('#photo'+id).attr('onclick','openModalImage("'+url+'",'+index.id+')');

             tabIdPhotos.push(index.id);
             id++;
          });
          id = 1;
          for (var i = 0; i < tabIdPhotos.length; i++) {
            /*
            On parcours notre tableau d'id photo pour peupler nos divs d'information via la JSON qui
            est reourné. On est obligé de mettre la requête en mode synchrone du fait que la réponse du serveur
            n'est pas instantané. Les informations peuvent alors être présentes mais pas pour la bonne photo.
            Cela met forcemment du temps d'où le logo de chargement précédent.
            */
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
                $('#info'+id).append("<p><img src=\"css/img/photo.png\" alt=\"Titre\" height=\"20\"> "+titre+"</p>");
                $('#info'+id).append("<p><img src=\"css/img/horloge.png\" alt=\"Pris le\" height=\"16\"> "+date+"</p>");
                $('#info'+id).append("<p><img src=\"css/img/personne.png\" alt=\"Pris par\" height=\"16\"> "+auteur+"</p>");
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
    });
  });
