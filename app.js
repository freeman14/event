'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventProxy = function () {
  function EventProxy() {
    _classCallCheck(this, EventProxy);

    this.store = {};
    this.cb = {};
  }

  _createClass(EventProxy, [{
    key: 'get',
    value: function get(key) {
      return this.store[key] && this.store[key].value || undefined;
    }
  }, {
    key: 'set',
    value: function set(key, value) {
      if (this.store[key]) {
        this.store[key].value = value;
        this.dispatch(key);
      } else {
        this.store[key] = {
          value: value,
          cb: []
        };
      }
    }
  }, {
    key: 'dispatch',
    value: function dispatch(key) {
      var val = this.store[key].value;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.store[key].cb[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var cb = _step.value;

          cb.call(null, val);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'subscribe',
    value: function subscribe(key, cb) {
      if (this.store[key]) {
        this.store[key].cb.push(cb);
      } else {
        this.store[key] = {
          value: '',
          cb: [cb]
        };
      }
    }
  }]);

  return EventProxy;
}();

window.EventProxy = new EventProxy();

var Timer = React.createClass({
  displayName: "Super cool react app",

  getInitialState: function getInitialState() {
    return { event: 'Default mock event' };
  },
  componentDidMount: function componentDidMount() {
    var self = this;
    EventProxy.subscribe('event', function(event){
      self.setState({ event: event });
    });
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      "Event is: ",
      this.state.event
    );
  }
});

ReactDOM.render(React.createElement(Timer, null), document.getElementById('projectX-react'));
