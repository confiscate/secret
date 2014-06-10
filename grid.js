
var timeBetween = 5000;
var cur = 1;
var totalSecrets = 8;
var transitionFunction = opacityTransition;
var randomNum = 0;

function opacityTransition() {
  var result = advance();
  var listener = function(e) {
      result.prevSecret.style.display = 'none';
      result.curSecret.style.opacity = '1';
      result.prevSecret.removeEventListener(
        'transitionend', listener);
    };
  result.prevSecret.addEventListener('transitionend', listener);
  result.prevSecret.style.opacity = '0';
  result.curSecret.style.opacity = '0';
  result.curSecret.style.display = 'block';

  window.setTimeout(transitionFunction , timeBetween);
}

function slideTransition() {
  var result = advance();
  var listener = function(e) {
      result.prevSecret.style.display = 'none';
      result.curSecret.style.opacity = '1';
      result.curSecret.style.webkitTransform =
        'translate3d(0, 0, 0)';
      result.prevSecret.removeEventListener(
        'transitionend', listener);
    };
  result.prevSecret.addEventListener('transitionend', listener);
  result.prevSecret.style.webkitTransform =
    'translate3d(0, 10px, 0)';
  result.curSecret.style.webkitTransform =
    'translate3d(0, 10px, 0)';
  result.prevSecret.style.opacity = '0';
  result.curSecret.style.opacity = '0';
  result.curSecret.style.display = 'block';

  window.setTimeout(transitionFunction , timeBetween);
}

function bumpTransition() {
  var result = advance();
  var x = 0;
  var y = 0;
  var moveOffset = 510;

  while (true) {
    var newNum = Math.floor((Math.random() * 4));
    if (newNum != randomNum) {
      randomNum = newNum;
      break;
    }
  }

  switch(randomNum) {
    case 0:
      x = moveOffset;
      break;
    case 1:
      x = -moveOffset;
      break;
    case 2:
      y = moveOffset;
      break;
    case 3:
      y = -moveOffset;
      break;
  }

  result.curSecret.style.webkitTransform =
    'translate3d(' + x + 'px, ' + y + 'px, 0)';
  result.curSecret.style.display = 'block';

  // Force a layout.
  result.curSecret.offsetWidth;

  var listener = function(e) {
      result.prevSecret.style.display = 'none';
      result.prevSecret.removeEventListener(
        'transitionend', listener);
    };
  result.prevSecret.addEventListener('transitionend', listener);
  result.prevSecret.style.webkitTransform =
    'translate3d(' + (-x) + 'px, ' + -y + 'px, 0)';
  result.curSecret.style.webkitTransform =
    'translate3d(0, 0, 0)';

  window.setTimeout(transitionFunction , timeBetween);
}

function advance() {
  var prev = cur++;
  if (cur > 8) cur = 1;
  var out = {};
  out.prevSecret = document.getElementById('s' + prev);
  out.curSecret = document.getElementById('s' + cur);
  return out;
}

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20')) || null;
}

window.onload = function() {
  var func = getURLParameter('type');
  switch(func) {
    case 'opacity':
      transitionFunction = opacityTransition;
      break;
    case 'bump':
      transitionFunction = bumpTransition;
      break;
    case 'slide':
      transitionFunction = slideTransition;
      break;
  }
  window.setTimeout(transitionFunction, timeBetween);
};