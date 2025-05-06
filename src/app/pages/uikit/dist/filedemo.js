"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FileDemo = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var api_1 = require("primeng/api");
var button_1 = require("primeng/button");
var fileupload_1 = require("primeng/fileupload");
var toast_1 = require("primeng/toast");
var FileDemo = /** @class */ (function () {
    function FileDemo(messageService) {
        this.messageService = messageService;
        this.uploadedFiles = [];
    }
    FileDemo.prototype.onUpload = function (event) {
        for (var _i = 0, _a = event.files; _i < _a.length; _i++) {
            var file = _a[_i];
            this.uploadedFiles.push(file);
        }
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };
    FileDemo.prototype.onBasicUpload = function () {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    };
    FileDemo = __decorate([
        core_1.Component({
            selector: 'app-file-demo',
            standalone: true,
            imports: [common_1.CommonModule, fileupload_1.FileUploadModule, toast_1.ToastModule, button_1.ButtonModule],
            template: "<p-toast />\n        <div class=\"grid grid-cols-12 gap-8\">\n            <div class=\"col-span-full lg:col-span-6\">\n                <div class=\"card\">\n                    <div class=\"font-semibold text-xl mb-4\">Advanced</div>\n                    <p-fileupload name=\"demo[]\" (onUpload)=\"onUpload($event)\" [multiple]=\"true\" accept=\"image/*\" maxFileSize=\"1000000\" mode=\"advanced\" url=\"https://www.primefaces.org/cdn/api/upload.php\">\n                        <ng-template #empty>\n                            <div>Drag and drop files to here to upload.</div>\n                        </ng-template>\n                        <ng-template #content>\n                            <ul *ngIf=\"uploadedFiles.length\">\n                                <li *ngFor=\"let file of uploadedFiles\">{{ file.name }} - {{ file.size }} bytes</li>\n                            </ul>\n                        </ng-template>\n                    </p-fileupload>\n                </div>\n            </div>\n            <div class=\"col-span-full lg:col-span-6\">\n                <div class=\"card\">\n                    <div class=\"font-semibold text-xl mb-4\">Basic</div>\n                    <div class=\"flex flex-col gap-4 items-center justify-center\">\n                        <p-fileupload #fu mode=\"basic\" chooseLabel=\"Choose\" chooseIcon=\"pi pi-upload\" name=\"demo[]\" url=\"https://www.primefaces.org/cdn/api/upload.php\" accept=\"image/*\" maxFileSize=\"1000000\" (onUpload)=\"onUpload($event)\" />\n                        <p-button label=\"Upload\" (onClick)=\"fu.upload()\" severity=\"secondary\" />\n                    </div>\n                </div>\n            </div>\n        </div>",
            providers: [api_1.MessageService]
        })
    ], FileDemo);
    return FileDemo;
}());
exports.FileDemo = FileDemo;
