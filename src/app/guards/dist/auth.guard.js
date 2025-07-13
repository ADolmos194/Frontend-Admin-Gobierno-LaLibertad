"use strict";
exports.__esModule = true;
exports.authGuard = void 0;
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var ngx_cookie_service_1 = require("ngx-cookie-service");
exports.authGuard = function (route, state) {
    var router = core_1.inject(router_1.Router);
    var cookie = core_1.inject(ngx_cookie_service_1.CookieService);
    var accessToken = cookie.get('access_token');
    if (accessToken) {
        return true;
    }
    router.navigate(['/auth/login']);
    return false;
};
