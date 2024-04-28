import { FC } from 'react';

interface IconCancelProps {
    className?: string;
    fill?: boolean;
}

const style = {
    enableBackground: "new 0 0 415.999 415.999",
    color: "#7a2525"
}

const IconCancel: FC<IconCancelProps> = ({ className, fill = false }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 2"
            viewBox="0 0 32 32"
            xmlSpace="preserve"
            style={style as React.CSSProperties}
            className={className}
            fill='currentColor'
        >
            <path d="M16 1a15 15 0 1015 15A15.005 15.005 0 0016 1zm8.72 19.39a.972.972 0 010 1.36l-2.97 2.97a.966.966 0 01-1.36 0L16 20.33l-4.39 4.39a.972.972 0 01-1.36 0l-2.97-2.97a.972.972 0 010-1.36L11.67 16l-4.39-4.39a.972.972 0 010-1.36l2.97-2.97a.972.972 0 011.36 0L16 11.67l4.39-4.39a.972.972 0 011.36 0l2.97 2.97a.972.972 0 010 1.36L20.33 16z"></path>
        </svg>
    )
}
export default IconCancel