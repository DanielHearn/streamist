var module = angular.module('multistreamApp', []);

module.controller('multistreamController', function($scope, $sce) {
    var navVisible = true;
    var currentLayout = 1;
    var root = document.documentElement.style;
    var hideChatText = "HIDE CHAT";
    var showChatText = "SHOW CHAT";
    var maxNumOfStreams = 6;


    $scope.navToggle = "HIDE";
    $scope.chatButton = hideChatText;

    $scope.streamList = [];

    $scope.playerUrl = "http://player.twitch.tv/?channel=";
    $scope.chatStartUrl = "http://www.twitch.tv/";
    $scope.chatEndUrl = "/chat";

    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    }

    $scope.addStream = function() {
      if ($scope.input != null && ($scope.streamList.length < maxNumOfStreams)) {
        var channel = $scope.input;
        var chatUrlFormat = ($scope.chatStartUrl + channel + $scope.chatEndUrl);
        var playerUrlFormat = ($scope.playerUrl + channel)
        var streamItem = { channel: channel, player: playerUrlFormat, chat: chatUrlFormat };
        $scope.streamList.push(streamItem);
        $scope.input = "";
        $scope.insertParam();
        $scope.updateLayout();
        if ($scope.streamList.length == 1) {
          $scope.setMainChat();
        }
      }
    }

    $scope.deleteStream = function() {
      var removedStream = $scope.streamList[this.$index].channel;
      $scope.deleteParam(removedStream);
      $scope.streamList.splice(this.$index, 1);
      var removedChatUrl = $scope.chatStartUrl + removedStream + $scope.chatEndUrl;
      if (removedChatUrl == $scope.mainChatUrl) {
        $scope.setMainChat();
      }
      $scope.updateLayout();
      if ($scope.streamList.length == 1) {
        $scope.setMainChat();
      }
      $scope.getMainChat();
    }

    $scope.refreshStream = function(event) {
      streamID = event.target.className + "player"
      var iframe = document.getElementById(streamID);
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
          var chatUrlFormat = ($scope.chatStartUrl + $scope.availableChats + $scope.chatEndUrl);
          $scope.mainChatUrl = chatUrlFormat;
        }
    }

    $scope.setChat = function() {
      if (currentLayout == 2) {
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
      if (currentLayout == 2){
        //root.setProperty("--streams-flexDir", "column");

        root.setProperty("--chat-height", "70%");
        root.setProperty("--chat-width", "100%");
        root.setProperty("--chat-display", "flex");
        $scope.chatButton = hideChatText;
        root.setProperty("--mainChat-display", "none");

        root.setProperty("--stream-width", "initial")
      } else if (currentLayout == 1 && $scope.streamList.length != 0) {
        //root.setProperty("--streams-flexDir", "row");
        //root.setProperty("--chat-height", "100%");
        //root.setProperty("--chat-width", "30%");
        root.setProperty("--chat-display", "none");
        $scope.chatButton = hideChatText;
        root.setProperty("--mainChat-display", "flex");

        root.setProperty("--stream-width", "initial")
      }
      $scope.updateLayout();
    }

    $scope.updateLayout = function() {  //Clean up function
    if ($scope.streamList.length != 0) {
      var focusStream = $scope.streamList[0].channel;
      var numOfStreams = $scope.streamList.length;
      if (currentLayout == 1) {
        root.setProperty("--mainStream-width", "100%");
        if (numOfStreams == 0) {
            root.setProperty("--mainChat-display", "none");
        }
        if (numOfStreams >= 1) {
            root.setProperty("--mainChat-display", "flex");
        }
        if (numOfStreams == 2) {
          root.setProperty("--stream-width", "100%");
          root.setProperty("--mainStream-width", "initial");
        } else if (numOfStreams == 3) {
          document.getElementById(focusStream).style.width = "var(--mainStream-width)"
          root.setProperty("--stream-width", "initial");
        } else if (numOfStreams == 4) {
          root.setProperty("--stream-width", "50%");
          root.setProperty("--mainStream-width", "50%");
        } else if (numOfStreams == 5) {
          root.setProperty("--stream-width", "50%");
          root.setProperty("--mainStream-width", "100%");
        } else if (numOfStreams == 6) {
          root.setProperty("--stream-width", "50%");
          root.setProperty("--mainStream-width", "100%");
        } else {
          root.setProperty("--stream-width", "initial");
          root.setProperty("--mainStream-width", "initial");
        }
      } else {
        root.setProperty("--mainStream-width", "initial");
        root.setProperty("--stream-width", "initial");
      }
    }
    }

    $scope.toggleNav = function() {
      if (navVisible == true) {
        root.setProperty("--navBar-display", "none");
        $scope.navToggle = "SHOW BAR"
        root.setProperty("--navButton-bg", "var(--accent-primary)")
      } else {
        root.setProperty("--navBar-display", "flex");
        $scope.navToggle = "HIDE BAR"
        root.setProperty("--navButton-bg", "var(--accent-secondary)")
      }
      navVisible = !navVisible;
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
              var chatUrlFormat = ($scope.chatStartUrl + channel + $scope.chatEndUrl);
              var playerUrlFormat = ($scope.playerUrl + channel)
              var streamItem = { channel: channel, player: playerUrlFormat, chat: chatUrlFormat }
              $scope.streamList.push(streamItem);
              //$scope.toggleLayout();
              $scope.toggleAllChat();
              $scope.setMainChat();
            }
          }
        }
      }
      $scope.changeLayout(1);
      $scope.updateLayout();
    }
    //$scope.changeLayout("layout2");
  //  $scope.updateLayout();
});
