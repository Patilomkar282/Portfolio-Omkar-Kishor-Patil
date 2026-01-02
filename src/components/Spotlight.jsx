import React, { useState, useEffect } from 'react';

export default function Spotlight() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 mix-blend-multiply"
            style={{
                background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(var(--primary), 0.05), transparent 40%)`
            }}
        />
    );
}
