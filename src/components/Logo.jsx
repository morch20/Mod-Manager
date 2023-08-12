import Image from "next/image";

const Logo = ({ size = 200, spin = false }) => {

    const border = (size < 100 ? 'border-2 ' : 'border-4 ');

    return (
        <Image
            src="/logo.png"
            width={size}
            height={size}
            alt="Logo"
            className={ border + " border-green-500 rounded-full " + (spin ? "animate-spin" : "")}
        />
    )
}

export default Logo;