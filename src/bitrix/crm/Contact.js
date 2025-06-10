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
exports.Contact = void 0;
var BitrixBuilder_js_1 = require("../BitrixBuilder.js");
var Contact = /** @class */ (function (_super) {
    __extends(Contact, _super);
    function Contact() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefixDefault = "crm.contact";
        return _this;
    }
    Contact.prototype.setEmail = function (value, type) {
        if (type === void 0) { type = "WORK"; }
        if (!this.data.EMAIL) {
            this.data.EMAIL = [];
        }
        this.data.EMAIL.push({ VALUE: value, VALUE_TYPE: type ? type.toUpperCase() : "WORK" });
        return this;
    };
    Contact.prototype.setPhone = function (value, type) {
        if (type === void 0) { type = "WORK"; }
        if (!this.data.PHONE) {
            this.data.PHONE = [];
        }
        this.data.PHONE.push({ VALUE: value, VALUE_TYPE: type ? type.toUpperCase() : "WORK" });
        return this;
    };
    Contact.prototype.setName = function (value) {
        this.data.NAME = value;
        return this;
    };
    Contact.prototype.setLastName = function (value) {
        this.data.LAST_NAME = value;
        return this;
    };
    Contact.prototype.setUser = function (value) {
        value = typeof value == "object" ? value.data.ID : value;
        this.data.ASSIGNED_BY_ID = value;
        return this;
    };
    return Contact;
}(BitrixBuilder_js_1.BitrixBuilder));
exports.Contact = Contact;
