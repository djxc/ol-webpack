import './css/ol.css';//css文件的引用
import './css/bootstrap.min.css';
import './css/djstyle.css';
import './css/cssCharts.css';
import './css/font-awesome.css';
import './css/fonts_goole.css';
import './js/bootstrap.min.js';
import 'metismenu/dist/metisMenu.min.css';
import 'metismenu/dist/metisMenu.min.js';

const greeter = require('./Greeter.js');
const ol = require('./js/ol.js');
const TDlayers = require('./util/addLayer.js');


var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([117, 36]),
        zoom: 4
    })
});

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


$('#main-menu').metisMenu({
    toggle: false
}
);
$(window).bind("load resize", function () {
    if ($(this).width() < 768) {
        $('div.sidebar-collapse').addClass('collapse')
    } else {
        $('div.sidebar-collapse').removeClass('collapse')
    }
});

//设置当鼠标移动到按钮上时显示提示
$('.ol-zoom-in, .ol-zoom-out').tooltip({
    placement: 'right'
  });
$('.ol-rotate-reset, .ol-attribution button[title]').tooltip({
    placement: 'left'
});

$("#AddAnno").click(TDlayers(map, 1));
$("#AddRoad").click(TDlayers(map, 2));
$("#AddRS").click(TDlayers(map, 3));