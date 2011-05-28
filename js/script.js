//http://forestmist.org/2010/04/html5-audio-loops/

var tracks = Tracks();

$(function () {
  tracks.init();

});

function Tracks() {
  var channels = [
    'silence', //4 seconds of silence, always playing
    'chords',
    'chords_reversed',
    'extra',
    'main',
    'hats'
  ];

  var audioElements = {};
  var currentlyPlaying = {};
  var currentElement = 0;
  var timeout = $.browser.chrome ? 150 : 0;

  function init() {
    $.each(channels, function (i, channel) {
      for (var i = 0; i < 2; i++) {
        var $el = $('<audio/>').attr({
          'src': 'miles/samples/' + channel + '.ogg',
          'preload': 'true',
          'id': channel + i.toString()
        }).appendTo($('body'));

        audioElements[channel] = audioElements[channel] || [];
        audioElements[channel][i] = $el[0];
        currentlyPlaying[channel] = true;
      }
      currentlyPlaying['silence'] = true;
      currentlyPlaying['main'] = true;
    });

    $(audioElements['silence'][0]).bind('ended', function () {
      setTimeout(function () {
        togglePlaying();
      }, timeout);
    });

    $(audioElements['silence'][1]).bind('ended', function () {
      setTimeout(function () {
        togglePlaying();
      }, timeout);
    });


    audioElements['silence'][0].play();
    //startWhenReady();
  }


  function startWhenReady() {
    var ready = true;
    $.each(audioElements, function (key, elements) {
      if (! elements[0].readyState) {
        ready = false;
        return false;
      }
    });
    if (! ready) {
      setTimeout(startWhenReady, 100);
    }
    else {
      togglePlaying();
    }
  }

  function addToPlaying(channel) {
    currentlyPlaying[channel] = true;
  }

  function removeFromPlaying(channel) {
    currentlyPlaying[channel] = false;
  }

  function togglePlaying() {
    $.each(audioElements, function (key, elements) {
      elements[currentElement].currentTime = 0;
      elements[currentElement].pause();
      if (currentlyPlaying[key]) {
        elements[1 - currentElement].play();
      }
    });
    currentElement = 1 - currentElement;
  }

  return {
    init: init,
    addToPlaying: addToPlaying,
    removeFromPlaying: removeFromPlaying
  };
};
  


