import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-8 h-16 flex items-center justify-between">
        
        {/* Logo / Título a la izquierda */}
        <Link 
          href="/" 
          className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-80 transition-opacity"
        >
          Pokédex FS
        </Link>

        {/* Enlaces a la derecha */}
        <div className="flex gap-6 font-semibold text-gray-600">
          <Link 
            href="/" 
            className="hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/types" 
            className="hover:text-blue-600 transition-colors"
          >
            Types
          </Link>
        </div>

      </div>
    </nav>
  );
}