import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="no-print bg-neon px-6 py-3 flex items-center gap-6">
        <Link to="/" className="text-lg font-black tracking-tight text-void hover:text-void/70 transition-colors">
          <span className="text-lava">MAX</span><span className="text-void">MATH</span><span className="text-purple-600">.</span>
        </Link>
        <nav className="flex gap-4 text-sm font-bold">
          <Link to="/" className="text-void/70 hover:text-void transition-colors">Home</Link>
          <Link to="/history" className="text-void/70 hover:text-void transition-colors">History</Link>
          <Link to="/weak-spots" className="text-void/70 hover:text-lava transition-colors">Weak Spots</Link>
        </nav>
        <span className="ml-auto text-void/50 text-xs font-bold">Grade 6 TEKS</span>
      </header>
      <main className="flex-1 p-6 max-w-3xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  )
}
