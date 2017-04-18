(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function recompute(state, newState, oldState, isInitial) {
	if (isInitial || 'width' in newState && differs(state.width, oldState.width)) {
		state.widthPercent = newState.widthPercent = template.computed.widthPercent(state.width);
	}
}

var template = function () {
	var stepSizes = [0, 0, 0.005, 0.01, 0.02];

	function getIncrement(number) {
		if (number >= 0 && number < 0.2) return 0.1;else if (number >= 0.2 && number < 0.5) return 0.04;else if (number >= 0.5 && number < 0.8) return 0.02;else if (number >= 0.8 && number < 0.99) return 0.005;
		return 0;
	}

	var updater = void 0;

	return {
		data: function data() {
			return {
				minimum: 0.08,
				maximum: 0.994,
				settleTime: 700,
				intervalTime: 700
			};
		},

		methods: {
			start: function start() {
				this.reset();
				this.continue();
			},
			reset: function reset() {
				var startingWidth = this.get('minimum');
				this.set({
					width: startingWidth,
					running: true
				});
			},
			continue: function _continue() {
				var _this = this;

				var maximumWidth = this.get('maximum');
				var intervalTime = this.get('intervalTime');

				if (updater) {
					// prevent multiple intervals by clearing before making
					clearInterval(updater);
				}
				this.set({ running: true });
				updater = setInterval(function () {
					var value = _this.get('width');

					var randomStep = stepSizes[Math.floor(Math.random() * stepSizes.length)];
					var step = getIncrement(value) + randomStep;
					if (value < maximumWidth) {
						value = value + step;
					}
					if (value > maximumWidth) {
						value = maximumWidth;
						_this.stop();
					}
					_this.set({ width: value });
				}, intervalTime);
			},
			stop: function stop() {
				if (updater) {
					clearInterval(updater);
				}
			},
			complete: function complete() {
				var _this2 = this;

				clearInterval(updater);
				this.set({
					width: 1,
					running: false
				});
				var settleTime = this.get('settleTime');
				setTimeout(function () {
					_this2.set({ width: 0 });
				}, settleTime);
			}
		},
		computed: {
			widthPercent: function widthPercent(width) {
				return width * 100;
			}
		}
	};
}();

var added_css = false;
function add_css() {
	var style = createElement('style');
	style.textContent = "\n[svelte-678785769].svelte-progress-bar, [svelte-678785769] .svelte-progress-bar {\n\tposition: fixed;\n\ttop: 0;\n\tleft: 0;\n\theight: 2px;\n\ttransition: width 0.16s ease-in-out;\n\tbackground-color: red;\n\tz-index: 1;\n}\n[svelte-678785769].svelte-progress-bar-leader, [svelte-678785769] .svelte-progress-bar-leader {\n\tposition: absolute;\n\ttop: 0;\n\tright: 0;\n\theight: 2px;\n\twidth: 100px;\n\ttransform: rotate(2.5deg) translate(0px, -4px);\n\tbox-shadow: 0 0 8px red, 0 0 8px red;\n\tbackground-color: red;\n\tz-index: 2;\n}\n";
	appendNode(style, document.head);

	added_css = true;
}

function create_main_fragment(root, component) {
	var if_block_anchor = createComment();

	function get_block(root) {
		if (root.width && root.widthPercent) return create_if_block_0;
		return null;
	}

	var current_block = get_block(root);
	var if_block = current_block && current_block(root, component);

	return {
		mount: function mount(target, anchor) {
			insertNode(if_block_anchor, target, anchor);
			if (if_block) if_block.mount(if_block_anchor.parentNode, if_block_anchor);
		},

		update: function update(changed, root) {
			var _current_block = current_block;
			current_block = get_block(root);
			if (_current_block === current_block && if_block) {
				if_block.update(changed, root);
			} else {
				if (if_block) if_block.destroy(true);
				if_block = current_block && current_block(root, component);
				if (if_block) if_block.mount(if_block_anchor.parentNode, if_block_anchor);
			}
		},

		destroy: function destroy(detach) {
			if (if_block) if_block.destroy(detach);

			if (detach) {
				detachNode(if_block_anchor);
			}
		}
	};
}

function create_if_block_0(root, component) {
	var div = createElement('div');
	setAttribute(div, 'svelte-678785769', '');
	div.className = "svelte-progress-bar";
	var last_div_style = "width: " + root.widthPercent + "%";
	div.style.cssText = last_div_style;
	var if_block_1_anchor = createComment();
	appendNode(if_block_1_anchor, div);

	function get_block(root) {
		if (root.running) return create_if_block_1_0;
		return null;
	}

	var current_block = get_block(root);
	var if_block_1 = current_block && current_block(root, component);

	if (if_block_1) if_block_1.mount(if_block_1_anchor.parentNode, if_block_1_anchor);

	return {
		mount: function mount(target, anchor) {
			insertNode(div, target, anchor);
		},

		update: function update(changed, root) {
			var tmp;

			if ((tmp = "width: " + root.widthPercent + "%") !== last_div_style) {
				last_div_style = tmp;
				div.style.cssText = last_div_style;
			}

			var _current_block = current_block;
			current_block = get_block(root);
			if (_current_block === current_block && if_block_1) {
				if_block_1.update(changed, root);
			} else {
				if (if_block_1) if_block_1.destroy(true);
				if_block_1 = current_block && current_block(root, component);
				if (if_block_1) if_block_1.mount(if_block_1_anchor.parentNode, if_block_1_anchor);
			}
		},

		destroy: function destroy(detach) {
			if (if_block_1) if_block_1.destroy(false);

			if (detach) {
				detachNode(div);
			}
		}
	};
}

function create_if_block_1_0(root, component) {
	var div = createElement('div');
	div.className = "svelte-progress-bar-leader";

	return {
		mount: function mount(target, anchor) {
			insertNode(div, target, anchor);
		},

		update: noop,

		destroy: function destroy(detach) {
			if (detach) {
				detachNode(div);
			}
		}
	};
}

function ProgressBar(options) {
	options = options || {};
	this._state = assign(template.data(), options.data);
	recompute(this._state, this._state, {}, true);

	this._observers = {
		pre: Object.create(null),
		post: Object.create(null)
	};

	this._handlers = Object.create(null);

	this._root = options._root;
	this._yield = options._yield;

	this._torndown = false;
	if (!added_css) add_css();

	this._fragment = create_main_fragment(this._state, this);
	if (options.target) this._fragment.mount(options.target, null);
}

assign(ProgressBar.prototype, template.methods, {
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set,
	_flush: _flush
});

ProgressBar.prototype._set = function _set(newState) {
	var oldState = this._state;
	this._state = assign({}, oldState, newState);
	recompute(this._state, newState, oldState, false);

	dispatchObservers(this, this._observers.pre, newState, oldState);
	if (this._fragment) this._fragment.update(newState, this._state);
	dispatchObservers(this, this._observers.post, newState, oldState);
};

ProgressBar.prototype.teardown = ProgressBar.prototype.destroy = function destroy(detach) {
	this.fire('destroy');

	this._fragment.destroy(detach !== false);
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

function createElement(name) {
	return document.createElement(name);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function setAttribute(node, attribute, value) {
	node.setAttribute(attribute, value);
}

function createComment() {
	return document.createComment('');
}

function appendNode(node, target) {
	target.appendChild(node);
}

function assign(target) {
	for (var i = 1; i < arguments.length; i += 1) {
		var source = arguments[i];
		for (var k in source) {
			target[k] = source[k];
		}
	}

	return target;
}

function differs(a, b) {
	return a !== b || a && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' || typeof a === 'function';
}

function dispatchObservers(component, group, newState, oldState) {
	for (var key in group) {
		if (!(key in newState)) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		if (newValue === oldValue && (typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) !== 'object') continue;

		var callbacks = group[key];
		if (!callbacks) continue;

		for (var i = 0; i < callbacks.length; i += 1) {
			var callback = callbacks[i];
			if (callback.__calling) continue;

			callback.__calling = true;
			callback.call(component, newValue, oldValue);
			callback.__calling = false;
		}
	}
}

function noop() {}

function get(key) {
	return key ? this._state[key] : this._state;
}

function fire(eventName, data) {
	var handlers = eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
}

function observe(key, callback, options) {
	var group = options && options.defer ? this._observers.post : this._observers.pre;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function cancel() {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function cancel() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(newState);
	(this._root || this)._flush();
}

function _flush() {
	if (!this._renderHooks) return;

	while (this._renderHooks.length) {
		var hook = this._renderHooks.pop();
		hook.fn.call(hook.context);
	}
}

module.exports = ProgressBar;

},{}]},{},[1]);