var months = ['Січня', 'Лютого', 'Березня', 'Квітня', 'Травня', 'Червня', 'Липня', 'Серпня', 'Вересня', 'Жовтня', 'Листопада', 'Грудня'];

function renderMovies(data) {
    var dates = new Set();
    for(movie of data) {
        if(new Date(movie.releaseDate) > new Date()) {
            dates.add(movie.releaseDate);
        }
    }
    for(releaseDate of dates) {
        var parent = $('<div class="row pt-5 pb-5 films"></div>').appendTo('main');
        date = new Date(releaseDate);
        var leftElement = $(`<div class="col-12 pl-4 col-lg-1">
                <p class="date-title">` + date.getDate() + " " + months[date.getMonth()] + `</p>
            </div>
            `).appendTo(parent);
        var rightElement = $(`<div class="col-12 col-lg-10 row films-right"></div>`).appendTo(parent);
        for(movie of data.filter((element) => element.releaseDate == releaseDate)) {    
            renderMovie(movie, rightElement);
        }
    }
}

function renderMovie(movie, parent) {
    var element = $(`<div class="col-6 col-md-3 col-lg-2">
        <a id="` + movie.id + `" class="link" href="#" onclick="displayMovie(this.id);">
            <img class="mini-poster" src="` + movie.image + `" width="230" height="340" >
            <div class="subtitle">` + movie.title + `</div>
        </a>
    </div>`).appendTo(parent);
}