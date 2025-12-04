import React, { useState } from 'react';
import { MapPin, Package, User, Store, Bike, ShoppingCart, Clock, DollarSign, CheckCircle, XCircle, Plus, Search, Home, TrendingUp, Box, Users, Navigation, Star, X } from 'lucide-react';

// Configuración de municipios y barrios
const MUNICIPIOS = {
  'Puerto Asís': [
    'Centro', 'San Rafael', 'La Esperanza', 'Los Ángeles', 'El Jardín',
    'Villa Sandra', 'La Libertad', 'San Antonio', 'Villa del Río', 'El Progreso',
    'Santa Teresita', 'El Carmen', 'Las Palmas', 'San José', 'Villa Hermosa',
    'El Edén', 'La Paz', 'San Miguel', 'Villa Nueva', 'El Paraíso'
  ],
  'Santana': [
    'Centro', 'El Porvenir', 'La Unión', 'San Pedro', 'Villa Rosa',
    'El Triunfo', 'La Floresta', 'San Luis', 'Villa Colombia', 'El Mirador',
    'Santa Rosa', 'El Bosque', 'Las Brisas', 'San Francisco', 'Villa Luz'
  ]
};

// Calcular costo de domicilio según distancia
const calcularCostoDomicilio = (barrio) => {
  const barriosCentricos = ['Centro', 'San Rafael', 'La Esperanza'];
  if (barriosCentricos.includes(barrio)) return 2000;
  
  const barriosCercanos = ['Los Ángeles', 'El Jardín', 'Villa Sandra', 'El Porvenir', 'La Unión'];
  if (barriosCercanos.includes(barrio)) return 3000;
  
  const barriosMedianoDist = ['La Libertad', 'San Antonio', 'Villa del Río', 'San Pedro', 'Villa Rosa'];
  if (barriosMedianoDist.includes(barrio)) return 4000;
  
  const barriosLejanos = ['El Progreso', 'Santa Teresita', 'El Carmen', 'El Triunfo', 'La Floresta'];
  if (barriosLejanos.includes(barrio)) return 5000;
  
  return 6000;
};

