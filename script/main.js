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
