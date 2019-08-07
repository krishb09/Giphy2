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
      console.log(response.data[i].images.original.url);
      console.log(response.data[i].images.original_still.url);
      
      var imageUrl = response.data[i].images.original.url
      var showImage = $("<img>"); 
      showImage.attr("src", imageUrl); 
      showImage.attr("alt", "show image"); 
      $("#gifs-view").prepend(showImage);

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
  showButtons(); 
});
    // Adding a click event listener to all elements with a class of "movie-btn"
    // $(document).on("click", "#buttons-view", showButtons);
showButtons(); 

//animate+still gif
$(".gif").on("click", function() {
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





        








