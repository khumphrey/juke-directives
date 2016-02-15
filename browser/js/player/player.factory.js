'use strict';

juke.factory('PlayerFactory', function ($rootScope) {

  // state

  var playing = false,
      currentSong = null,
      currentList = [],
      progress = 0,
      random = false,
      songArray = [];

  // initialize the audio element

  var audio = document.createElement('audio');

  // define the factory value

  var player = {};

  player.getRandom = function() {
    return random;
  }

  player.random = function() {
    random = !random;
    currentList.forEach(function(el) {
      songArray.push(el);
    })
    var max = songArray.length - 1;
    for (var i = max; i >= 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), temp = songArray[i];
      songArray[i] = songArray[j];
      songArray[j] = temp;
    }
  }

  player.pause = function () {
    audio.pause();
    playing = false;
  };

  player.resume = function () {
    audio.play();
    playing = true;
  };

  player.start = function (song, list) {
    player.pause();
    audio.src = song.audioUrl;
    audio.load();
    currentSong = song;
    currentList = list;
    if (random) player.random();
    player.resume();
  };

  player.isPlaying = function () {
    return playing;
  };

  player.getCurrentSong = function () {
    return currentSong;
  };

  function mod (num, m) { return ((num % m) + m) % m; };

  function skip (interval) {
    var songs = random ? songArray : currentList, 
        index = songs.indexOf(currentSong);
    index = mod(index + interval, songs.length);
    player.start(songs[index], currentList);
  }

  player.next = function () {
    skip(1);
  };

  player.previous = function () {
    skip(-1);
  };

  player.getProgress = function () {
    return progress;
  };

  // audio event listening

  audio.addEventListener('ended', function () {
    player.next();
    $rootScope.$evalAsync();
  });

  audio.addEventListener('timeupdate', function () {
    progress = audio.currentTime / audio.duration;
    $rootScope.$evalAsync();
  });

  player.updateCurrentTime = function(progressWidth) {
    audio.currentTime = progressWidth*audio.duration;
  }

  // return factory value

  return player;

});
