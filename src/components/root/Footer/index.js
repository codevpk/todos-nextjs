const Footer = () => {
    return (
        <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-center px-4 py-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">
                &copy; {new Date().getFullYear()} Todos App by <a href="https://codevpk.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">CoDev</a>. All Rights Reserved.
            </p>
        </footer>
    )
}

export default Footer