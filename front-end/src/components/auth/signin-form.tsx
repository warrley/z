"use client"

import { useRouter } from "next/navigation"
import { useState } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const SigninForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        router.replace("/home");
        alert(email)
    };

    return (
        <>
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
                label="Login"
                onClick={handleLogin}
                size={1}
            />
        </>
    );
};