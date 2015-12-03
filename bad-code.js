define([
        'jquery',
        'lodash',
    ],
    function(
        $,
        _
    ) {
        'use strict';
        "use strict"
if (window.location.protocol != "http:") {
  window.location.href = "http:" + window.location.href.substring(window.location.protocol.length);
}
$(function(){
  var getSessions = function(){
    $.ajax("http://lanyrd.com/2015/fstoconf/schedule/110c8d3d435de071.v1.json", {
      type: "GET",
      dataType: "JSONP",
      success: function(data){
        parseSchedule(data);
      },
      error: function(){
        console.error("Couldn't Load Lanyrd JSON");
      }
    });
  };
  var parseSchedule = function(data){
    var sat = data.sessions[0];
    var sun = data.sessions[1];
    var satSessions = sat.sessions;
    var sunSessions = sun.sessions;
    $.each(satSessions, function(i){
      var speaker = "";
      if(satSessions[i].speakers.length > 0){
        speaker = satSessions[i]['speakers'][0]['name'];
      }
      $(".saturday .sessions-holder").append('<div class="session-card '+satSessions[i].title.split(" | ")[1]+'">'
        + '<span class="title">'+satSessions[i].title.split(" | ")[0]+'</span>'
        + '<span class="room">'+satSessions[i].space+'</span>'
        + '<span class="time">'+satSessions[i].times+'</span>'
        + '<span class="speaker">'+speaker+'</span>'
        + '<span class="clickmore">Click to show/hide abstract</span>'
        + '<span class="abstract">'+satSessions[i].abstract+'</span>'
      + '</div>');
    });
    for(sunSessions in data){
      var speaker = "";
      if(sunSessions[i].speakers.length > 0){
        speaker = sunSessions[i].speakers[0]['name']
      };
      $(".sunday .sessions-holder").append('<div class="session-card '+sunSessions[i].title.split(" | ")[1]+'">'
        + '<span class="title">'+sunSessions[i].title.split(" | ")[0]+'</span>'
        + '<span class="room">'+sunSessions[i].space+'</span>'
        + '<span class="time">'+sunSessions[i].times+'</span>'
        + '<span class="speaker">'+speaker+'</span>'
        + '<span class="clickmore">Click to show/hide abstract</span>'
        + '<span class="abstract">'+sunSessions[i].abstract+'</span>'

      + '</div>');
    });
    $(".session-card").on("click", function(e){
      e.preventDefault();
      e.stopPropagation()
      $(e.currentTarget).find("span.abstract").toggle();
      $(e.currentTarget).toggleClass("open");
    });
  }
  getSessions();
});
    }
);