import { RequestHandler } from "express";
import { signupSchema } from "../schemas/signup";
import { findByEmail, findBySlug, save } from "../services/user";
import bcrypt from "bcryptjs";
import slug from "slugify";
import { allowsEval } from "zod/v4/core/util.cjs";
import { generatedToken } from "../utils/jwt";
import { signinSchema } from "../schemas/signin";

export const signup:RequestHandler = async (req, res) => {
    const safeData = signupSchema.safeParse(req.body);
    if(!safeData.success) {
        res.status(400).json({ error: safeData.error.flatten().fieldErrors });
        return;
    };

    const { email, name, password } = safeData.data;

    if(await findByEmail(email)) {
        res.json({ error: "E-mail already exist" });
        return;
    };

    let genSlug = true;
    let userSlug = slug(name);
    while(genSlug) {
        const existsSlug = await findBySlug(userSlug);
        if(existsSlug) {
            let slugSuffix = Math.floor(Math.random() * 999999).toString();
            userSlug = slug(name + slugSuffix);
        } else {
            genSlug = false;
        };
    };

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await save({ slug: userSlug, name, email, password: hashPassword });

    const token = await generatedToken(user.slug);

    res.json({error: null, token, user: { name: user.name, slug: user.slug, avatar: user.avatar  }});
};

export const signin: RequestHandler = async (req, res) => {
    const safeData = signinSchema.safeParse(req.body);
    if(!safeData.success) {
        res.json({ error: safeData.error.flatten().fieldErrors });
        return;
    };

    const { email, password } = safeData.data;

    const user = await findByEmail(email);
    if(!user) {
        res.json({ error: "Acess denied" });
        return;
    };

    if(!await bcrypt.compare(password, user.password)) {
        res.json({ error: "Acess denied" });
        return;
    };

    const token = await generatedToken(user.slug);

    res.json({ error: null, token });
};