import { useState, useEffect } from 'react';
import axios from 'axios';
import { LogOut, Plus, Trash2, CheckCircle, Circle, Filter } from 'lucide-react';

const API_URL = 'http://localhost:5000/api/tasks';

export default function TaskBoard({ setToken }) {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('All');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(API_URL);
            setTasks(response.data);
        } catch (error) {
            if (error.response?.status === 401) setToken(null);
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        try {
            const response = await axios.post(API_URL, { title, description });
            setTasks([response.data, ...tasks]);
            setTitle('');
            setDescription('');
        } catch (error) { }
    };

    const toggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending';
        try {
            const response = await axios.put(`${API_URL}/${id}`, { status: newStatus });
            setTasks(tasks.map(t => t._id === id ? response.data : t));
        } catch (error) { }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setTasks(tasks.filter(t => t._id !== id));
        } catch (error) { }
    };

    const filteredTasks = tasks.filter(t => filter === 'All' || t.status === filter);

    if (loading) return <div className="flex justify-center mt-20">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
            <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Task Portal</h1>
                <button onClick={() => setToken(null)} className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">
                    <LogOut size={18} /> <span className="hidden sm:inline">Logout</span>
                </button>
            </header>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Plus size={20} className="text-blue-600" /> Create Task</h2>
                <form onSubmit={addTask} className="space-y-4">
                    <input type="text" placeholder="Title (Required)" required value={title} onChange={e => setTitle(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                    <textarea placeholder="Description (Optional)" value={description} onChange={e => setDescription(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" rows="2" />
                    <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 shadow-md shadow-blue-200 transition-all font-medium">Add Task</button>
                </form>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2"><Filter size={20} className="text-indigo-600" /> Tasks</h2>
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        {['All', 'Pending', 'Completed'].map(f => (
                            <button key={f} onClick={() => setFilter(f)}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${filter === f ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {filteredTasks.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">No tasks found</div>
                ) : (
                    <div className="space-y-3">
                        {filteredTasks.map(task => (
                            <div key={task._id} className={`group flex items-center gap-4 p-4 border rounded-xl transition-all ${task.status === 'Completed' ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-200 hover:border-blue-300'}`}>
                                <button onClick={() => toggleStatus(task._id, task.status)} className={`transition-colors ${task.status === 'Completed' ? 'text-green-500' : 'text-gray-300 hover:text-blue-500'}`}>
                                    {task.status === 'Completed' ? <CheckCircle size={24} /> : <Circle size={24} />}
                                </button>
                                <div className="flex-1 min-w-0">
                                    <h3 className={`font-medium truncate ${task.status === 'Completed' ? 'line-through text-gray-400' : 'text-gray-900'}`}>{task.title}</h3>
                                    {task.description && <p className="text-sm text-gray-500 line-clamp-1">{task.description}</p>}
                                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">{new Date(task.createdAt).toLocaleDateString()}</p>
                                </div>
                                <button onClick={() => deleteTask(task._id)} className="text-gray-300 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
