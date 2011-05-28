//http://forestmist.org/2010/04/html5-audio-loops/

var tracks = Tracks();

$(function () {
  tracks.init();
});

function Tracks() {
  var channels = [
    'silence', //4 seconds of silence, always playing
    'miles chords',
    'miles chords reversed',
    'miles extra',
    'miles loop stretched3',
    'hats'
  ];

  var audioElements = {};
  var currentlyPlaying = {};
  var currentElement = 0;

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
        currentlyPlaying[channel] = false;
      }
      currentlyPlaying['silence'] = true;
      currentlyPlaying['miles loop stretched3'] = true;
    });

    $(audioElements['silence'][0]).bind('ended', function () {
      togglePlaying();
      currentElement = 1 - currentElement;
    });

    $(audioElements['silence'][1]).bind('ended', function () {
      togglePlaying();
      currentElement = 1 - currentElement;
    });

    audioElements['silence'][0].play();
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
  }

  return {
    init: init,
    addToPlaying: addToPlaying,
    removeFromPlaying: removeFromPlaying
  };
};
  