// ============================================
// APP PARA CLIENTES
// ============================================
function AppClientes() {
  const [carrito, setCarrito] = useState([]);
  const [ubicacion, setUbicacion] = useState({ municipio: 'Puerto Asís', barrio: '', direccion: '' });
  const [pedidos, setPedidos] = useState([]);

  const vendedores = [
    { id: 1, nombre: 'Tienda La Esquina', categoria: 'Abarrotes', rating: 4.5, municipio: 'Puerto Asís', barrio: 'Centro' },
    { id: 2, nombre: 'Restaurante El Sabor', categoria: 'Comida', rating: 4.8, municipio: 'Puerto Asís', barrio: 'San Rafael' },
    { id: 3, nombre: 'Droguería Salud', categoria: 'Farmacia', rating: 4.6, municipio: 'Santana', barrio: 'Centro' },
    { id: 4, nombre: 'Carnicería Don Pedro', categoria: 'Carnes', rating: 4.7, municipio: 'Santana', barrio: 'El Porvenir' },
  ];

  const productos = [
    { id: 1, nombre: 'Arroz Diana 500g', precio: 2500, vendedor: 'Tienda La Esquina', imagen: '🍚' },
    { id: 2, nombre: 'Bandeja Paisa', precio: 18000, vendedor: 'Restaurante El Sabor', imagen: '🍽️' },
    { id: 3, nombre: 'Acetaminofén', precio: 8000, vendedor: 'Droguería Salud', imagen: '💊' },
    { id: 4, nombre: 'Carne Molida 500g', precio: 12000, vendedor: 'Carnicería Don Pedro', imagen: '🥩' },
    { id: 5, nombre: 'Sancocho de Gallina', precio: 15000, vendedor: 'Restaurante El Sabor', imagen: '🍲' },
    { id: 6, nombre: 'Aceite 1L', precio: 9000, vendedor: 'Tienda La Esquina', imagen: '🛢️' },
  ];

  const agregarCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const eliminarDelCarrito = (index) => {
    setCarrito(carrito.filter((_, i) => i !== index));
  };

  const [mostrarPago, setMostrarPago] = useState(false);
  const [metodoPago, setMetodoPago] = useState('');

  const realizarPedido = () => {
    if (!ubicacion.barrio || carrito.length === 0) {
      alert('Complete su ubicación y agregue productos');
      return;
    }
    setMostrarPago(true);
  };

  const confirmarPedido = () => {
    if (!metodoPago) {
      alert('Seleccione un método de pago');
      return;
    }

    const costoDomicilio = calcularCostoDomicilio(ubicacion.barrio);
    const totalProductos = carrito.reduce((sum, item) => sum + item.precio, 0);
    
    const nuevoPedido = {
      id: Date.now(),
      productos: [...carrito],
      ubicacion: { ...ubicacion },
      costoDomicilio,
      total: totalProductos + costoDomicilio,
      metodoPago,
      estado: metodoPago === 'nequi' ? 'Pagado - Pendiente' : 'Pendiente - Pago Contraentrega',
      fecha: new Date().toLocaleString()
    };

    setPedidos([nuevoPedido, ...pedidos]);
    setCarrito([]);
    setMostrarPago(false);
    setMetodoPago('');
    alert(`¡Pedido realizado! ${metodoPago === 'nequi' ? 'Pago por Nequi confirmado' : 'Pagarás al domiciliario'}`);
  };

  const totalCarrito = carrito.reduce((sum, item) => sum + item.precio, 0);
  const costoDomicilio = ubicacion.barrio ? calcularCostoDomicilio(ubicacion.barrio) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <header className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <ShoppingCart size={28} />
              Putumayo Delivery - Clientes
            </h1>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
              <MapPin size={16} />
              <span className="text-sm">{ubicacion.municipio}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin className="text-blue-600" />
            Tu Ubicación de Entrega
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={ubicacion.municipio}
              onChange={(e) => setUbicacion({ ...ubicacion, municipio: e.target.value, barrio: '' })}
              className="border rounded-lg px-4 py-2"
            >
              {Object.keys(MUNICIPIOS).map(mun => (
                <option key={mun} value={mun}>{mun}</option>
              ))}
            </select>
            <select
              value={ubicacion.barrio}
              onChange={(e) => setUbicacion({ ...ubicacion, barrio: e.target.value })}
              className="border rounded-lg px-4 py-2"
            >
              <option value="">Seleccionar barrio</option>
              {MUNICIPIOS[ubicacion.municipio].map(barrio => (
                <option key={barrio} value={barrio}>{barrio}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Dirección exacta"
              value={ubicacion.direccion}
              onChange={(e) => setUbicacion({ ...ubicacion, direccion: e.target.value })}
              className="border rounded-lg px-4 py-2"
            />
          </div>
          {ubicacion.barrio && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-700">
                💰 Costo de domicilio a {ubicacion.barrio}: <span className="font-bold">${calcularCostoDomicilio(ubicacion.barrio).toLocaleString()}</span>
              </p>
            </div>
          )}
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-4">🏪 Tiendas Disponibles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {vendedores.map(v => (
            <div key={v.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition">
              <div className="text-4xl mb-3 text-center">🏪</div>
              <h4 className="font-bold text-gray-800 text-center">{v.nombre}</h4>
              <p className="text-sm text-gray-500 text-center">{v.categoria}</p>
              <div className="flex items-center justify-between mt-2 text-sm">
                <span className="text-yellow-500 flex items-center gap-1">
                  <Star size={14} fill="currentColor" /> {v.rating}
                </span>
                <span className="text-gray-600">{v.barrio}</span>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-4">🛒 Productos Disponibles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {productos.map(prod => (
            <div key={prod.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
              <div className="h-32 bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center text-6xl">
                {prod.imagen}
              </div>
              <div className="p-4">
                <h4 className="font-bold text-gray-800">{prod.nombre}</h4>
                <p className="text-xs text-gray-500 mb-2">{prod.vendedor}</p>
                <p className="text-lg font-bold text-green-600 mb-3">${prod.precio.toLocaleString()}</p>
                <button
                  onClick={() => agregarCarrito(prod)}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-2"
                >
                  <Plus size={16} />
                  Agregar
                </button>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-4">🛒 Carrito de Compras</h3>
        <div className="bg-white rounded-lg shadow-md p-4">
          {carrito.length === 0 ? <p>No hay productos en el carrito.</p> : carrito.map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b py-2">
              <span>{item.nombre}</span>
              <span>${item.precio.toLocaleString()}</span>
              <button onClick={() => eliminarDelCarrito(index)} className="text-red-500">Eliminar</button>
            </div>
          ))}
        </div>

        {carrito.length > 0 && (
          <div className="mt-4 bg-gray-100 p-4 rounded-lg">
            <h4 className="font-bold">Total: ${totalCarrito.toLocaleString()}</h4>
            <button onClick={realizarPedido} className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Realizar Pedido</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default AppClientes;