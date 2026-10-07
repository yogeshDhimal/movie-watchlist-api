

import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Watchlist } from "./Watchlist.js";

export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN",
}

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar" })
    name!: string;

    @Column({ type: "varchar", unique: true })
    email!: string;

    @Column({ type: "varchar", nullable: true })
    passwordHash!: string | null;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER,
    })
    role!: UserRole;

    @OneToMany(() => Watchlist, (watchlist) => watchlist.user)
    watchlists!: Watchlist[];

    @CreateDateColumn({ type: "timestamptz" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamptz" })
    updatedAt!: Date;
}