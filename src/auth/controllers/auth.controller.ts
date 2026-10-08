

import { Request, Response } from "express";
import { ZodError } from "zod";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { loginUser, registerUser } from "../services/auth.service.js";

export const registerUserController = async (req: Request, res: Response) => {
    try {
        const validatedData = registerSchema.parse(req.body);

        const user = await registerUser(validatedData);

        return res.status(201).json({
            user,
            success: true,
        });
    } catch (error) {
        if (error instanceof ZodError) {
            const errors = error.issues.map((issue) => issue.message);

            return res.status(400).json({
                success: false,
                errors,
            });
        }

        if (error instanceof Error) { // service ma deko error lai handle garxa yesle. 
            return res.status(409).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const loginUserController = async (req: Request, res: Response) => {
    try {
        const validatedData = loginSchema.parse(req.body);

        const result = await loginUser(validatedData);

        return res.status(200).json({
            ...result, //because loginuser service is returning both user and token. 
            success: true
        });
    } catch (error) {
        if (error instanceof ZodError) {
            const errors = error.issues.map((issue) => issue.message);

            return res.status(400).json({
                success: false,
                errors,
            });
        }

        if (error instanceof Error) { // service ma deko error lai handle garxa yesle. 
            return res.status(401).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const getCurrentUserController = (
    req: Request,
    res: Response
) => {
    return res.status(200).json({
        success: true,
        user: req.user,
    });
};