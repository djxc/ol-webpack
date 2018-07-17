//main.js 

// const $ = require('jquery');
// import $ from 'jquery';
import './css/ol.css';//css文件的引用
import './css/styles.css';
import './css/bootstrap.min.css';
import './css/custom-styles.css';
import './css/cssCharts.css';
// import './css/font-awesome.css';
import './css/fonts_goole.css';
import './js/bootstrap.min.js';
import './js/jquery.metisMenu.js'

const myMenu=require('./util/muen.js');
const greeter = require('./Greeter.js');
const ol = require('./js/ol.js');

const TDlayers = require('./util/addLayer.js');
const myDraw = require('./util/draw.js');
const myRender = require('./util/myRender');
const myCluster=require('./util/cluster');
const myPop=require('./util/mypop');

$("#dj").click(greeter("dj"));


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

myMenu();

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

$("#startDraw").click(myDraw(map, 1));//开始编辑
$("#stopDraw").click(myDraw(map, 0));//停止编辑

$("#Render").click(myRender(map));//聚类加渲染
$("#Cluster").click(myCluster(map));//聚类
$("#Pop").click(myPop(map));//

$("#getlayers").click(function () {
    var layer = map.getOverlayById(1)
});




