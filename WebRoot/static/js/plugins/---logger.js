'use strict';
define(["jquery"], function($){
    var emptyFn = function() {};
    if(!window.console) {
        window.console = {
            log: emptyFn,
            error: emptyFn,
            info: emptyFn,
            debug: emptyFn,
            warn: emptyFn,
            assert: emptyFn
        }
    }
    function Logger(options) {
        if(typeof options !== 'object') {
            return ;
        }
        var _globalErrorHandler = window.onerror || emptyFn, self = this;
        window.onerror = function(msg,/*（错误消息内容）、*/url,/*（发生错误的页面的 URL）、*/line/*（发生错误的代码所在行行号）*/) {
            _globalErrorHandler(msg, url, line);
            self.e(msg, url, line);
            return false;
        }
        this.setCnf(options);
    }
    Logger.prototype = {
        constructor: Logger,
        VERBOSE: 0,
        DEBUG: 1,
        INFO: 2,
        WARN: 3,
        ERROR: 4,
        level: 2,                   //默认的日志级别是INFO
        LABELS: ["VERBOSE", "DEBUG", "INFO", "WARN", "ERROR"],
        CLIENT_LOG_TYPES: {VERBOSE: "log", DEBUG: 'debug', INFO: 'info', WARN: 'warn', ERROR: 'error'},
        logServer: "",
        moduleName: "Logger",
        logQueue: [],
        maxLogCache: 5,
        log: function(level, info) {      //向日志队列中添加日志
            var fullLogInfo = {
                moduleName: this.moduleName,
                time: new Date(),
                level: this.LABELS[level],
                info: info
            };
            this.consoleLog(fullLogInfo);
            this.logQueue.push(fullLogInfo);
            if(this.logQueue.length >= this.maxLogCache) {
                //this.sendLogToServer();
            }
        },
        switchServer: function(logServer) {  //切换日志服务器
            this.logServer = logServer;
        },
        v: function() {                 //写VERBOSE级别的日志
            this.level <= this.VERBOSE && this.log(this.VERBOSE, arguments);
        },
        d: function() {                 //写DEBUG级别的日志
            this.level <= this.DEBUG && this.log(this.DEBUG, arguments);
        },
        i: function() {                 //写INFO级别的日志
            this.level <= this.INFO && this.log(this.INFO, arguments);
        },
        w: function() {                 //写WARN级别的日志
            this.level <= this.WARN && this.log(this.WARN, arguments);
        },
        e: function() {                 //写ERROR级别的日志
            this.level <= this.ERROR && this.log(this.ERROR, arguments);
        },
        setCnf: function(options) {         //修改日志
            for(var key in options) {
                this[key] && key !== 'constructor' && (this[key] = options[key]);
            }
        },
        sendLogToServer: function() {       //将客户端日志发送到服务器
            var self = this, loggers = self.logQueue;
            self.logQueue = [];
            $.ajax({
                url: self.logServer,
                data: JSON.stringify(loggers),
                error: function(xhr) {  //发送日志到服务器时发生错误
                    logger.e(xhr);
                }
            });
        },
        consoleLog: function(fullLogInfo) { //将客户端日志打印到控制台
            var logParams= [fullLogInfo.level, fullLogInfo.moduleName, fullLogInfo.time];
            [].push.apply(logParams, fullLogInfo.info);
            console[this.CLIENT_LOG_TYPES[fullLogInfo.level]](logParams.join(", "));
        }
    }
    var logger = new Logger();
    return logger;
});

 
