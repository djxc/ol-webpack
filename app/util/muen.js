const $ = require('jquery');



$(document).ready(function () {
    $("#sideNav").click(function () {
        if ($(this).hasClass('closed')) {
            $('.navbar-side').animate({ left: '0px' });
            $('#left').animate({ left: '0px' });
            $(this).removeClass('closed');

        }
        else {
            $(this).addClass('closed');
            $('.navbar-side').animate({ left: '-260px' });
            $('#left').animate({ left: '-260px' });
        }
    });

});

module.exports = function () {
    var mainApp =function() {
        $('#main-menu').metisMenu();
        $(window).bind("load resize", function () {
            if ($(this).width() < 768) {
                $('div.sidebar-collapse').addClass('collapse')
            } else {
                $('div.sidebar-collapse').removeClass('collapse')
            }
        });
    }
    
    return mainApp;
}

