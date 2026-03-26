import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="no-print bg-indigo-700 text-white px-6 py-3 flex items-center gap-6">
        <Link to="/" className="text-lg font-bold hover:text-indigo-200">
          TEKS Math Tutor
        </Link>
        <nav className="flex gap-4 text-sm">
          <Link to="/" className="hover:text-indigo-200">Home</Link>
          <Link to="/history" className="hover:text-indigo-200">History</Link>
          <Link to="/weak-spots" className="hover:text-indigo-200">Weak Spots</Link>
        </nav>
        <span className="ml-auto text-indigo-300 text-sm">Grade 6</span>
      </header>
      <main className="flex-1 p-6 max-w-3xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  )
}
