var module = angular.module('multistreamApp', []);

module.controller('multistreamController', function($scope, $sce) {
    var navVisible = true;
    $scope.navToggle = "HIDE";
    $scope.chatButton = "HIDE CHAT";

    $scope.streamList = [];

    $scope.playerUrl = "http://player.twitch.tv/?channel=";
    $scope.chatStartUrl = "http://www.twitch.tv/";
    $scope.chatEndUrl = "/chat";

    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    }

    $scope.addStream = function() {
      if ($scope.input != null && ($scope.streamList.length < 4)) { //clean up create function
        var channel = $scope.input;
        var chatUrlFormat = ($scope.chatStartUrl + channel + $scope.chatEndUrl);
        var playerUrlFormat = ($scope.playerUrl + channel)
        var streamItem = { channel: channel, player: playerUrlFormat, chat: chatUrlFormat }
        $scope.streamList.push(streamItem);
        $scope.input = "";
        $scope.toggleLayout();
        $scope.toggleChat();
        //$scope.insertParam("stream", channel);
      }
    }
    $scope.deleteStream = function() {
      $scope.streamList.splice(this.$index, 1);
      $scope.toggleLayout();
      $scope.toggleChat();
      //add deleting url parameter
    }

    $scope.refreshStream = function(event) {
      var iframe = document.getElementById(event.target.className);
      iframe.src = iframe.src;
    }

    $scope.toggleLayout = function() {
      var numOfStreams = $scope.streamList.length;
      var chats = document.getElementsByClassName("chat");
      /*
      if (numOfStreams == 1) {
          $scope.setStyle(chats, "width", "30%");
          $scope.setStyle(chats, "height", "100%");
          $scope.setStyle(stream, "flex-direction", "row");
      } else {
          $scope.setStyle(chats, "width", "30%");
          $scope.setStyle(chats, "height", "100%");
          $scope.setStyle(stream, "flex-direction", "row");
      }
      */
      $scope.toggleChat();
    }

    $scope.setStyle = function(elementList, style, newSetting) {
      setTimeout(function() { //Delay to ensure all elements effected
        for (var i = 0; i <= elementList.length; i++) {
          elementList[i].style[style] = newSetting;
        }
      },10);
    }

    $scope.setChat = function() {
      if ($scope.chatButton == "HIDE CHAT") {
        $scope.chatButton = "SHOW CHAT";
      } else {
        $scope.chatButton = "HIDE CHAT";
      }
      $scope.toggleChat();
    }

    $scope.toggleChat = function() {
      console.log("chat toggle");
      var chats = document.getElementsByClassName("chat");
      if ($scope.chatButton == "SHOW CHAT") {
        var newHeight = "0%";
      } else {
        var newHeight = "70%";
      }
      $scope.setStyle(chats, "height", newHeight);
    }

    $scope.toggleNav = function() {
      if (navVisible == true) {
        document.getElementById("navBar").style.display = "none";
        document.getElementById("stream-container").style.minHeight = "100vh";
        $scope.navToggle = "SHOW"
        navVisible = false;
      } else {
        document.getElementById("navBar").style.display = "flex";
        document.getElementById("stream-container").style.minHeight = "calc(100vh - 50px)";
        $scope.navToggle = "HIDE"
        navVisible= true;
      }
    }

    /*
    $scope.insertParam = function(key, value) {
        //key = encodeURI(key);
        value = encodeURI(value);

        var kvp = document.location.search.substr(1).split(',');

        var i=kvp.length; var x; while(i--)
        {
            x = kvp[i].split('=');

            //if (x[0]==key)
          //  {
          //      x[1] = value;
            //    kvp[i] = x.join('=');
          //      break;
          //  }
        }

        if(i<0) {kvp[kvp.length] = [value].join('=');}

        //this will reload the page, it's likely better to store this until finished
        document.location.search = kvp.join(',');
    }



    //URL LOADING NEED TO WORK ON
    $scope.getParam = function() {

      var urlParams = new URLSearchParams(window.location.search);
      urlStreams = urlParams.get('stream');
      urlStreams = urlStreams.split(",");

      for (channel in urlStreams) {  //clean up create function
        if ($scope.streamList.length < 4) {
          var channel = urlStreams[channel];
          var chatUrlFormat = ($scope.chatStartUrl + channel + $scope.chatEndUrl);
          var playerUrlFormat = ($scope.playerUrl + channel)
          var streamItem = { channel: channel, player: playerUrlFormat, chat: chatUrlFormat }
          $scope.streamList.push(streamItem);
          $scope.toggleLayout();
          $scope.toggleChat();
        }
      }
      var parameters = loadUrl();
      console.log(parameters);
    }

    $scope.loadUrl = function() {


      var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for (var i=0;i<url.length;i++) {
             var params = url[i].split("=");
             if(params[0] == param)
              return params[1];
      }
      return false;
    }
    */

});
