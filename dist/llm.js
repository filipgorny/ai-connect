"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Llm = void 0;
require("reflect-metadata");
const di_1 = require("@filipgorny/di");
const llm_protocol_communication_1 = require("./protocol/llm-protocol-communication");
let Llm = class Llm {
    constructor(provider) {
        this.provider = provider;
    }
    async prompt(message) {
        return this.provider.prompt(message);
    }
    defineProtocol(protocol) {
        return new llm_protocol_communication_1.LlmProtocolCommunicationImpl(protocol, this.prompt.bind(this));
    }
};
exports.Llm = Llm;
exports.Llm = Llm = __decorate([
    __param(0, (0, di_1.Inject)("LlmProvider")),
    __metadata("design:paramtypes", [Object])
], Llm);
