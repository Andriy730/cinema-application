function displayMovie(id) {
    window.location.replace("film.html?movie=" + encodeURIComponent(id));
}

function addUserElement() {
    if(window.localStorage.getItem('user') != null) {
        var userElement = $(`<a class="nav-link nav-element login dropdown-toggle" id="userDropdown" role="button" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">` + window.localStorage.getItem('user') + `<img class="user-icon" src="images/user-icon.png" height="30" width="30"></a>`);
        console.log(userElement);
        var loginRef = $('.login')[0];
        userElement.appendTo(loginRef.parentElement);
        loginRef.parentElement.classList.add('dropdown');
        loginRef.remove();
    }
}

function logout() {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    window.location.reload();
}