module.exports = {
    getToken: function() {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.access
    },
    cleartoken: function() {
        sessionStorage.removeItem('token');
        window.location = '/';
    },
    setToken: function(userToken) {
        sessionStorage.setItem('token', JSON.stringify(userToken));
    }
};