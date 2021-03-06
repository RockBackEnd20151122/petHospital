// Generated by CoffeeScript 1.3.3
var __slice = [].slice;

define(function(require) {
  var Logger, log;
  log = function(type, msgs, caller) {
    var args, level, _ref;
    level = Logger.levels[type.toUpperCase()];
    if (level >= Logger.level) {
      args = ["" + type + ":"].concat(__slice.call(msgs));
      if (type === 'trace') {
        type = 'debug';
      }
      try {
        return (_ref = console[type]) != null ? _ref.apply(console, args) : void 0;
      } catch (err) {
        return console[type](args.join(' '));
      }
    }
  };
  return Logger = {
    level: 0,
    levels: {
      TRACE: 0,
      DEBUG: 1,
      INFO: 2,
      WARN: 3,
      ERROR: 4,
      FATAL: 5
    },
    trace: function() {
      var msg;
      msg = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return log('trace', msg, arguments.callee.caller);
    },
    debug: function() {
      var msg;
      msg = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return log('debug', msg, arguments.callee.caller);
    },
    info: function() {
      var msg;
      msg = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return log('info', msg, arguments.callee.caller);
    },
    warn: function() {
      var msg;
      msg = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return log('warn', msg, arguments.callee.caller);
    },
    error: function() {
      var msg;
      msg = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return log('error', msg, arguments.callee.caller);
    },
    fatal: function() {
      var msg;
      msg = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      log('error', msg, arguments.callee.caller);
      if (DEBUG) {
        alert(msg.join(' '));
      }
      throw new Error(msg.join(' '));
    }
  };
});
