import { config, defaultData } from './../config'

export const generateID = function () {
  return Math.random()
    .toString(36)
    .slice(5)
}

export const shuffleArray = function (array) {
  const tempArray = array.slice()
  for (var i = tempArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = tempArray[i]
    tempArray[i] = tempArray[j]
    tempArray[j] = temp
  }
  return tempArray
}

export const getDefault = function (field) {
  if (defaultData.hasOwnProperty(field)) {
    // Naive deepclone that won't clone functions
    return JSON.parse(JSON.stringify(defaultData[field]))
  } else {
    return undefined
  }
}

export const log = function (output) {
  if (config.logging) {
    console.log(output)
  }
}

export const warn = function (output) {
  if (config.logging) {
    console.warn(output)
  }
}

export const getUsernameFromThumbnail = function (url) {
  const urlMatch = url.match(/live_user_(.+)-/)
  if (urlMatch) {
    return urlMatch.pop()
  }
  return ''
}

export const createStreamObject = function (streamName, id) {
  return {
    streamName: streamName,
    id: id,
    dateAdded: new Date().toISOString()
  }
}

export const insertURLStreamParams = function (streams) {
  if (window) {
    let channelString = ''
    for (const channel in streams) {
      if (streams.hasOwnProperty(channel)) {
        channelString += String(streams[channel].streamName) + ','
      }
    }
    channelString = channelString.replace('undefined', '')
    const newurl = `${window.location.protocol}//${window.location.host}${
      window.location.pathname
    }`
    if (channelString) {
      const queryUrl = `${newurl}?stream=${channelString}`
      window.history.pushState({ path: queryUrl }, '', queryUrl)
    } else {
      window.history.pushState({ path: newurl }, '', newurl)
    }
  }
}

export const copyToClipboard = function (str) {
  const el = document.createElement('textarea') // Create a <textarea> element
  el.value = str // Set its value to the string that you want copied
  el.setAttribute('readonly', '') // Make it readonly to be tamper-proof
  el.style.position = 'absolute'
  el.style.left = '-9999px' // Move outside the screen to make it invisible
  document.body.appendChild(el) // Append the <textarea> element to the HTML document
  const selected =
    document.getSelection().rangeCount > 0 // Check if there is any content selected previously
      ? document.getSelection().getRangeAt(0) // Store selection if found
      : false // Mark as false to know no selection existed before
  el.select() // Select the <textarea> content
  document.execCommand('copy') // Copy - only works as a result of a user action (e.g. click events)
  document.body.removeChild(el) // Remove the <textarea> element
  if (selected) {
    // If a selection existed before copying
    document.getSelection().removeAllRanges() // Unselect everything on the HTML document
    document.getSelection().addRange(selected) // Restore the original selection
  }
}

export const toggleFullscreen = function () {
  if (
    !document.fullscreenElement &&
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen()
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen()
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(
        Element.ALLOW_KEYBOARD_INPUT
      )
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }
}
