import { FC } from 'react';

interface IconSearchProps {
    className?: string;
    fill?: boolean;
}

const style = {
    enableBackground: "new 0 0 415.999 415.999",
}

const IconSearch: FC<IconSearchProps> = ({ className, fill = false }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit={2}
            clipRule="evenodd"
            viewBox="0 0 32 32"
            className={className}
            fill='currentColor'
        >
            <g fill="currentColor">
                <path d="M10 6.983h4a1 1 0 0 0 0-2h-4a1.001 1.001 0 0 0 0 2zM10 11.011h4a1 1 0 0 0 0-2h-4a1 1 0 0 0 0 2zM10 15h10.014a1 1 0 0 0 0-2H10a1 1 0 0 0 0 2zM10 19h4a1 1 0 0 0 0-2h-4a1 1 0 0 0 0 2zM27.17 28.094l2.123 2.123a1 1 0 0 0 1.414-1.415l-2.037-2.037A5.968 5.968 0 0 0 30 23c0-3.311-2.689-6-6-6s-6 2.689-6 6 2.689 6 6 6c1.164 0 2.25-.332 3.17-.906zM24 19c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4z" />
                <path d="M17 3v5a3 3 0 0 0 3 3h5v3.032a1 1 0 0 0 2 0V10c0-.26-.102-.51-.283-.697l-7.483-7.697A2.003 2.003 0 0 0 17.8 1H8.222a3.36 3.36 0 0 0-2.239.841A2.892 2.892 0 0 0 5 3.996v23.95c0 .807.348 1.585.983 2.155.593.533 1.394.892 2.233.892h10.006a1 1 0 0 0 0-2H8.216c-.339 0-.657-.164-.897-.38A.905.905 0 0 1 7 27.946V3.996c0-.252.121-.489.319-.667A1.35 1.35 0 0 1 8.222 3zm2 1.235V8a1 1 0 0 0 1 1h3.633z" />
            </g>
        </svg>
    );
}
export default IconSearch