function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function getMovieInfo() {
  const searchTerms = $('#searchTerms').val()
  var url = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";
  url += '?' + $.param({
    'api-key': "c7d0e0421f8c4d3b93857de57a155886",
    'query': searchTerms
  });
  $.ajax({
    url: url,
    method: 'GET',
  }).done(function(result) {
    // console.log(result);
    var title = result.results[0].display_title
    var byline= result.results[0].byline
    $('.movies').html(result.results[0].display_title)







  }).fail(function(err) {
    throw err;
  });
}









//
// function showMovies(event, data) {
//   const repos = JSON.parse(this.responseText)
//   const src = document.getElementById("repository-template").innerHTML
//   const template = Handlebars.compile(src)
//   const repoList = template(repos)
//   document.getElementById("repositories").innerHTML = repoList
// }
//
// document.addEventListener("DOMContentLoaded", function(event) {
//   Handlebars.registerPartial("authorPartial", document.getElementById("author-partial-template").innerHTML)
// });
