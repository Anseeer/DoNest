import { useEffect, useState } from 'react';
import { Edit3, Trash2, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { addTask, deleteTaskApi, toggleTaskApi, updateTaskApi } from '../services/userService';
import { socket } from '../utilities/Socket';
import { useSelector } from 'react-redux';
import type { RootState } from '../Store';
import toast from 'react-hot-toast';
import type { ITask } from '../types/ITask';

export default function DoNestHome() {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const userId = useSelector((state: RootState) => state.user.user?._id)
    const [newTask, setNewTask] = useState({ title: '', description: '' });
    const [editingTask, setEditingTask] = useState<ITask | null>(null);
    const [isAddTask, setAddTask] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5;

    useEffect(() => {
        if (!userId) return;

        socket.auth = { userId };
        socket.connect();

        const handleTaskList = (tasks: ITask[]) => {
            setTasks(tasks);
        };

        const handleTaskAdded = (newTask: ITask) => {
            setTasks((prev) => [...prev, newTask]);
        };

        const handleTaskDeleted = (taskId: string) => {
            setTasks((prev) => prev.filter(t => t._id.toString() !== taskId.toString()));
        };

        const handleTaskUpdated = (updatedTask: ITask) => {
            setTasks((prev) => prev.map(t => t._id === updatedTask._id ? updatedTask : t));
        };

        const handleTaskToggle = (toggleTask: ITask) => {
            setTasks((prev) => prev.map(t => t._id === toggleTask._id ? toggleTask : t));
        };

        socket.on('task:list', handleTaskList);
        socket.on('task:added', handleTaskAdded);
        socket.on('task:deleted', handleTaskDeleted);
        socket.on('task:updated', handleTaskUpdated);
        socket.on('task:toggled', handleTaskToggle);

        return () => {
            socket.off('task:list', handleTaskList);
            socket.off('task:added', handleTaskAdded);
            socket.off('task:updated', handleTaskUpdated);
            socket.off('task:toggled', handleTaskToggle);
            socket.off('task:deleted', handleTaskDeleted);
            socket.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateTask = async (task: ITask) => {
        try {
            if (!task) return;
            console.log('Updating on Server:', task);
            await updateTaskApi(task);
            setEditingTask(null);
            toast.success("Task updated successfully");
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            console.error(errMsg);
            toast.error(errMsg);
        }
    }

    const deleteTask = async (id: string) => {
        try {
            if (!id) return;
            await deleteTaskApi(id);
            toast.success("Task deleted successfully");
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            console.error(errMsg);
            toast.error(errMsg);
        }
    };

    const toggleComplete = async (id: string) => {
        try {
            if (!id) return;
            await toggleTaskApi(id, userId as string);
            toast.success("Task toggle successfully");
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            console.error(errMsg);
            toast.error(errMsg);
        }
    };

    const handleAdd = async () => {
        try {
            await addTask(newTask.title, newTask.description, userId as string);
            setNewTask({ title: '', description: "" })
            setAddTask(false);
            toast.success("Task added successfull")
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            console.log(errMsg);
            toast.error(errMsg)
        }
    }
    const completedCount = tasks.filter(t => t.completed).length;
    const pendingCount = tasks.filter(t => !t.completed).length;
    const completionPercentage = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
    const totalPages = Math.ceil(tasks.length / tasksPerPage);

    const isTitleEmpty = !newTask.title.trim();

    return (
        <div className="min-h-screen pt-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left Column - Add Task & Task List */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* CLICK TO OPEN */}
                        {!isAddTask && (
                            <div
                                onClick={() => setAddTask(true)}
                                className="cursor-pointer bg-white/80 backdrop-blur-sm rounded-xl 
                                 border border-amber-200/50 shadow-xl px-3 py-2 sm:p-4 
                                 hover:shadow-2xl transition-all"
                            >
                                <h2 className="text-xl sm:text-2xl font-serif font-semibold text-amber-800">
                                    + Add New Task
                                </h2>
                            </div>
                        )}

                        {/* ADD TASK FORM */}
                        <div
                            className={`overflow-hidden transition-all duration-300 ease-out
                                 ${isAddTask ? "max-h-[500px] opacity-100 translate-y-0 mt-4"
                                    : "max-h-0 opacity-0 -translate-y-4"}
                               `}
                        >
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl 
                                border border-amber-200/50 shadow-xl px-3 py-2 sm:p-4">

                                <h2 className="text-xl sm:text-2xl font-serif text-amber-800 mb-4">
                                    Add New Task
                                </h2>

                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-amber-900 mb-1 text-sm">
                                            Task Title
                                        </label>
                                        <input
                                            type="text"
                                            value={newTask.title}
                                            onChange={(e) =>
                                                setNewTask({ ...newTask, title: e.target.value })
                                            }
                                            placeholder="Enter your task title"
                                            className="w-full px-3 py-2 bg-white border-b border-amber-200
                                       focus:outline-none focus:border-amber-600 text-amber-900"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-amber-900 mb-1 text-sm">
                                            Description
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={newTask.description}
                                            onChange={(e) =>
                                                setNewTask({ ...newTask, description: e.target.value })
                                            }
                                            placeholder="Add task description"
                                            className="w-full px-3 py-2 bg-white border-b border-amber-200
                                                        focus:outline-none focus:border-amber-600 resize-none text-amber-900"
                                        />
                                    </div>

                                    <div className="flex justify-end gap-3 pt-2">
                                        <button
                                            onClick={() => {
                                                setAddTask(false);
                                                setNewTask({ title: "", description: "" });
                                            }}
                                            className="px-4 py-1 bg-amber-100 text-amber-900 
                                                        rounded-lg hover:bg-amber-200 transition"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            disabled={isTitleEmpty}
                                            onClick={handleAdd}
                                            className={`px-4 py-1 rounded-lg transition shadow-md ${isTitleEmpty
                                                ? "bg-amber-700 opacity-50 text-amber-300 cursor-not-allowed"
                                                : "bg-gradient-to-r from-amber-700 to-amber-800 text-white"
                                                } hover:from-amber-800 hover:to-amber-900`}                                         >
                                            Add Task
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tasks Upcoming Section */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-amber-200/50 shadow-xl p-4 sm:p-6">
                            <div className="mb-4">
                                <h2 className="text-2xl sm:text-3xl font-serif text-amber-950 mb-2">Tasks Upcoming</h2>
                                <div className="h-1 w-32 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full"></div>
                            </div>

                            {tasks.length === 0 ? (
                                <div className="text-center py-12">
                                    <h3 className="text-xl font-serif text-amber-900 mb-2">No tasks yet</h3>
                                    <p className="text-amber-700 font-light">Add your first task to get started</p>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-4">
                                        {currentTasks.map((task) => (
                                            <div
                                                key={task._id}
                                                className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200 hover:shadow-lg transition-all"
                                            >
                                                {editingTask?._id === task._id ? (
                                                    <div className="space-y-3">
                                                        <input
                                                            type="text"
                                                            value={editingTask?.title}
                                                            onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                                                            className="w-full px-3 py-2 bg-white border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900"
                                                        />
                                                        <textarea
                                                            value={editingTask?.description}
                                                            onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                                                            rows={2}
                                                            className="w-full px-3 py-2 bg-white border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900 resize-none"
                                                        />
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => setEditingTask(null)}
                                                                className="flex-1 px-4 py-2 bg-amber-100 text-amber-900 rounded-lg hover:bg-amber-200 transition-all text-sm"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                onClick={() => updateTask(editingTask)}
                                                                className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-700 to-amber-800 text-white rounded-lg hover:from-amber-800 hover:to-amber-900 transition-all text-sm"
                                                            >
                                                                Save
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-start gap-4">
                                                        <button
                                                            onClick={() => toggleComplete(task._id.toString())}
                                                            className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all mt-1 ${task.completed
                                                                ? 'bg-green-600 border-green-600'
                                                                : 'border-amber-400 hover:border-amber-600'
                                                                }`}
                                                        >
                                                            {task.completed && <Check className="w-4 h-4 text-white" />}
                                                        </button>

                                                        <div className="flex-1 min-w-0">
                                                            <h3 className={`text-lg font-serif mb-1 ${task.completed ? 'line-through text-amber-600' : 'text-amber-950'
                                                                }`}>
                                                                {task?.title}
                                                            </h3>
                                                            {task.description && (
                                                                <p className={`text-sm font-light ${task.completed ? 'text-amber-500' : 'text-amber-700'
                                                                    }`}>
                                                                    {task?.description}
                                                                </p>
                                                            )}
                                                        </div>

                                                        <div className="flex items-center gap-2 flex-shrink-0">
                                                            <button
                                                                onClick={() => setEditingTask(task)}
                                                                className="w-9 h-9 bg-white rounded-lg border border-amber-200 hover:border-amber-400 transition-all flex items-center justify-center hover:shadow-md"
                                                            >
                                                                <Edit3 className="w-4 h-4 text-amber-700" />
                                                            </button>
                                                            <button
                                                                onClick={() => deleteTask(task._id.toString())}
                                                                className="w-9 h-9 bg-white rounded-lg border border-red-200 hover:border-red-400 transition-all flex items-center justify-center hover:shadow-md"
                                                            >
                                                                <Trash2 className="w-4 h-4 text-red-600" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <div className="flex items-center justify-center gap-2 mt-6">
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                disabled={currentPage === 1}
                                                className="w-9 h-9 bg-white rounded-lg border border-amber-200 hover:border-amber-400 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <ChevronLeft className="w-5 h-5 text-amber-700" />
                                            </button>

                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`w-9 h-9 rounded-lg transition-all ${currentPage === page
                                                        ? 'bg-gradient-to-r from-amber-700 to-amber-800 text-white'
                                                        : 'bg-white border border-amber-200 hover:border-amber-400 text-amber-900'
                                                        }`}
                                                >
                                                    {page}
                                                </button>
                                            ))}

                                            <button
                                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                disabled={currentPage === totalPages}
                                                className="w-9 h-9 bg-white rounded-lg border border-amber-200 hover:border-amber-400 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <ChevronRight className="w-5 h-5 text-amber-700" />
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Data Visualization */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-amber-200/50 shadow-xl p-6 sm:p-8 sticky top-24">
                            <h2 className="text-2xl font-serif text-amber-950 mb-6">Progress Overview</h2>

                            {/* Circular Progress */}
                            <div className="flex flex-col items-center mb-8">
                                <div className="relative w-40 h-40">
                                    <svg className="transform -rotate-90 w-40 h-40">
                                        <circle
                                            cx="80"
                                            cy="80"
                                            r="70"
                                            stroke="currentColor"
                                            strokeWidth="12"
                                            fill="transparent"
                                            className="text-amber-100"
                                        />
                                        <circle
                                            cx="80"
                                            cy="80"
                                            r="70"
                                            stroke="currentColor"
                                            strokeWidth="12"
                                            fill="transparent"
                                            strokeDasharray={440}
                                            strokeDashoffset={440 - (440 * completionPercentage) / 100}
                                            className="text-amber-700 transition-all duration-1000"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-4xl font-serif text-amber-900">{completionPercentage}%</div>
                                            <div className="text-xs text-amber-700 font-light">Complete</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="space-y-4">
                                <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-4 border border-amber-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-amber-900 font-light">Total Tasks</span>
                                        <span className="text-2xl font-serif text-amber-900">{tasks.length}</span>
                                    </div>
                                    <div className="h-2 bg-amber-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-amber-600 to-orange-600 rounded-full" style={{ width: '100%' }}></div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl p-4 border border-orange-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-orange-900 font-light">Pending</span>
                                        <span className="text-2xl font-serif text-orange-900">{pendingCount}</span>
                                    </div>
                                    <div className="h-2 bg-orange-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-orange-600 to-yellow-600 rounded-full transition-all"
                                            style={{ width: tasks.length > 0 ? `${(pendingCount / tasks.length) * 100}%` : '0%' }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-4 border border-green-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-green-900 font-light">Completed</span>
                                        <span className="text-2xl font-serif text-green-900">{completedCount}</span>
                                    </div>
                                    <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-green-600 to-emerald-600 rounded-full transition-all"
                                            style={{ width: `${completionPercentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Productivity Insight */}
                            <div className="mt-6 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
                                <p className="text-sm text-amber-900 font-light text-center">
                                    {completionPercentage >= 70
                                        ? "🎉 Excellent progress! Keep it up!"
                                        : completionPercentage >= 40
                                            ? "💪 You're doing great! Keep going!"
                                            : "🚀 Let's get those tasks done!"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}