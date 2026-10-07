

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("movies")
export class Movie {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar" })
    title!: string;

    @Column({ type: "text" })
    description!: string;

    @Column({ type: "date" })
    releaseDate!: Date;

    @Column({ type: "int" })
    duration!: number;

    @Column({ type: "varchar" })
    posterUrl!: string;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamptz" })
    updatedAt!: Date;
}
