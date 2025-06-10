"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactField = void 0;
var CustomField_js_1 = require("../CustomField.js");
var ContactField = /** @class */ (function (_super) {
    __extends(ContactField, _super);
    function ContactField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefixDefault = "crm.contact.userfield";
        return _this;
    }
    return ContactField;
}(CustomField_js_1.CustomField));
exports.ContactField = ContactField;
