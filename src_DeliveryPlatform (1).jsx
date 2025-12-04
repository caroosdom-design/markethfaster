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

        {pedidos.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📦 Mis Pedidos</h3>
            <div className="space-y-3">
              {pedidos.map(pedido => (
                <div key={pedido.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold">Pedido #{pedido.id}</p>
                      <p className="text-sm text-gray-600">{pedido.fecha}</p>
                      <p className="text-sm text-gray-600">{pedido.ubicacion.municipio} - {pedido.ubicacion.barrio}</p>
                      <p className="text-xs text-blue-600 font-medium mt-1">💳 {pedido.metodoPago === 'nequi' ? 'Pagado con Nequi' : 'Pago contraentrega'}</p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">
                      {pedido.estado}
                    </span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <p className="text-sm text-gray-600">{pedido.productos.length} productos</p>
                    <p className="font-bold text-green-600 text-lg">${pedido.total.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {carrito.length > 0 && (
        <div className="fixed bottom-6 right-6 bg-white rounded-xl shadow-2xl p-6 w-80 max-h-96 overflow-y-auto">
          <h3 className="font-bold text-gray-800 mb-4 text-lg">🛒 Tu Carrito</h3>
          <div className="space-y-2 mb-4">
            {carrito.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm border-b pb-2">
                <div>
                  <p className="font-medium">{item.nombre}</p>
                  <p className="text-xs text-gray-500">${item.precio.toLocaleString()}</p>
                </div>
                <button onClick={() => eliminarDelCarrito(idx)} className="text-red-500 hover:text-red-700">
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>${totalCarrito.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-blue-600">
              <span>Domicilio:</span>
              <span>${costoDomicilio.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-green-600">${(totalCarrito + costoDomicilio).toLocaleString()}</span>
            </div>
          </div>
          <button 
            onClick={realizarPedido}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition mt-4 font-bold"
          >
            Continuar al Pago
          </button>
        </div>
      )}

      {/* Modal de Pago */}
      {mostrarPago && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">💳 Método de Pago</h3>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-2">Total a pagar:</p>
              <p className="text-3xl font-bold text-green-600">${(totalCarrito + costoDomicilio).toLocaleString()}</p>
            </div>

            <div className="space-y-3 mb-6">
              <button
                onClick={() => setMetodoPago('nequi')}
                className={`w-full p-4 rounded-lg border-2 transition ${
                  metodoPago === 'nequi' 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-300 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">📱</div>
                  <div className="text-left">
                    <p className="font-bold text-gray-800">Nequi</p>
                    <p className="text-sm text-gray-600">Paga ahora con Nequi</p>
                  </div>
                  {metodoPago === 'nequi' && (
                    <CheckCircle className="ml-auto text-purple-500" size={24} />
                  )}
                </div>
              </button>

              <button
                onClick={() => setMetodoPago('contraentrega')}
                className={`w-full p-4 rounded-lg border-2 transition ${
                  metodoPago === 'contraentrega' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300 hover:border-green-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">💵</div>
                  <div className="text-left">
                    <p className="font-bold text-gray-800">Contraentrega</p>
                    <p className="text-sm text-gray-600">Paga al domiciliario</p>
                  </div>
                  {metodoPago === 'contraentrega' && (
                    <CheckCircle className="ml-auto text-green-500" size={24} />
                  )}
                </div>
              </button>
            </div>

            {metodoPago === 'nequi' && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-purple-700 mb-2">📱 Número Nequi:</p>
                <p className="text-xl font-bold text-purple-900">300 123 4567</p>
                <p className="text-xs text-purple-600 mt-2">Envía el pago y confirma tu pedido</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setMostrarPago(false);
                  setMetodoPago('');
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-bold"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarPedido}
                disabled={!metodoPago}
                className={`flex-1 py-3 rounded-lg transition font-bold ${
                  metodoPago 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Confirmar Pedido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// PANTALLA DE LOGIN PARA VENDEDORES/DOMICILIARIOS
// ============================================
function LoginScreen({ tipo, onLogin, onVolver }) {
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState('');
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  // Códigos de acceso almacenados (simulación - en producción usarías una base de datos)
  const obtenerCodigos = () => {
    const codigosGuardados = localStorage.getItem(`codigos_${tipo}`);
    return codigosGuardados ? JSON.parse(codigosGuardados) : [];
  };

  const handleLogin = () => {
    const codigos = obtenerCodigos();
    const codigoValido = codigos.find(c => c.codigo === codigo && c.activo);
    
    if (codigoValido) {
      onLogin();
    } else {
      setError('Código incorrecto o inactivo');
      setCodigo('');
    }
  };

  if (mostrarRegistro) {
    return (
      <PantallaRegistro 
        tipo={tipo} 
        onVolver={() => setMostrarRegistro(false)}
        onVolverInicio={onVolver}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{tipo === 'vendedor' ? '🏪' : '🏍️'}</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {tipo === 'vendedor' ? 'Acceso Vendedores' : 'Acceso Domiciliarios'}
          </h2>
          <p className="text-gray-600">Ingresa tu código de acceso</p>
        </div>

        <div className="mb-6">
          <input
            type="password"
            maxLength="6"
            value={codigo}
            onChange={(e) => {
              setCodigo(e.target.value.replace(/\D/g, ''));
              setError('');
            }}
            placeholder="• • • • • •"
            className="w-full text-center text-3xl tracking-widest border-2 border-gray-300 rounded-lg px-4 py-4 focus:border-blue-500 focus:outline-none"
          />
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
        </div>

        <button
          onClick={handleLogin}
          disabled={codigo.length < 4}
          className={`w-full py-4 rounded-lg font-bold text-lg transition mb-3 ${
            codigo.length >= 4
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Ingresar
        </button>

        <button
          onClick={() => setMostrarRegistro(true)}
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-bold mb-3"
        >
          📝 Solicitar Código (Pagar Mensualidad)
        </button>

        <button
          onClick={onVolver}
          className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-bold"
        >
          ← Volver
        </button>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700 text-center">
            🔐 <strong>Seguro:</strong> Tu código de acceso es único y personal
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================
// PANTALLA DE REGISTRO Y PAGO
// ============================================
function PantallaRegistro({ tipo, onVolver, onVolverInicio }) {
  const [paso, setPaso] = useState(1);
  const [datos, setDatos] = useState({
    nombre: '',
    telefono: '',
    documento: '',
    direccion: '',
    metodoPago: ''
  });
  const [codigoGenerado, setCodigoGenerado] = useState('');

  const montoMensualidad = tipo === 'vendedor' ? 0 : 0; // Primer mes gratis para vendedores

  const generarCodigo = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const guardarCodigo = (codigo) => {
    const tipo_key = tipo;
    const codigos = localStorage.getItem(`codigos_${tipo_key}`);
    const listaCodigos = codigos ? JSON.parse(codigos) : [];
    
    listaCodigos.push({
      codigo: codigo,
      nombre: datos.nombre,
      telefono: datos.telefono,
      documento: datos.documento,
      fechaActivacion: new Date().toISOString(),
      fechaVencimiento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      activo: true,
      metodoPago: datos.metodoPago
    });
    
    localStorage.setItem(`codigos_${tipo_key}`, JSON.stringify(listaCodigos));
  };

  const handleConfirmarPago = () => {
    const codigo = generarCodigo();
    guardarCodigo(codigo);
    setCodigoGenerado(codigo);
    setPaso(4);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
        {/* Paso 1: Información Personal */}
        {paso === 1 && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              📋 Solicitud de Código - {tipo === 'vendedor' ? 'Vendedor' : 'Domiciliario'}
            </h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                <input
                  type="text"
                  value={datos.nombre}
                  onChange={(e) => setDatos({...datos, nombre: e.target.value})}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                  placeholder="Juan Pérez"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono/WhatsApp</label>
                <input
                  type="tel"
                  value={datos.telefono}
                  onChange={(e) => setDatos({...datos, telefono: e.target.value})}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                  placeholder="300 123 4567"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Documento de Identidad</label>
                <input
                  type="text"
                  value={datos.documento}
                  onChange={(e) => setDatos({...datos, documento: e.target.value})}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                  placeholder="1234567890"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                <input
                  type="text"
                  value={datos.direccion}
                  onChange={(e) => setDatos({...datos, direccion: e.target.value})}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                  placeholder="Calle 10 #20-30"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onVolver}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-bold"
              >
                Cancelar
              </button>
              <button
                onClick={() => setPaso(2)}
                disabled={!datos.nombre || !datos.telefono || !datos.documento}
                className={`flex-1 py-3 rounded-lg transition font-bold ${
                  datos.nombre && datos.telefono && datos.documento
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continuar
              </button>
            </div>
          </>
        )}

        {/* Paso 2: Información de Mensualidad */}
        {paso === 2 && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">💳 Información de Pago</h2>
            
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white mb-6">
              <h3 className="text-xl font-bold mb-2">
                {tipo === 'vendedor' ? 'Suscripción de Vendedor' : 'Registro de Domiciliario'}
              </h3>
              <p className="text-3xl font-bold mb-2">
                {tipo === 'vendedor' ? '¡PRIMER MES GRATIS!' : 'REGISTRO GRATUITO'}
              </p>
              <p className="text-sm">
                {tipo === 'vendedor' 
                  ? 'Luego $50.000/mes - Sin comisiones por venta' 
                  : 'Sin costo - Gana 15% por entrega'}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-bold text-gray-800 mb-2">✨ Beneficios incluidos:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                {tipo === 'vendedor' ? (
                  <>
                    <li>✓ Panel de control completo</li>
                    <li>✓ Gestión de productos ilimitada</li>
                    <li>✓ Sin comisiones por venta</li>
                    <li>✓ Estadísticas en tiempo real</li>
                    <li>✓ Soporte prioritario</li>
                  </>
                ) : (
                  <>
                    <li>✓ Acceso a pedidos disponibles</li>
                    <li>✓ Ganancias del 15% por entrega</li>
                    <li>✓ Pagos semanales</li>
                    <li>✓ Libertad de horarios</li>
                    <li>✓ Rutas optimizadas</li>
                  </>
                )}
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setPaso(1)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-bold"
              >
                ← Atrás
              </button>
              <button
                onClick={() => setPaso(3)}
                className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition font-bold"
              >
                Continuar al Pago
              </button>
            </div>
          </>
        )}

        {/* Paso 3: Método de Pago (Solo para Vendedores) o Contraseña (Para Domiciliarios) */}
        {paso === 3 && tipo === 'vendedor' && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🎉 Registro Gratuito</h2>
            
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white mb-6">
              <p className="text-xl font-bold mb-2">¡PRIMER MES GRATIS! 🎁</p>
              <p className="text-sm">A partir del segundo mes: $50.000/mes</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-700 mb-3 font-bold">📱 Para pagos futuros (segundo mes en adelante):</p>
              <div className="bg-white rounded-lg p-3">
                <p className="text-blue-900 font-bold">Nequi: 321 847 4525</p>
                <p className="text-xs text-blue-600 mt-1">A nombre de: Putumayo Delivery</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800">
                ℹ️ <strong>Importante:</strong> Tu primer mes es completamente gratis. 
                A partir del segundo mes se cobrará la mensualidad de $50.000.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setPaso(2)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-bold"
              >
                ← Atrás
              </button>
              <button
                onClick={handleConfirmarPago}
                className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-bold"
              >
                Activar Cuenta Gratis
              </button>
            </div>
          </>
        )}

        {/* Paso 3: Contraseña para Domiciliarios */}
        {paso === 3 && tipo === 'domiciliario' && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🔐 Contraseña de Acceso</h2>
            
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl p-6 text-white mb-6">
              <p className="text-xl font-bold mb-2">Registro 100% Gratuito</p>
              <p className="text-sm">Sin costos ni mensualidades</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-700 mb-3">
                Para acceder como domiciliario, necesitas la contraseña proporcionada por Putumayo Delivery.
              </p>
              <p className="text-xs text-blue-600">
                📞 Contáctanos al <strong>321 847 4525</strong> para obtener tu contraseña de acceso.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña de Acceso</label>
              <input
                type="password"
                value={datos.contrasena || ''}
                onChange={(e) => setDatos({...datos, contrasena: e.target.value})}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none text-center text-2xl tracking-widest"
                placeholder="• • • • • •"
              />
            </div>

            {datos.contrasenaError && (
              <p className="text-red-500 text-sm mt-2 text-center">{datos.contrasenaError}</p>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setPaso(2)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-bold"
              >
                ← Atrás
              </button>
              <button
                onClick={() => {
                  if (datos.contrasena === '160820') {
                    handleConfirmarPago();
                  } else {
                    setDatos({...datos, contrasenaError: 'Contraseña incorrecta'});
                  }
                }}
                disabled={!datos.contrasena}
                className={`flex-1 py-3 rounded-lg transition font-bold ${
                  datos.contrasena
                    ? 'bg-cyan-500 text-white hover:bg-cyan-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Registrarse
              </button>
            </div>
          </>
        )}

        {/* Paso 4: Código Generado */}
        {paso === 4 && (
          <>
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Registro Exitoso!</h2>
              <p className="text-gray-600">Tu código de acceso ha sido generado</p>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white mb-6">
              <p className="text-sm mb-2">Tu código de acceso es:</p>
              <p className="text-4xl font-bold tracking-wider text-center mb-2">{codigoGenerado}</p>
              <p className="text-xs text-center">
                {tipo === 'vendedor' ? '¡Primer mes GRATIS! Luego $50.000/mes' : '100% GRATUITO - Sin mensualidades'}
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800">
                ⚠️ <strong>Importante:</strong> Este código es personal e intransferible. 
                Úsalo para acceder a tu panel de {tipo === 'vendedor' ? 'vendedor' : 'domiciliario'}.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-700">
                {tipo === 'vendedor' ? (
                  <>
                    📅 <strong>Primer mes:</strong> GRATIS<br/>
                    💰 <strong>Desde el mes 2:</strong> $50.000/mes<br/>
                    📱 <strong>Pago mensual:</strong> Nequi 321 847 4525<br/>
                    💬 <strong>Soporte:</strong> WhatsApp 321 847 4525
                  </>
                ) : (
                  <>
                    ✅ <strong>Registro:</strong> GRATUITO<br/>
                    💰 <strong>Ganancias:</strong> 15% por entrega<br/>
                    📱 <strong>Contacto:</strong> 321 847 4525<br/>
                    💬 <strong>Soporte:</strong> WhatsApp 321 847 4525
                  </>
                )}
              </p>
            </div>

            <button
              onClick={onVolverInicio}
              className="w-full bg-blue-500 text-white py-4 rounded-lg hover:bg-blue-600 transition font-bold text-lg"
            >
              Ir a Iniciar Sesión
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================
// APP PARA VENDEDORES (CON AUTENTICACIÓN)
// ============================================
function AppVendedoresWrapper() {
  const [autenticado, setAutenticado] = useState(false);
  const [volverInicio, setVolverInicio] = useState(false);

  if (volverInicio) {
    window.location.reload();
    return null;
  }

  if (!autenticado) {
    return (
      <LoginScreen 
        tipo="vendedor" 
        onLogin={() => setAutenticado(true)}
        onVolver={() => setVolverInicio(true)}
      />
    );
  }

  return <AppVendedores />;
}

function AppVendedores() {
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Arroz Diana 500g', precio: 2500, stock: 50, activo: true },
    { id: 2, nombre: 'Aceite 1L', precio: 9000, stock: 30, activo: true },
    { id: 3, nombre: 'Panela', precio: 3500, stock: 20, activo: false },
  ]);

  const [pedidos] = useState([
    { id: 1, items: 'Arroz x2, Aceite x1', total: 14000, domicilio: 3000, cliente: 'Juan Pérez', barrio: 'San Rafael', municipio: 'Puerto Asís', estado: 'Preparando', tiempo: '5 min' },
    { id: 2, items: 'Panela x3', total: 10500, domicilio: 2000, cliente: 'María López', barrio: 'Centro', municipio: 'Puerto Asís', estado: 'Pendiente', tiempo: '2 min' },
  ]);

  const stats = {
    pedidosHoy: 28,
    ventasHoy: 485000,
    productosActivos: productos.filter(p => p.activo).length,
    clientesUnicos: 142
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <header className="bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Store size={28} />
            Putumayo Delivery - Vendedores
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-md p-6 text-white mb-6">
          <h2 className="text-xl font-bold mb-2">🎉 ¡Primer Mes GRATIS!</h2>
          <p className="text-lg">Luego $50.000 COP/mes - Sin comisiones por venta</p>
          <p className="text-sm mt-2">💳 Pago mensual: Nequi 321 847 4525</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="text-blue-500" size={32} />
              <span className="text-3xl font-bold text-blue-600">{stats.pedidosHoy}</span>
            </div>
            <p className="text-gray-600 text-sm">Pedidos Hoy</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="text-green-500" size={32} />
              <span className="text-3xl font-bold text-green-600">${(stats.ventasHoy/1000).toFixed(0)}K</span>
            </div>
            <p className="text-gray-600 text-sm">Ventas Hoy</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <Box className="text-purple-500" size={32} />
              <span className="text-3xl font-bold text-purple-600">{stats.productosActivos}</span>
            </div>
            <p className="text-gray-600 text-sm">Productos Activos</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="text-orange-500" size={32} />
              <span className="text-3xl font-bold text-orange-600">{stats.clientesUnicos}</span>
            </div>
            <p className="text-gray-600 text-sm">Clientes Únicos</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">📦 Pedidos Activos</h3>
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">{pedidos.length}</span>
            </div>
            <div className="space-y-3">
              {pedidos.map(pedido => (
                <div key={pedido.id} className="border rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-gray-800">Pedido #{pedido.id}</p>
                      <p className="text-sm text-gray-600">{pedido.cliente}</p>
                      <p className="text-xs text-gray-500">{pedido.municipio} - {pedido.barrio}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      pedido.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {pedido.estado}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{pedido.items}</p>
                  <div className="flex items-center justify-between text-sm">
                    <Clock size={14} className="text-gray-400" />
                    <span className="text-gray-500">Hace {pedido.tiempo}</span>
                  </div>
                  <div className="mt-3 pt-3 border-t flex justify-between items-center">
                    <span className="font-bold text-green-600">${pedido.total.toLocaleString()}</span>
                    <span className="text-xs text-gray-500">Domicilio: ${pedido.domicilio.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">📦 Mis Productos</h3>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center gap-2">
                <Plus size={16} />
                Agregar
              </button>
            </div>
            <div className="space-y-3">
              {productos.map(producto => (
                <div key={producto.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-bold text-gray-800">{producto.nombre}</h4>
                    <p className="text-green-600 font-bold">${producto.precio.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Stock: {producto.stock} unidades</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full ${producto.activo ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    <button className="text-blue-500 hover:text-blue-600 text-sm">Editar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ============================================
// APP PARA DOMICILIARIOS (CON AUTENTICACIÓN)
// ============================================
function AppDomiciliariosWrapper() {
  const [autenticado, setAutenticado] = useState(false);
  const [volverInicio, setVolverInicio] = useState(false);

  if (volverInicio) {
    window.location.reload();
    return null;
  }

  if (!autenticado) {
    return (
      <LoginScreen 
        tipo="domiciliario" 
        onLogin={() => setAutenticado(true)}
        onVolver={() => setVolverInicio(true)}
      />
    );
  }

  return <AppDomiciliarios />;
}

function AppDomiciliarios() {
  const [pedidosDisponibles, setPedidosDisponibles] = useState([
    { id: 1, tienda: 'Tienda La Esquina', recoger: 'Centro, Cra 5 #12-34', entregar: 'San Rafael, Calle 8 #45-67', municipio: 'Puerto Asís', barrio: 'San Rafael', domicilio: 3000, ganancia: 450, total: 25000, items: 3 },
    { id: 2, tienda: 'Restaurante El Sabor', recoger: 'San Rafael, Cra 7 #20-15', entregar: 'Los Ángeles, Calle 15 #30-22', municipio: 'Puerto Asís', barrio: 'Los Ángeles', domicilio: 3000, ganancia: 450, total: 42000, items: 2 },
    { id: 3, tienda: 'Droguería Salud', recoger: 'Centro, Calle 10 #8-45', entregar: 'El Progreso, Cra 20 #50-30', municipio: 'Puerto Asís', barrio: 'El Progreso', domicilio: 5000, ganancia: 750, total: 28000, items: 4 },
  ]);

  const [pedidosAceptados, setPedidosAceptados] = useState([]);
  const [stats, setStats] = useState({
    pedidosHoy: 15,
    gananciasHoy: 45000,
    distanciaHoy: 42
  });

  const aceptarPedido = (pedido) => {
    setPedidosAceptados([...pedidosAceptados, { ...pedido, estado: 'En camino' }]);
    setPedidosDisponibles(pedidosDisponibles.filter(p => p.id !== pedido.id));
    setStats({
      pedidosHoy: stats.pedidosHoy + 1,
      gananciasHoy: stats.gananciasHoy + pedido.ganancia,
      distanciaHoy: stats.distanciaHoy + Math.random() * 5
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100">
      <header className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bike size={28} />
            Putumayo Delivery - Domiciliarios
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-md p-6 text-white mb-6">
          <h2 className="text-xl font-bold mb-2">💰 Sistema de Ganancias</h2>
          <p className="text-lg">Ganas el 15% del costo de cada domicilio</p>
          <p className="text-sm mt-2">📱 Registro 100% GRATUITO - Sin mensualidades</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <Package className="text-blue-500" size={32} />
              <span className="text-3xl font-bold text-blue-600">{stats.pedidosHoy}</span>
            </div>
            <p className="text-gray-600 text-sm">Pedidos Hoy</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="text-green-500" size={32} />
              <span className="text-3xl font-bold text-green-600">${(stats.gananciasHoy/1000).toFixed(0)}K</span>
            </div>
            <p className="text-gray-600 text-sm">Ganancias Hoy</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <Navigation className="text-orange-500" size={32} />
              <span className="text-3xl font-bold text-orange-600">{stats.distanciaHoy.toFixed(1)} km</span>
            </div>
            <p className="text-gray-600 text-sm">Distancia Hoy</p>
          </div>
        </div>

        {pedidosAceptados.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🚴 Mis Pedidos Activos</h3>
            <div className="space-y-3">
              {pedidosAceptados.map(pedido => (
                <div key={pedido.id} className="border-2 border-green-500 rounded-lg p-4 bg-green-50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-gray-800">{pedido.tienda}</h4>
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {pedido.estado}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Store size={16} className="text-blue-500 mt-1" />
                      <div>
                        <p className="text-gray-600">Recoger en:</p>
                        <p className="font-bold text-gray-800">{pedido.recoger}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Home size={16} className="text-green-500 mt-1" />
                      <div>
                        <p className="text-gray-600">Entregar en:</p>
                        <p className="font-bold text-gray-800">{pedido.entregar}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t flex justify-between items-center">
                    <span className="font-bold text-green-600">Tu ganancia: ${pedido.ganancia.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📋 Pedidos Disponibles</h3>
          <div className="space-y-4">
            {pedidosDisponibles.map(pedido => (
              <div key={pedido.id} className="border rounded-lg p-4 hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">{pedido.tienda}</h4>
                    <p className="text-sm text-gray-500">{pedido.items} productos - ${pedido.total.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">${pedido.ganancia.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Tu ganancia (15%)</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Store size={14} className="text-blue-600" />
                      <span className="text-xs text-gray-600">Recoger</span>
                    </div>
                    <p className="text-sm font-bold text-gray-800">{pedido.recoger}</p>
                    <p className="text-xs text-gray-500">{pedido.municipio}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Home size={14} className="text-green-600" />
                      <span className="text-xs text-gray-600">Entregar</span>
                    </div>
                    <p className="text-sm font-bold text-gray-800">{pedido.entregar}</p>
                    <p className="text-xs text-gray-500">{pedido.municipio}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg font-bold">
                      💰 Domicilio: ${pedido.domicilio.toLocaleString()}
                    </div>
                  </div>
                  <button
                    onClick={() => aceptarPedido(pedido)}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition font-bold"
                  >
                    Aceptar Pedido
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// ============================================
// SELECTOR DE APLICACIÓN
// ============================================
export default function DeliveryPlatform() {
  const [appType, setAppType] = useState(null);

  if (!appType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">🚀 Putumayo Delivery</h1>
            <p className="text-xl text-white/90">Puerto Asís y Santana</p>
            <p className="text-lg text-white/80 mt-2">Selecciona tu tipo de cuenta</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => setAppType('customer')}
              className="bg-white rounded-2xl p-8 hover:scale-105 transition-transform shadow-2xl"
            >
              <div className="text-6xl mb-4 text-center">🛍️</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Cliente</h2>
              <p className="text-gray-600 text-center mb-4">Compra productos con domicilio desde $2.000</p>
              <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm text-center font-bold">
                Gratis para usar
              </div>
            </button>

            <button
              onClick={() => setAppType('vendor')}
              className="bg-white rounded-2xl p-8 hover:scale-105 transition-transform shadow-2xl"
            >
              <div className="text-6xl mb-4 text-center">🏪</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Vendedor</h2>
              <p className="text-gray-600 text-center mb-4">Vende tus productos sin comisiones</p>
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm text-center font-bold">
                🎉 Primer mes GRATIS
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">Luego $50.000/mes</p>
            </button>

            <button
              onClick={() => setAppType('driver')}
              className="bg-white rounded-2xl p-8 hover:scale-105 transition-transform shadow-2xl"
            >
              <div className="text-6xl mb-4 text-center">🏍️</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Domiciliario</h2>
              <p className="text-gray-600 text-center mb-4">Acepta pedidos y gana dinero</p>
              <div className="bg-cyan-100 text-cyan-700 px-4 py-2 rounded-lg text-sm text-center font-bold">
                100% GRATUITO
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">15% por entrega</p>
            </button>
          </div>

          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
            <h3 className="font-bold mb-3 text-center">📍 Cobertura de Domicilios</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-bold mb-2">🏘️ Puerto Asís - 20 barrios</p>
                <p className="text-white/80">Centro, San Rafael, La Esperanza, Los Ángeles, El Jardín, y más...</p>
              </div>
              <div>
                <p className="font-bold mb-2">🏘️ Santana - 15 barrios</p>
                <p className="text-white/80">Centro, El Porvenir, La Unión, San Pedro, Villa Rosa, y más...</p>
              </div>
            </div>
            <p className="text-center mt-4 text-white/90 font-bold">💰 Domicilios desde $2.000 según la distancia</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {appType === 'customer' && <AppClientes />}
      {appType === 'vendor' && <AppVendedoresWrapper />}
      {appType === 'driver' && <AppDomiciliariosWrapper />}
      
      <button
        onClick={() => setAppType(null)}
        className="fixed bottom-6 left-6 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition shadow-lg font-bold"
      >
        ← Cambiar Cuenta
      </button>
    </>
  );
}