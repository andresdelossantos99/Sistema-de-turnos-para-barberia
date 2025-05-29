import { Status } from "../interfaces/IAppointments";
import { User } from "./User.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";

@Entity({
    name: "appointments"
})
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "date", nullable: false })
    date: Date;

    @Column({ type: "time", nullable: false })
    time: string;

    @Column ({type: 'varchar', length: 10, nullable: false, default: Status.active})
    status: Status;

    @ManyToOne(() => User, (user) => user.appointments)
    user: User;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}
