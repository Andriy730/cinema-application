function generatePosters (data) {
    var activeClass = "active";
    for(movie of data.filter((elem) => new Date(elem.releaseDate) <= new Date())) {
        var element = $(`<div class="carousel-item col-lg-3 col-md-4 px-0 ` + activeClass + `">
            <div class="item">
                <a id="` + movie.id + `" href="#" onclick="displayMovie(this.id);">
                                
                </a>
            </div>
        </div>
        `).appendTo('.carousel-inner');
        var img = $('<img class="d-block">');
        img.attr('src', movie.image);
        img.appendTo('#' + movie.id);
        activeClass = "";
    }
    var img = $('<img id="image_id">');
    img.attr('src', data);
    img.appendTo('#id_of_element_where_you_want_to_add_image'); 
}

function setSize() {
    var $item = $('.carousel-item');
    let $height = 0.9825*($(window).height() - $('nav').height());
    $item.height($height);
    $item = $('.item');
    $item.height($height);
    $item.addClass('full-screen');
    $('.carousel img').each( function() {
        let delta = 1.0;
        if ($(window).width() > 990) {
            delta = 4.0;
        }
        else if ($(window).width() > 767) {
            delta = 3.0;
        }
        $(this).prop('height', $height);
        $(this).attr('width', $(window).width()/delta);
    });
}