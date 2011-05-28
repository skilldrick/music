//http://forestmist.org/2010/04/html5-audio-loops/

(function () {
  var position = 0;
  var channels = {
    'miles chords': {playing: true},
    'miles chords reversed': {playing: true}
  };

  $(function () {
    $.each(channels, function (channel, info) {
      for (var i = 0; i < 2; i++) {
        var $el = $('<audio/>').attr({
          'src': 'miles/samples/' + channel + '.ogg',
          'preload': 'true',
          'id': channel + i.toString()
        }).appendTo($('body'));

        info['audio'] = info['audio'] || [];
        info['audio'][i] = $el[0];
      }
    });
    $(channels['miles chords'].audio[0]).bind('ended', function () {
      this.currentTime = 0;
      this.pause();
      channels['miles chords'].audio[1].play();
      var otherAudio = channels['miles chords reversed'].audio;
      otherAudio[0].currentTime = 0;
      otherAudio[0].pause();
      otherAudio[1].play();
    });
    $(channels['miles chords'].audio[1]).bind('ended', function () {
      this.currentTime = 0;
      this.pause();
      channels['miles chords'].audio[0].play();
      var otherAudio = channels['miles chords reversed'].audio;
      otherAudio[1].currentTime = 0;
      otherAudio[1].pause();
      otherAudio[0].play();
    });
    channels['miles chords'].audio[0].play();

  });


  function playAudio() {
    $.each(channels, function (channel, info) {
      if (info.playing) {
        info['audio'][0].play();
      }
    });
    position++;
  }



  window.stop = function () {
    $.each(channels, function (channel, info) {
      info.playing = false;
    });
  };


})();


