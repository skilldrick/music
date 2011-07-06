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
  var timeout = $.browser.webkit ? 150 : 0;

  function init() {
    $.each(channels, function (chNumber, channel) {
      for (var i = 0; i < 2; i++) {
        var $el = $('<audio/>').attr({
          'src': 'miles/samples/' + channel + '.ogg',
          'preload': 'true',
          'id': channel + i.toString()
        }).appendTo('body');

        audioElements[channel] = audioElements[channel] || [];
        audioElements[channel][i] = $el[0];
        currentlyPlaying[channel] = false;
      }

      if (chNumber > 0) {
        $('#track-label').tmpl({number: chNumber, channel: channel}).appendTo('body');
      }
    });

    currentlyPlaying['silence'] = true;
    currentlyPlaying['main'] = true;

    $(audioElements['silence'][0]).bind('ended', function () {
      togglePlaying();
    });

    $(audioElements['silence'][1]).bind('ended', function () {
      togglePlaying();
    });

    $('.play').click(function () {
      var trackNumber = $(this).data('track');
      addToPlaying(channels[trackNumber]);
    });

    $('.stop').click(function () {
      var trackNumber = $(this).data('track');
      removeFromPlaying(channels[trackNumber]);
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
    function toggle() {
      $.each(audioElements, function (key, elements) {
        elements[currentElement].currentTime = 0;
        elements[currentElement].pause();
        if (currentlyPlaying[key]) {
          elements[1 - currentElement].play();
        }
      });
      currentElement = 1 - currentElement;
    }

    if (timeout > 0) {
      setTimeout(toggle, timeout);
    }
    else {
      toggle();
    }
  }

  return {
    init: init,
    addToPlaying: addToPlaying,
    removeFromPlaying: removeFromPlaying
  };
};
  


