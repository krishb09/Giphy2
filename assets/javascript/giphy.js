// Initial array of characters 
var shows = ["the office", "new girl", "friends"];


// displayMovieInfo function re-renders the HTML to display the appropriate content
//   function showButtons(){
      
      $("#buttons-view").on("click", function(){

        var showName = $(this).attr("gif-name"); 
        //how to filter for a specific show? 

        // var queryURL = "https://api.giphy.com/v1/gifs/random?" + "api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&tag=" + showName ;

        // var queryURL = "https://api.giphy.com/v1/gifs/parksandrec?t=" + gifName + "api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9"; 


        var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&tag=friends";

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            var imageUrl = response.data.image_original_url; 

            var showImage = $("<img>"); 

            showImage.attr("src", imageUrl); 
            showImage.attr("alt", "show image"); 

            $("#gifs-view").prepend(showImage);

      }); 
    }); 
// }


function showButtons(){
    $("#buttons-view").empty(); 

    for(var i=0; i < shows.length; i++){
        var show = $("<button>"); 

        show.addClass("gif-btn"); 
        show.attr("gif-name", shows[i]); 
        show.text(shows[i]); 
        $("#buttons-view").append(show); 
    }
}
//This function handles events where a movie button is clicked
$("#add-gif").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var show = $("#gif-input").val().trim();
    
    // Adding movie from the textbox to our array
    shows.push(show);

    $("#gif-input").val(''); 
    
    // Calling renderButtons which handles the processing of our movie array
    showButtons(); 
    });
    // Adding a click event listener to all elements with a class of "movie-btn"
    // $(document).on("click", "#buttons-view", showButtons);

    showButtons(); 

        




