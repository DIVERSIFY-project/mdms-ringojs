$(function () {
    // generate a new random ID for this session
    if (!Cookies.get('SESSID')) {
        Cookies.set('SESSID', parseInt(Math.random()*10E8));
    }
});