var module = angular.module('multistreamApp', []);

module.controller('multistreamController', function($scope, $sce) {
    var navVisible = true;
    var currentLayout = "layout1";

    $scope.navToggle = "HIDE";
    $scope.chatButton = "HIDE CHAT";

    $scope.streamList = [];

    $scope.playerUrl = "http://player.twitch.tv/?channel=";
    $scope.chatStartUrl = "http://www.twitch.tv/";
    $scope.chatEndUrl = "/chat";

    //$scope.availableChats = "SelectChat";

    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    }

    $scope.addStream = function() {
      if ($scope.input != null && ($scope.streamList.length < 4)) { //clean up create function
        var channel = $scope.input;
        var chatUrlFormat = ($scope.chatStartUrl + channel + $scope.chatEndUrl);
        var playerUrlFormat = ($scope.playerUrl + channel)
        var streamItem = { channel: channel, player: playerUrlFormat, chat: chatUrlFormat };
        $scope.streamList.push(streamItem);
        $scope.input = "";
        //$scope.toggleLayout();
        $scope.toggleAllChat();
        $scope.insertParam();
        $scope.changeLayout(currentLayout);
        if ($scope.streamList.length == 1) {
          $scope.setMainChat();
        }
      }
    }

    $scope.deleteStream = function() {
      var removedStream = $scope.streamList[this.$index].channel;
      $scope.deleteParam(removedStream);
      $scope.streamList.splice(this.$index, 1);
      //$scope.toggleLayout();
      //$scope.toggleAllChat();
      //$scope.changeLayout(currentLayout);
      if ($scope.streamList.length == 1) {
        $scope.setMainChat();
      }
      if (currentLayout = "layout1" && $scope.streamList.length == 0) {
          document.getElementById("mainChat").style.display = "none";
      }
      $scope.getMainChat();
    }

    $scope.refreshStream = function(event) {
      streamID = event.target.className + "player"
      var iframe = document.getElementById(streamID);
      iframe.src = iframe.src;
    }

    $scope.toggleStreamChat = function(event) {
      if (currentLayout == "layout1") {
        streamID = event.target.className + "chat";
        var streamChat = document.getElementById(streamID);
        if (streamChat.style.display == "none") {
          streamChat.style.display = "block";
        } else {
          streamChat.style.display = "none";
        }
      }
    }

    $scope.setMainChat = function() {
        if ($scope.availableChats != "") {
          $scope.availableChats = $scope.streamList[0].channel;
          $scope.getMainChat();
        }
    }

    $scope.getMainChat = function() {
        if ($scope.availableChats != "") {
          var chatUrlFormat = ($scope.chatStartUrl + $scope.availableChats + $scope.chatEndUrl);
          $scope.mainChatUrl = chatUrlFormat;
        }
    }

    $scope.toggleLayout = function() {
      //var numOfStreams = $scope.streamList.length;
      //var chats = document.getElementsByClassName("chat");
    }

    $scope.setStyle = function(elementList, style, newSetting) {
      setTimeout(function() { //Delay to ensure all elements effected
        for (var i = 0; i < elementList.length; i++) {
          elementList[i].style[style] = newSetting;
        }
      },10);
    }

    $scope.setChat = function() {
      if (currentLayout == "layout1") {
        if ($scope.chatButton == "HIDE CHAT") {
          $scope.chatButton = "SHOW CHAT";
        } else {
          $scope.chatButton = "HIDE CHAT";
        }
        $scope.toggleAllChat();
      } else {
        if ($scope.chatButton == "HIDE CHAT") {
          $scope.chatButton = "SHOW CHAT";
          document.getElementById("mainChat").style.display = "none";
        } else {
          $scope.chatButton = "HIDE CHAT";
          document.getElementById("mainChat").style.display = "flex";
        }
      }
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

    $scope.changeLayout = function(newLayout) {
      var streamList = document.getElementsByClassName("stream");
      var chatList = document.getElementsByClassName("chat");
      currentLayout = newLayout;
      if (currentLayout == "layout1"){
        $scope.setStyle(streamList, "flex-direction", "column");
        $scope.setStyle(chatList, "height", "70%");
        $scope.setStyle(chatList, "width", "100%");
        $scope.setStyle(chatList, "display", "flex");
        $scope.chatButton = "HIDE CHAT";
        document.getElementById("mainChat").style.display = "none";
        //$scope.setChat();
      } else if (currentLayout == "layout2" && $scope.streamList.length != 0) {
        $scope.setStyle(streamList, "flex-direction", "row");
        $scope.setStyle(chatList, "height", "100%");
        $scope.setStyle(chatList, "width", "30%");
        $scope.setStyle(chatList, "display", "none");
        $scope.chatButton = "HIDE CHAT";
        document.getElementById("mainChat").style.display = "flex";
      }
    }

    $scope.toggleNav = function() {
      if (navVisible == true) {
        //document.getElementById("navBar").style.display = "none";
        document.getElementById("navBar").style.maxHeight = 0;
        //document.getElementById("stream-container").style.minHeight = "100vh";  //SORT OUT NAV SO THAT I SHOULDNT HAVE TO CHANGE, IT SHOULD FLEX
        $scope.navToggle = "SHOW"
        navVisible = false;
      } else {
        //document.getElementById("navBar").style.display = "flex";
        document.getElementById("navBar").style.maxHeight = "50px";
        //document.getElementById("stream-container").style.minHeight = "100vh";
        $scope.navToggle = "HIDE"
        navVisible= true;
      }
      //inverse navvisible
    }

    $scope.insertParam = function() {
      var channels;
      for (channel in $scope.streamList) {
        channels += String($scope.streamList[channel].channel) + ",";
      }
      channels = channels.replace("undefined","");
      var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?stream=' + channels;
      window.history.pushState({path:newurl},'',newurl);
    }

    $scope.deleteParam = function(removedChannel) {
      var channels;
      for (channel in $scope.streamList) {
        channels += String($scope.streamList[channel].channel) + ",";
      }
      channels = channels.replace("undefined","");
      channels = channels.replace(removedChannel + ",","");
      var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?stream=' + channels;
      window.history.pushState({path:newurl},'',newurl);
    }

    $scope.getParam = function() {
      var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      var urlParams = new URLSearchParams(location.search.substring(1));
      urlStreams = urlParams.get('stream');
      if (urlStreams !== "" && urlStreams !== null) {
        urlStreams = urlStreams.split(",");
        for (channel in urlStreams) {
          if ($scope.streamList.length < 4) {
            var channel = urlStreams[channel];
            if(channel !== "") {
              var chatUrlFormat = ($scope.chatStartUrl + channel + $scope.chatEndUrl);
              var playerUrlFormat = ($scope.playerUrl + channel)
              var streamItem = { channel: channel, player: playerUrlFormat, chat: chatUrlFormat }
              $scope.streamList.push(streamItem);
              $scope.toggleLayout();
              $scope.toggleAllChat();
              $scope.setMainChat();
            }
          }
        }
      }
    }

    $scope.changeLayout("layout1");

});
