export default function Footer() {
    return (
        <footer className="w-full bg-gray-900 text-white py-6 mt-12">
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <p>© {new Date().getFullYear()} Klashara Consultancy. All rights reserved.</p>
                <div className="space-x-4">
                    <a href="#">LinkedIn</a>
                    <a href="#">Twitter</a>
                    <a href="#">Instagram</a>
                </div>
            </div>
        </footer>
    );
}
