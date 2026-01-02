import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 1,
        },
        hover: {
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            scale: 1.5,
            backgroundColor: "rgba(var(--primary), 0.2)",
            borderColor: "rgba(var(--primary), 0.8)",
        },
    };

    return (
        <>
            {/* Main Cursor Ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border-2 border-primary rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                variants={variants}
                animate={isHovering ? "hover" : "default"}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
            />
            {/* Center Dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                }}
                transition={{ type: "spring", stiffness: 1500, damping: 20 }}
            />
        </>
    );
};

export default CustomCursor;
