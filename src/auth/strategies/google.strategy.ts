

import "dotenv/config";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { OAuthAccount } from "../../entities/OAuthAccount.js";
import { AppDataSource } from "../../config/data-source.js";
import { User } from "../../entities/User.js";

const googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: "http://localhost:8080/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
        const googleId = profile.id;
        const name = profile.displayName;
        const email = profile.emails?.[0]?.value;

        if (!email) {
            return done(null, false, {
                message: "Google account email is required.",
            });
        }

        const oauthAccountRepository = AppDataSource.getRepository(OAuthAccount);

        const existingOAuthAccount = await oauthAccountRepository.findOne({
            where: {
                provider: "google",
                providerAccountId: googleId,
            },
            relations: {
                user: true,
            },
        });

        if (existingOAuthAccount) {
            return done(null, existingOAuthAccount.user);
        }

        const userRepository = AppDataSource.getRepository(User);

        const existingUser = await userRepository.findOne({
            where: {
                email,
            },
        });

        if (existingUser) {
            return done(null, false, {
                message: "An account with this email already exists. Please use your original login method.",
            });
        }

        const user = userRepository.create({
            name,
            email,
            passwordHash: null,
        });

        const savedUser = await userRepository.save(user);

        const oauthAccount = oauthAccountRepository.create({
            user: savedUser,
            provider: "google",
            providerAccountId: googleId,
        });

        await oauthAccountRepository.save(oauthAccount);

        return done(null, savedUser);
    }
);

passport.use(googleStrategy);