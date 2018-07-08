angular.module('multistreamApp', ['angular-sortable-view'])
  .controller('multistreamController', ['$scope', '$sce', '$compile', function ($scope, $sce, $compile) {
    const playerUrl = 'http://player.twitch.tv/?channel='
    const chatStartUrl = 'http://www.twitch.tv/embed/'
    const chatEndUrl = '/chat'
    const grid = 'grid'
    const column = 'column'

    let maxNumOfStreams = 6
    let currentLayout = grid
    let firstLoad = true
    let recentlyAdded = true

    let chatVisiblity = true
    let overlayVisibility = false
    let modalOpen = false
    let returnModalOpen = false

    let menuOpen = false
    let interfaceOpen = true
    let helpOpen = false

    const app__controller = document.querySelector('.app__controller')
    const controller__nav = document.querySelector('.controller__nav')
    const controller__streams = document.querySelector('.controller__streams')
    const controller__modals = document.querySelector('.controller__modals')
    const controller__intro = document.querySelector('.controller__intro')
    const controller__overlay = document.querySelector('.controller__overlay')
    const controller__settings = document.querySelector('.controller__settings')
    const streams__chat = document.querySelector('.streams__chat')

    $scope.streamList = []
    $scope.availableLayouts = currentLayout
    $scope.noStreams = true
    $scope.modalType = 'welcomeFirst'
    $scope.mainChatUrl = ''

    $scope.trustSrc = function (src) {
      return $sce.trustAsResourceUrl(src)
    }

    $scope.loadOfflineStream = function () {
      addStream(getChannelInput())
      $scope.acceptModalGeneric()
    }

    $scope.addStreamFromInput = function () {
      const channel = getChannelInput()
      addStream(channel)
    }

    function addStream (channel) {
      if (channel != null && (getStreamListLength() < maxNumOfStreams)) {
        const chatUrlFormat = (chatStartUrl + channel + chatEndUrl)
        const playerUrlFormat = (playerUrl + channel)
        const streamItem = { channel: channel, player: playerUrlFormat, chat: chatUrlFormat }
        $scope.streamList.push(streamItem)
        clearChannelInput()
        storeStreams()
        insertURLParam()
        updateLayout()
        const numOfStreams = getStreamListLength()
        if (numOfStreams === 0) {
          changeLayout(currentLayout)
        } else if (numOfStreams === 1) {
          setMainChat()
          changeLayout(currentLayout)
        }
        recentlyAdded = true
      }
    }

    function getStreamListLength () {
      return $scope.streamList.length
    }

    function streamListEmpty () {
      if (getStreamListLength() === 0) {
        return true
      } else {
        return false
      }
    }

    function getChannelInput () {
      return $scope.channelInput
    }

    function clearChannelInput () {
      $scope.channelInput = ''
    }

    function channelInputNotEmpty () {
      if (getChannelInput() != '') {
        return true
      } else {
        return false
      }
    }

    function availableChatsNotEmpty () {
      if ($scope.availableChats != (' ' || '' || null || undefined || 'undefined')) {
        return true
      } else {
        return false
      }
    }

    function storeStreams () {
      const lastSession = []
      for (channel in $scope.streamList) {
        lastSession.push($scope.streamList[channel].channel)
      }
      localStorage.setItem('last-session', JSON.stringify(lastSession))
    }

    $scope.deleteStream = function () {
      const removedStream = $scope.streamList[this.$index].channel
      deleteURLParam(removedStream)
      $scope.streamList.splice(this.$index, 1)
      const removedChatUrl = chatStartUrl + removedStream + chatEndUrl
      const numOfStreams = getStreamListLength()
      storeStreams()
      if (removedChatUrl == $scope.mainChatUrl && numOfStreams > 0 || numOfStreams == 1) {
        setMainChat()
      } else {
        $scope.getMainChat()
      }
      if (currentLayout == grid) {
        updateLayout()
      }
    }

    $scope.refreshStream = function (event) {
      streamID = '.' + $scope.streamList[this.$index].channel + 'player'
      const streamFrame = document.querySelector(streamID)
      streamFrame.src = streamFrame.src
      chatID = '.' + $scope.streamList[this.$index].channel + 'chat'
      const chatFrame = document.querySelector(chatID)
      chatFrame.src = chatFrame.src
    }

    $scope.refreshMainChat = function () {
      const iframe = document.querySelector('.chat__iframe--main')
      iframe.src = iframe.src
    }

    function setMainChat () {
      if (availableChatsNotEmpty()) {
        $scope.availableChats = $scope.streamList[0].channel
        $scope.getMainChat()
      }
    }

    $scope.getMainChat = function () {
      if (availableChatsNotEmpty()) {
        const chatUrlFormat = (chatStartUrl + $scope.availableChats + chatEndUrl)
        $scope.mainChatUrl = chatUrlFormat
      }
    }

    $scope.toggleChat = function () {
      chatVisiblity = !chatVisiblity
      if (chatVisiblity && (getStreamListLength() != 0)) {
        if (currentLayout == grid) {
          streams__chat.style.setProperty('--mainChat-display', 'flex')
        } else {
          controller__streams.style.setProperty('--chat-display', 'flex')
        }
      } else {
        streams__chat.style.setProperty('--mainChat-display', 'none')
        controller__streams.style.setProperty('--chat-display', 'none')
      }
    }

    function changeLayout (newLayout) {
      currentLayout = newLayout
      if (currentLayout == grid) {
        changeLayoutGrid()
      } else if (currentLayout == column) {
        changeLayoutColumn()
      }
      updateLayout()
    }

    function changeLayoutGrid () {
      if (chatVisiblity && !streamListEmpty()) {
        streams__chat.style.setProperty('--mainChat-display', 'flex')
      }
      controller__streams.style.setProperty('--chat-display', 'none')
      controller__streams.style.setProperty('--stream-width', 'initial')
    }

    function changeLayoutColumn () {
      if (navigator.userAgent.indexOf('Firefox') > 0 && (firstLoad == true || recentlyAdded == true)) { // Ensure all chats load on firefox
        reloadAllChats()
      }
      controller__streams.style.setProperty('--chat-height', '70%')
      controller__streams.style.setProperty('--chat-width', '100%')
      if (chatVisiblity) {
        controller__streams.style.setProperty('--chat-display', 'flex')
      }
      streams__chat.style.setProperty('--mainChat-display', 'none')
      controller__streams.style.setProperty('--stream-width', 'initial')
    }

    function reloadAllChats () {
      for (channel in $scope.streamList) {
        streamID = '.' + $scope.streamList[channel].channel + 'chat'
        const iframe = document.querySelector(streamID)
        if (iframe != null) {
          iframe.src = iframe.src
        }
      }
      firstLoad = false
    }

    function updateLayout () {
      if (!streamListEmpty()) {
        $scope.noStreams = false
        controller__intro.style.setProperty('--intro-zindex', '1')
        const numOfStreams = getStreamListLength()
        const streamElementList = document.getElementsByClassName('stream')
        const focusStream = streamElementList[0]
        if (currentLayout === grid) {
          updateLayoutGrid(focusStream, numOfStreams, streamElementList)
        } else {
          updateLayoutColumn(focusStream, numOfStreams, streamElementList)
        }
        if (chatVisiblity) {
          if (currentLayout === grid) {
            controller__streams.style.setProperty('--mainChat-display', 'flex')
          } else {
            streams__chat.style.setProperty('--chat-display', 'block')
          }
        }
      } else {
        $scope.noStreams = true
        controller__intro.style.setProperty('--intro-zindex', '2')
        app__controller.style.setProperty('--bg', '#5C6391')
        if (chatVisiblity) {
          streams__chat.style.setProperty('--mainChat-display', 'none')
        }
      }
    }

    function updateLayoutGrid (focusStream, numOfStreams, streamElementList) {
      if (numOfStreams === 2) {
        controller__streams.style.setProperty('--stream-width', '100%')
      } else if (numOfStreams === 3) {
        controller__streams.style.setProperty('--stream-width', 'initial')
        setStyle(streamElementList, 'width', 'var(--stream-width)')
      } else if (numOfStreams === 4) {
        controller__streams.style.setProperty('--stream-width', '50%')
        setStyle(streamElementList, 'width', 'var(--stream-width)')
      } else if (numOfStreams === 5) {
        controller__streams.style.setProperty('--stream-width', '50%')
        setStyle(streamElementList, 'width', 'var(--stream-width)')
      } else if (numOfStreams === 6) {
        controller__streams.style.setProperty('--stream-width', '50%')
      }
      if (focusStream != null) {
        if (numOfStreams === 2) {
          focusStream.style.width = 'var(--stream-width)'
        } else if (numOfStreams === (3 || 5)) {
          focusStream.style.width = '100%'
        } else if (numOfStreams === 6) {
          focusStream.style.width = 'var(--stream-width)'
        }
      }
    }

    function updateLayoutColumn (focusStream, numOfStreams, streamElementList) {
      focusStream.style.width = 'var(--stream-width)'
      controller__streams.style.setProperty('--stream-width', 'initial')
    }

    function setStyle (elementList, style, newSetting) {
      for (let i = 0; i <= (elementList.length - 1); i++) {
        elementList[i].style[style] = newSetting
      }
    }

    $scope.toggleHelp = function () {
      showOverlay()
      showHelpModal()
    }

    $scope.toggleOverlay = function () {
      overlayVisibility = !overlayVisibility
      if (overlayVisibility || modalOpen) {
        hideOverlay()
        hideModal()
      } else {
        showOverlay()
      }
      if (menuOpen) {
        $scope.toggleMenu()
      }
      if (helpOpen) {
        $scope.toggleHelp()
      }
    }

    function showOverlay () {
      overlayVisibility = true
      controller__overlay.style.setProperty('--overlay-display', 'block')
      controller__overlay.style.setProperty('--overlay-opacity', '0.5')
    }

    function hideOverlay () {
      overlayVisibility = false
      controller__overlay.style.setProperty('--overlay-display', 'none')
      controller__overlay.style.setProperty('--overlay-opacity', '0')
      controller__overlay.style.setProperty('--overlay-zindex', '4')
    }

    $scope.toggleMenu = function () {
      document.querySelector('.button--overlay').classList.toggle('active')
      menuOpen = !menuOpen
      if (menuOpen) {
        showOverlay()
        showMenu()
      } else {
        hideOverlay()
        hideMenu()
      }
    }

    function hideMenu () {
      controller__settings.style.setProperty('--settings-display', 'none')
    }

    function showMenu () {
      controller__settings.style.setProperty('--settings-display', 'block')
    }

    $scope.setLayout = function () {
      const newLayout = $scope.availableLayouts
      if (newLayout != '') {
        if (newLayout === grid) {
          app__controller.style.setProperty('--dropdown-chat-display', 'flex')
        } else {
          app__controller.style.setProperty('--dropdown-chat-display', 'none')
        }
        changeLayout($scope.availableLayouts)
      }
    }

    $scope.toggleInterface = function () {
      interfaceOpen = !interfaceOpen
      if (interfaceOpen) {
        disableInterface()
      } else {
        enableInterface()
      }
    }

    function enableInterface () {
      controller__nav.style.setProperty('--navBar-display', 'none')
      controller__settings.style.setProperty('--settings-top', '0')
      controller__settings.style.setProperty('--settings-height', '100vh')
    }

    function disableInterface () {
      controller__nav.style.setProperty('--navBar-display', 'flex')
      controller__settings.style.setProperty('--settings-top', '3em')
      controller__settings.style.setProperty('--settings-height', 'calc(100vh - 3em)')
    }

    $scope.toggleFullscreen = function () {
      screenfull.toggle()
    }

    function showWelcomeModal () {
      appendDirective(controller__modals, '<modal-welcome />')
    }

    function showReturnModal () {
      appendDirective(controller__modals, '<modal-return />')
    }

    function showHelpModal () {
      appendDirective(controller__modals, '<modal-help />')
      controller__overlay.style.setProperty('--overlay-zindex', '7')
    }

    function appendDirective (parent, directive) {
      parentElement = angular.element(parent)
      parentElement.append($compile(directive)($scope))
    }

    function hideModal () {
      if (menuOpen) {
        $scope.toggleMenu()
      }
      controller__modals.innerHTML = ''
      controller__overlay.style.setProperty('--overlay-zindex', '4')
    }

    $scope.acceptModalGeneric = function () {
      hideOverlay()
      hideModal()
    }

    document.onkeydown = function (evt) {
      evt = evt || window.event
      if (evt.keyCode === 27) { // Escape pressed
        if (modalOpen) {
          $scope.acceptModalGeneric()
        } else if (menuOpen) {
          $scope.toggleMenu()
        } else if (helpOpen) {
          $scope.toggleHelp()
        }
      } else if (evt.keyCode === 13) { // Enter pressed
        if (returnModalOpen) {
          document.querySelector('.loadLastSession').click()
        } else if (helpOpen) {
          $scope.toggleHelp()
        } else if (modalOpen) {
          $scope.acceptModalGeneric()
        }
      }
    }

    $scope.loadLastSession = function () {
      $scope.acceptModalGeneric()
      const lastSessionsStreams = loadLastSessionData().split(',')
      if (lastSessionsStreams != null) {
        for (channel in lastSessionsStreams) {
          const stream = lastSessionsStreams[channel].replace(' ', '')
          addStream(stream)
        }
      }
    }

    function loadLastSessionData () {
      let lastSessionData = localStorage.getItem('last-session')
      lastSessionData = lastSessionData.replace(/(['"])/g, '')
      lastSessionData = lastSessionData.replace(/^\[|\]$/g, '')
      lastSessionData = lastSessionData.replace(',', ', ')
      return lastSessionData
    }

    $scope.loadModal = function (modalType) {
      modalOpen = true
      showOverlay()
      controller__overlay.style.setProperty('--overlay-zindex', '7')
      if (modalType === 'welcome') {
        showWelcomeModal()
      } else if (modalType === 'return') {
        showReturnModal()
      }
    }

    $scope.loadApp = function () {
      if ($scope.getURLParam()) {
        setMainChat()
      }
      setTimeout(function () { changeLayout(grid) }, 20)
      if ((localStorage.getItem('first-visit') == null) && streamListEmpty()) {
        $scope.loadModal('welcome')
      } else {
        if (lastSessionNotEmpty()) {
          $scope.lastStreams = loadLastSessionData()
          $scope.loadModal('return')
        }
      }
      localStorage.setItem('first-visit', 'false')
    }

    function lastSessionNotEmpty () {
      const lastSession = localStorage.getItem('last-session')
      if (lastSession != null) {
        if (streamListEmpty() && (lastSession.length != 0)) {
          if (lastSession != '[]') {
            return true
          }
        } else {
          return false
        }
      } else {
        return false
      }
    }

    $scope.clearStorage = function () {
      localStorage.clear()
    }

    $scope.clearStreams = function () {
      $scope.streamList.length = 0
      const newurl = window.location.protocol + '//' + window.location.host + window.location.pathname
      window.history.pushState({path: newurl}, '', newurl)
      $scope.clearStorage()
      updateLayout()
    }

    function insertURLParam () {
      let channels
      for (channel in $scope.streamList) {
        channels += String($scope.streamList[channel].channel) + ','
      }
      channels = channels.replace('undefined', '')
      const newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?stream=' + channels
      window.history.pushState({path: newurl}, '', newurl)
    }

    function deleteURLParam (removedChannel) {
      let channels
      for (channel in $scope.streamList) {
        channels += String($scope.streamList[channel].channel) + ','
      }
      channels = channels.replace('undefined', '')
      channels = channels.replace(removedChannel + ',', '')
      const newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?stream=' + channels
      window.history.pushState({path: newurl}, '', newurl)
    }

    $scope.getURLParam = function () {
      const url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')
      const urlParams = new URLSearchParams(location.search.substring(1))
      urlStreams = urlParams.get('stream')
      if (urlStreams !== '' && urlStreams !== null) {
        urlStreams = urlStreams.split(',')
        for (channel in urlStreams) {
          var channel = urlStreams[channel]
          if (getStreamListLength() < maxNumOfStreams) {
            if (channel !== '') {
              addStream(channel)
            }
          }
        }
        return true
      }
      return false
    }
  }])
  .directive('modalHelp', function () {
    return {
      template: `
        <section class="modal--help">
          <div class="modal__header">
            <h4 class="header__title">Help</h4>
          </div>
          <div class="modal__content">
            <p class="content__text">To watch a twitch channel enter the channel name into the search bar and click load.</p>
            <p class="content__text">Open the settings on the top left to reorder streams, change the layout and configure the user interface.</p>
            <div class="modal__buttons">
              <button class="button--modal" type="button" name="yes" ng-click="acceptModalGeneric()">Close</button>
            </div>
          </div>
        </section>`
    }
  })
  .directive('modalReturn', function () {
    return {
      template: `
        <section class="modal--return">
          <div class="modal__header">
            <h4 class="header__title">Welcome Back</h4>
          </div>
          <div class="modal__content">
            <p class="content__text">Do you want to load the streams from your last Manytwitch session.</p>
            <p class="content__text--bold">{{ lastStreams }}</p>
            <div class="modal__buttons">
              <button class="button--secondary button--modal" type="button" name="no" ng-click="acceptModalGeneric()">No</button>
              <button class="button--modal loadLastSession" type="button" name="yes" ng-click="loadLastSession()">Yes</button>
            </div>
          </div>
        </section>`
    }
  })
  .directive('modalWelcome', function () {
    return {
      template: `
        <section class="modal--welcome">
          <div class="modal__header">
            <h4 class="header__title">Welcome to Manytwitch</h4>
          </div>
          <div class="modal__content">
            <p class="content__text">Welcome to Manytwitch, a multiple <a class="link" href="https://twitch.tv">Twitch.tv</a> stream viewer.</p>
            <p class="content__text">To watch a twitch channel enter the channel name into the search bar and click load.</p>
            <p class="content__text">Open the settings on the top left to reorder streams, change the layout and configure the user interface.</p>
            <div class="modal__buttons">
              <button class="button--modal" type="button" name="yes" ng-click="acceptModalGeneric()">Continue</button>
            </div>
          </div>
        </section>`
    }
  })
