/*******************************************************************************
 * ABLE AGENIOS LIMITED CONFIDENTIAL
 * _________________________________
 * 
 *  [2010] - [2013] Able Agenios Ltd 
 *  All Rights Reserved.
 * 
 * NOTICE:  All information contained herein is, and remains
 * the property of Able Agenios Ltd  and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Able Agenios Ltd 
 * and its suppliers and may be covered by French and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Able Agenios Ltd.
 ******************************************************************************/
/**
 * @class:Drag and drop
 * @author      rock
 * @version:    0.1.0
 * @param       {} overrides
 * @return      constructor
 * @exception:  
 */
define(function(require){
    var popup = require('util/popup'),
        oPop = require('util/longClick'),           // contextual menu
        $ = require('jquery'),
        //Player = require('player/Player'),
        UserSession = require('session/UserSession'),
        ScreenFamilies = require('util/ScreenFamilies'),
        WebtopRequest = require('webtop/data/webtopRequest'),
        sessionId = sessionStorage.sessionId;
        
        UserSession.sessionId = sessionId ;
    const A = 18
    ,   T = 30
    ,   nArea = 30 ;
    var doc = document.getElementById('container')
    ,   Util = require('util/Util').create()
    ,   $this = null 
    ,   E = Util.Event ;
    var oEvent = Able.Constants.EVENT
    ,   Config = function (opt){
        this.dragable = opt.dragable != false;
        this.realView = opt.realView;                           // shortcutView
        this.target = this.realView.el;
        this.view = this.realView.homeView                  // homeView , Initialization in the shortcutView 
        
        this.model = this.realView.model;
        this.shortcutId = this.model.get('id');
        this.bContainer = this.realView.bContainer ; 
        
        this.entity = this.model.get('having').entity; 
        this.appId = this.entity.app_id;
        this.creator = (this.entity.creator && this.entity.creator.id); 
        this.callback = opt.callback;
        this.eve = opt.eve;
        
        this.bull = true;
    } 
    ,   Dragdrop = function(opt){
        if(!opt){ return }
        this.conf = new Config(opt);
        this.defaultConf = new Config(opt);
        
        this.firstX = this.conf.target.style.left;
        this.firstY = this.conf.target.style.top;
        this.diffX = null;
        this.diffY = null;
        this.num = null;
        this.set = null;
        this.blocked = true ;
        this.bFocus = true ;
        this.screenX = null ;
        this.screenY = null ;
        
        $this = this;
        $this.mousedown(this.conf.eve);
        this.init();
    } ;
    
    Dragdrop.prototype = {                        //interface to users
        init : function(){},    //TODO
        setDragable : function(b){
            $this.conf.dragable = b;
        },
        reStore : function(){
            $this.conf = new Config($this.defaultConf);
            $this.conf.target.style.top = '0px';
            $this.conf.target.style.left = '0px';
        },
        setDelay : function(el, e){
            $this.set = setTimeout(function(){
                // if($this.conf.bContainer ) return;                // bContainer
                $this.num = 10;
                if($this.bFocus){
                    $this.conf.view.longClick = oPop.create($this.conf.model, $this.conf.view).popup(el, e);
                    $this.bFocus = false;
                }
            },500);
        },
        mousedown: function (e){
            this.num = 0;
            e = E.evt(e);
            var el = $this.conf.target ;
            $this.setDelay(el,e);            
            el.style.cursor = 'move'; 
            if(el.setCapture){
                E.on(el, "losecapture", this.mouseup);
                el.setCapture();
                e.cancelBubble = true;
            }else if(captureEvents){
                e.stopPropagation();
                E.on(window, "blur", this.mouseup);
                e.preventDefault();
            }
            
            $this.setDiff(e, el);
            // E.on($this.conf.target, oEvent.mousedown , this.mousedown);
            E.on(doc,oEvent.mousemove, this.mousemove);
            E.on(doc,oEvent.mouseup, this.mouseup);
        }
        ,setDiff: function(e ,el){
            var position = Util.getPosition(document.getElementById('groupWrapper')) ;
            // diffX = this.conf.bContainer?(e.clientX - el.offsetLeft):(e.clientX - el.offsetLeft) ;       // diffY = this.conf.bContainer?(e.clientY - el.offsetTop):(e.clientY - el.offsetTop) ;
            // diffX = this.conf.bContainer?(e.clientX - el.offsetLeft - position.left):(e.clientX - el.offsetLeft);
            // diffY = this.conf.bContainer?(e.clientY - el.offsetTop - position.top-$('.groupWrp')[0]?($('.groupWrp')[0].scrollTop):0-$('body')[0].scrollTop-document.body.clientTop):(e.clientY - el.offsetTop);
            $this.screenX = $this.getClient(e).clientX ;
            $this.screenY = $this.getClient(e).clientY ;
            $this.diffX = $this.getClient(e).clientX - el.offsetLeft ;
            $this.diffY = $this.getClient(e).clientY - el.offsetTop ;
        },
        getClient : function(e){
            var platform = Able.Constants.PLATFORM ;
            return {
                clientX: platform? e.clientX: e.changedTouches[0].clientX ,
                clientY: platform? e.clientY :e.changedTouches[0].clientY
        }}
        ,mousemove: function(e){
            var  el = $this.conf.target, e = E.evt(e) , 
                 moveX = $this.getClient(e).clientX - $this.diffX , 
                 moveY = $this.getClient(e).clientY - $this.diffY , 
                 appType = $this.conf.model.getType() ;
            /**
             * limit the area 
             */
            var areaWidth    = document.width,
                areaHeight   = document.height;
                
            var minX = 0,
                maxX = areaWidth - el.offsetWidth-10,
                minY = 0,
                maxY = areaHeight - el.offsetHeight-40;
                
                moveX < minX && (moveX = minX);                     // left     (Least)
                moveX > maxX && (moveX = maxX);                     // right    (max)
                moveY < minY && (moveY = minY);                     // top
                moveY > maxY && (moveY = maxY);                     // bottom
                el.style.left = moveX + 'px';
                el.style.top =  moveY + 'px';
                
                el.style.zIndex =  35;
                if($this.conf.callback){
                    var obj = {moveX:moveX,moveY:moveY};
                    $this.conf.callback.call($this.conf,obj);
                };
                
                var node = el.cloneNode(true) ;

                if(Math.abs($this.screenX-$this.getClient(e).clientX)>5||Math.abs($this.screenY-$this.getClient(e).clientY)>5)
                    $this.trip(el, node);
                
                var x = $this.getClient(e).clientX
                ,       y= $this.getClient(e).clientY
                ,       send = document.getElementById('send') ;
                if( $this.confirm(send, nArea, x, y) ){
                    E.id('pop_send_ul').style.display = "block" ; 
                    $this.blocked = false;
                }
                 /**
                 * for applications in home screen
                 * @param: arr 
                 * @param: app          drag node
                 * @param: fn            callback
                 */               
                var heap= $('.apps'), fnCallback ;
                fnCallback = function(){
                    console.log('fnReplace-callback');
                } ;
                $this.fnMoveCheck(heap, el, fnCallback);                // $this.fnMoving(heap, el, fnCallback);
        },
        trip : function(el, node){
            $this.conf.view.longClick&&($this.conf.view.longClick.destroy())
            $this.num = 6;
            clearTimeout($this.set) ;
            return false;
            // if($this.conf.bull &&$this.conf.bContainer){
                // el.parentNode.removeChild(el);
                // $(node).appendTo('body');
                // $this.conf.target = node ;
                // $this.conf.bull = false ;
            // }        },
        mouseup: function (e){
            var el = $this.conf.target,
                domId = el.firstChild.id ,
                creator = $this.conf.creator,
                appId = $this.conf.appId;
                
            el.style.cursor = 'default';
            el.style.zIndex = 1;
            e = E.evt(e);

            if($this.num<=5){
                var id = el.firstChild.id;
                $this.conf.realView.trigger('open', $this.conf.realView);
                clearTimeout($this.set);
                if($this.conf.view.longClick){$this.conf.view.longClick.destroy() }
                if($this.conf.model.getType()==='container' ){
                    $this.conf.view.longClick = oPop.create($this.conf.model, $this.conf.view).popup(el, e);
            }}
             /**
             * for tool bar in home screen
             * @param: arr 
             * @param: app          drag node
             * @param: fn            callback
             */ 
            var x = $this.getClient(e).clientX, 
                y= $this.getClient(e).clientY, 
                trash = document.getElementById('trash'),
                send = document.getElementById('send'),
                sendToD = E.id('toDesktop') ,
                sendToF = E.id('toFriends') ;
                
            if( $this.confirm(trash, nArea, x, y)&&$this.blocked ){
                var fnSToTrash=function(json){
                        json.retcode==0&&$this.conf.view.cShortcut.trigger('refetch');
                    },fnFToTrash=function(){
                        alert('Failured!');
                    };
                WebtopRequest.fnAppHavingDestroy({
                    'having_ids': $this.conf.model.get('having').id
                }).done(fnSToTrash).fail(fnFToTrash);
            }else if($this.confirm(sendToD, nArea, x, y)&&!$this.blocked ){
                console.log("TODO: send to homescreen!");
            }else if($this.confirm(sendToF, nArea, x, y)&&!$this.blocked ){
                console.log("TODO: send to friends!");
            }
            E.id('pop_send_ul').style.display = "none" ; 
            $this.blocked = true;
             /**
             * for applications in home screen
             * @param: arr 
             * @param: app          drag node
             * @param: fn            callback
             */               
            var heap= $('.apps'), fnCallback ;
            fnCallback = function(){
                console.log('fnReplace-callback');
            }
            $this.fnUpCheck(heap, el, fnCallback );
            
            el.style.left = $this.firstX;
            el.style.top = $this.firstY;
            if(el.parentNode == document.body){
                el.parentNode.removeChild(el);
            }
            heap.removeClass('replace');
            heap.removeClass('group');

            E.un(doc, oEvent.mousemove, $this.mousemove);
            E.un(doc, oEvent.mouseup, $this.mouseup);
                
            if(el.releaseCapture){
                E.un(el, "losecapture", $this.mouseup);
                el.releaseCapture();
            }
            if(releaseEvents){                                //standard DOM
                E.un(window, "blur", $this.mouseup);
            }
        },
        fnMoving : function(arr, app, fn){                    //(heap, el, fnCallback)
            var i, 
                posiHeap = $this.conf.view.posiHeap ,           //
                len= posiHeap.length, 
                areaG= {}, areaR= {}, 
                left, top, 
                w = $('.apps').width(),                       // half width of a
                models = $this.conf.view.cShortcut.models ,
                offsetLeft = app.offsetLeft,
                offsetTop = app.offsetTop;            //var str = JSON.stringify(posiHeap);
            for(i=0; i<len; i++){
                if(models[i]&&models[i].id== $this.conf.realView.model.id) continue; 

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
                /** for replace 
                */
                if( areaR.l<offsetLeft && offsetLeft<areaR.L&& areaR.t<offsetTop&& offsetTop<areaR.T ){
                    arr.removeClass('group');
                    $(arr[i]).addClass('replace').siblings().removeClass('replace');
                    if(app==arr[i-1]){
                        $(arr[i-2]).addClass('replace');
                    }else{
                        $(arr[i-1]).addClass('replace');
                    }
                    return ;
                /**for group 
                 */
                }else if( areaG.l<offsetLeft && offsetLeft<areaG.L &&areaG.t <offsetTop && offsetTop<areaG.T){
                    arr.removeClass('replace');
                    $(arr[i]).addClass('group').siblings().removeClass('group');
                    return ;
                }else{
                    arr.removeClass('group');
                    arr.removeClass('replace');
                }
            }
        },
        fnMoveCheck : function(arr, app, fn){                    //(heap, el, fnCallback)
            // if(!Able.Constants.PLATFORM){return}            var i, 
                posiHeap = $this.conf.view.posiHeap ,
                len= posiHeap.length, 
                areaG= {}, areaR= {}, 
                left, top, 
                w = $('.apps').width(),                       // half width of a
                models = $this.conf.view.cShortcut.models ,
                offsetLeft = app.offsetLeft,
                offsetTop = app.offsetTop;            //var str = JSON.stringify(posiHeap);
            for(i=0; i<len; i++){
                if(models[i]&&models[i].id== $this.conf.realView.model.id) continue; 

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
                /** for replace 
                */
                if( areaR.l<offsetLeft && offsetLeft<areaR.L&& areaR.t<offsetTop&& offsetTop<areaR.T ){
                    arr.removeClass('group');
                    $(arr[i]).addClass('replace').siblings().removeClass('replace');
                    if(app==arr[i-1]){
                        $(arr[i-2]).addClass('replace');
                    }else{
                        $(arr[i-1]).addClass('replace');
                    }
                    return ;
                /**for group 
                 */
                }else if( areaG.l<offsetLeft && offsetLeft<areaG.L &&areaG.t <offsetTop && offsetTop<areaG.T){
                    arr.removeClass('replace');
                    $(arr[i]).addClass('group').siblings().removeClass('group');
                    return ;
                }else{
                    arr.removeClass('group');
                    arr.removeClass('replace');
                }
            }
        },
        moveEffect : function(i){},
        fnUpCheck : function(arr, app, fn){                    //(heap, el, fnCallback)
            var shortcutId = $this.conf.shortcutId,
                appType = $this.conf.model.getType(),
                i, 
                posiHeap = $this.conf.view.posiHeap ,
                len= $this.conf.view.posiHeap.length, 
                areaG= {}, areaR= {}, 
                left, top, 
                w= $('.apps').width()/2,                       // half width of a
                models = $this.conf.view.cShortcut.models,
                params,
                buttonCre = E.id('newApp'),
                buttonSen = E.id('send'),
                buttonDow = E.id('download'),
                buttonSet = E.id('setting'),
                buttonTra = E.id('trash');
            for(i=0; i<len; i++){
                if(models[i]&&models[i].id== $this.conf.realView.model.id) continue;                 // self
                left= posiHeap[i].left; 
                top= posiHeap[i].top; 

                areaR= {                                    //replace the location
                    l: left-w*2,        // l: left-a-w,
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
                /**@function: for replace 
                */
                if( areaR.l<app.offsetLeft && app.offsetLeft<areaR.L&& areaR.t<app.offsetTop&& app.offsetTop<areaR.T ){
                    if(app==arr[i-1]) continue;
                    params = {
                        shortcut_id: shortcutId,
                        path: 'webtop/',
                        location: models[i].attributes.location
                    }; var 
                    fnS = function(json){
                        json.retcode==0&&$this.conf.view.cShortcut.trigger('refetch');
                        console.log('Replace successed!');
                    },
                    fnF = function(){
                        console.log('Replace failured!');
                    };
                    WebtopRequest.fnDesktopMove(params).done(fnS).fail(fnF);
                /**for group 
                 */
                }else if( areaG.l<app.offsetLeft && app.offsetLeft<areaG.L &&areaG.t <app.offsetTop && app.offsetTop<areaG.T){
                    var 
                    fnS = function(json){
                        json.retcode==0&&$this.conf.view.cShortcut.trigger('refetch');
                        console.log('group successed!');
                    },
                    fnF = function(){
                        console.log('group failured!');
                    };
                    
                    if(models[i]){
                        var theType = models[i].getType();
                    }else{
                        return;
                    }
                    // var theType = models[i].getType();

                    if(appType==='app'&&theType==='container' ){
                        params = {
                            shortcut_id: shortcutId ,
                            path: 'webtop/'+ models[i].getEntity().label
                            //, location:''
                            //, conflict:''
                        };
                        WebtopRequest.fnDesktopMove(params).done(fnS ).fail(fnF );
                    }else if(appType==='container'&&theType==='app'){
                        console.log('//TODO: drag a group to apps');
/*                             params = {
                                    shortcut_id: models[i].getEntity().app_id ,
                                    path: 'webtop/'+$this.conf.model.getEntity().label
                                    //, location:''
                                    //, conflict:''
                                };
                                WebtopRequest.fnDesktopMove(params).done(fnS ).fail(fnF );*/

                    }else if( appType==='app'&&theType==='app' ){
                        params = {
                            shortcut_ids: shortcutId+','+(models[i]?models[i].id:''),
                            path: 'webtop/',
                            label: 'group'+ (new Date().valueOf()+'').substr(10,20)
                        };
                        WebtopRequest.fnDesktopMerge(params).done(fnS ).fail(fnF );
                    }else{};
/*
                        }else if ($this.conf.bContainer &&areaG.l<app.offsetLeft && app.offsetLeft<areaG.L &&areaG.t <app.offsetTop && app.offsetTop<areaG.T){ var 
                            fnS = function(json){
                                json.retcode==0&&$this.conf.view.cShortcut.trigger('refetch');
                                console.log('Replace successed!');
                            } ,
                            fnF = function(){
                                console.log('Replace failured!');
                            } ,
                            params = {
                                shortcut_id: shortcutId,
                                path: 'webtop/'+ models[i].getEntity().label
                                // , location: model.attributes.location
                            } ;
                            
                            WebtopRequest.fnDesktopMove(params).done(fnS).fail(fnF);
                            break ;*/
                } else if($this.conf.bContainer){
                    fnS = function(json){
                        json.retcode==0&&$this.conf.view.cShortcut.trigger('refetch');
                        console.log('Replace successed!');
                    } ,
                    fnF = function(){
                        console.log('Replace failured!');
                    } ,
                    params = {
                        shortcut_id: shortcutId,
                        path: 'webtop/'
                        // , location: model.attributes.location
                        } ;
                        
                    WebtopRequest.fnDesktopMove(params).done(fnS).fail(fnF);
                    break ;
                    
        }}},
        confirm: function(node, nArea, x, y){
            return (node.offsetLeft-nArea)<x && x<(node.offsetLeft+node.offsetWidth+nArea) &&(node.offsetTop-nArea)<y && y<(node.offsetTop+node.offsetHeight+nArea);
        },
        constructor : Dragdrop
    }
    return Dragdrop ;
});
// TODO: fresh the only part of screen 