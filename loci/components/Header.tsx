'use client';
import Link from "next/link";
import 'animate.css';

export function Header(){

    return (
        <span className = "sticky flex items-center w-full gap-10 mix-blend-difference">
            <Link href="/" className="animate__animated animate__slideInDown text-10xl duration-300">
                Home
            </Link>
            <Link href="/login" className="animate__animated animate__slideInDown text-10xl duration-300">
                Log In 
            </Link>
        </span>
    )
}