var page = document.getElementById('page');
var sections = page.getElementsByTagName('section');
var navItems = document.getElementsByClassName('listElements');
// element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
// using on
var scrolling = false;
var playingAudio = false;
var guided = false;
var overlay = true;
var n = 0;
var navbarOpen = false;

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
// REF: https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
  return "disabled";
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
    return "enabled";
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

//Overlay

$(".leftIconDiv").click(function(){
  overlay = false;
  $("#overlay").css("opacity","0");
  $("#overlay").css("display","none");
  guided = true;
  setTimeout(function(){
      var audio = document.getElementsByTagName("audio")[1];
      audio.addEventListener('ended', function() {
          this.currentTime = 0;
          this.play();
      }, false);
      audio.volume = .1;
    audio.play();
  },200);
  setTimeout(play("introText",introTextTimestamps),2000);
  setTimeout(function(){$(".one .arrow").addClass("bounceForver");},3000);
});

$(".rightIconDiv").click(function(){
  overlay = false;
  $("#overlay").css("opacity","0");
  setTimeout(function(){$("#overlay").css("display","none");},1000);
  setTimeout(function(){$(".one .arrow").addClass("bounceForver");},3000);
});

$(".hoverBlurIn").hover(function(){
  var styles = {
      "-webkit-filter" : "blur(0px)",
      "color": "rgba(28, 28, 28, 1.0)"
    };
  $(this).children( "p" ).css(styles);
});
$(".hoverBlurIn").mouseleave(function(){
  var styles = {
      "-webkit-filter" : "blur(10px)",
      "color": "rgba(28, 28, 28, 0.0)"
    };
  $(this).children( "p" ).css(styles);
});

$(document).ready(function(){
  if(document.body.offsetWidth < 1000){
    $("#overlay").css("opacity","0");
    $("#overlay").css("display","none");
    setTimeout(function(){$(".one .arrow").addClass("bounceForver");},3000);
  } else{
    navbarOpen = true;
  }
  $("HTML, BODY").animate({scrollTop: (0)}, 1000);
});

//AUDIO
var words = 'My name is Matthew Clark, I am a CIS major at the Masters University',
    wordArray = words.split(' ');
var fill = "";
for (var i = 0; i < wordArray.length; i++) {
  fill = fill + "<span id='introText"+i+"'>" + wordArray[i]+ " </span>";
}
$("#introText").append(fill);

words = 'Hello!',
    wordArray = words.split(' ');
fill = "";
for (var i = 0; i < wordArray.length; i++) {
  fill = fill + "<span id='helloText"+i+"'>" + wordArray[i]+ " </span>";
}

$("#helloText").append(fill);

var introTextTimestamps = [1183.98, 1392.91, 1683.19, 1892.19, 2588.79, 3088.02, 3284.36, 3482.73, 3690.74, 3889.08, 4387.36, 4584.73, 4690.19, 4991.05,6177.96];

  function play(id,timeArray){
    var audio = document.getElementsByTagName("audio")[0];
    audio.play();
      for (var i = 0; i < timeArray.length; i++) {
        timeout(i,timeArray,id);
      }
    }
    function timeout(i, timeArray, id){
      setTimeout(function(){
        for (var n = 0; n < timeArray.length; n++) {
          $("#"+id+n).css("background-color", "transparent");
        }
        $("#"+id+i).css( "background-color", "#ffffff9c" );
      },timeArray[i]);
    }

//3d HOVER Text

// why it doesn't work on firefox?
var card = $(".card");

$(document).on("mousemove",function(e) {
  var ax = -($(window).innerWidth()/2- e.pageX)/60;
  var ay = ($(window).innerHeight()/2- e.pageY)/30;
  card.attr("style", "transform: rotateY("+ax+"deg) rotateX("+ay+"deg);-webkit-transform: rotateY("+ax+"deg) rotateX("+ay+"deg);-moz-transform: rotateY("+ax+"deg) rotateX("+ay+"deg)");
});

//PAGE MOVERS

