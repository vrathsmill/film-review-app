

function compileTemplate(templateScript, data){
    return Handlebars.compile(templateScript)(data);
}

function parseResponse(data){
    return data.results.map(function (movie) {

    function imageFixer(){
        if (movie.multimedia === null) {
          return null
        } else {
          return movie.multimedia.src
        }
      }

      function fixQuotes(){
        var str = movie.summary_short
        str = str.replace(/&quot;/g, '"')

        if (str.indexOf("&#8217;") > -1){
          str = str.replace("&#8217;", "'")
        }

        if (str.indexOf("&#8220;") > -1){
          str = str.replace("&#8220;",  "'")
        }
        if (str.indexOf("&#8221;") > -1){
          str = str.replace("&#8221;",  "'")
        }
        return str
      }

      function changeDate(){
        var date = movie.publication_date
        return date.slice(5) + "-" + date.slice(0,4)
      }

      function criticsPick(){
        if (movie.critics_pick === 1){
          return true
        } else {
          return null
        }
      }
        return {
            title: movie.display_title,
            description: fixQuotes(),
            date: changeDate(),
            link: movie.link.url,
            imageUrl: imageFixer(),
            rating: movie.mpaa_rating,
            critics_pick: criticsPick()
        }
    })
  }


function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}


function getMovieInfo() {
  const searchTerms = $('#searchTerms').val()

  if (searchTerms.length > 0) {
    searchTerms
  } else {
    return
  }



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
