

import { Router } from "express";
import {
    getCurrentUserController,
    loginUserController,
    registerUserController,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import passport from "passport";
import "../strategies/google.strategy.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", registerUserController);

router.post("/login", loginUserController);

router.get("/me", authMiddleware, getCurrentUserController);

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

router.get(
    "/google/callback",
    (req, res, next) => {
        passport.authenticate(
            "google",
            { session: false },
            (err, user, info) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Authentication failed",
                    });
                }

                if (!user) {
                    return res.status(401).json({
                        success: false,
                        message:
                            info?.message ||
                            "Google authentication failed",
                    });
                }

                const token = jwt.sign(
                    { userId: user.id },
                    process.env.JWT_SECRET!,
                    { expiresIn: "7d" }
                );

                return res.json({
                    success: true,
                    user,
                    token,
                });
            }
        )(req, res, next);
    }
);

export default router;

