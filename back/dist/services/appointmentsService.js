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
const Appointment_Repository_1 = require("../repositories/Appointment_Repository");
const validateCancelation_1 = require("../utils/validateCancelation");
const customError_1 = require("../utils/customError");
const getAppointmentService = () => __awaiter(void 0, void 0, void 0, function* () {
    const appointments = yield Appointment_Repository_1.AppointmentRepository.find();
    if (appointments.length === 0)
        throw new customError_1.CustomError(404, "No hay turnos registrados");
    return appointments;
});
exports.getAppointmentService = getAppointmentService;
const getAppointmentsByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentFound = yield Appointment_Repository_1.AppointmentRepository.findOne({
        where: {
            id
        },
        relations: ["user"]
    });
    if (!appointmentFound)
        throw Error(`La cita con Id: ${id} no fue encontrado`);
    return appointmentFound;
});
exports.getAppointmentsByIdService = getAppointmentsByIdService;
const registerAppointmentsService = (appointment) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, userService_1.getUserByIdService)(appointment.userId);
    Appointment_Repository_1.AppointmentRepository.validateAllowAppointment(appointment.date, appointment.time);
    yield Appointment_Repository_1.AppointmentRepository.validateExistingAppointment(appointment.userId, appointment.date, appointment.time);
    const newAppointment = Appointment_Repository_1.AppointmentRepository.create({
        date: appointment.date,
        time: appointment.time,
        user: {
            id: appointment.userId
        }
    });
    return yield Appointment_Repository_1.AppointmentRepository.save(newAppointment);
});
exports.registerAppointmentsService = registerAppointmentsService;
const cancelAppointmentsService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentFound = yield Appointment_Repository_1.AppointmentRepository.findOne({
        where: {
            id
        }
    });
    if (!appointmentFound)
        throw new customError_1.CustomError(400, "El turno no existe");
    (0, validateCancelation_1.validateAppointmentCanBeCancelled)(appointmentFound.date, appointmentFound.time);
    appointmentFound.status = IAppointments_1.Status.cancelled;
    yield Appointment_Repository_1.AppointmentRepository.save(appointmentFound);
});
exports.cancelAppointmentsService = cancelAppointmentsService;
