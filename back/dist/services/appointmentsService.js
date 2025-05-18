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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointmentsService = exports.registerAppointmentsService = exports.getAppointmentsByIdService = exports.getAppointmentService = void 0;
const IAppointments_1 = require("../interfaces/IAppointments");
const userService_1 = require("./userService");
const appointments = [];
let id = 1;
const getAppointmentService = () => __awaiter(void 0, void 0, void 0, function* () {
    return appointments;
});
exports.getAppointmentService = getAppointmentService;
const getAppointmentsByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentFound = appointments.find(app => app.id === id);
    if (!appointmentFound)
        throw Error(`La cita con Id: ${id} no fue encontrado`);
    return appointmentFound;
});
exports.getAppointmentsByIdService = getAppointmentsByIdService;
const registerAppointmentsService = (appointment) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield (0, userService_1.getUserByIdService)(appointment.userId);
    if (!userFound) {
        throw new Error(`El usuario con el Id:${appointment.userId} no fue encontrado`);
    }
    const appointmentFound = appointments.find(app => app.userId === appointment.userId && app.time === appointment.time && new Date(app.date).getTime() === new Date(appointment.date).getTime());
    if (appointmentFound)
        throw Error(`La cita ya existe`);
    const newAppointment = {
        id: id++,
        date: appointment.date,
        time: appointment.time,
        status: IAppointments_1.Status.active,
        userId: (userFound === null || userFound === void 0 ? void 0 : userFound.id) || 0
    };
    appointments.push(newAppointment);
    return newAppointment;
});
exports.registerAppointmentsService = registerAppointmentsService;
const cancelAppointmentsService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentFound = yield (0, exports.getAppointmentsByIdService)(id);
    appointmentFound.status = IAppointments_1.Status.cancelled;
    return appointmentFound;
});
exports.cancelAppointmentsService = cancelAppointmentsService;
