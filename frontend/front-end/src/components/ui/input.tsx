"use client"

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Eye, EyeClosed } from "lucide-react";
import { KeyboardEvent, useState } from "react";

type Props = {
    placeholder: string;
    value?: string;
    onChange?: (n: string) => void;
    password?: boolean;
    filled?: boolean;
    icon?: IconDefinition;
    onEnter?: () => void;
};

export const Input = ({ placeholder, password, icon, filled, value, onChange, onEnter }: Props) => {
    const [showPassword, setShowPassword] = useState(true);

    const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code.toLowerCase() === 'enter' && onEnter) {
            onEnter();
        }
    }

    return (
        <div
            className="flex p-4 rounded-full border-2 has-[:focus]:border-white border-gray-700 items-center gap-3"
            style={{ backgroundColor: filled ? '#364153' : 'transparent' }}
        >
            {icon &&
                <FontAwesomeIcon
                icon={icon}
                className="text-xl text-gray-400"
            />
            }
            <input
                type={password && showPassword ? "password" : "text"}
                placeholder={placeholder}
                value={value}
                onChange={e => onChange && onChange(e.target.value)}
                onKeyUp={handleKeyUp}
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