var module = angular.module('multistreamApp', []);

module.controller('multistreamController', function($scope, $sce) {
    var navVisible = true;
    var root = document.documentElement.style;
    var hideChatText = "HIDE CHAT";
    var showChatText = "SHOW CHAT";
    var hideNavText = "HIDE BAR";
    var showNavText = "SHOW BAR";
    var maxNumOfStreams = 6;
    var initialLayout = "grid";
    var grid = "grid";
    var column = "column";
    var currentLayout = grid;
    var firstLoad = true;
    var playerUrl = "http://player.twitch.tv/?channel=";
    var chatStartUrl = "http://www.twitch.tv/";
    var chatEndUrl = "/chat";

    $scope.navToggle = hideNavText;
    $scope.chatButton = hideChatText;
    $scope.streamList = [];

    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    }

    $scope.addStream = function() {
      if ($scope.input != null && ($scope.streamList.length < maxNumOfStreams)) {
        var channel = $scope.input;
        var chatUrlFormat = (chatStartUrl + channel + chatEndUrl);
        var playerUrlFormat = (playerUrl + channel)
        var streamItem = { channel: channel, player: playerUrlFormat, chat: chatUrlFormat };
        $scope.streamList.push(streamItem);
        $scope.input = "";
        $scope.insertParam();
        $scope.updateLayout();
        var numOfStreams = $scope.streamList.length;
        if (numOfStreams == 1) {
          $scope.setMainChat();
          $scope.changeLayout(currentLayout);
        }
        if (numOfStreams == 0){
          $scope.changeLayout(currentLayout);
        }
      }
    }

    $scope.deleteStream = function() {
      var removedStream = $scope.streamList[this.$index].channel;
      $scope.deleteParam(removedStream);
      $scope.streamList.splice(this.$index, 1);
      var removedChatUrl = chatStartUrl + removedStream + chatEndUrl;
      var numOfStreams = $scope.streamList.length;
      if (removedChatUrl == $scope.mainChatUrl && numOfStreams > 0 || numOfStreams == 1) {
        $scope.setMainChat();
      }
      if (currentLayout == grid) {
        $scope.updateLayout();
      }
      $scope.getMainChat();
      if (numOfStreams == 0){
          root.setProperty("--mainChat-display", "none");
      }
    }

    $scope.refreshStream = function(event) {
      streamID = event.target.className + "player";
      var iframe = document.getElementById(streamID);
      iframe.src = iframe.src;
      chatID = event.target.className + "chat";
      var iframe = document.getElementById(chatID);
      iframe.src = iframe.src;
    }

      $scope.refreshMainChat = function() {
        var iframe = document.getElementById("mainChat");
        iframe.src = iframe.src;
      }

    $scope.setMainChat = function() {
        if ($scope.availableChats != "") {
          $scope.availableChats = $scope.streamList[0].channel;
          $scope.getMainChat();
        }
    }

    $scope.getMainChat = function() {
        if ($scope.availableChats != "") {
          var chatUrlFormat = (chatStartUrl + $scope.availableChats + chatEndUrl);
          $scope.mainChatUrl = chatUrlFormat;
        }
    }

    $scope.setChat = function() {
      if (currentLayout == column) {
        if ($scope.chatButton == hideChatText) {
          $scope.chatButton = showChatText;
        } else {
          $scope.chatButton = hideChatText;
        }
        $scope.toggleAllChat();
      } else {
        if ($scope.chatButton == hideChatText) {
          $scope.chatButton = showChatText;
          root.setProperty("--mainChat-display", "none");
        } else {
          $scope.chatButton = hideChatText;
          root.setProperty("--mainChat-display", "flex");
        }
      }
    }

    $scope.toggleAllChat = function() {
      if ($scope.chatButton == showChatText) {
        var newDisplay = "none";
      } else {
        var newDisplay = "flex";
      }
      root.setProperty("--chat-display", newDisplay);
    }

    $scope.changeLayout = function(newLayout) {
      currentLayout = newLayout;
      if (currentLayout == grid){
        $scope.changeLayoutGrid();
      } else if (currentLayout == column) {
        $scope.changeLayoutColumn();
      }
      $scope.chatButton = hideChatText;
      $scope.updateLayout();
    }

    $scope.changeLayoutGrid = function() {
      root.setProperty("--chat-display", "none");
      root.setProperty("--mainChat-display", "flex");
      root.setProperty("--stream-width", "initial")
    }

    $scope.changeLayoutColumn = function() {
      if (navigator.userAgent.indexOf("Firefox") > 0 && firstLoad == true) { //Ensure all chats load on firefox
        $scope.reloadAllChats();
      }
      root.setProperty("--chat-height", "70%");
      root.setProperty("--chat-width", "100%");
      root.setProperty("--chat-display", "flex");
      root.setProperty("--mainChat-display", "none");
      root.setProperty("--stream-width", "initial")
    }

    $scope.reloadAllChats = function() {
      for (channel in $scope.streamList) {
        streamID = $scope.streamList[channel].channel + "chat";
        var iframe = document.getElementById(streamID);
        if (iframe != null) {
          iframe.src = iframe.src;
        }
      }
      firstLoad = false;
    }

    $scope.updateLayout = function() {  //Clean up function
      if ($scope.streamList.length != 0) {
        var numOfStreams = $scope.streamList.length;
        var streamElementList = document.getElementsByClassName("stream");
        var focusStream = streamElementList[0];
        if (currentLayout == grid) {
          $scope.updateLayoutGrid(focusStream, numOfStreams, streamElementList);
        } else {
          $scope.updateLayoutColumn(focusStream, numOfStreams, streamElementList);
        }
      } else {
        root.setProperty("--mainChat-display", "none");
      }
    }

    $scope.updateLayoutGrid = function(focusStream, numOfStreams, streamElementList) {
      if (numOfStreams == 2) {
        root.setProperty("--stream-width", "100%");
        focusStream.style.width = "var(--stream-width)";
      } else if (numOfStreams == 3) {
        root.setProperty("--stream-width", "initial");
        $scope.setStyle(streamElementList, "width", "var(--stream-width)");
        focusStream.style.width = "100%";
      } else if (numOfStreams == 4) {
        root.setProperty("--stream-width", "50%");
        $scope.setStyle(streamElementList, "width", "var(--stream-width)");
      } else if (numOfStreams == 5) {
        var streamElementList = document.getElementsByClassName("stream");
        root.setProperty("--stream-width", "50%");
        $scope.setStyle(streamElementList, "width", "var(--stream-width)");
        focusStream.style.width = "100%";
      } else if (numOfStreams == 6) {
        root.setProperty("--stream-width", "50%");
        focusStream.style.width = "var(--stream-width)";
      }
    }

    $scope.updateLayoutColumn = function(focusStream, numOfStreams, streamElementList) {
      focusStream.style.width = "var(--stream-width)";
      root.setProperty("--stream-width", "initial");
    }

    $scope.setStyle = function(elementList, style, newSetting) {
      for (var i = 0; i <= (elementList.length-1); i++) {
          elementList[i].style[style] = newSetting;
      }
    }

    $scope.toggleNav = function() {
      navVisible = !navVisible;
      if (navVisible == true) {
        root.setProperty("--navBar-display", "flex");
        $scope.navToggle = hideNavText
        var navButton = document.getElementById("navToggle");
        navButton.style.top = "48px";
        //root.setProperty("--navButton-bg", "var(--accent-primary)")
      } else {
        root.setProperty("--navBar-display", "none");
        $scope.navToggle = showNavText
        var navButton = document.getElementById("navToggle");
        navButton.style.top = 0;
        //root.setProperty("--navButton-bg", "var(--accent-secondary)")
      }
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
          if ($scope.streamList.length < maxNumOfStreams) {
            var channel = urlStreams[channel];
            if(channel !== "") {
              var chatUrlFormat = (chatStartUrl + channel + chatEndUrl);
              var playerUrlFormat = (playerUrl + channel)
              var streamItem = { channel: channel, player: playerUrlFormat, chat: chatUrlFormat }
              $scope.streamList.push(streamItem);
              $scope.toggleAllChat();
              $scope.setMainChat();
            }
          }
        }
      }
      setTimeout(function(){ $scope.changeLayout(grid); }, 20);
    }
});
