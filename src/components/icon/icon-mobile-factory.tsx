import { FC } from 'react';

interface IconMobileFactoryProps {
    className?: string;
    fill?: boolean;
}

const style = {
    enableBackground: "new 0 0 415.999 415.999",
}

const IconMobileFactory: FC<IconMobileFactoryProps> = ({ className, fill = false }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            style={style as React.CSSProperties}
            className={className}
            viewBox="0 0 60 60"
            fill='currentColor'
        >
            <path d="M58.184 31.562l-5.441-2.332L46.8 16.594A8.034 8.034 0 0039.558 12H6a5.006 5.006 0 00-5 5v22.278A1.993 1.993 0 000 41v2a2 2 0 002 2h7.424a4.99 4.99 0 009.152 0h27.848a4.99 4.99 0 009.152 0H57a3 3 0 003-3v-7.68a3.013 3.013 0 00-1.816-2.758zM50.424 29H44a2 2 0 01-2-2v-4a1 1 0 011-1h4.13zM5 43H2v-2h3zm9 3a3 3 0 113-3 3 3 0 01-3 3zm32-3H19a5 5 0 00-10 0H7v-2a2 2 0 00-2-2H3V17a3 3 0 013-3h33.558a6.023 6.023 0 015.428 3.445L46.189 20H43a3 3 0 00-3 3v4a4 4 0 004 4h7.8l5.593 2.4a1.014 1.014 0 01.607.92V39h-4.031A4.952 4.952 0 0051 38a5.006 5.006 0 00-5 5zm5 3a3 3 0 113-3 3 3 0 01-3 3zm6-3h-1a4.95 4.95 0 00-.424-2H58v1a1 1 0 01-1 1z"></path>
            <path d="M43 39H22a1 1 0 000 2h21a1 1 0 000-2z"></path>
        </svg>
    )
}
export default IconMobileFactory