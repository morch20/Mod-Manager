'use client';
import { usePathname } from 'next/navigation';

const CustomLink = ({ children, path, onClick = (() => {}), className = "" }) => {

    const pathname = usePathname();

    return (
        <li
            onClick={onClick}
            className={ className + " nav__links__animation " + (path === pathname ? "nav__links__selected" : "")}
        >
            {children}
        </li>
    )
}

export default CustomLink;