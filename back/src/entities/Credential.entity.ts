    import  { Entity,PrimaryGeneratedColumn,Column, CreateDateColumn,UpdateDateColumn } from 'typeorm';

    @Entity({
        name: "credentials"
    })
    export class Credential {
        save() {
            throw new Error("Method not implemented.");
        }
        @PrimaryGeneratedColumn()
        id: number  ;

        @Column({type: "varchar", length: 100, nullable: false, unique: true})
        username: string;

        @Column({type: "varchar", length: 255, nullable: false})
        password: string;

        @CreateDateColumn()
        createdAt?: Date;

        @UpdateDateColumn()
        updatedAt?: Date;
    }   