"use client"

import { useRouter } from "next/navigation"
import { useState } from "react";
import { Input } from "../Input";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

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
                icon={faHeart}
            />

            <Input
                value={password}
                onChange={(t) => setPassword(t)}
                password
                placeholder="Enter your password"
            />

            <button onClick={handleLogin}>Login</button>
        </>
    );
};