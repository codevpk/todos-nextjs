"use client";

export default function Loader() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-1000">
            <div className="loader animate-spin border-4 border-t-4 border-gray-200 rounded-full w-16 h-16"></div>
        </div>
    );
}
