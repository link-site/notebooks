import { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Star, ExternalLink, Search, Menu, X, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home({ products }: { products: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredProducts = products.filter(product => {
    return product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           product.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-6 w-6 text-orange-500" />
              <span className="font-bold text-xl tracking-tight">Ofertas <span className="text-orange-500">do dia</span></span>
            </div>
            
            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-colors"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="hidden md:flex items-center">
              <Link to="/admin" className="text-gray-500 hover:text-gray-900 flex items-center gap-1 text-sm font-medium">
                <Settings className="h-4 w-4" /> Admin
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-4">
              <Link to="/admin" className="text-gray-500 hover:text-gray-900">
                <Settings className="h-5 w-5" />
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 pt-2 pb-4 space-y-1">
              <div className="relative w-full mb-4 mt-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col group"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  {product.badge && (
                    <div className="absolute top-3 left-3 z-10 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wide">
                      {product.badge}
                    </div>
                  )}
                  <img
                    src={product.image}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">{product.category}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
                    {product.title}
                  </h3>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">{product.rating} ({product.reviews.toLocaleString()})</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
                    {product.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-2xl font-black text-gray-900">
                      R$ {Number(product.price).toFixed(2).replace('.', ',')}
                    </div>
                    <a
                      href={product.amazonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors shadow-sm"
                    >
                      Comprar Agora
                      <ExternalLink className="ml-2 -mr-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Nenhum produto encontrado</h3>
            <p className="mt-1 text-gray-500">Tente ajustar sua busca ou categoria.</p>
            <button 
              onClick={() => setSearchQuery("")}
              className="mt-4 text-orange-600 hover:text-orange-500 font-medium"
            >
              Limpar busca
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start mb-6 md:mb-0">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-6 w-6 text-gray-400" />
                <span className="font-bold text-xl tracking-tight text-gray-400">Ofertas <span className="text-gray-300">do dia</span></span>
              </div>
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Ofertas do dia. Todos os direitos reservados.
              </p>
              <p className="text-center text-xs text-gray-400 mt-2 max-w-2xl mx-auto">
                Aviso Legal: Participamos do Programa de Associados da Amazon Services LLC, um programa de publicidade de afiliados projetado para fornecer um meio para os sites ganharem taxas de publicidade vinculando-se à Amazon.com.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
