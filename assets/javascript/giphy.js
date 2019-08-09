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
    var results = response.data; 
    for(var i=0; i < results.length; i++){
      console.log(results.length);
      // console.log(response.data[i].title); 
      // console.log(response.data[i].images.original.url);
      // console.log(response.data[i].images.original_still.url);

      var mainDiv = $("<div class= 'main'>");  
      var showP = $("<p>"); 
      var rating = results[i].rating
      showP.text("Rating: "+ rating); 
      mainDiv.append(showP); 

      var showImage = $("<img>");
      var imageUrl = results[i].images.original.url
      var stillUrl = results[i].images.original_still.url

      var favButton = $("<button>"); 
      favButton.addClass("fav-btn"); 
      favButton.text("Add to favorites"); 
      mainDiv.append(favButton); 


      showImage.addClass("gif"); 
      showImage.attr("src", stillUrl); 
      showImage.attr("data-animate", imageUrl); 
      showImage.attr("data-still", stillUrl); 
      showImage.attr("data-state", "still"); 

      showImage.attr("alt", "show image"); 
      showImage.width("200").height("200"); 

      mainDiv.append(showImage)
      $("#gifs-view").prepend(mainDiv);

    }
console.log($(".main")); 
    $(".main").on("click", function(event){
      // console.log(event); 

      if(event.target.className === "fav-btn"){
        console.log(event); 

        // console.log("clicked"); 
        var favImg = $("<img>"); 
        console.log(event.currentTarget.children[2].currentSrc); 
        favImg.attr("src", event.currentTarget.children[2].currentSrc); 

        $("#fav-gifs").append(favImg);

        // bannerImage = event.currentTarget.children[2].currentSrc; 
        // imgData = getBase64Image(bannerImage);
        // localStorage.setItem("imgData", imgData);

        var img = new Image();
        img.src = 'http://pop.h-cdn.co/assets/16/33/480x264/gallery-1471381857-gif-season-2.gif';
        localStorage.setItem('test', getBase64Image(img));

        function getBase64Image(img) {
          var canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/gif");
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
        // localStorage.clear();
        // localStorage.setItem("src", event.currentTarget.children[2].currentSrc);
        // $("#fav-gifs").append(localStorage.getItem("test", JSON.stringify(img.src)));
      }
    }); 
  }); 
}); 
// $("#fav-gifs").append(localStorage.getItem("src"));
// $("#fav-gifs").append(localStorage.getItem("test"));
// $("#fav-gifs").append(localStorage.getItem("test", JSON.stringify(img.src)));

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
$(document).on("click", ".gif", function(){
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





        








