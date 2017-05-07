var module = angular.module('multistreamApp', []);

module.controller('multistreamController', function($scope, $sce) {
    var navVisible = true;
    $scope.navToggle = "HIDE";
    $scope.chat = "HIDE CHAT";

    $scope.streamList = [];

    $scope.playerUrl = "http://player.twitch.tv/?channel=";
    $scope.chatStartUrl = "http://www.twitch.tv/";
    $scope.chatEndUrl = "/chat";

    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    }

    $scope.addStream = function() {
      if ($scope.input != null && ($scope.streamList.length < 5)) {
        var channel = $scope.input;
        var chatUrlFormat = ($scope.chatStartUrl + $scope.input + $scope.chatEndUrl);
        var playerUrlFormat = ($scope.playerUrl + $scope.input)
        var streamItem = { channel: channel, player: playerUrlFormat, chat: chatUrlFormat }
        $scope.streamList.push(streamItem);
        $scope.input = "";
        $scope.toggleLayout();
        $scope.toggleChat();
      }
    }
    $scope.deleteStream = function() {
      $scope.streamList.splice(this.$index, 1);
      $scope.toggleLayout();
      $scope.toggleChat();
    }

    $scope.toggleLayout = function() {
      var numOfStreams = $scope.streamList.length;
      var streams = document.getElementsByClassName("stream");
      var newHeight = "100%";
      if (numOfStreams == 2) {
          newHeight = "50%";
      } else if (numOfStreams == 3) {
          newHeight = "33.33%";
      } else if (numOfStreams == 4) {
          newHeight = "25%";
      } else {
          newHeight = "100%";
      }
      /*
      setTimeout(function() { //Delay to ensure all elements effected
        for (var i = 0; i <= streams.length; i++) {
          streams[i].style.height = newHeight;
        }
      },10);
      */
    }

    $scope.setChat = function() {
      if ($scope.chat == "HIDE CHAT") {
        $scope.chat = "SHOW CHAT";
      } else {
        $scope.chat = "HIDE CHAT";
      }
      $scope.toggleChat();
    }

    $scope.toggleChat = function() {
      var chats = document.getElementsByClassName("chat");
      if ($scope.chat == "SHOW CHAT") {
        var newHeight = "0%";
      } else {
        var newHeight = "70%";
      }
      setTimeout(function() { //Delay to ensure all elements effected
        for (var i = 0; i <= chats.length; i++) {
          chats[i].style.height = newHeight;
        }
      },10);
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

    //URL LOADING NEED TO WORK ON
    $scope.getParam = function() {
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
});
