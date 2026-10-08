

import bcrypt from "bcrypt";
import { AppDataSource } from "../../config/data-source.js";
import { User } from "../../entities/User.js";
import { RegisterUserData } from "../schemas/auth.schema.js"

const userRepository = AppDataSource.getRepository(User);

export const registerUser = async (data: RegisterUserData) => {
    const existingUser = await userRepository.findOne({
        where: {
            email: data.email
        }
    });

    if (existingUser) {
        throw new Error("Email already exists");
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = userRepository.create({
        name: data.name,
        email: data.email,
        passwordHash
    });

    const savedUser = await userRepository.save(user);

    const { passwordHash: _, ...safeUser } = savedUser; //passwordHash property lai saved user bata nikalne ani remaining property lai safeUser vanne object ma copy garne

    return safeUser;
};