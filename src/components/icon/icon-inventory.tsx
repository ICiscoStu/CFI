import { FC } from 'react';

interface IconInventoryProps {
    className?: string;
    fill?: boolean;
    wd?: number;
    ht?: number;
}

const style = {
    enableBackground: "new 0 0 415.999 415.999",
}

const IconInventory: FC<IconInventoryProps> = ({ className, fill = false, wd = 24, ht = 24 }) => {
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        style={style as React.CSSProperties}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
      >
        <path
          d="M22.7 11.238a1.125 1.125 0 0 0-1.401-.755l-10.06 3.01a.376.376 0 0 0-.149.085l-1.222 1.149a.375.375 0 0 0 .192.643l1.652.288c.058.01.117.007.172-.01l8.163-2.442.035.772-2.594.776.215.719 2.875-.86a.375.375 0 0 0 .267-.377l-.058-1.251 1.157-.346a1.125 1.125 0 0 0 .755-1.4Zm-10.946 3.666-.826-.144.611-.574 1.712-.512.215.718-1.712.512Zm2.43-.727-.215-.718 6.007-1.798.035.773-5.827 1.743Zm7.768-2.438a.373.373 0 0 1-.223.18l-.977.293-.035-.772.797-.239a.375.375 0 0 1 .438.537Z"
        />
        <path
          d="M15 16.5H8.625v-5.625a.375.375 0 0 0-.375-.375H1.5a.375.375 0 0 0-.375.375v12a.375.375 0 0 0 .375.375H15a.375.375 0 0 0 .375-.375v-6A.375.375 0 0 0 15 16.5Zm-4.125.75h1.5v1.5h-1.5v-1.5Zm-6.75-6h1.5v1.5h-1.5v-1.5Zm-2.25 0h1.5v1.875a.375.375 0 0 0 .375.375H6a.375.375 0 0 0 .375-.375V11.25h1.5v5.25h-6v-5.25Zm2.25 6h1.5v1.5h-1.5v-1.5Zm-2.25 0h1.5v1.875a.375.375 0 0 0 .375.375H6a.375.375 0 0 0 .375-.375V17.25h1.5v5.25h-6v-5.25Zm12.75 5.25h-6v-5.25h1.5v1.875a.375.375 0 0 0 .375.375h2.25a.375.375 0 0 0 .375-.375V17.25h1.5v5.25Z"
        />
        <path
          d="M13.125 21h.75v.75h-.75V21ZM6.375 21h.75v.75h-.75V21ZM6.375 15h.75v.75h-.75V15ZM7.125 3.75a.75.75 0 0 1 .75-.75h2.25v.75H8.25a.375.375 0 0 0-.375.375V9.75h.75V4.5h9v6h.75V4.125A.375.375 0 0 0 18 3.75h-1.875V3h2.25a.751.751 0 0 1 .75.75v6.375h.75V3.75a1.501 1.501 0 0 0-1.5-1.5H14.73l.259-1.034a.374.374 0 0 0-.364-.466h-3a.375.375 0 0 0-.364.466l.259 1.034H7.875a1.502 1.502 0 0 0-1.5 1.5v6h.75v-6Zm3.75-.75H12a.375.375 0 0 0 .364-.466L12.105 1.5h2.04l-.259 1.034A.374.374 0 0 0 14.25 3h1.125v.75h-4.5V3ZM19.125 19.125a.75.75 0 0 1-.75.75h-2.25v.75h2.25a1.502 1.502 0 0 0 1.5-1.5V15.75h-.75v3.375Z"
        />
        <path
          d="M18.375 18.75v-2.625h-.75v2.25h-1.5v.75H18a.375.375 0 0 0 .375-.375ZM11.625 5.625a.375.375 0 0 0-.375-.375h-1.5a.375.375 0 0 0-.375.375v1.5a.375.375 0 0 0 .375.375h1.5a.375.375 0 0 0 .375-.375v-1.5Zm-.75 1.125h-.75V6h.75v.75ZM11.25 8.625h-1.5A.375.375 0 0 0 9.375 9v1.5a.375.375 0 0 0 .375.375h1.5a.375.375 0 0 0 .375-.375V9a.375.375 0 0 0-.375-.375Zm-.375 1.5h-.75v-.75h.75v.75ZM12.375 5.25h.75V6h-.75v-.75ZM12.375 6.75h4.5v.75h-4.5v-.75ZM13.875 5.25h3V6h-3v-.75ZM12.375 8.625h.75v.75h-.75v-.75ZM12.375 10.125h4.5v.75h-4.5v-.75ZM13.875 8.625h3v.75h-3v-.75Z"
        />
      </svg>
    );
}
export default IconInventory