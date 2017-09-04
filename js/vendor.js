$(document).ready(function() {
  var api = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=";
  var end ="&prop=info&inprop=url&utf8=&format=json";

  $('#text-search').keypress(function (e) {
    if (e.which == 13) {
      search(e);
      return false;
    }
  });

  $('#search').on("click", search);

  function search(e) {
    e.preventDefault();
    var keyword = $("#text-search").val();
    $("#text-search").val('');
    $.ajax({
      url:  api+ keyword + end,
      dataType: "jsonp",
      success: function(response) {
        if (response.query.searchinfo.totalhits === 0) {
          showError(keyword);
        }
        else {
          showResults(response);
        }
    }
  });
}

  function showResults(data) {
    $("#result").empty();
    for (var i = 0; i < data.query.search.length; i++) {
      var variable = data.query.search[i]
    $("#result").append('<a href="https://en.wikipedia.org/?curid='+variable.pageid+'" target="_blank"><article id="'+variable.pageid+'"><h2>'+variable.title+"</h2><p>"+variable.snippet+"</p></article></a>");
    }
  }


});
