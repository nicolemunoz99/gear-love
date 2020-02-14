

module.exports = {
  hasSessionId: () => {
    // if sessionId cookie has expired
    if (document.cookie.indexOf('sessionId') < 0) {
      console.log('expired: issued new cookie')
      let sessionId = Math.random().toString(36).substring(2, 15);
      document.cookie = `sessionId=${sessionId};max-age=${6 * 60 * 60}` // valid for 6 hours with Strava
    }
    return document.cookie.split('sessionId=')[1]
  }
}