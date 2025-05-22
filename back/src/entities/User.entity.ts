import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { Credential } from "./Credential.entity";
import { Appointment } from "./Appointment.entity";
@Entity({
    name: "users"
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 100, nullable: false})
    name: string;

    @Column({type: "varchar",length: 100,nullable: false, unique: true})
    email: string;

    @Column({type: "date", nullable: false})
    birthdate: Date;

    @Column({type: "integer", nullable: false, unique: true})
    nDni: number;

    @OneToOne(() => Credential, {cascade: true}  )
    @JoinColumn()
    credentials: Credential;

    @OneToMany(()=> Appointment, appoinments =>appoinments.user)
    appointments:Appointment[]

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
   
}