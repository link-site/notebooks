import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Lock, User, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin-marcio' && password === 'aq1AQ!sw2SW@') {
      onLogin();
      navigate('/admin');
    } else {
      setError('Usuário ou senha incorretos.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans text-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center gap-2 mb-6">
          <ShoppingCart className="h-8 w-8 text-orange-500" />
          <span className="font-bold text-3xl tracking-tight">Ofertas <span className="text-orange-500">do dia</span></span>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Acesso Restrito
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Faça login para gerenciar os produtos
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Usuário
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md border p-2 py-2.5"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md border p-2 py-2.5"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
              >
                Entrar
              </button>
            </div>
          </form>

          <div className="mt-6">
            <Link to="/" className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para a loja
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
