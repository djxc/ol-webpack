import './fonts/iconfont.css';
import './css/htmleaf-demo.css';
import './css/nav.css';
import './css/ol.css';//css文件的引用
// import './css/djstyle.css';
import './css/cssCharts.css';
import './css/font-awesome.css';
import './css/fonts_goole.css';
import './js/bootstrap.min.js';

import './commTool/menu.js';
import './js/FileSaver.min.js';

import st from './Greeter.js';
import inital from './commTool/showMap';
import TDLayer from './util/addTDLayer';
import Pop from './util/myPop1';
// st.student();
// st.teacher();
// st.actions();
inital.showMap();
$("#AddAnno").click(function(){TDLayer.addTDLayer(inital.getMap(), 1)});
$("#AddRoad").click(function(){TDLayer.addTDLayer(inital.getMap(), 2)});
$("#AddRS").click(function(){TDLayer.addTDLayer(inital.getMap(), 3)});
$("#ShowCoord").click(function(){Pop.myPop(inital.getMap())});