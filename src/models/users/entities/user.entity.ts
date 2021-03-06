import { Column, Entity, Timestamp, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn({ name: 'user_id' })
    userId: number;

    @Column({
        name: 'email',
        type: 'varchar',
        length: 255,
        nullable: false,
        unique: true,
    })
    email: string;

    @Column({
        name: 'first_name',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    firstName: string;

    @Column({
        name: 'last_name',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    lastName: string;

    @Column({
        name: 'password',
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    password: string;

    @Column({
        name: 'time_registered',
        type: 'timestamp',
        nullable: false,
    })
    timeRegistered: Timestamp;

    @Column({
        name: 's3_image_key',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    s3Imagekey: string;

    @Column("int", {
        array: true,
        default: {}
    })
    guesses: Number[];

}