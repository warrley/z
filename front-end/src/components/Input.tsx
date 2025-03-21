"use client"

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

type Props = {
    placeholder: string;
    value?: string;
    onChange?: (n: string) => void;
    password?: boolean;
    filled?: boolean;
    icon?: IconDefinition;
};

export const Input = ({ placeholder, password, icon, filled, value, onChange }: Props) => {
    const [showPassword, setShowPassword] = useState(true);

    return (
        <div
            className="flex p-4 rounded-full border-2 has-[:focus]:border-white border-gray-500 items-center gap-3"
            style={{ backgroundColor: filled ? '#6B7280' : 'transparent' }}
        >
            {icon &&
                <FontAwesomeIcon
                icon={icon}
                className="text-xl"
            />
            }
            <input
                type={password && showPassword ? "password" : "text"}
                placeholder={placeholder}
                value={value}
                onChange={e => onChange && onChange(e.target.value)}
                className="flex-1 outline-0 "
            />
            {password && 
                <div className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeClosed/> : <Eye/>}
                </div>
            }
        </div>
    )
}