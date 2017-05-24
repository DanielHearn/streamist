var module = angular.module('multistreamApp', []);

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
    var upIcon = "img/up.svg";
    var downIcon = "img/down.svg";
    var leftIcon = "img/left.svg";
    var rightIcon = "img/right.svg";
    var navButtonOffset = "2.9em";
    var mainChatVisibility = true;
    var allChatVisibility = true;

    $scope.streamList = [];
    $scope.navIcon = upIcon;
    $scope.mainChatIcon = rightIcon;
    $scope.allChatIcon = downIcon;

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
          $scope.changeLayout(currentLayout);
        }
        if (numOfStreams == 0){
          $scope.changeLayout(currentLayout);
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
      if (currentLayout == column) {
        allChatVisibility = !allChatVisibility;
      } else {
        mainChatVisibility = !mainChatVisibility;
      }
      setChat();
    }

    function setChat() {
      if (currentLayout == column) {
        if (allChatVisibility == true) {
          $scope.allChatIcon = downIcon;
          root.setProperty("-allChatButton-display", "flex");
        } else {
          $scope.allChatIcon = upIcon;
          root.setProperty("-allChatButton-display", "none");
        }
        toggleAllChat();
      } else {
        if (mainChatVisibility == true) {
          $scope.mainChatIcon = rightIcon;
          root.setProperty("--mainChatButton-right", "350px");
          root.setProperty("--mainChat-display", "flex");
        } else {
          $scope.mainChatIcon = leftIcon;
          root.setProperty("--mainChatButton-right", "0");
          root.setProperty("--mainChat-display", "none");
        }
      }
    }

    function toggleAllChat() {
      if (allChatVisibility == false) {
        var newDisplay = "none";
      } else {
        var newDisplay = "flex";
      }
      root.setProperty("--chat-display", newDisplay);
    }

    $scope.changeLayout = function(newLayout) {
      currentLayout = newLayout;
      if (currentLayout == grid){
        changeLayoutGrid();
      } else if (currentLayout == column) {
        changeLayoutColumn();
      }
      setChat();
      updateLayout();
    }

    function changeLayoutGrid() {
      root.setProperty("--chat-display", "none");
      root.setProperty("--mainChat-display", "flex");
      root.setProperty("--mainChatButton-display", "block");
      root.setProperty("--allChatButton-display", "none");
      root.setProperty("--stream-width", "initial");
    }

    function changeLayoutColumn() {
      if (navigator.userAgent.indexOf("Firefox") > 0 && (firstLoad == true || recentlyAdded == true)) { //Ensure all chats load on firefox
        reloadAllChats();
      }
      root.setProperty("--chat-height", "70%");
      root.setProperty("--chat-width", "100%");
      root.setProperty("--chat-display", "flex");
      root.setProperty("--mainChat-display", "none");
      root.setProperty("--mainChatButton-display", "none");
      root.setProperty("--allChatButton-display", "block");
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
        var numOfStreams = $scope.streamList.length;
        var streamElementList = document.getElementsByClassName("stream");
        var focusStream = streamElementList[0];
        if (currentLayout == grid) {
          updateLayoutGrid(focusStream, numOfStreams, streamElementList);
        } else {
          updateLayoutColumn(focusStream, numOfStreams, streamElementList);
        }
      } else {
        root.setProperty("--mainChat-display", "none");
        root.setProperty("--mainChatButton-display", "none");
        root.setProperty("--allChatButton-display", "none");
      }
    }

    function updateLayoutGrid(focusStream, numOfStreams, streamElementList) {
      if (numOfStreams == 1) {
        root.setProperty("--mainChatButton-display", "block");
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
    }

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
              toggleAllChat();
              setMainChat()
            }
          }
        }
      }
      setTimeout(function(){ $scope.changeLayout(grid); }, 20);
    }
});
