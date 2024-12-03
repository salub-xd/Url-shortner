import Image from 'next/image';

export default function Header() {
    return (
        <header>
            <Image src="/images/logo.png" alt="Logo" width={100} height={50} />
        </header>
    );
}