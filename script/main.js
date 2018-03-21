$(function (){
  console.log("READY");
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
});

function openModalImage(url, owner, title, id) {
  $('#fondModal').show();
  $('#imageModale').attr('src', url);


  $.ajax({
    type: 'GET',
    url: "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=e33c23d5049a7016254b86a01201e648&photo_id="+id+"&format=json&nojsoncallback=1",
    dataType: 'json',
    success: function(data) {
      $('#nomImage').html("Titre : "+title);
      Date date = new Date(Date.parse(data.photo.dates.taken));
      $('#auteurImage').html("Photo prise par : "+data.photo.owner.username);
      $('#dateImage').html("Auteur de la photo : "+date.toLocaleString('fr-FR'));
    }
  });
}

$('#fondModal').click(function() {
  $('#fondModal').hide();
})
