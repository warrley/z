"use client"

import { useRouter } from "next/navigation"
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const SignupForm = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        router.replace("/home");
    };

    return (
        <>
            <Input
                value={name}
                onChange={(t) => setName(t)}
                placeholder="Enter your name"
            />

            <Input
                value={email}
                onChange={(t) => setEmail(t)}
                placeholder="Enter your e-mail"
            />

            <Input
                value={password}
                onChange={(t) => setPassword(t)}
                password
                placeholder="Enter your password"
            />

            

            <Button
                label="Create account"
                onClick={handleLogin}
                size={1}
            />
        </>
    );
};