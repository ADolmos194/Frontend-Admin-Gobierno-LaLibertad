"use strict";
exports.__esModule = true;
exports.authGuard = void 0;
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
exports.authGuard = function (route, state) {
    var router = core_1.inject(router_1.Router);
    var accessToken = document.cookie
        .split('; ')
        .find(function (row) { return row.startsWith('access_token='); });
    if (accessToken) {
        return true;
    }
    else {
        router.navigate(['/auth/login']);
        return false;
    }
};
