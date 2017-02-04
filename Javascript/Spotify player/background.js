//Hide modal
$('.js-modal').modal("hide");

$(document).ready(function() {  
  //Intialize default song
  defaultSong();
});

function defaultSong(){
  retrieveSpotifyInfo("track","Despacito", showTrackInfo);
}

//Form listener
$('form').on('submit',function(e) {    
  e.preventDefault();
  var songName = $('input[name=song]').val();
  retrieveSpotifyInfo("track", songName, showTrackInfo);
}); 

//Ajax 
function retrieveSpotifyInfo(category, element, callback){
    $.ajax({
     url: "https://api.spotify.com/v1/search?type=" + category + "&query=" + element,            
     success: callback,
     error: errorSpotifyAPI                     
    }); 
}

function showTrackInfo (data) {
  var track = data.tracks.items[0];

  //Set attributes
  var trackName = track.name;
  var artistName = track.artists[0].name;
  var albumUrl = track.album.images[0].url;
  var previewUrl = track.preview_url;
    
  //Reset previous html tags
  emptyTags();

  $('.title').append(trackName);
  $('.author').append(artistName);
  $('.cover img').attr("src",albumUrl);
  $('audio').attr("src",previewUrl);

  //Enable play button
  $('.btn-play').removeClass('disabled');
}

function errorSpotifyAPI (error){
  console.log(error.responseText);
}

function emptyTags(){
  $('.title').empty();
  $('.author').empty();
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
}

//Show modal
$('.author').on('click',function(e) {
  var authorName = $('.author').text();
  retrieveSpotifyInfo("artist", authorName, showArtistInfo);
}); 

function showArtistInfo (data) {
  var artist = data.artists.items[0];

  var artistName = artist.name;
  var artistImage = artist.images[3].url;
  var artistGenre = artist.genres[1];
  var artistFollowers = artist.followers.total;
  var artistPopularity = artist.popularity;

  $('.artist-name').append(artistName);
  $('.artist-image img').attr("src",artistImage);
  $('.artist-genre').append(artistGenre);
  $('.artist-followers').append(artistFollowers);
  $('.artist-popularity').append(artistPopularity);

  $('.js-modal').modal("show");
}
