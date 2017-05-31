

function compileTemplate(templateScript, data){
    return Handlebars.compile(templateScript)(data);
}

function parseResponse(data){
    return data.results.map(function (movie) {
        return {
            title: movie.display_title,
            description: movie.summary_short,
            date: movie.publication_date,
            link: movie.link.url,
            imageUrl: movie.multimedia.src,
            imageWidth: movie.multimedia.width,
        }
    })
}


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
  }).done(function(data) {
     console.log(data);
     movieTemplate = document.getElementById('movie-template').innerHTML
     movieContainer = document.getElementsByClassName('widget-container')[0]
    


    movieContainer.innerHTML = compileTemplate(movieTemplate, {movies: parseResponse(data)})


  }).fail(function(err) {
    throw err;
  });
}
