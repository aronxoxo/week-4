/* =====================
  Lab 2, part3: a full application

  We're going to use the skills we've just been practicing to write a full application
  which is responsive to user input.
  At your disposal are a set of global variables which track user input (see
  part3-main.js and part3-setup.js for more details on how this is done — we'll
  cover this topic at a later date). Their values will be logged to console to
  aid in debugging.

  In this lab, which is very much open-ended, your task is to use the value of
  these variables to define the functions below. Try to come up with interesting
  uses of the provided user input.

  Some ideas:
    There are two numeric fields: can you write this application so as to filter
    using both minimum and maximum?
    There is a boolean field: can you write your code to filter according to this
    boolean? (Try to think about how you could chop your data to make this meaningful.)
    There is a string field: can you write your code to filter/search based on user
    input?

  Remember, this is open-ended. Try to see what you can produce.
===================== */

/* ===========================My Introduction==============================
  The filter condition here are shown on the index website: users can set the
solar installation year, the developer, and decide if detailed information is
needed as popups (picture, name, and built year)
  This application is imperfect, because the restMap function isn't defined.
===================== */

//filters according to the first two conditions, meaning that boolean condition
//is not included in this one. Boolean condition is used in the plotting function.
var markers=[];

var dataFilter = function(){
  return _.filter(myData, function(obj){
    return (obj.YEARBUILT>=numericField1) && (obj.YEARBUILT<=numericField2) && (obj.DEVELOPER === stringField);
  });
};


/* =====================
  Define a resetMap function to remove markers from the map and clear the array of markers
===================== */
var resetMap = function() {
  /* =====================
    Fill out this function definition
  ===================== */
    _.each(markers, function(obj){
      map.removeLayer(obj);
    });
    markers=[];
};

/* =====================
  Define a getAndParseData function to grab our dataset through a jQuery.ajax call ($.ajax). It
  will be called as soon as the application starts. Be sure to parse your data once you've pulled
  it down!
===================== */
var getAndParseData = function() {
  /* =====================
    Fill out this function definition
  ===================== */
  $.ajax(link).done(function(data) {
    myData = JSON.parse(data);
    });
};

//make markers
var makeMarkers = function(filteredData) {
  return _.map(filteredData, function(obj){
    return L.marker([obj.Y, obj.X]);
  });
};

/* =====================
  Call our plotData function. It should plot all the markers that meet our criteria (whatever that
  criteria happens to be — that's entirely up to you)
===================== */

//if boolean box is selected, meaning that the user wants to see the detailed
//info, then popups along with markers will show up. If not, only markers will
//shown up.
var plotData = function() {
  /* =====================
    Fill out this function definition
  ===================== */
  var filteredData = dataFilter();
  markers = makeMarkers(filteredData);
  var option ={
    'maxWidth': '500',
    'className' : 'custom'
    };
  if(booleanField){
    _.each(filteredData, function(obj){
      var img = "<img src=" + obj.THUMB_URL + " width='150px'/><br><b>" + obj.NAME + "</b><br><i>"+ obj.YEARBUILT +"</i>";
      L.marker([obj.Y, obj.X]).addTo(map).bindPopup(img,option).openPopup();
    });
  }
  else{
    _.each(markers, function(array){
      array.addTo(map);
    });
  }
};

//phillySolarInstallationDataUrl
var link = "https://raw.githubusercontent.com/CPLN690-MUSA610/datasets/master/json/philadelphia-solar-installations.json";
