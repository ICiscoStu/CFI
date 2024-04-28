import { FC } from 'react';

interface IconWarehouseProps {
    className?: string;
    fill?: boolean;
}

const style = {
    enableBackground: "new 0 0 415.999 415.999",
}

const IconWarehouse: FC<IconWarehouseProps> = ({ className, fill = false }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            y="0"
            enableBackground="new 0 0 512 512"
            version="1.1"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            style={style as React.CSSProperties}
            className={className}
            fill='currentColor'
        >
            <path d="M507.785 146.242L260.318 1.175a8.53 8.53 0 00-8.439-.111L4.412 137.598A8.516 8.516 0 000 145.064v358.4a8.53 8.53 0 008.533 8.533H51.2a8.53 8.53 0 008.533-8.533V204.798h392.533v298.667a8.525 8.525 0 008.533 8.533h42.667a8.525 8.525 0 008.533-8.533V153.598a8.515 8.515 0 00-4.214-7.356zm-12.852 348.689h-25.6V196.264a8.53 8.53 0 00-8.533-8.533H51.2a8.536 8.536 0 00-8.533 8.533v298.667h-25.6V150.099L255.872 18.344l239.061 140.143v336.444z"></path>
            <path d="M426.667 392.531h-102.4a8.525 8.525 0 00-8.533 8.533v102.4a8.525 8.525 0 008.533 8.533h102.4a8.525 8.525 0 008.533-8.533v-102.4a8.525 8.525 0 00-8.533-8.533zm-8.534 102.4H332.8v-85.333h85.333v85.333z"></path>
            <path d="M384 401.064v25.6h-17.067v-25.6h-17.067v34.133a8.525 8.525 0 008.533 8.533h34.133a8.525 8.525 0 008.533-8.533v-34.133H384zM324.267 392.531h-102.4a8.53 8.53 0 00-8.533 8.533v102.4a8.53 8.53 0 008.533 8.533h102.4a8.525 8.525 0 008.533-8.533v-102.4a8.525 8.525 0 00-8.533-8.533zm-8.534 102.4H230.4v-85.333h85.333v85.333z"></path>
            <path d="M281.6 401.064v25.6h-17.067v-25.6h-17.067v34.133a8.53 8.53 0 008.533 8.533h34.133a8.525 8.525 0 008.533-8.533v-34.133H281.6zM426.667 290.131h-102.4a8.525 8.525 0 00-8.533 8.533v102.4a8.525 8.525 0 008.533 8.533h102.4a8.525 8.525 0 008.533-8.533v-102.4a8.525 8.525 0 00-8.533-8.533zm-8.534 102.4H332.8v-85.333h85.333v85.333z"></path>
            <path d="M384 298.664v25.6h-17.067v-25.6h-17.067v34.133a8.525 8.525 0 008.533 8.533h34.133a8.525 8.525 0 008.533-8.533v-34.133H384z"></path>
            <path d="M51.2 255.998H460.8V273.065H51.2z"></path>
            <path d="M51.2 221.864H460.8V238.931H51.2z"></path>
            <path d="M298.667 119.464h-85.333a8.536 8.536 0 00-8.533 8.533v34.133a8.536 8.536 0 008.533 8.533h85.333a8.53 8.53 0 008.533-8.533v-34.133a8.53 8.53 0 00-8.533-8.533zm-8.534 34.134h-68.267v-17.067h68.267v17.067z"></path>
        </svg>
    )
}
export default IconWarehouse