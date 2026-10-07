

import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "./User.js";
import { Movie } from "./Movie.js";

export enum Status {
    PLAN_TO_WATCH = "PLAN_TO_WATCH",
    WATCHING = "WATCHING",
    COMPLETED = "COMPLETED",
    DROPPED = "DROPPED",
}

@Entity("watchlists")
export class Watchlist {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => User, (user) => user.watchlists, { nullable: false })
    @JoinColumn({ name: "userId" }) //foreign key
    user!: User;

    @ManyToOne(() => Movie, (movie) => movie.watchlists, { nullable: false })
    @JoinColumn({ name: "movieId" }) //foreign key 
    movie!: Movie;

    @Column({
        type: "enum",
        enum: Status,
        default: Status.PLAN_TO_WATCH,
    })
    status!: Status;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamptz" })
    updatedAt!: Date;
}