$(window).resize(function() {
  $("HTML, BODY").animate({
    scrollTop: (n * $(sections[n]).height())
  }, 10);
});

$(".listElements").on("click touch",function(event){
  if(navbarOpen == true) {
    $(".one .arrow").removeClass("bounceForver");
        $(navItems[n]).removeClass("selected");
        n = $(this).attr("n");
        $(navItems[n]).addClass("selected");
    $("HTML, BODY").animate({
      scrollTop: (n * $(sections[n]).height())
    }, 1000);
  }
});

$(".arrow").on("click touch",function(event){
  $(".listElements").css("cursor","default");
  $(".one .arrow").removeClass("bounceForver");
  if( n < (sections.length - 1 )){
      $(navItems[n]).removeClass("selected");
      n++;
      $(navItems[n]).addClass("selected");
  }
  $("HTML, BODY").animate({
    scrollTop: (n * $(sections[n]).height())
  }, 1000);
});

$( ".scrollableText" ).bind('mousewheel DOMMouseScroll', function(e) {
    var scrollTo = null;
    if (e.type == 'mousewheel') {
        scrolling = true;
    }
    else if (e.type == 'DOMMouseScroll') {
        scrolling = true;
    }
    if (scrollTo) {
        scrolling = true;
    }
});

$(".close-btn").on('click touch', function () {
  if(navbarOpen == true){
    navbarOpen = false;
    $( ".navbar" ).css({ "background-color": "rgba(255, 255, 255, 0)" });
    $( ".navbar .container-fluid" ).css({ "opacity": "0" });
    $( ".navbar .close-btn" ).css({ "opacity": "0" });
    $( ".navbar .menu-btn" ).css({ "opacity": "1" });
    $(".listElements").css("cursor","pointer");
  }
});
$(".menu-btn").on('click touch', function () {
  console.log("clicked");
  if(navbarOpen == false){
    navbarOpen = true;
    $( ".navbar" ).css({ "background-color": "rgba(255, 255, 255, 0.9)" });
    $( ".navbar .menu-btn" ).css({ "opacity": "0" });
    $( ".navbar .container-fluid" ).css({ "opacity": "1" });
    $( ".navbar .close-btn" ).css({ "opacity": "1" });
    $(".listElements").css("cursor","pointer");
  }
});

$( ".navbar" ).mouseenter(function(){
  if(document.body.offsetWidth < 1000){
    if(n != 0){
      $( ".navbar" ).css({ "opacity": "1" });
      $(".listElements").css("cursor","pointer");
      navbarOpen = true;
    }
  }
});
$( ".navbar" ).mouseleave(function(){
  if(n > 0){
    $( ".navbar" ).css({ "opacity": "0" });
    $(".listElements").css("cursor","default");
    navbarOpen = false;
  }
});

$( ".scrollableText" ).mouseleave(function(){
  scrolling = false;
});

$("body").on('mousewheel', function(event) {
  if(!scrolling && !overlay){
    $(".one .arrow").removeClass("bounceForver");
    scrolling = true;
    if(event.deltaY > 0){
      if( n != 0 && n < (sections.length)){
          $(navItems[n]).removeClass("selected");
          n--;
          $(navItems[n]).addClass("selected");
      }
      $("HTML, BODY").animate({
        scrollTop: (n * $(sections[n]).height())
      }, 1000);
    } else {
      if( n < (sections.length - 1 )){
          $(navItems[n]).removeClass("selected");
          n++;
          $(navItems[n]).addClass("selected");
      }
      $("HTML, BODY").animate({
        scrollTop: (n * $(sections[n]).height())
      }, 1000);
    }
    if(n > 0){
      $( ".navbar" ).css({ "opacity": "0" });
      $(".listElements").css("cursor","default");
      navbarOpen = false;
    } if(n == 0){
      $( ".navbar" ).css({ "opacity": "1" });
      $(".listElements").css("cursor","pointer");
      navbarOpen = true;
    }
    setTimeout(function() {
      scrolling = false;
    }, 1500);
  }
});
