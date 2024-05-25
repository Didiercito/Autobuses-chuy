import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty, IsEmail, IsInt, Min, Max, Length } from "class-validator";

@Entity()
export class UserCredentials {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    @IsNotEmpty()
    public name: string;

    @Column()
    @IsNotEmpty()
    public lastname: string;

    @Column()
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(120) 
    public age: number;

    @Column()
    @IsNotEmpty()
    @IsInt()
    public number_telefonic: number; 

    @Column()
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @Column()
    @IsNotEmpty()
    @Length(1, 3)
    public seat_number: string;

    @Column()
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(23) 
    public schedule: number;

    @Column()
    @IsNotEmpty()
    public origin: string;

    @Column()
    @IsNotEmpty()
    public destination: string;

    constructor(
        name: string, lastname: string, age: number, 
        number_telefonic: number, email: string, seat_number: string, 
        schedule: number, origin: string, destination: string
    ) {
        this.name = name;
        this.lastname = lastname;
        this.age = age;
        this.number_telefonic = number_telefonic;
        this.email = email;
        this.seat_number = seat_number;
        this.schedule = schedule;
        this.origin = origin;
        this.destination = destination;
    }
}