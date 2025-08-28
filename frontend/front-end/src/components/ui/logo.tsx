import Link from "next/link"

export const Logo = ({ size }: {size: number}) => {
    return (
        <Link href="/">
            <img
                src={'/logo.png'}
                alt="Z"
                width={size}
                height={size}
            />
        </Link>
    )
}