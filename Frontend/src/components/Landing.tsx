import { CheckCircle2, Plus, Edit3, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DoNestLanding() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-5 py-2 bg-amber-100/80 backdrop-blur-sm rounded-full text-amber-900 text-sm mb-8 border border-amber-200/50 shadow-sm">
                            <Sparkles className="w-4 h-4" />
                            <span className="font-light">Real-Time Task Management</span>
                        </div>

                        <h1 className="text-6xl md:text-7xl font-serif text-amber-950 mb-6 leading-tight">
                            Organize Your Tasks,
                            <span className="block bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
                                Stay in Control
                            </span>
                        </h1>

                        <p className="text-xl text-amber-800/90 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
                            <strong>DoNest</strong> is a simple and powerful task management application that helps you
                            create, edit, delete, and complete tasks with real-time updates — so your work stays
                            organized and always up to date.
                        </p>

                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={() => navigate('/register')}
                                className="cursor-pointer px-8 py-4 bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 rounded-full hover:from-amber-800 hover:to-amber-900 transition-all hover:shadow-2xl hover:scale-105 text-lg">
                                Get Started with DoNest
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 rounded-3xl p-16 border border-amber-200/50 shadow-2xl">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-4xl font-serif text-amber-950 mb-6">
                                    Everything You Need to Manage Tasks
                                </h3>

                                <p className="text-lg text-amber-800 leading-relaxed mb-6 font-light">
                                    DoNest focuses on what matters most — keeping your tasks clear, updated, and easy to
                                    manage. Whether you’re planning your day or tracking ongoing work, DoNest helps you
                                    stay productive without complexity.
                                </p>

                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-amber-900">
                                        <CheckCircle2 className="w-5 h-5 text-amber-700" />
                                        <span className="font-light">
                                            Add, edit, delete, and complete tasks easily
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-3 text-amber-900">
                                        <CheckCircle2 className="w-5 h-5 text-amber-700" />
                                        <span className="font-light">
                                            Real-time updates across sessions and devices
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-3 text-amber-900">
                                        <CheckCircle2 className="w-5 h-5 text-amber-700" />
                                        <span className="font-light">
                                            Clean, responsive UI built for daily use
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            {/* Visual Mock */}
                            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-amber-200/50 shadow-xl">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                                        <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center">
                                            <Plus className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-amber-900">
                                                Create a new task instantly
                                            </p>
                                            <p className="text-xs text-amber-700">
                                                Add tasks with titles and details
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                                        <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-800 rounded-lg flex items-center justify-center">
                                            <Edit3 className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-amber-900">
                                                Edit tasks anytime
                                            </p>
                                            <p className="text-xs text-amber-700">
                                                Update task details in real time
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-amber-700 rounded-lg flex items-center justify-center">
                                            <CheckCircle2 className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-amber-900">
                                                Mark tasks as completed
                                            </p>
                                            <p className="text-xs text-amber-700">
                                                Keep track of finished work
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
