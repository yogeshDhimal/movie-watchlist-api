

import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, Unique } from "typeorm";
import { User } from "./User.js";

@Unique(["provider", "providerAccountId"])
@Entity("oauth_accounts")
export class OAuthAccount {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @OneToOne(() => User, (user) => user.oAuthAccount, { nullable: false })
    @JoinColumn({ name: "userId" })
    user!: User;

    @Column({ type: "varchar" })
    provider!: string;

    @Column({ type: "varchar" })
    providerAccountId!: string

    @CreateDateColumn({ type: "timestamptz" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamptz" })
    updatedAt!: Date;
}