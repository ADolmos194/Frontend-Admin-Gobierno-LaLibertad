"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.axiosIns = exports.api_url = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var api_url = 'http://127.0.0.1:8000/'; // 'https://backend-ecommerce-gobierno.onrender.com/' - 'http://127.0.0.1:8000/'

exports.api_url = api_url;

var axiosIns = _axios["default"].create({
  baseURL: api_url
});

exports.axiosIns = axiosIns;