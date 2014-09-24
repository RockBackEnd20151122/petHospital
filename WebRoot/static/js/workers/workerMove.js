/**@author Rock
 */
onmessage = function(e){
    const A = 18
    ,   T = 30 ;
    var i
    ,   left, top
    ,   areaG= {}, areaR= {}
    ,       w = e.data.arg[0]
    ,       models = JSON.parse(e.data.arg[1])
    ,       offsetLeft = e.data.arg[2]
    ,       offsetTop = e.data.arg[3]
    ,       posiHeap = e.data.arg[4] 
    ,       arr = e.data.arg[5] 
    ,   len= posiHeap.length 
    ,   fnLog = e.data.fnLog
    ,   id = e.data.id ;
    for(i=0; i<len; i++){
        if(models[i]&&models[i].id== id) continue; 

        left= posiHeap[i].left; 
        top= posiHeap[i].top; 
        areaR= {                                    //replace the location
            l: left-w,        // l: left-a-w,
            L: left-A,           // L: left+a-w,
            t: top-T,
            T: top+T
        };
        areaG= {                                    //add these two applications into group 
            l: left-A,
            L: left+A,
            t: top-T,
            T: top+T
        };
        /**for group 
         */
        if( areaG.l<offsetLeft && offsetLeft<areaG.L &&areaG.t <offsetTop && offsetTop<areaG.T){
            void postMessage(i);
            // arr.removeClass('replace');
            // $(arr[i]).addClass('group').siblings().removeClass('group');
            return ;
        // }else{
            // arr.removeClass('group');
            // arr.removeClass('replace');
        }
    }
}
onerror = function(e){
    postMessage(e.lineno , e.message );
}