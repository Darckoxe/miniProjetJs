$(function (){
  console.log("READY");
  $(document).tooltip({
    show: { effect: "blind", duration: 500 },
    hide: { effect: "blind", duration: 500 }
  });
  $("#tabs").tabs();

  $("#nomCommune").autocomplete({
    source : function(requete, reponse) {
      $.ajax({
        url : 'sql/commune.php',
        type : 'GET',
        dataType : 'json',
        data : "commune=" + $("#nomCommune").val() + "&" +"maxRows=10",

        success : function(donnee){
          reponse($.map(donnee, function(object) {
           return object.Ville;
          }))
        }
      });
    }
  });

  $('#fondModal').click(function() {
    $('#fondModal').hide();
  })
});

function openModalImage(url,id) {
  $('#fondModal').show();
  $('#imageModale').attr('src', url);
  $.ajax({
    type: 'GET',
    url: "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=e33c23d5049a7016254b86a01201e648&photo_id="+id+"&format=json&nojsoncallback=1",
    dataType: 'json',
    success: function(data) {
      var titre = data.photo.title._content;
      var auteur = data.photo.owner.username;
      var arrayString = data.photo.dates.taken.split(" ");
      var arrayDate = arrayString[0].split("-");
      var date = arrayDate[2]+"/"+arrayDate[1]+"/"+arrayDate[0] + " à " + arrayString[1];
      $('#nomImage').html("<img src=\"css/img/photo_white.png\" alt=\"Titre\" height=\"20\"> "+titre);
      $('#auteurImage').html("<img src=\"css/img/personne_white.png\" alt=\"Pris par\" height=\"16\"> "+auteur);
      $('#dateImage').html("<img src=\"css/img/horloge_white.png\" alt=\"Pris le\" height=\"16\"> "+date);
    }
  });
}

$("#changeVue").click(function() {
  if ($("#changeVue").html() == "Vue en table") {
    $("#changeVue").html("Vue en photos");
    $("#resultats .photo_vue_liste").each(function(index) {
      $(this).removeClass("photo_vue_liste");
      $(this).addClass("photo_vue_table");
    });
  } else if ($("#changeVue").html() == "Vue en photos") {
    $("#changeVue").html("Vue en table");
    $("#resultats .photo_vue_table").each(function(index) {
      $(this).removeClass("photo_vue_table");
      $(this).addClass("photo_vue_liste");
    });
  } else {
    $("#changeVue").html("Erreur !");
  }
});
