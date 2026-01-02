import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Trash2, Edit, Plus, X, Save } from 'lucide-react';

export default function DataManager({ title, endpoint, fields }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        fetchItems();
    }, [endpoint]);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const res = await api.get(endpoint);
            setItems(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            await api.delete(`${endpoint}/${id}`);
            setItems(items.filter(item => item._id !== id));
        } catch (err) {
            console.error(err);
            alert('Failed to delete');
        }
    };

    const handleEdit = (item) => {
        let newFormData = {};
        fields.forEach(field => {
            if (field.type === 'array') {
                newFormData[field.name] = item[field.name] ? item[field.name].join(', ') : '';
            } else {
                newFormData[field.name] = item[field.name] || '';
            }
        });
        setFormData(newFormData);
        setCurrentId(item._id);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        let newFormData = {};
        fields.forEach(field => {
            newFormData[field.name] = ''; // Default empty
        });
        setFormData(newFormData);
        setCurrentId(null);
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Process form data (handle arrays)
        const payload = {};
        fields.forEach(field => {
            if (field.type === 'array') {
                payload[field.name] = formData[field.name].split(',').map(s => s.trim()).filter(s => s);
            } else {
                payload[field.name] = formData[field.name];
            }
        });

        try {
            if (isEditing) {
                const res = await api.put(`${endpoint}/${currentId}`, payload);
                setItems(items.map(item => item._id === currentId ? res.data : item));
            } else {
                const res = await api.post(endpoint, payload);
                setItems([res.data, ...items]);
            }
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
            alert('Failed to save');
        }
    };

    const handleChange = (e, fieldName) => {
        setFormData({ ...formData, [fieldName]: e.target.value });
    };

    // Helper to render cell content safely
    const renderCell = (item, field) => {
        const val = item[field.name];
        if (Array.isArray(val)) return val.length + ' items';
        if (typeof val === 'object') return JSON.stringify(val);
        if (!val) return '-';
        return String(val).substring(0, 30) + (String(val).length > 30 ? '...' : '');
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-700">{title} List</h2>
                <button
                    onClick={handleAdd}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
                >
                    <Plus size={18} /> Add New
                </button>
            </div>

            {loading ? (
                <div className="text-center py-10 text-gray-500">Loading data...</div>
            ) : (
                <div className="overflow-x-auto bg-white rounded shadow">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 border-b border-gray-200">
                                {fields.slice(0, 4).map(field => ( // Only show first 4 columns
                                    <th key={field.name} className="p-4 font-semibold text-gray-600">{field.label}</th>
                                ))}
                                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50">
                                    {fields.slice(0, 4).map(field => (
                                        <td key={field.name} className="p-4 text-gray-700">
                                            {renderCell(item, field)}
                                        </td>
                                    ))}
                                    <td className="p-4 text-right">
                                        <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800 mr-3">
                                            <Edit size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-800">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {items.length === 0 && (
                                <tr>
                                    <td colSpan={fields.length + 1} className="p-8 text-center text-gray-400">
                                        No items found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-800">{isEditing ? 'Edit' : 'Add'} {title}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {fields.map(field => (
                                <div key={field.name}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                                    {field.type === 'textarea' ? (
                                        <textarea
                                            required={field.required}
                                            value={formData[field.name]}
                                            onChange={(e) => handleChange(e, field.name)}
                                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
                                            placeholder={field.placeholder}
                                        />
                                    ) : field.type === 'array' ? (
                                        <div className="space-y-1">
                                            <input
                                                type="text"
                                                required={field.required}
                                                value={formData[field.name]}
                                                onChange={(e) => handleChange(e, field.name)}
                                                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder={field.placeholder || "Comma separated values..."}
                                            />
                                            <p className="text-xs text-gray-500">Separate values with commas (e.g. React, Node.js)</p>
                                        </div>
                                    ) : (
                                        <input
                                            type={field.type || 'text'}
                                            required={field.required}
                                            value={formData[field.name]}
                                            onChange={(e) => handleChange(e, field.name)}
                                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder={field.placeholder}
                                        />
                                    )}
                                </div>
                            ))}

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-2"
                                >
                                    <Save size={18} /> Save Item
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
