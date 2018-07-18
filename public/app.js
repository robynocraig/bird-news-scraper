// Grab the articles as a json
// $.getJSON("/articles", function(data) {
//   // For each one
//   for (var i = 0; i < data.length; i++) {
//     // Display the apropos information on the page
//     $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].summary + "<br />" + data[i].link + "</p>");
//   }
// });

// When the #scrape button is pressed
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
