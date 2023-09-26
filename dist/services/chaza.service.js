"use strict";
// chazaService.ts
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
const Chaza_1 = __importDefault(require("../models/Chaza")); // Importa el modelo de Chaza
class ChazaService {
    // Crea una nueva chaza
    crearChaza(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nuevaChaza = new Chaza_1.default(req.body);
                yield nuevaChaza.save();
                res.status(201).json(nuevaChaza);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Obtiene todas las chazas
    obtenerChazas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chazas = yield Chaza_1.default.find();
                res.status(200).json(chazas);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Obtiene una chaza por su ID
    obtenerChazaPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chaza = yield Chaza_1.default.findById(req.params.id);
                if (!chaza) {
                    return res.status(404).json({ message: 'Chaza no encontrada' });
                }
                res.status(200).json(chaza);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Actualiza una chaza por su ID
    actualizarChaza(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chaza = yield Chaza_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
                if (!chaza) {
                    return res.status(404).json({ message: 'Chaza no encontrada' });
                }
                res.status(200).json(chaza);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Elimina una chaza por su ID
    eliminarChaza(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chaza = yield Chaza_1.default.findByIdAndDelete(req.params.id);
                if (!chaza) {
                    return res.status(404).json({ message: 'Chaza no encontrada' });
                }
                res.status(200).json({ message: 'Chaza eliminada exitosamente' });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.default = ChazaService;
