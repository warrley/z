type Props = { 
    label: string;
    onClick?: () => void;
    size: 1 | 2 | 3
}

export const Button = ({ label, onClick, size }: Props) => {
    return (
        <div
            onClick={onClick}
            className={`bg-white text-black flex items-center justify-center cursor-pointer font-bold rounded-full
                ${size === 1 && 'p-3 text-lg'}
                ${size === 2 && 'p-2 text-md'}
                ${size === 3 && 'p-1 text-sm'}`}
        >
            {label}
        </div>
    )
}