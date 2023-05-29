import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";

@Entity({name:"teams"})
export class Team {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, unique:true, length: 30})
    name: string;

}

