const cookieHandler = () => {
  // if cookie expired
  if (document.cookie.length === 0) {
    console.log('expired: issued new cookie')
    let sessionId = Math.random().toString(36).substring(2, 15);
    document.cookie = `sessionId=${sessionId};max-age=60` // valid for 6 hours with Strava
  }
  return document.cookie.split('=')[1]
};

module.exports = cookieHandler