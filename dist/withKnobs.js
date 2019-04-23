"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var knobs = require("@storybook/addon-knobs");
var lodash_1 = require("lodash");
// knobs does not have an index signature
var mockEntryToKnobs = function (_a) {
    var key = _a[0], value = _a[1];
    var label = lodash_1.startCase(key);
    if (typeof value === 'string' && value.startsWith('#')) {
        // type guards require typeof in condition
        return [key, knobs.color(label, value)];
    }
    else if (typeof value === 'string') {
        return [key, knobs.text(label, value)];
    }
    else if (Array.isArray(value)) {
        return [key, knobs.array(label, value)];
    }
    else if (value instanceof Date) {
        return [key, new Date(knobs.date(label, value))];
    }
    else if (typeof value === 'number') {
        return [key, knobs.number(label, value)];
    }
    else if (typeof value === 'boolean') {
        return [key, knobs.boolean(label, value)];
    }
    else {
        return [key, knobs.object(label, value)];
    }
};
var mockEntriesToKnobs = function (mockPairs) {
    return mockPairs.map(mockEntryToKnobs);
};
var pipe = function (f) { return function (g) { return function (a) { return g(f(a)); }; }; };
var fromEntries = function (entries) {
    return entries.reduce(function (object, _a) {
        var _b;
        var key = _a[0], value = _a[1];
        return (__assign({}, object, (_b = {}, _b[key] = value, _b)));
    }, {});
};
var withKnobs = pipe(Object.entries)(pipe(mockEntriesToKnobs)(fromEntries));
exports["default"] = (function (mockObject) {
    return withKnobs(mockObject);
});
