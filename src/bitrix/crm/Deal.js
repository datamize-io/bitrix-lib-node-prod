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
exports.Deal = void 0;
var BitrixBuilder_js_1 = require("../BitrixBuilder.js");
var Deal = /** @class */ (function (_super) {
    __extends(Deal, _super);
    function Deal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefixDefault = "crm.deal";
        return _this;
    }
    Deal.prototype.setContact = function (value) {
        if (!value) {
            return this;
        }
        value = value.data ? value.data.ID : value;
        this.data.CONTACT_ID = value;
        return this;
    };
    Deal.prototype.setContacts = function (value) {
        if (!value) {
            return this;
        }
        value = value.map(function (v) { return (typeof v == "object" ? v.data.ID : v); });
        this.data.CONTACT_IDS = value;
        return this;
    };
    Deal.prototype.setName = function (value) {
        if (!value) {
            return this;
        }
        this.data.TITLE = value;
        return this;
    };
    Deal.prototype.setPipeline = function (value) {
        if (!value) {
            return this;
        }
        value = value.data ? value.data.ID : value;
        this.data.CATEGORY_ID = value;
        return this;
    };
    Deal.prototype.setStage = function (value) {
        var _a;
        if (value === void 0) { value = null; }
        if (!value) {
            return this;
        }
        if ((_a = value.data) === null || _a === void 0 ? void 0 : _a.CATEGORY_ID) {
            return this.setPipeline(value.data.CATEGORY_ID).setStage(value.data.STATUS_ID);
        }
        value = value.data ? value.data.STATUS_ID : value;
        this.data.STAGE_ID = value;
        return this;
    };
    Deal.prototype.setValue = function (value, currency) {
        if (currency === void 0) { currency = "BRL"; }
        if (!value) {
            return this;
        }
        this.setCurrency(currency);
        this.data.OPPORTUNITY = value;
        return this;
    };
    Deal.prototype.setCurrency = function (value) {
        if (value === void 0) { value = "BRL"; }
        if (!value) {
            return this;
        }
        this.data.CURRENCY_ID = value;
        return this;
    };
    Deal.prototype.setStatus = function (value) {
        if (value === void 0) { value = true; }
        if (!value) {
            return this;
        }
        this.data.OPENED = value ? "Y" : "N";
        return this;
    };
    Deal.prototype.setOriginId = function (value) {
        if (!value) {
            return this;
        }
        this.data.ORIGIN_ID = value;
        return this;
    };
    Deal.prototype.setSource = function (value) {
        if (!value) {
            return this;
        }
        value = value.data ? value.data.ID : value;
        if (!this.data.source) {
            this.data.source = {};
        }
        this.data.source.id_ = value;
        return this;
    };
    Deal.prototype.setTrack = function (utms) {
        if (!utms) {
            return this;
        }
        var utm_campaign = utms.utm_campaign, utm_source = utms.utm_source, utm_medium = utms.utm_medium, utm_content = utms.utm_content, utm_term = utms.utm_term;
        this.data.UTM_CAMPAIGN = utm_campaign;
        this.data.UTM_SOURCE = utm_source;
        this.data.UTM_MEDIUM = utm_medium;
        this.data.UTM_CONTENT = utm_content;
        this.data.UTM_TERM = utm_term;
        return this;
    };
    Deal.prototype.setField = function (field, value) {
        if (!value) {
            return this;
        }
        field = field.includes("UF_CRM") ? field : "UF_CRM_" + field;
        this.data[field] = value;
        return this;
    };
    Deal.prototype.setUser = function (value) {
        if (!value) {
            return this;
        }
        value = value.data ? value.data.ID : value;
        this.data.ASSIGNED_BY_ID = value;
        return this;
    };
    return Deal;
}(BitrixBuilder_js_1.BitrixBuilder));
exports.Deal = Deal;
