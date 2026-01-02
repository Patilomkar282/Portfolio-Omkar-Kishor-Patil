import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataManager from './components/DataManager';

export default function Dashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('projects');

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) navigate('/admin/login');
    }, [navigate]);

    const renderContent = () => {
        switch (activeTab) {
            case 'projects':
                return (
                    <DataManager
                        title="Project"
                        endpoint="/projects"
                        fields={[
                            { name: 'title', label: 'Title', required: true },
                            { name: 'description', label: 'Description', type: 'textarea', required: true },
                            { name: 'tags', label: 'Tags', type: 'array', placeholder: 'React, MongoDB, Tailwind' },
                            { name: 'codeLink', label: 'GitHub Link' },
                            { name: 'demoLink', label: 'Demo Link' },
                            { name: 'icons', label: 'Icons (Map Names)', type: 'array', placeholder: 'FaReact, FaNodeJs (Check iconMap.js)' },
                            { name: 'gradient', label: 'Gradient Class', placeholder: 'from-blue-500/10 to-cyan-500/10' }
                        ]}
                    />
                );
            case 'experience':
                return (
                    <DataManager
                        title="Experience"
                        endpoint="/experience"
                        fields={[
                            { name: 'title', label: 'Job Title', required: true },
                            { name: 'company', label: 'Company', required: true },
                            { name: 'period', label: 'Period', required: true },
                            { name: 'location', label: 'Location' },
                            { name: 'description', label: 'Description', type: 'textarea', required: true },
                            { name: 'skills', label: 'Skills Used', type: 'array' },
                            { name: 'icon', label: 'Icon Name', placeholder: 'Laptop, Database, Layout' },
                            { name: 'gradient', label: 'Gradient Class' },
                            { name: 'iconColor', label: 'Icon Color Class', placeholder: 'text-blue-600' }
                        ]}
                    />
                );
            case 'education':
                return (
                    <DataManager
                        title="Education"
                        endpoint="/education"
                        fields={[
                            { name: 'degree', label: 'Degree', required: true },
                            { name: 'institute', label: 'Institute', required: true },
                            { name: 'year', label: 'Year', required: true },
                            { name: 'score', label: 'Score' },
                            { name: 'location', label: 'Location' },
                            { name: 'description', label: 'Description', type: 'textarea' },
                            { name: 'icon', label: 'Icon Name' },
                            { name: 'gradient', label: 'Gradient Class' }
                        ]}
                    />
                );
            case 'skills':
                return (
                    <DataManager
                        title="Skill"
                        endpoint="/skills"
                        fields={[
                            { name: 'name', label: 'Skill Name', required: true },
                            { name: 'icon', label: 'Icon Name', required: true, placeholder: 'FaReact' },
                            { name: 'category', label: 'Category', placeholder: 'Frontend, Backend' },
                            { name: 'color', label: 'Brand Color (Hex)', placeholder: '#61DAFB' }
                        ]}
                    />
                );
            case 'achievements':
                return (
                    <DataManager
                        title="Achievement"
                        endpoint="/achievements"
                        fields={[
                            { name: 'title', label: 'Title', required: true },
                            { name: 'description', label: 'Description', type: 'textarea', required: true },
                            { name: 'organization', label: 'Organization' },
                            { name: 'category', label: 'Category', placeholder: 'Competition, Certification' },
                            { name: 'icon', label: 'Icon Name' },
                            { name: 'color', label: 'Color Theme', placeholder: 'primary, secondary' }
                        ]}
                    />
                );
            default:
                return <div>Select a tab</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0 fixed h-full z-10">
                <div className="p-6 text-2xl font-bold text-center border-b border-slate-800 tracking-tight">Admin<span className="text-blue-500">Panel</span></div>
                <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
                    {['projects', 'experience', 'education', 'skills', 'achievements'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`p-3 rounded-lg text-left capitalize transition-all font-medium flex items-center gap-3 ${activeTab === tab
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 translate-x-1'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
                <button
                    onClick={() => {
                        localStorage.removeItem('adminToken');
                        navigate('/admin/login');
                    }}
                    className="p-4 bg-red-600 hover:bg-red-700 m-4 rounded-xl font-bold shadow-lg shadow-red-900/20 transition-transform active:scale-95"
                >
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 min-h-screen bg-slate-50 text-slate-900">
                <header className="mb-8 flex justify-between items-center">
                    <h1 className="text-3xl font-black capitalize text-slate-800 tracking-tight">{activeTab} Management</h1>
                    <div className="text-sm text-slate-500">Manage your dynamic content</div>
                </header>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 min-h-[600px]">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}
