import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Plus, Trash2, Edit2, Save, X, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Admin({ products, setProducts, onLogout }: { products: any[], setProducts: (p: any[]) => void, onLogout: () => void }) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  const handleEdit = (product: any) => {
    setEditingId(product.id);
    setEditForm(product);
    setIsAdding(false);
  };

  const handleSave = () => {
    if (isAdding) {
      setProducts([{ ...editForm, id: Date.now() }, ...products]);
      setIsAdding(false);
    } else {
      setProducts(products.map(p => p.id === editingId ? editForm : p));
      setEditingId(null);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
    setEditForm({
      title: "",
      description: "",
      price: 0,
      rating: 5.0,
      reviews: 0,
      image: "https://picsum.photos/seed/new/600/600",
      category: "Geral",
      amazonLink: "https://amazon.com",
      badge: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: name === 'price' || name === 'rating' || name === 'reviews' ? Number(value) : value });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-gray-500 hover:text-gray-900">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <span className="font-bold text-xl tracking-tight">Admin - <span className="text-orange-500">Produtos</span></span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleAddNew}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <Plus className="h-4 w-4 mr-2" /> Novo Produto
              </button>
              <button
                onClick={handleLogoutClick}
                className="inline-flex items-center justify-center p-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                title="Sair"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {(isAdding || editingId !== null) && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8"
          >
            <h2 className="text-lg font-bold mb-4">{isAdding ? 'Adicionar Novo Produto' : 'Editar Produto'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Título</label>
                <input type="text" name="title" value={editForm.title} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm border p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Link Amazon</label>
                <input type="text" name="amazonLink" value={editForm.amazonLink} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm border p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Preço (R$)</label>
                <input type="number" step="0.01" name="price" value={editForm.price} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm border p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">URL da Imagem</label>
                <input type="text" name="image" value={editForm.image} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm border p-2" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Descrição</label>
                <textarea name="description" rows={3} value={editForm.description} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm border p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Categoria</label>
                <input type="text" name="category" value={editForm.category} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm border p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Badge (ex: Mais Vendido)</label>
                <input type="text" name="badge" value={editForm.badge || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm border p-2" />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button 
                onClick={() => { setIsAdding(false); setEditingId(null); }}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSave}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700"
              >
                <Save className="h-4 w-4 mr-2" /> Salvar
              </button>
            </div>
          </motion.div>
        )}

        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {products.map((product) => (
              <li key={product.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={product.image} alt={product.title} className="h-16 w-16 object-cover rounded-md border border-gray-200" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{product.title}</h4>
                    <p className="text-sm text-gray-500">R$ {Number(product.price).toFixed(2).replace('.', ',')} • {product.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleEdit(product)}
                    className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
            {products.length === 0 && (
              <li className="p-8 text-center text-gray-500">
                Nenhum produto cadastrado.
              </li>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}
