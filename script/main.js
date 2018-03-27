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

function openModalImage(url, owner, title, id) {
  $('#fondModal').show();
  $('#imageModale').attr('src', url);

  $.ajax({
    type: 'GET',
    url: "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=e33c23d5049a7016254b86a01201e648&photo_id="+id+"&format=json&nojsoncallback=1",
    dataType: 'json',
    success: function(data) {
      var arrayString = data.photo.dates.taken.split(" ");
      var arrayDate = arrayString[0].split("-");
      var date = arrayDate[2]+"/"+arrayDate[1]+"/"+arrayDate[0] + " à " + arrayString[1];
      $('#nomImage').html("Titre : "+title);
      $('#auteurImage').html("Photo prise par : "+data.photo.owner.realname);
      $('#dateImage').html("Photo prise le  : "+date);
    }
  });
}

$("#changeVue").click(function() {
  if ($("#changeVue").html() == "Vue en table") {
    $("#changeVue").html("Vue en photos");
    $("#resultats .photo_vue_liste").each(function(index) {
      $(this).switchClass("photo_vue_liste", "photo_vue_table");
    });
  } else if ($("#changeVue").html() == "Vue en photos") {
    $("#changeVue").html("Vue en table");
    $("#resultats .photo_vue_table").each(function(index) {
      $(this).switchClass("photo_vue_table", "photo_vue_liste");
    });
  } else {
    $("#changeVue").html("Erreur !");
  }
});
