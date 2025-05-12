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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LayoutService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var LayoutService = /** @class */ (function () {
    function LayoutService() {
        var _this = this;
        this._config = {
            preset: 'Lara',
            primary: 'green',
            surface: 'slate',
            darkTheme: false,
            menuMode: 'static'
        };
        this._state = {
            staticMenuDesktopInactive: false,
            overlayMenuActive: false,
            configSidebarVisible: false,
            staticMenuMobileActive: false,
            menuHoverActive: false
        };
        this.layoutConfig = core_1.signal(this._config);
        this.layoutState = core_1.signal(this._state);
        this.configUpdate = new rxjs_1.Subject();
        this.overlayOpen = new rxjs_1.Subject();
        this.menuSource = new rxjs_1.Subject();
        this.resetSource = new rxjs_1.Subject();
        this.menuSource$ = this.menuSource.asObservable();
        this.resetSource$ = this.resetSource.asObservable();
        this.configUpdate$ = this.configUpdate.asObservable();
        this.overlayOpen$ = this.overlayOpen.asObservable();
        this.theme = core_1.computed(function () { var _a; return (((_a = _this.layoutConfig()) === null || _a === void 0 ? void 0 : _a.darkTheme) ? 'light' : 'dark'); });
        this.isSidebarActive = core_1.computed(function () { return _this.layoutState().overlayMenuActive || _this.layoutState().staticMenuMobileActive; });
        this.isDarkTheme = core_1.computed(function () { return _this.layoutConfig().darkTheme; });
        this.getPrimary = core_1.computed(function () { return _this.layoutConfig().primary; });
        this.getSurface = core_1.computed(function () { return _this.layoutConfig().surface; });
        this.isOverlay = core_1.computed(function () { return _this.layoutConfig().menuMode === 'overlay'; });
        this.transitionComplete = core_1.signal(false);
        this.initialized = false;
        core_1.effect(function () {
            var config = _this.layoutConfig();
            if (config) {
                _this.onConfigUpdate();
            }
        });
        core_1.effect(function () {
            var config = _this.layoutConfig();
            if (!_this.initialized || !config) {
                _this.initialized = true;
                return;
            }
            _this.handleDarkModeTransition(config);
        });
    }
    LayoutService.prototype.handleDarkModeTransition = function (config) {
        if (document.startViewTransition) {
            this.startViewTransition(config);
        }
        else {
            this.toggleDarkMode(config);
            this.onTransitionEnd();
        }
    };
    LayoutService.prototype.startViewTransition = function (config) {
        var _this = this;
        var transition = document.startViewTransition(function () {
            _this.toggleDarkMode(config);
        });
        transition.ready
            .then(function () {
            _this.onTransitionEnd();
        })["catch"](function () { });
    };
    LayoutService.prototype.toggleDarkMode = function (config) {
        var _config = config || this.layoutConfig();
        if (_config.darkTheme) {
            document.documentElement.classList.add('app-dark');
        }
        else {
            document.documentElement.classList.remove('app-dark');
        }
    };
    LayoutService.prototype.onTransitionEnd = function () {
        var _this = this;
        this.transitionComplete.set(true);
        setTimeout(function () {
            _this.transitionComplete.set(false);
        });
    };
    LayoutService.prototype.onMenuToggle = function () {
        var _this = this;
        if (this.isOverlay()) {
            this.layoutState.update(function (prev) { return (__assign(__assign({}, prev), { overlayMenuActive: !_this.layoutState().overlayMenuActive })); });
            if (this.layoutState().overlayMenuActive) {
                this.overlayOpen.next(null);
            }
        }
        if (this.isDesktop()) {
            this.layoutState.update(function (prev) { return (__assign(__assign({}, prev), { staticMenuDesktopInactive: !_this.layoutState().staticMenuDesktopInactive })); });
        }
        else {
            this.layoutState.update(function (prev) { return (__assign(__assign({}, prev), { staticMenuMobileActive: !_this.layoutState().staticMenuMobileActive })); });
            if (this.layoutState().staticMenuMobileActive) {
                this.overlayOpen.next(null);
            }
        }
    };
    LayoutService.prototype.isDesktop = function () {
        return window.innerWidth > 991;
    };
    LayoutService.prototype.isMobile = function () {
        return !this.isDesktop();
    };
    LayoutService.prototype.onConfigUpdate = function () {
        this._config = __assign({}, this.layoutConfig());
        this.configUpdate.next(this.layoutConfig());
    };
    LayoutService.prototype.onMenuStateChange = function (event) {
        this.menuSource.next(event);
    };
    LayoutService.prototype.reset = function () {
        this.resetSource.next(true);
    };
    LayoutService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], LayoutService);
    return LayoutService;
}());
exports.LayoutService = LayoutService;
