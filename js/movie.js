function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function displayMovie(data) {
    $('#image').attr('src', data.image);
    $('#title').text(data.title);
    if(data.age == 0) {
        $('#age').empty();
    } else {
        $('#age').children()[1].innerText = data.age + "+";
    }
    $('#originalTitle').children()[1].innerText = data.originalTitle;
    $('#director').children()[1].innerText = data.director.name;
    var releaseDate = data.releaseDate.split("-").reverse().join(".");
    $('#releaseDate').children()[1].innerText = releaseDate;
    var genres = data.genres.reduce((accumulator, currentVal) => accumulator += currentVal.name + ", ", "").slice(0, -2);
    $('#genres').children()[1].innerText = genres;
    var director = data.director.name;
    $('#director').children()[1].innerText = director;
    var duration = data.duration + " хв";
    $('#duration').children()[1].innerText = duration;
    var country = data.country;
    $('#country').children()[1].innerText = country;
    var studio = data.studio;
    $('#studio').children()[1].innerText = studio;
    var scenario = data.scenario;
    $('#scenario').children()[1].innerText = scenario;
    var actors = data.actors.reduce((accumulator, currentVal) => accumulator += currentVal.name + ", ", "").slice(0, -2);
    $('#actors').children()[1].innerText = actors;
    $('#description').text(data.description);
}