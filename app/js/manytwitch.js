var module = angular.module('multistreamApp', ['angular-sortable-view']);

module.controller('multistreamController', function($scope, $sce) {
    var root = document.documentElement.style;
    var maxNumOfStreams = 6;
    var initialLayout = "grid";
    var grid = "grid";
    var column = "column";
    var currentLayout = grid;
    var firstLoad = true;
    var recentlyAdded = true;
    var navVisible = true;
    var playerUrl = "http://player.twitch.tv/?channel=";
    var chatStartUrl = "http://www.twitch.tv/";
    var chatEndUrl = "/chat";

    var chatVisiblity = true;

    var fullscreen = false;
    var menuOpen = false;

    $scope.streamList = [];
    $scope.availableLayouts = currentLayout;

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
        insertParam();
        updateLayout();
        var numOfStreams = $scope.streamList.length;
        if (numOfStreams == 1) {
          setMainChat()
          changeLayout(currentLayout);
        }
        if (numOfStreams == 0){
          changeLayout(currentLayout);
        }
        recentlyAdded = true;
      }
    }

    $scope.deleteStream = function() {
      var removedStream = $scope.streamList[this.$index].channel;
      deleteParam(removedStream);
      $scope.streamList.splice(this.$index, 1);
      var removedChatUrl = chatStartUrl + removedStream + chatEndUrl;
      var numOfStreams = $scope.streamList.length;
      if (removedChatUrl == $scope.mainChatUrl && numOfStreams > 0 || numOfStreams == 1) {
        setMainChat()
      } else {
        $scope.getMainChat();
      }
      if (currentLayout == grid) {
        updateLayout();
      }
    }

    $scope.refreshStream = function(event) {
      streamID = event.target.className + "player";
      var streamFrame = document.getElementById(streamID);
      streamFrame.src = streamFrame.src;
      chatID = event.target.className + "chat";
      var chatFrame = document.getElementById(chatID);
      chatFrame.src = chatFrame.src;
    }

    $scope.refreshMainChat = function() {
      var iframe = document.getElementById("mainChat");
      iframe.src = iframe.src;
    }

    function setMainChat() {
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

    $scope.toggleChat = function() {
      chatVisiblity = !chatVisiblity;
      //console.log(chatVisiblity);
      if(chatVisiblity) {
        if(currentLayout == grid) {
          root.setProperty("--mainChat-display", "flex");
        } else {
          root.setProperty("--chat-display", "flex");
        }
      } else {
        root.setProperty("--mainChat-display", "none");
        root.setProperty("--chat-display", "none");
      }
    }

    function changeLayout(newLayout) {
      currentLayout = newLayout;
      if (currentLayout == grid){
        changeLayoutGrid();
      } else if (currentLayout == column) {
        changeLayoutColumn();
      }
      //setChat();
      updateLayout();
    }

    $scope.toggleHelp = function() {
      console.log("Toggle Help");
    }

    $scope.toggleMenu = function() {
      //console.log("Toggle Menu");
      document.getElementById("overlay-button").classList.toggle("active");
      menuOpen = !menuOpen;
      if(menuOpen) {
        root.setProperty("--settings-display", "block");
        root.setProperty("--overlay-display", "block");
        root.setProperty("--overlay-opacity", "0.5");
      } else {
        root.setProperty("--settings-display", "none");
        root.setProperty("--overlay-display", "none");
        root.setProperty("--overlay-opacity", "0");
      }
    }

    $scope.setLayout = function() {
        if ($scope.availableLayouts != "") {
          changeLayout($scope.availableLayouts);
        }
    }

    $scope.toggleFullscreen = function() {
      //console.log("Toggle Fullscreen");
      fullscreen = !fullscreen;
      if(fullscreen) {
        enableFullscreen();
      } else {
        disableFullscreen();
      }
    }

    function enableFullscreen() {
      root.setProperty("--navBar-display", "none");
      root.setProperty("--settings-top", "0");
      root.setProperty("--settings-height", "100vh");
    }

    function disableFullscreen() {
      root.setProperty("--navBar-display", "flex");
      root.setProperty("--settings-top", "3em");
      root.setProperty("--settings-height", "calc(100vh - 3em)");
    }

    function changeLayoutGrid() {
      if(chatVisiblity) {
        root.setProperty("--mainChat-display", "flex");
      }
      root.setProperty("--chat-display", "none");
      //root.setProperty("--chat-display", "none");
      //root.setProperty("--mainChat-display", "flex");
      root.setProperty("--stream-width", "initial");
    }

    function changeLayoutColumn() {
      if (navigator.userAgent.indexOf("Firefox") > 0 && (firstLoad == true || recentlyAdded == true)) { //Ensure all chats load on firefox
        reloadAllChats();
      }
      root.setProperty("--chat-height", "70%");
      root.setProperty("--chat-width", "100%");
      if(chatVisiblity) {
        root.setProperty("--chat-display", "flex");
      }
      root.setProperty("--mainChat-display", "none");
      //root.setProperty("--chat-display", "flex");
      //root.setProperty("--mainChat-display", "none");


      root.setProperty("--stream-width", "initial")
    }

    function reloadAllChats() {
      for (channel in $scope.streamList) {
        streamID = $scope.streamList[channel].channel + "chat";
        var iframe = document.getElementById(streamID);
        if (iframe != null) {
          iframe.src = iframe.src;
        }
      }
      firstLoad = false;
    }

    function updateLayout() {
      if ($scope.streamList.length != 0) {
        root.setProperty("--bg", "black");
        var numOfStreams = $scope.streamList.length;
        var streamElementList = document.getElementsByClassName("stream");
        var focusStream = streamElementList[0];
        if (currentLayout == grid) {
          updateLayoutGrid(focusStream, numOfStreams, streamElementList);
        } else {
          updateLayoutColumn(focusStream, numOfStreams, streamElementList);
        }
      } else {
        disableFullscreen();
        root.setProperty("--bg", "#5C6391");
        if(chatVisiblity) {

        } else {
          root.setProperty("--mainChat-display", "none");
          root.setProperty("--mainChatButton-display", "none");
          root.setProperty("--allChatButton-display", "none");
        }
      }
    }

    function updateLayoutGrid(focusStream, numOfStreams, streamElementList) {
      if (numOfStreams == 1) {
        //root.setProperty("--mainChatButton-display", "block");
      }
      if (numOfStreams == 2) {
        root.setProperty("--stream-width", "100%");
        focusStream.style.width = "var(--stream-width)";
      } else if (numOfStreams == 3) {
        root.setProperty("--stream-width", "initial");
        setStyle(streamElementList, "width", "var(--stream-width)");
        focusStream.style.width = "100%";
      } else if (numOfStreams == 4) {
        root.setProperty("--stream-width", "50%");
        setStyle(streamElementList, "width", "var(--stream-width)");
      } else if (numOfStreams == 5) {
        root.setProperty("--stream-width", "50%");
        setStyle(streamElementList, "width", "var(--stream-width)");
        focusStream.style.width = "100%";
      } else if (numOfStreams == 6) {
        root.setProperty("--stream-width", "50%");
        focusStream.style.width = "var(--stream-width)";
      }
    }

    function updateLayoutColumn(focusStream, numOfStreams, streamElementList) {
      focusStream.style.width = "var(--stream-width)";
      root.setProperty("--stream-width", "initial");
    }

    function setStyle(elementList, style, newSetting) {
      for (var i = 0; i <= (elementList.length-1); i++) {
          elementList[i].style[style] = newSetting;
      }
    }

    /*
    $scope.toggleNav = function() {
      navVisible = !navVisible;
      if (navVisible == true) {
        root.setProperty("--navBar-display", "flex");
        $scope.navIcon = upIcon;
        root.setProperty("--navToggle-top", navButtonOffset);
        root.setProperty("--mainChatButton-top", navButtonOffset);
      } else {
        root.setProperty("--navBar-display", "none");
        $scope.navIcon = downIcon;
        root.setProperty("--navToggle-top", 0);
        root.setProperty("--mainChatButton-top", 0);
      }
    }*/

    /*
    $scope.clearStreams = function() {
      $scope.streamList.length = 0;
    }*/

    function insertParam() {
      var channels;
      for (channel in $scope.streamList) {
        channels += String($scope.streamList[channel].channel) + ",";
      }
      channels = channels.replace("undefined","");
      var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?stream=' + channels;
      window.history.pushState({path:newurl},'',newurl);
    }

    function deleteParam(removedChannel) {
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
              //toggleAllChat();
              setMainChat()
            }
          }
        }
      }
      setTimeout(function(){ changeLayout(grid); }, 20);
    }
});
