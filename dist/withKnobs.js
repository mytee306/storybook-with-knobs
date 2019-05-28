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
// for more information check out https://www.debuggex.com/r/vpn4CGZFfeN7WR1_
var dateRegex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/;
var mockEntryToKnobs = function (_a) {
    var key = _a[0], value = _a[1];
    var label = lodash_1.startCase(key);
    if (typeof value === 'string' && value.startsWith('#')) {
        // type guards require typeof operator in condition
        return [key, knobs.color(label, value)];
    }
    else if (value instanceof Date || dateRegex.test(value)) {
        return [key, new Date(knobs.date(label, value))];
    }
    else if (typeof value === 'string') {
        return [key, knobs.text(label, value)];
    }
    else if (Array.isArray(value)) {
        return [key, knobs.array(label, value)];
    }
    else if (typeof value === 'number') {
        return [key, knobs.number(label, value)];
    }
    else if (typeof value === 'boolean') {
        return [key, knobs.boolean(label, value)];
    }
    else if (typeof value === 'function') {
        return [key, value];
    }
    else {
        return [key, knobs.object(label, value)];
    }
};
var mockEntriesToKnobs = function (mockEntries) {
    return mockEntries.map(mockEntryToKnobs);
};
var pipe = function (f) { return function (g) { return function (a) { return g(f(a)); }; }; };
var fromEntries = function (entries) {
    return entries.reduce(function (object, _a) {
        var _b;
        var key = _a[0], value = _a[1];
        return (__assign({}, object, (_b = {}, _b[key] = value, _b)));
    }, {});
};
var withKnobs = function (mock) {
    return pipe(Object.entries)(pipe(mockEntriesToKnobs)(fromEntries))(mock);
};
exports["default"] = (function (mockObject) {
    return withKnobs(mockObject);
});
