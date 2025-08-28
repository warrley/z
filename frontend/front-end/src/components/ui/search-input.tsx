"use client"

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { Input } from "./input"
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type Props = {
    defaultValue?: string;
    hideOnSearch?: boolean;
}

export const SearchInput = ({ defaultValue, hideOnSearch }: Props) => {
    const router = useRouter();
    const pathName = usePathname();
    const [search, setSearch] = useState(defaultValue ?? '');

    const handleEnter = () => {
        if (search) {
            router.push('search?q=' + encodeURIComponent(search))
        };
    };

    if (hideOnSearch && pathName === '/search') return null;

    return (
        <Input
            placeholder="Search"
            icon={faMagnifyingGlass}
            filled
            value={search}
            onChange={t => setSearch(t)}
            onEnter={handleEnter}
        />
    )
}