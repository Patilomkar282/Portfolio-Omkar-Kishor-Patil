import {
    FaReact, FaNodeJs, FaAws, FaDocker, FaPython, FaJava, FaRaspberryPi, FaPhp, FaHtml5, FaCss3, FaJs
} from "react-icons/fa";
import {
    SiMongodb, SiRedux, SiMysql, SiTailwindcss, SiRazorpay, SiYoutube, SiFramer, SiChartdotjs, SiJsonwebtokens, SiExpress
} from "react-icons/si";
import {
    Laptop, Database, Layout, GraduationCap, BookOpen, Award, School as SchoolIcon, Briefcase, Calendar, MapPin
} from "lucide-react";

export const iconMap = {
    // React Icons
    FaReact, FaNodeJs, FaAws, FaDocker, FaPython, FaJava, FaRaspberryPi, FaPhp, FaHtml5, FaCss3, FaJs,
    SiMongodb, SiRedux, SiMysql, SiTailwindcss, SiRazorpay, SiYoutube, SiFramer, SiChartdotjs, SiJsonwebtokens, SiExpress,

    // Lucide Icons
    Laptop, Database, Layout, GraduationCap, BookOpen, Award, SchoolIcon, Briefcase, Calendar, MapPin
};

export const getIcon = (iconName) => {
    return iconMap[iconName] || null;
};
