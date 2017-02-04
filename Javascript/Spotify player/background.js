$('.js-modal').modal("hide");

$(document).ready(function() {  
  $('form').on('submit',function(e) {    
    e.preventDefault();
    var songName = $('input[name=song]').val();
    $.ajax({
     url: "https://api.spotify.com/v1/search?type=track&query=" + songName,            
     success: function(data){
      console.clear();
      console.log("Cancion buscada: " + songName);
      showTrackInfo(data.tracks.items[0]);
     },     
     error: function(error) {        
      console.clear();    
      console.log("Cancion buscado: " + songName);   
      console.log("¡ ¡ ¡ ¡ ¡ ¡ ¡ ERROR canción! ! ! ! ! ! ! !");                 
      console.log(error.responseText);
      },         
    }); 
  }); 
});

function showTrackInfo (track) {
  console.log(track);

  var trackName = track.name;
  var artistName = track.artists[0].name;
  var albumUrl = track.album.images[0].url;
  var previewUrl = track.preview_url;
  
  $('.title').append(trackName);
  $('.author').append(artistName);
  $('.cover img').attr("src",albumUrl);
  $('audio').attr("src",previewUrl);

  //Enable play button
  $('.btn-play').removeClass('disabled');
}

//Playing / Pause mode
$('.btn-play').on('click',function(e) { 
  if ($('.btn-play').hasClass('playing')){
     $('.js-player').trigger('pause');
  }else{
    $('.js-player').trigger('play');
  }
  $('.btn-play').toggleClass('playing');
});

// Have printTime be called when the time is updated
$('.js-player').on('timeupdate', printTime);

//Player's current time
function printTime () {
  var current = $('.js-player').prop('currentTime');
      $('.seekbar progress').attr("value",Math.trunc(current));
      console.debug('Current time: ' + Math.trunc(current));
}


//Show modal
$('.author').on('click',function(e) {
  var authorName = $('.author').text();

  $.ajax({
   url: "https://api.spotify.com/v1/search?type=artist&query=" + authorName,            
   success: function(data){
    var artist = data.artists.items[0];
    showArtistInfo(artist);
    $('.js-modal').modal("show");
   },     
   error: function(error) {        
    console.log("¡ ¡ ¡ ¡ ¡ ¡ ¡ ERROR artista ! ! ! ! ! ! ! !");                 
    console.log("Artista buscado: " + authorName);   
    console.log(error.responseText);
    },         
  }); 

}); 

function showArtistInfo (artist) {
  console.log(artist);

  // var trackName = track.name;
  var artistName = artist.name;
  var artistImage = artist.images[3].url;
  var artistGenre = artist.genres[1];
  var artistFollowers = artist.followers.total;
  var artistPopularity = artist.popularity;
  // var previewUrl = track.preview_url;
  
  // $('.title').append(trackName);
  $('.artist-name').append(artistName);
  $('.artist-image img').attr("src",artistImage);
  $('.artist-genre').append(artistGenre);
  $('.artist-followers').append(artistFollowers);
  $('.artist-popularity').append(artistPopularity);
  // $('audio').attr("src",previewUrl);
}


// `<a href="#">${variable}</a>
