import { ClipboardCheck } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="py-12 px-6 bg-gradient-to-b from-amber-900 to-amber-950 text-amber-300">
            <div className="max-w-7xl mx-auto text-center space-y-4">

                {/* Logo */}
                <div className="flex items-center justify-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center shadow-md">
                        <ClipboardCheck className="w-4 h-4 text-amber-50" />
                    </div>
                    <span className="text-xl font-serif text-amber-50">
                        DoNest
                    </span>
                </div>

                {/* Tagline */}
                <p className="text-sm font-light text-amber-200">
                    Organize tasks. Stay focused. Get things done — together.
                </p>

                {/* Copyright */}
                <p className="text-xs text-amber-400">
                    © {new Date().getFullYear()} DoNest. All rights reserved.
                </p>

                {/* Developer Credit */}
                <p className="text-xs text-amber-500">
                    Developed by <span className="text-amber-300 font-medium">Ahmed Anseer</span>
                </p>
            </div>
        </footer>
    );
};
