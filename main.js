// - add button function
// - each button will have a class that when clicked will call the giphy
//   API.
// - default list of buttons

//Nature scenes

var topics = ["surfing",
    "kite flying",
    "whale hunting",
    "bird watching",
    "Cross Country Running",
    "Marathon",
    "Digging Holes",
    "Swimming",
    "Fighting Hobos",
    "Feeding Squirrels"];



// Initial array of movies
// var topics = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayMovieInfo() {

    var search = $(this).attr("data-name");
    // var queryURL = "https://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";
    // var queryURL = "https://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=J3zMGI3A2CsWJqQh5sOdEkiZDPi38RpE&limit=10";
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (returnObj) {
        $("#movies-view").empty();
        responses=returnObj.data;
        responses.forEach(response => {
            console.log(response);

            // Creating a div to hold the movie
            var itemDiv = $("<div class='col-md-4 movie'>");
            var card = $("<div class='card'>")
            // // Storing the rating data
            // var rating = response.Rated;

            // // Creating an element to have the rating displayed
            // var pOne = $("<p>").text("Rating: " + rating);

            // // Displaying the rating
            // itemDiv.append(pOne);

            // // Storing the release year
            // var released = response.Released;

            // // Creating an element to hold the release year
            // var pTwo = $("<p>").text("Released: " + released);

            // // Displaying the release year
            // itemDiv.append(pTwo);

            // // Storing the plot
            // var plot = response.Plot;

            // // Creating an element to hold the plot
            // var pThree = $("<p>").text("Plot: " + plot);

            // // Appending the plot
            // itemDiv.append(pThree);

            // Retrieving the URL for the image
            // var imgURL = response.images["480w_still"].url;
            var still_image=response.images.fixed_width_small_still.url;

            // Creating an element to hold the image
            var image = $("<img>").attr("src", still_image);
            image.attr("class","card-img-top giphyIm");
            image.attr("data-still",still_image);
            image.attr("data-giphy",response.images.fixed_width_small.url);

{/* <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div> */}
            var cardBody=$("<div  class='card-body'>");
            cardBody.append('<h5 class="card-title">'+response.title+'</h5>');
            cardBody.append('<p class="card-text"> Movie Rating: '+response.rating.toUpperCase()+'</p>');


            // Appending the image
            card.append(image);
            card.append(cardBody);
            itemDiv.append(card);



            // Putting the entire movie above the previous movies
            
            $("#movies-view").prepend(itemDiv);
        });
    });

}

// Function for displaying movie data
function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie-btn to our button
        a.addClass("movie-btn");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

function changeImageType(){
    // console.log("clicked!")
    currentsrc=$(this).attr("src");

    if(currentsrc==$(this).attr("data-still")){
        $(this).attr("src",$(this).attr("data-giphy"));
    }else{
        $(this).attr("src",$(this).attr("data-still"));
    }
    
}

// This function handles events where a movie button is clicked
$("#add-movie").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var movie = $("#movie-input").val().trim();

    // Adding movie from the textbox to our array
    topics.push(movie);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".movie-btn", displayMovieInfo);

$(document).on("click",".giphyIm",changeImageType)

// Calling the renderButtons function to display the intial buttons
renderButtons();