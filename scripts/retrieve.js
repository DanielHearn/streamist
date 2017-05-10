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
        $scope.toggleAllChat();
        $scope.insertParam();
      }
    }
    $scope.deleteStream = function() {
      var removedStream = $scope.streamList[this.$index].channel
      $scope.deleteParam(removedStream);
      $scope.streamList.splice(this.$index, 1);
      $scope.toggleLayout();
      $scope.toggleAllChat();
    }

    $scope.refreshStream = function(event) {
      streamID = event.target.className + "player"
      var iframe = document.getElementById(streamID);
      iframe.src = iframe.src;
    }

    $scope.toggleStreamChat = function(event) {
      streamID = event.target.className + "chat"
      var streamChat = document.getElementById(streamID);
      if (streamChat.style.display == "none") {
        streamChat.style.display = "block"
      } else {
        streamChat.style.display = "none"
      }
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
      $scope.toggleAllChat();
    }

    $scope.setStyle = function(elementList, style, newSetting) {
      setTimeout(function() { //Delay to ensure all elements effected
        for (var i = 0; i < elementList.length; i++) {
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
      $scope.toggleAllChat();
    }

    $scope.toggleAllChat = function() {
      var chats = document.getElementsByClassName("chat");
      if ($scope.chatButton == "SHOW CHAT") {
        var newDisplay = "none";
      } else {
        var newDisplay = "block";
      }
      $scope.setStyle(chats, "display", newDisplay);
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

    $scope.insertParam = function() {
      var channels;
      for (channel in $scope.streamList) {
        channels += String($scope.streamList[channel].channel) + ",";
      }
      channels = channels.replace("undefined","");
      console.log("inserted: " + channels);
      var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?stream=' + channels;
      window.history.pushState({path:newurl},'',newurl);
    }

    $scope.deleteParam = function(removedChannel) {
      var channels;
      //console.log($scope.streamList);
      for (channel in $scope.streamList) {
        channels += String($scope.streamList[channel].channel) + ",";
      }
      channels = channels.replace("undefined","");
      channels = channels.replace(removedChannel + ",","");
      console.log("deleting: " + removedChannel);
      var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?stream=' + channels;
      window.history.pushState({path:newurl},'',newurl);
    }


    $scope.getParam = function() {
      var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      var urlParams = new URLSearchParams(location.search.substring(1));
      urlStreams = urlParams.get('stream');
      if (urlStreams !== "" && urlStreams !== null) {
        urlStreams = urlStreams.split(",");
        for (channel in urlStreams) {  //clean up create function
          if ($scope.streamList.length < 4) {
            var channel = urlStreams[channel];
            if(channel !== "") {
              var chatUrlFormat = ($scope.chatStartUrl + channel + $scope.chatEndUrl);
              var playerUrlFormat = ($scope.playerUrl + channel)
              var streamItem = { channel: channel, player: playerUrlFormat, chat: chatUrlFormat }
              $scope.streamList.push(streamItem);
              $scope.toggleLayout();
              $scope.toggleAllChat();
            }
          }
        }
      }
      //var parameters = $scope.loadUrl();
      //  console.log(parameters);
    }
/*
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
