//http://forestmist.org/2010/04/html5-audio-loops/


$(function () {
  var tracks = Tracks();
  tracks.init();
});

function Tracks() {
  var channels = [
    'silence', //4 seconds of silence, always playing
    'miles chords',
    'miles chords reversed'
  ];

  var audioElements = {};
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
      }
    });
    console.log(audioElements.silence[0]);

    $(audioElements['silence'][0]).bind('ended', function () {
      togglePlaying(audioElements['silence']);
      togglePlaying(audioElements['miles chords']);
      togglePlaying(audioElements['miles chords reversed']);

      currentElement = +!currentElement; //+! toggles 1 and 0
    });

    $(audioElements['silence'][1]).bind('ended', function () {
      togglePlaying(audioElements['silence']);
      togglePlaying(audioElements['miles chords']);
      togglePlaying(audioElements['miles chords reversed']);

      currentElement = +!currentElement;
    });

    audioElements['silence'][0].play();
  }

  function togglePlaying(elements) {
    elements[currentElement].currentTime = 0;
    elements[currentElement].pause();
    elements[+!currentElement].play();
  }

  return {
    init: init
  };
};
  


