// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {

    // var domain = ("https://www.audubon.org" + result.link)

    // Display the article details information on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].summary + "<br />" + "https://www.audubon.org" + data[i].link + "</p>");
    $("#articles").append("<button data-id='" + data[i]._id + "' id='savearticle'>Save Article</button>");
  }
});

//When the #scrape button is pressed
$("#scrape").on("click", function() {
  // Make an AJAX GET request to scrape the website
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/scrape",
    //On a successful call, clear the #results section
    success: function(response) {
      $("#articles").empty();
    }
  });
});

// When you click the savearticle button
$(document).on("click", "#savearticle", function() {
  // Grab the id associated with the article from the save button
  var thisId = $(this).attr("data-id");

  // Run a POST request to access that saved id
  $.ajax({
    method: "POST",
    url: "/saved/" + thisId,
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
    });
});

// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#details").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#details").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#details").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#details").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#details").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});
