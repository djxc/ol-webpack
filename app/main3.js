import './fonts/iconfont.css';
import './css/htmleaf-demo.css';
import './css/nav.css';

import './css/ol.css';//css文件的引用
// import './css/bootstrap.min.css';
// import './css/djstyle.css';
import './css/cssCharts.css';
import './css/font-awesome.css';
import './css/fonts_goole.css';
import './js/bootstrap.min.js';

import './commTool/menu.js';
import './js/FileSaver.min.js';
const greeter = require('./Greeter.js');
// const ol = require('./js/ol.js');
import ol from 'ol'

const TDlayers = require('./util/addLayer.js');
const myDraw = require('./util/draw.js');
const map = require('./commTool/intial.js');
const myRender = require('./util/myRender');
const myCluster=require('./util/cluster');
const myPop=require('./util/mypop');
const saveAs=require('./js/FileSaver.min.js');
// const exportMap=require('./util/exportMap');





$("#AddAnno").click(TDlayers(map(), 1));
$("#AddRoad").click(TDlayers(map(), 2));
$("#AddRS").click(TDlayers(map(), 3));


$("#myDraw").click(myDraw(map()));//开始编辑、停止编辑

$("#ShowCoord").click(myPop(map()));
$("#myCluster").click(myCluster(map()));
$("#Render").click(myRender(map()));
// $("#exportMap").click(exportMap(map()));



// $("#stopDraw").click(myDraw(map, 0));//
document.getElementById('exportMap').addEventListener('click', function() {
    map().once('postcompose', function(event) {
      var canvas = event.context.canvas;
      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(canvas.msToBlob(), 'map.png');
      } else {
        canvas.toBlob(function(blob) {
          saveAs(blob, 'map.png');
        });
      }
    });
    map().renderSync();
  });