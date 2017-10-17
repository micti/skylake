/**
 * Skylake
 *
 * Version   →  4.8.6
 * Github    →  https://github.com/ariiiman/skylake
 * License   →  http://opensource.org/licenses/MIT
 * Author    →  Copyright © 2017 Aristide Benoist
 * Website   →  www.aristidebenoist.com
 * Date      →  Oct 17, 2017
 */
function A(t,i){return 1-3*i+3*t}function B(t,i){return 3*i-6*t}function C(t){return 3*t}function calcBezier(t,i,e){return((A(i,e)*t+B(i,e))*t+C(i))*t}function getS(t,i,e){return 3*A(i,e)*t*t+2*B(i,e)*t+C(i)}function binarySubdivide(t,i,e,s,n){var r,h,o=0;do{(r=calcBezier(h=i+(e-i)/2,s,n)-t)>0?e=h:i=h}while(Math.abs(r)>sp&&++o<smi);return h}function nRI(t,i,e,s){for(var n=0;n<ni;++n){var r=getS(i,e,s);if(0===r)return i;i-=(calcBezier(i,e,s)-t)/r}return i}var S={};module.exports=S,S.Merom=function(t,i,e,s,n,r,h){this.el=S.Selector.el(t),this.elL=this.el.length,this.prop=i,this.origin={start:e,end:s},S.Is.object(n)?(this.duration=0,this.ease="linear",this.opts=n):(this.duration=n||0,this.ease=r||"linear",this.opts=h||!1),this.delay=this.opts.delay||0,this.callbackDelay=this.opts.callbackDelay||0,this.cb=this.opts.callback,this.round=1e3,this.unit="",this.noMultiT=!S.Is.array(this.prop);var o;if(this.noMultiT)"3dx"!==this.prop&&"3dy"!==this.prop&&"height"!==this.prop&&"width"!==this.prop||(this.unit=this.getUnit(this.origin.start)),o=this.origin.end-this.origin.start;else{this.qty=this.prop.length;for(a=0;a<this.qty;a++)"3dx"===this.prop[a]?this.unitX=this.getUnit(this.origin.start[a]):"3dy"===this.prop[a]&&(this.unitY=this.getUnit(this.origin.start[a]));this.no=0;for(var a=0;a<this.qty;a++)if(this.origin.start[a]!==this.origin.end[a]){this.no=a;break}o=this.origin.end[this.no]-this.origin.start[this.no]}this.update=this.noMultiT?this.singleUp():this.multiT,this.coeff=this.duration/Math.abs(o),this.raf=new S.RafIndex,this.curr=this.origin.start,S.BindMaker(this,["getRaf","loop"])},S.Merom.prototype={play:function(t){this.init(0,t),setTimeout(this.getRaf,this.delay)},pause:function(){this.isPaused=!0},reverse:function(t){this.init(1,t),this.getRaf()},init:function(t,i){this.pause(),this.needEnd=!0;var e=1===t?"start":"end";this.end=this.origin[e];this.start=this.curr;var s=this.noMultiT?this.end-this.start:this.end[this.no]-this.start[this.no];this.duration=Math.abs(s)*this.coeff,i?(this.start=i.newStart||this.start,this.end=i.newEnd||this.end,this.duration=i.duration||this.duration,this.ease=i.ease||this.ease,this.cb=i.callback||!1,this.delay=i.delay||0,this.callbackDelay=i.callbackDelay||0):1===t&&(this.cb=!1,this.delay=0,this.callbackDelay=0),this.easeCalc=S.Is.string(this.ease)?S.EasePack[this.ease]:this.easeCalc=S.EaseCSS(this.ease[0],this.ease[1],this.ease[2],this.ease[3])},getRaf:function(){this.isPaused=!1,this.startTime=0,this.raf.start(this.loop)},loop:function(t){if(!this.isPaused){this.startTime||(this.startTime=t);var i=0===this.duration?1:Math.min((t-this.startTime)/this.duration,1),e=this.easeCalc(i);if(this.noMultiT)this.curr=this.lerp(+this.start,+this.end,e);else{this.curr=[];for(var s=0;s<this.qty;s++)this.curr[s]=this.lerp(+this.start[s],+this.end[s],e)}this.update(this.curr),i<1?this.raf.start(this.loop):this.needEnd&&(this.needEnd=!1,this.raf.cancel(),this.update(this.end),this.cb&&setTimeout(this.cb,this.callbackDelay))}},lerp:function(t,i,e){return Math.round(S.Lerp.init(t,i,e)*this.round)/this.round},singleUp:function(){switch(this.prop){case"3dx":case"3dy":case"scale":case"scaleX":case"scaleY":case"rotate":case"rotateX":case"rotateY":return this.singleT;case"gtx":case"gty":return this.gradientT;case"scrollTop":return this.scrollTop;default:return this.setOthers}},multiT:function(t){for(var i=0,e=0,s="",n="",r=0;r<this.qty;r++)"3dx"===this.prop[r]?i=t[r]+this.unitX:"3dy"===this.prop[r]?e=t[r]+this.unitY:"rotate"===this.prop[r].substring(0,6)?s=this.prop[r]+"("+t[r]+"deg)":n=this.prop[r]+"("+t[r]+")";var h="translate3d("+i+","+e+",0)"+" "+s+" "+n;this.updateDom("t",h)},singleT:function(t){var i;if("3dx"===this.prop||"3dy"===this.prop){var e=t+this.unit;i="translate3d("+("3dx"===this.prop?e+",0":"0,"+e)+",0)"}else i="rotate"===this.prop.substring(0,6)?this.prop+"("+t+"deg)":this.prop+"("+t+")";this.updateDom("t",i)},gradientT:function(t){var i="gtx"===this.prop?t+",0":"0,"+t;this.updateDom("gradientTransform","translate("+i+")")},scrollTop:function(t){this.el[0][this.prop]=t},setOthers:function(t){this.updateDom(this.prop,t)},updateDom:function(t,i){for(var e=0;e<this.elL;e++)"t"===t?(this.el[e].style.webkitTransform=i,this.el[e].style.transform=i):"x"===t||"y"===t||"r"===t||"gradientTransform"===t?this.el[e].setAttribute(t,i):this.el[e].style[t]=i+this.unit},getUnit:function(t){return S.Is.string(t)?"px":"%"}},S.AnimatedLine=function(t){this.el=S.Selector.el(t.el),this.elL=this.el.length,this.elWL=t.elWithLength,this.duration=t.duration,this.ease=t.ease,this.dashed=t.dashed||!1,this.start=t.start||0,this.end=t.end||100,this.startCoeff=(100-+this.start)/100,this.endCoeff=(100-+this.end)/100,this.startArr=[],this.endArr=[],this.shapeLength=[],this.cb=[],this.merom=[];for(var i=0;i<this.elL;i++){if(this.shapeLength[i]=this.getShapeLength(this.el[i]),this.cb[i]=i===this.elL-1&&t.callback,this.dashed){for(var e=0,s=this.dashed.split(/[\s,]/),n=s.length,r=0;r<n;r++)e+=parseFloat(s[r])||0;for(var h="",o=Math.ceil(this.shapeLength[i]/e),r=0;r<o;r++)h+=this.dashed+" ";this.el[i].style.strokeDasharray=h+"0 "+this.shapeLength[i]}else this.el[i].style.strokeDasharray=this.shapeLength[i];this.startArr[i]=this.startCoeff*this.shapeLength[i],this.endArr[i]=this.endCoeff*this.shapeLength[i],this.merom[i]=new S.Merom(this.el[i],"strokeDashoffset",this.startArr[i],this.endArr[i],this.duration,this.ease,{callback:this.cb[i]})}},S.AnimatedLine.prototype={play:function(t){for(var i=0;i<this.elL;i++)this.el[i].style.opacity=1,this.merom[i].play(t)},pause:function(){for(var t=0;t<this.elL;t++)this.merom[t].pause()},reverse:function(t){for(var i=0;i<this.elL;i++)this.merom[i].reverse(t)},getShapeLength:function(t){if("circle"===t.tagName)return 2*t.getAttribute("r")*Math.PI;if("line"===t.tagName){var i=t.getAttribute("x1"),e=t.getAttribute("x2"),s=t.getAttribute("y1"),n=t.getAttribute("y2");return Math.sqrt((e-=i)*e+(n-=s)*n)}return(t=this.elWL||t).getTotalLength()}},S.Morph=function(t){this.type="polygon"===t.type?"points":"d",this.el=S.Selector.el(t.element),this.elL=this.el.length,this.start=t.start,this.ease=t.ease,this.duration=t.duration,this.delay=t.delay||0,this.cbDelay=t.callbackDelay||0,this.cb=t.callback,this.round=1e3,this.origin={start:this.start||this.el[0].getAttribute(this.type),end:t.end},this.origin.arr={start:this.getArr(this.origin.start),end:this.getArr(this.origin.end)},this.qty=this.origin.arr.start.length;for(var i=0;i<this.qty;i++){if(this.origin.arr.start[i]!==this.origin.arr.end[i]){this.coeff=this.duration/Math.abs(this.origin.arr.end[i]-this.origin.arr.start[i]),this.no=i;break}this.coeff=0,this.no=0}if(this.curr=this.origin.start,S.Is.string(this.ease))this.easeCalc=S.EasePack[this.ease];else{var e=S.EaseCSS(this.ease[0],this.ease[1],this.ease[2],this.ease[3]);this.easeCalc=e}this.raf=new S.RafIndex,S.BindMaker(this,["getRaf","loop"])},S.Morph.prototype={play:function(){this.init(0),setTimeout(this.getRaf,this.delay)},pause:function(){this.isPaused=!0},reverse:function(){this.init(1),this.getRaf()},init:function(t){this.pause();var i=1===t?"start":"end";this.end=this.origin[i],this.endArr=this.origin.arr[i],this.startArr=this.getArr(this.curr),this.duration=Math.abs(this.endArr[this.no]-this.startArr[this.no])*this.coeff},getRaf:function(){this.isPaused=!1,this.startTime=0,this.raf.start(this.loop)},loop:function(t){if(!this.isPaused){this.startTime||(this.startTime=t);for(var i=0===this.duration?1:Math.min((t-this.startTime)/this.duration,1),e=this.easeCalc(i),s=[],n="",r=0;r<this.qty;r++)s[r]=this.isLetter(this.startArr[r])?this.startArr[r]:Math.round(S.Lerp.init(+this.startArr[r],+this.endArr[r],e)*this.round)/this.round,n+=s[r]+" ",this.curr=n.trim();this.updateDom(this.curr),i<1?this.raf.start(this.loop):(this.raf.cancel(),this.updateDom(this.end),this.cb&&setTimeout(this.cb,this.cbDelay))}},updateDom:function(t){for(var i=0;i<this.elL;i++)this.el[i].setAttribute(this.type,t)},setCurr:function(t){this.curr=t},getArr:function(t){for(var i=t.split(" "),e=[],s=0;s<i.length;s++)for(var n=i[s].split(","),r=0;r<n.length;r++)e.push(+n[r]);return e},isLetter:function(t){return"M"===t||"L"===t||"C"===t||"Z"===t}},S.Timeline=function(){this.content=[],this.contentL=function(){return this.content.length}},S.Timeline.prototype={from:function(t,i,e,s,n,r,h){if(this.contentL()>0){var h=h||{},o=this.content[this.contentL()-1].delay,a=n&&S.Is.object(n);a&&n.delay?n.delay=o+n.delay:a?n.delay=o:h.delay?h.delay=o+h.delay:h.delay=o}this.content.push(new S.Merom(t,i,e,s,n,r,h))},play:function(){for(var t=0;t<this.contentL();t++)this.content[t].play()},pause:function(){for(var t=0;t<this.contentL();t++)this.content[t].pause()},reverse:function(t){for(var i=0;i<this.contentL();i++){var e=t?t[i]:void 0;this.content[i].reverse(e)}}},S.BindMaker=function(t,i){for(var e=i.length,s=0;s<e;s++)t[i[s]]=t[i[s]].bind(t)};var e={s:1.70158,q:2.25,r:1.525,u:.984375,v:7.5625,w:.9375,x:2.75,y:2.625,z:.75};S.EasePack={linear:function(t){return t},Power1In:function(t){return 1-Math.cos(t*(Math.PI/2))},Power1Out:function(t){return Math.sin(t*(Math.PI/2))},Power1InOut:function(t){return-.5*(Math.cos(Math.PI*t)-1)},Power2In:function(t){return t*t},Power2Out:function(t){return t*(2-t)},Power2InOut:function(t){return t<.5?2*t*t:(4-2*t)*t-1},Power3In:function(t){return t*t*t},Power3Out:function(t){return--t*t*t+1},Power3InOut:function(t){return t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1},Power4In:function(t){return t*t*t*t},Power4Out:function(t){return 1- --t*t*t*t},Power4InOut:function(t){return t<.5?8*t*t*t*t:1-8*--t*t*t*t},Power5In:function(t){return t*t*t*t*t},Power5Out:function(t){return 1+--t*t*t*t*t},Power5InOut:function(t){return t<.5?16*t*t*t*t*t:1+16*--t*t*t*t*t},ExpoIn:function(t){return 0===t?0:Math.pow(2,10*(t-1))},ExpoOut:function(t){return 1===t?1:1-Math.pow(2,-10*t)},ExpoInOut:function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*--t))},CircIn:function(t){return-(Math.sqrt(1-t*t)-1)},CircOut:function(t){return Math.sqrt(1-Math.pow(t-1,2))},CircInOut:function(t){return(t/=.5)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},BackIn:function(t){return t*t*((e.s+1)*t-e.s)},BackOut:function(t){return(t-=1)*t*((e.s+1)*t+e.s)+1},BackInOut:function(t){return(t/=.5)<1?t*t*((1+(e.s*=e.r))*t-e.s)*.5:.5*((t-=2)*t*((1+(e.s*=e.r))*t+e.s)+2)},Elastic:function(t){return-1*Math.pow(4,-8*t)*Math.sin((6*t-1)*(2*Math.PI)/2)+1},SwingFromTo:function(t){return(t/=.5)<1?t*t*((1+(e.s*=e.r))*t-e.s)*.5:.5*((t-=2)*t*((1+(e.s*=e.r))*t+e.s)+2)},SwingFrom:function(t){return t*t*((e.s+1)*t-e.s)},SwingTo:function(t){return(t-=1)*t*((e.s+1)*t+e.s)+1},Bounce:function(t){return t<1/e.x?e.v*t*t:t<2/e.x?e.v*(t-=1.5/e.x)*t+e.z:t<2.5/e.x?e.v*(t-=e.q/e.x)*t+e.w:e.v*(t-=e.y/e.x)*t+e.u},BouncePast:function(t){return t<1/e.x?e.v*t*t:t<2/e.x?2-(e.v*(t-=1.5/e.x)*t+e.z):t<2.5/e.x?2-(e.v*(t-=e.q/e.x)*t+e.w):2-(e.v*(t-=e.y/e.x)*t+e.u)}};var ni=4,nms=.001,sp=1e-7,smi=10,ksts=11,kSSS=1/(ksts-1);S.EaseCSS=function(t,i,e,s){function n(i){for(var s=0,n=ksts-1,h=1;h!==n&&r[h]<=i;++h)s+=kSSS;var o=s+(i-r[--h])/(r[h+1]-r[h])*kSSS;return(s=getS(o,t,e))>=nms?nRI(i,o,t,e):0===s?o:binarySubdivide(i,s,s+kSSS,t,e)}var r=new Float32Array(ksts);if(t!==i||e!==s)for(var h=0;h<ksts;++h)r[h]=calcBezier(h*kSSS,t,e);return function(r){return t===i&&e===s?r:0===r?0:1===r?1:calcBezier(n(r),i,s)}},S.Is={string:function(t){return"string"==typeof t},object:function(t){return t===Object(t)},array:function(t){return t.constructor===Array}},S.Lerp={init:function(t,i,e){return t+(i-t)*e},extend:function(t,i,e,s,n){return s+(n-s)/(e-i)*(t-1)}},S.Sniffer={uA:navigator.userAgent.toLowerCase(),get isAndroid(){var t=/android.*mobile/.test(this.uA);return t||!t&&/android/i.test(this.uA)},get isFirefox(){return this.uA.indexOf("firefox")>-1},get safari(){return this.uA.match(/version\/[\d\.]+.*safari/)},get isSafari(){return!!this.safari&&!this.isAndroid},get isSafariOlderThan8(){var t=8;return this.isSafari&&(t=+this.safari[0].match(/version\/\d{1,2}/)[0].split("/")[1]),t<8},get isIEolderThan11(){return this.uA.indexOf("msie")>-1},get isIE11(){return navigator.appVersion.indexOf("Trident/")>0},get isIE(){return this.isIEolderThan11||this.isIE11},get isMac(){return navigator.platform.toLowerCase().indexOf("mac")>-1},get isTouch(){return"ontouchstart"in window}},S.Throttle=function(t){this.delay=t.delay,this.cb=t.callback,this.onlyAtEnd=t.onlyAtEnd,this.last,this.timer},S.Throttle.prototype={init:function(){var t=this,i=!0,e=Date.now();this.last&&e<this.last+this.delay||i?(i=!1,clearTimeout(this.timer),this.timer=setTimeout(function(){t.last=e,t.cb()},this.delay)):(this.last=e,this.onlyAtEnd||(i=!1,this.cb()))}},S.Geb={parent:function(t){return t||document},id:function(t,i){return this.parent(i).getElementById(t)},class:function(t,i){return this.parent(i).getElementsByClassName(t)},tag:function(t,i){return this.parent(i).getElementsByTagName(t)}},S.Dom={html:document.documentElement,body:document.body},S.Selector={el:function(t){var i=[];if(S.Is.string(t)){var e=t.substring(1);"#"===t.charAt(0)?i[0]=S.Geb.id(e):i=S.Geb.class(e)}else i[0]=t;return i},type:function(t){return"#"===t.charAt(0)?"id":"class"},name:function(t){return t.substring(1)}},S.Index={index:function(t,i){for(var e=i.length,s=0;s<e;s++)if(t===i[s])return s;return-1},list:function(t){var i=t.parentNode.children;return this.index(t,i)},class:function(t,i){var e=S.Geb.class(i);return this.index(t,e)}},S.MM=function(t){this.opts=t,this.el=S.Selector.el(this.opts.element)[0]||document,this.cb=this.opts.callback,this.iT=S.Sniffer.isTouch,S.BindMaker(this,["getThrottle","getRAF","run"]),this.throttle=new S.Throttle({callback:this.getRAF,delay:this.opts.throttle.delay,onlyAtEnd:this.opts.throttle.onlyAtEnd}),this.rafTicking=new S.RafTicking},S.MM.prototype={on:function(){this.listeners("add")},off:function(){this.listeners("remove")},listeners:function(t){var i=this.iT?"touch":"mouse";S.Listen(this.el,t,i+"move",this.getThrottle)},getThrottle:function(t){this.e=t,this.throttle.init()},getRAF:function(){this.rafTicking.start(this.run)},run:function(){var t=this.iT?this.e.changedTouches[0]:this.e;this.cb(t.pageX,t.pageY,this.e)}},S.RO=function(t){this.opts=t,this.cb=this.opts.callback,this.iT=S.Sniffer.isTouch,S.BindMaker(this,["getThrottle","getRAF"]),this.throttle=new S.Throttle({callback:this.getRAF,delay:this.opts.throttle.delay,onlyAtEnd:this.opts.throttle.onlyAtEnd}),this.rafTicking=new S.RafTicking},S.RO.prototype={on:function(){this.listeners("add")},off:function(){this.listeners("remove")},listeners:function(t){this.iT?S.Listen(window,t,"orientationchange",this.getThrottle):S.Listen(window,t,"resize",this.getThrottle)},getThrottle:function(){this.throttle.init()},getRAF:function(){this.rafTicking.start(this.cb)}},S.Scroll=function(t){this.opts=t,this.cb=this.opts.callback,S.BindMaker(this,["getThrottle","getRAF","run"]),this.throttle=new S.Throttle({callback:this.getRAF,delay:this.opts.throttle.delay,onlyAtEnd:this.opts.throttle.onlyAtEnd}),this.rafTicking=new S.RafTicking},S.Scroll.prototype={on:function(){this.startScrollY=S.Win.pageY,this.listeners("add")},off:function(){this.listeners("remove")},listeners:function(t){S.Listen(window,t,"scroll",this.getThrottle)},getThrottle:function(){this.throttle.init()},getRAF:function(){this.rafTicking.start(this.run)},run:function(){var t=pageYOffset,i=-(t-this.startScrollY);this.startScrollY=t,this.cb(t,i)}},S.WTDisable={prevent:function(t){t.preventDefault()},listeners:function(t){var i;if(S.Sniffer.isTouch){var e="add"===t?"none":"";S.Dom.body.style.touchAction=e,i="touchmove"}else i="mouseWheel";S.Listen(document,t,i,this.prevent)},on:function(){this.listeners("add")},off:function(){this.listeners("remove")}},S.WT=function(t){this.cb=t,this.iT=S.Sniffer.isTouch,this.rafTicking=new S.RafTicking,S.BindMaker(this,["touchStart","getRAF","run"])},S.WT.prototype={on:function(){this.listeners("add")},off:function(){this.listeners("remove")},listeners:function(t){var i=document;this.iT?(S.Listen(i,t,"touchstart",this.touchStart),S.Listen(i,t,"touchmove",this.getRAF)):S.Listen(i,t,"mouseWheel",this.getRAF)},getRAF:function(t){this.e=t,this.e.preventDefault(),this.rafTicking.start(this.run)},run:function(){var t=this.e.type;"wheel"===t?this.onWheel():"mousewheel"===t?this.onMouseWheel():"touchmove"===t&&this.touchMove()},onWheel:function(){this.type="scroll",this.delta=this.e.wheelDeltaY||-1*this.e.deltaY,S.Sniffer.isFirefox&&1===this.e.deltaMode&&(this.delta*=40),this.getCb()},onMouseWheel:function(){this.type="scroll",this.delta=this.e.wheelDeltaY?this.e.wheelDeltaY:this.e.wheelDelta,this.getCb()},touchStart:function(t){this.start=t.targetTouches[0].pageY},touchMove:function(){this.type="touch",this.delta=this.e.targetTouches[0].pageY-this.start,this.getCb()},getCb:function(){this.cb(this.delta,this.type,this.e)}},S.Listen=function(t,i,e,s){var n,r=document,h=(t=S.Selector.el(t)).length;n="mouseWheel"===e?"onwheel"in r?"wheel":void 0!==r.onmousewheel?"mousewheel":"DOMMouseScroll":"focusOut"===e?S.Sniffer.isFirefox?"blur":"focusout":e;for(var o=0;o<h;o++)t[o][i+"EventListener"](n,s)},S.Raf=function(t){requestAnimationFrame(t)},S.RafIndex=function(){this.start=function(t){this.rafCb=S.Raf(t)},this.cancel=function(){cancelAnimationFrame(this.rafCb)}},S.RafTicking=function(){this.ticking=!1,this.rafIndex=new S.RafIndex,S.BindMaker(this,["getCb"])},S.RafTicking.prototype={start:function(t){this.cb=t,this.ticking||(this.ticking=!0,this.rafIndex.start(this.getCb))},getCb:function(){this.cb(),this.destroy()},destroy:function(){this.rafIndex.cancel(),this.ticking=!1}},S.ScrollToTop=function(t){var i=t,e=S.Win.pageY,s={destination:0,duration:function(){var t=S.Lerp.init(300,1500,e/i.totalHeight);return 0===e?0:t}(),ease:e<=2500?"Power"+Math.ceil(e/500)+"InOut":"ExpoInOut",callback:i.callback};S.ScrollTo(s)},S.ScrollTo=function(t){function i(){S.WTDisable.off(),e.callback&&e.callback()}var e=t,s=document,n=s.scrollingElement?s.scrollingElement:S.Dom.body,r=S.Sniffer.isFirefox||S.Sniffer.isIE?s.documentElement:n,h=S.Win.pageY,o=new S.Merom(r,"scrollTop",h,e.destination,e.duration,e.ease,{callback:i});e.destination===h?i():(S.WTDisable.on(),o.play())},S.ScrollZero=function(){window.scrollTo(0,0)},S.TopWhenRefresh=function(){window.onbeforeunload=function(){window.scrollTo(0,0)}},S.Win={get w(){return innerWidth},get h(){return innerHeight},get path(){return location.pathname},get hostname(){return location.hostname},get href(){return location.href},get pageY(){return pageYOffset}};