// Initial array of characters 
var shows = ["the office", "new girl", "friends"];

$(document).ready(function(){

$("#buttons-view").on("click", ".gif-btn", function(){

  var showName = $(this).attr("data-name"); 

  //filter for a specific show
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=?" + showName + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";    
  // Creating an AJAX call for the specific button being clicked 
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    for(var i=0; i < response.data.length; i++){
      console.log(response.data[i]);
      // console.log(response.data[i].title); 
      // console.log(response.data[i].images.original.url);
      // console.log(response.data[i].images.original_still.url);

      var mainDiv = $("<div class= 'main'>");  
      var showP = $("<p>"); 
      var rating = response.data[i].rating
      showP.text("Rating: "+ rating); 
      mainDiv.append(showP); 

      var showImage = $("<img>");
      var imageUrl = response.data[i].images.original.url
      var stillUrl = response.data[i].images.original_still.url

      showImage.addClass(".gif"); 
      showImage.attr("src", stillUrl); 
      showImage.attr("data-animate", imageUrl); 
      showImage.attr("data-still", stillUrl); 
      showImage.attr("alt", "show image"); 

      mainDiv.append(showImage)
      $("#gifs-view").prepend(mainDiv);

    }
  }); 
}); 

function showButtons(){
  $("#buttons-view").empty(); 
  for(var i=0; i < shows.length; i++){
    var show = $("<button>"); 
    show.addClass("gif-btn"); 
    show.attr("data-name", shows[i]); 
    show.text(shows[i]); 
    $("#buttons-view").append(show); 
    }
}

//This function handles events where a add-gif button is clicked
$("#add-gif").on("click", function(event) {
  event.preventDefault();
  var show = $("#gif-input").val().trim();
  shows.push(show);
  $("#gif-input").val(''); 
  $("#fav").append(show); 
  showButtons(); 
});
showButtons(); 

//animate+still gif
$(".gif").on("click", function() {
  console.log("test"); 
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

}); 





        








