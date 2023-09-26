"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChaza = exports.updateChaza = exports.getChazaById = exports.getAllChazas = exports.createChaza = void 0;
const Chaza_1 = __importDefault(require("../models/Chaza"));
// Create a new Chaza
const createChaza = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chaza = new Chaza_1.default(req.body);
        yield chaza.save();
        res.status(201).send(chaza);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createChaza = createChaza;
// Get all Chazas
const getAllChazas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chazas = yield Chaza_1.default.find();
        res.send(chazas);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllChazas = getAllChazas;
// Get a single Chaza by ID
const getChazaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chaza = yield Chaza_1.default.findById(req.params.id).populate('products');
        if (!chaza) {
            return res.status(404).send({ message: 'Chaza not found' });
        }
        res.send(chaza);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getChazaById = getChazaById;
// Update a Chaza by ID
const updateChaza = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chaza = yield Chaza_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!chaza) {
            return res.status(404).send({ message: 'Chaza not found' });
        }
        res.send(chaza);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateChaza = updateChaza;
// Delete a Chaza by ID
const deleteChaza = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chaza = yield Chaza_1.default.findByIdAndDelete(req.params.id);
        if (!chaza) {
            return res.status(404).send({ message: 'Chaza not found' });
        }
        res.send({ message: 'Chaza deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteChaza = deleteChaza;
