/* scroll*/
function mouseWheel(elem, callBack, prevent, wheelName,useCapture){

    var wheelEnv = wheelType();

    mouseWheel = function(elem, callBack, wheelName, useCapture){
        var lineHeight = getProperty(elem, 'line-height'),
            iH = window.innerHeight;
        wheelName = wheelName ? wheelName : 'lastTime';

        if(!elem.wheelNS){ elem.wheelNS = {} };

        elem.addEventListener( wheelEnv.type, elem.wheelNS[wheelName] = function(ev){
            ev = ev || window.event;

            var scale = wheelEnv.wayTo;

            switch(ev.deltaMode){
                case 1 :
                    scale *= lineHeight;
                    break;
                case 2 :
                    scale *= iH;
                    break;
            }
            if(prevent === true){
                preventDefault(ev);
            }

            if(!callBack || typeof callBack !== 'function'){
                console.log('你可能没传入回调函数，或参数类型不是函数');
            }else{
                callBack.call(elem, ev[wheelEnv.dy]*scale, ev);
            }
        }, useCapture)
    };

    mouseWheel.apply(this, arguments);
}

function wheelType(){
    var detectElem = document.createElement('div');

    if( 'onwheel' in detectElem ){
        return {type:'wheel', dy:'deltaY', wayTo: -1};
    }

    if('onmousewheel' in detectElem){
        return {type:'mousewheel', dy: 'wheelDelta', wayTo: 1};
    }else{
        return {type:'DOMMouseScroll', dy: 'detail', wayTo: -1};
    }
};


/*end scroll*/

function getProperty(elem, prop){

    for(var i=0, fn; fn = [function(elem, prop){
        return getComputedStyle(elem)[prop];
    },function(elem, prop){
        return elem.currentStyle[prop];
    }][i++];){
        try{
            getProperty = function(elem, prop){
                var val = fn(elem, prop);
                return isNaN(parseFloat(val, 10)) ? val : parseFloat(val, 10);
            };
            return getProperty(elem, prop);
        }catch(e){}
    }

    
}

//事件绑定
function fixListener(){
    if(!arguments.length){return;}
    if(!('addEventListener' in  document.createElement('div'))){

        arrayLikeTraversing(arguments,function(i,elem){

            elem.addEventListener = function(evType, handle){
                this.attachEvent('on'+evType,handle);
            };
            elem.removeEventListener = function(evType, handle){
                this.detachEvent('on'+evType,handle);
            };
        });
    }
};
function listenEvent(elem, evType, handler, useCapture){
    if('addEventListener' in  document.createElement('div')){
        elem.addEventListener(evType, handler, useCapture);
    }else{
        elem.attachEvent('on'+evType, handler);
    }
}
// 移除事件

function removeHandler(elem, evType, handler, useCapture){
    if('removeEventListener' in  document.createElement('div')){
        elem.removeEventListener(elem, evType, handler, useCapture);
    }else{
        elem.detachEvent('on'+evType, handler);
    }
}

// 取消默认动作
function preventDefault(ev){
    try{
        preventDefault = function(ev){ev.preventDefault();};
        preventDefault(ev);
    }catch(e){
        preventDefault = function(ev){ev.returnValue = false;};
        preventDefault(ev);
    }

}

















