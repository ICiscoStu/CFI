import { FC } from 'react';

interface IconPotentialJobsProps {
    className?: string;
    fill?: boolean;
}

const style = {
    enableBackground: "new 0 0 415.999 415.999"
}

const IconPotentialJobs: FC<IconPotentialJobsProps> = ({ className, fill = false }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12.7 12.7"
            xmlSpace="preserve"
            style={style as React.CSSProperties}
            className={className}
            fill='currentColor'
        >
            <g>
                <path
                    d="M130.5-177a2.517 2.517 0 00-2.5 2.5v33c0 1.368 1.132 2.5 2.5 2.5h3.5a1 1 0 000-2h-3.5a.478.478 0 01-.5-.5v-33c0-.294.206-.5.5-.5H151v5.5c0 1.368 1.132 2.5 2.5 2.5h4.5v25.5c0 .294-.206.5-.5.5H154a1 1 0 000 2h3.5c1.368 0 2.5-1.132 2.5-2.5v-26.803a1 1 0 00-.268-.681c-2.829-3.044-4.827-5.175-7.195-7.7a1 1 0 00-.728-.316zm22.5 3.74c1.399 1.495 2.714 2.903 3.98 4.26h-3.48a.478.478 0 01-.5-.5z"
                    transform="matrix(.265 0 0 .265 -31.75 47.625)"
                    vectorEffect="none"
                ></path>
                <path
                    d="M6.35 7.674a2.12 2.12 0 00-2.118 2.115c0 1.166.952 2.117 2.118 2.117A2.122 2.122 0 008.467 9.79 2.12 2.12 0 006.35 7.674zm0 .527c.88 0 1.588.708 1.588 1.588 0 .88-.709 1.588-1.588 1.588-.88 0-1.588-.708-1.588-1.588 0-.88.708-1.588 1.588-1.588z"
                    vectorEffect="none"
                ></path>
                <path
                    d="M143.305-147.105l-2.643 2.546a1 1 0 00-.021 1.416 1 1 0 001.416.024l.945-.912v4.418a1 1 0 102 0v-4.416l.945.91a1 1 0 001.389-1.44l-2.643-2.546c-.44-.397-.997-.36-1.388 0z"
                    transform="matrix(.265 0 0 .265 -31.75 47.625)"
                    vectorEffect="none"
                ></path>
                <path
                    d="M4.219 3.705a.265.265 0 00-.264.264.265.265 0 00.264.263h2.926a.265.265 0 00.263-.263.265.265 0 00-.263-.264z"
                    vectorEffect="none"
                ></path>
                <path
                    d="M4.219 5.027a.265.265 0 00-.264.264.265.265 0 00.264.266H8.48a.265.265 0 00.266-.266.265.265 0 00-.266-.264z"
                    vectorEffect="none"
                ></path>
                <path
                    d="M4.219 6.35a.265.265 0 00-.264.265.265.265 0 00.264.264h2.926a.265.265 0 00.263-.264.265.265 0 00-.263-.265z"
                    vectorEffect="none"
                ></path>
            </g>
        </svg>
    )
}
export default IconPotentialJobs