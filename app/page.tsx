'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  CircleUserRound,
  Filter,
  Heart,
  Inbox,
  Menu,
  MessageCircle,
  Minus,
  Package,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  TicketCheck,
  Truck,
  Users,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const products = [
  { id: 1, name: 'Urban Grip 90/90-18', brand: 'Michelin', type: 'Moto urbana', price: 38.5, oldPrice: 42, stock: 18, image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=85', featured: true },
  { id: 2, name: 'City Pro 80/100-18', brand: 'Pirelli', type: 'Moto urbana', price: 42.9, oldPrice: 47, stock: 32, image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=900&q=85', featured: false },
  { id: 3, name: 'Trail Master 110/90-17', brand: 'Bridgestone', type: 'Doble propósito', price: 56.75, oldPrice: 61, stock: 9, image: 'https://images.unsplash.com/photo-1525160354320-d8e92641c563?auto=format&fit=crop&w=900&q=85', featured: true },
  { id: 4, name: 'Enduro X 100/90-19', brand: 'Dunlop', type: 'Enduro', price: 64.2, oldPrice: 70, stock: 24, image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=900&q=85', featured: false },
  { id: 5, name: 'Street Runner 120/80-17', brand: 'Kenda', type: 'Moto urbana', price: 35.8, oldPrice: 39, stock: 45, image: 'https://images.unsplash.com/photo-1558980664-10ea6a5f7849?auto=format&fit=crop&w=900&q=85', featured: false },
  { id: 6, name: 'Racing Sport 110/70-17', brand: 'Metzeler', type: 'Sport', price: 71.5, oldPrice: 78, stock: 7, image: 'https://images.unsplash.com/photo-1564982752979-3f7bc974d29a?auto=format&fit=crop&w=900&q=85', featured: false },
]

const money = (value: number) => new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'USD' }).format(value)

export default function Page() {
  const [cart, setCart] = useState<Record<number, number>>({ 1: 2, 3: 1 })
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Todos')
  const [showFilters, setShowFilters] = useState(false)
  const [toast, setToast] = useState('')
  const [demoView, setDemoView] = useState<'overview' | 'conversations' | 'leads'>('overview')

  const visibleProducts = useMemo(() => products.filter((product) => {
    const matchesSearch = `${product.name} ${product.brand}`.toLowerCase().includes(search.toLowerCase())
    const matchesTab = activeTab === 'Todos' || product.type === activeTab
    return matchesSearch && matchesTab
  }), [activeTab, search])

  const cartCount = Object.values(cart).reduce((sum, count) => sum + count, 0)
  const cartTotal = Object.entries(cart).reduce((sum, [id, count]) => sum + (products.find((product) => product.id === Number(id))?.price ?? 0) * count, 0)

  function addToCart(id: number) {
    setCart((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }))
    setToast('Producto agregado al pedido')
    window.setTimeout(() => setToast(''), 2200)
  }

  return (
    <main className="min-h-screen bg-[#f7f8f5] text-[#14251b]">
      <header className="sticky top-0 z-40 border-b border-[#dfe5dc] bg-[#f7f8f5]/95 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú"><Menu /></Button>
            <div className="flex items-center gap-2.5">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#183d2a] text-[#d7f23b]"><span className="text-xl font-black tracking-tight">R</span></div>
              <div><div className="text-lg font-black tracking-[-0.04em]">Rodado</div><div className="-mt-1 text-[9px] font-bold uppercase tracking-[0.22em] text-[#6e7a70]">Distribuidora</div></div>
            </div>
          </div>
          <nav className={`${menuOpen ? 'absolute left-0 right-0 top-18 flex border-b border-[#dfe5dc] bg-[#f7f8f5] p-5' : 'hidden'} flex-col gap-5 text-sm font-semibold lg:static lg:flex lg:flex-row lg:border-0 lg:bg-transparent lg:p-0`}>
            <a className="text-[#183d2a]" href="#catalogo">Catálogo</a><a className="text-[#6e7a70] hover:text-[#183d2a]" href="#beneficios">Beneficios</a><a className="text-[#6e7a70] hover:text-[#183d2a]" href="#pedidos">Mis pedidos</a>
          </nav>
          <div className="flex items-center gap-1.5 sm:gap-3">
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Mi cuenta"><CircleUserRound /></Button>
            <button className="relative flex size-10 items-center justify-center rounded-full border border-[#dfe5dc] bg-white" aria-label={`Carrito con ${cartCount} productos`}><ShoppingBag className="size-5" /><span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-[#d7f23b] text-[10px] font-black">{cartCount}</span></button>
            <Button className="hidden rounded-full bg-[#183d2a] px-5 text-white hover:bg-[#285b3e] sm:flex">Entrar <ArrowRight data-icon="inline-end" /></Button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-8 pt-8 lg:px-8 lg:pt-14">
        <div className="grid overflow-hidden rounded-[2rem] bg-[#183d2a] lg:grid-cols-[1.05fr_.95fr]">
          <div className="flex flex-col justify-center p-7 text-white sm:p-10 lg:p-16">
            <Badge className="mb-5 w-fit rounded-full border-0 bg-[#d7f23b] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#183d2a]">Solo para distribuidores</Badge>
            <h1 className="max-w-xl text-4xl font-black leading-[.96] tracking-[-0.06em] sm:text-6xl">Tus llantas,<br /><span className="text-[#d7f23b]">sin vueltas.</span></h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#c3d3c8]">Una selección curada de marcas líderes, precios mayoristas transparentes y entregas que cumplen su palabra.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Button className="rounded-full bg-[#d7f23b] px-6 font-bold text-[#183d2a] hover:bg-[#e4ff65]" onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}>Ver catálogo <ArrowRight data-icon="inline-end" /></Button><Button variant="ghost" className="rounded-full text-white hover:bg-white/10 hover:text-white">Cómo funciona</Button></div>
          </div>
          <div className="relative min-h-72 overflow-hidden lg:min-h-[390px]"><img src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=85" alt="Motocicleta en carretera" className="absolute inset-0 size-full object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-[#183d2a] via-transparent to-transparent lg:from-[#183d2a]/60" /><div className="absolute bottom-6 left-6 rounded-2xl border border-white/20 bg-[#183d2a]/65 px-4 py-3 text-white backdrop-blur-sm"><div className="flex items-center gap-2 text-sm font-bold"><Truck className="size-4 text-[#d7f23b]" /> Entrega nacional</div><div className="mt-1 text-xs text-white/70">En 24–48 horas</div></div></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-14 lg:px-8">
        <div className="grid overflow-hidden rounded-3xl border border-[#dfe5dc] bg-white shadow-[0_18px_60px_rgba(24,61,42,0.06)] sm:grid-cols-3">
          {[['12 años', 'moviendo negocios'], ['48 h', 'entrega nacional'], ['4.9/5', 'satisfacción de clientes']].map(([value, label], index) => <div key={label} className={`flex items-center gap-4 p-5 sm:p-6 ${index < 2 ? 'border-b border-[#edf0eb] sm:border-b-0 sm:border-r' : ''}`}><div className="text-2xl font-black tracking-[-0.05em] text-[#183d2a]">{value}</div><div className="text-xs font-bold uppercase leading-tight tracking-[0.12em] text-[#829087]">{label}</div></div>)}
        </div>
      </section>

      <section id="catalogo" className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#7e8b80]">Inventario disponible</p><h2 className="text-3xl font-black tracking-[-0.05em] sm:text-4xl">Lo que necesitas, listo.</h2></div><div className="flex items-center gap-2 text-sm text-[#6e7a70]"><span className="size-2 rounded-full bg-[#62b85d]" /> Actualizado hace 5 min</div></div>
        <div className="mb-7 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"><div className="flex gap-2 overflow-x-auto pb-1">{['Todos', 'Moto urbana', 'Doble propósito', 'Enduro', 'Sport'].map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${activeTab === tab ? 'bg-[#183d2a] text-white' : 'bg-white text-[#6e7a70] hover:bg-[#eaf0e8]'}`}>{tab}</button>)}</div><div className="flex gap-2"><div className="flex h-10 flex-1 items-center gap-2 rounded-full border border-[#dfe5dc] bg-white px-4 lg:w-64 lg:flex-none"><Search className="size-4 text-[#839087]" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar llanta..." className="w-full bg-transparent text-sm outline-none placeholder:text-[#9aa59d]" aria-label="Buscar llanta" /></div><Button variant="outline" size="icon" className="rounded-full bg-white lg:hidden" onClick={() => setShowFilters(!showFilters)} aria-label="Mostrar filtros"><SlidersHorizontal /></Button><Button variant="outline" className="hidden rounded-full bg-white lg:flex"><Filter data-icon="inline-start" /> Filtros</Button></div></div>
        {showFilters && <div className="mb-5 flex items-center gap-2 rounded-2xl border border-[#dfe5dc] bg-white p-4 text-sm text-[#6e7a70]"><span className="font-bold text-[#183d2a]">Filtros rápidos:</span> Más vendidos <ChevronDown className="size-4" /></div>}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{visibleProducts.map((product) => <article key={product.id} className="group overflow-hidden rounded-[1.5rem] border border-[#e2e8df] bg-white shadow-[0_8px_30px_rgba(24,61,42,0.035)] transition duration-300 hover:-translate-y-1 hover:border-[#cbd8c9] hover:shadow-[0_20px_45px_rgba(24,61,42,0.12)]"><div className="relative aspect-[1.2] overflow-hidden bg-[#eef2eb]"><img src={product.image} alt={product.name} className="size-full object-cover transition duration-500 group-hover:scale-105" /><button className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/90 text-[#6e7a70]" aria-label={`Guardar ${product.name}`}><Heart className="size-4" /></button>{product.featured && <Badge className="absolute left-3 top-3 border-0 bg-[#d7f23b] text-[#183d2a]">Más vendido</Badge>}</div><div className="p-5"><div className="mb-2 flex items-center justify-between"><span className="text-[11px] font-black uppercase tracking-[0.14em] text-[#829087]">{product.brand}</span><span className="flex items-center gap-1 text-[11px] font-bold text-[#4e9450]"><span className="size-1.5 rounded-full bg-[#62b85d]" /> {product.stock} disponibles</span></div><h3 className="font-extrabold tracking-tight">{product.name}</h3><p className="mt-1 text-xs text-[#829087]">{product.type} · Precio mayorista</p><div className="mt-5 flex items-end justify-between"><div><div className="text-xl font-black tracking-tight text-[#183d2a]">{money(product.price)}</div><div className="text-xs text-[#a0aaa2] line-through">{money(product.oldPrice)}</div></div><Button onClick={() => addToCart(product.id)} className="rounded-full bg-[#183d2a] text-white hover:bg-[#285b3e]">Agregar <Plus data-icon="inline-end" /></Button></div></div></article>)}</div>
      </section>

      <section id="demo" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-[#102c1e] text-white shadow-[0_25px_80px_rgba(16,44,30,0.18)]">
          <div className="grid lg:grid-cols-[.8fr_1.2fr]">
            <div className="flex flex-col justify-between p-7 sm:p-10">
              <div>
                <Badge className="mb-5 rounded-full border-0 bg-[#d7f23b] text-[#183d2a]">Más que un catálogo</Badge>
                <h2 className="max-w-md text-3xl font-black leading-[.98] tracking-[-0.06em] sm:text-5xl">Tu operación, <span className="text-[#d7f23b]">en piloto automático.</span></h2>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#b8ccbe]">Rodado convierte cada conversación en una venta, un ticket resuelto o un cliente que vuelve.</p>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-3">
                {[['+32%', 'conversión'], ['−41%', 'tiempo de respuesta']].map(([value, label]) => <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"><div className="text-2xl font-black text-[#d7f23b]">{value}</div><div className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#9ab0a0]">{label}</div></div>)}
              </div>
            </div>
            <div className="bg-[#f4f7f1] p-4 text-[#183d2a] sm:p-7">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#829087]">Panel de control</p><h3 className="mt-1 text-xl font-black tracking-tight">Buenos días, Afaq</h3></div><div className="flex rounded-full bg-white p-1 shadow-sm">{[['overview', 'Resumen'], ['conversations', 'Chats'], ['leads', 'Leads']].map(([key, label]) => <button key={key} onClick={() => setDemoView(key as typeof demoView)} className={`rounded-full px-3 py-1.5 text-xs font-bold ${demoView === key ? 'bg-[#183d2a] text-white' : 'text-[#829087]'}`}>{label}</button>)}</div></div>
              {demoView === 'overview' && <div className="grid gap-3 sm:grid-cols-3">{[['Conversaciones', '1,284', '+18%', MessageCircle], ['Leads capturados', '186', '+24%', Users], ['CSAT', '94.8%', '+6.2%', Sparkles]].map(([label, value, change, Icon]) => <div key={label as string} className="rounded-2xl border border-[#e1e9de] bg-white p-4"><div className="flex items-center justify-between text-[#829087]"><span className="text-xs font-bold">{label as string}</span><Icon className="size-4" /></div><div className="mt-4 text-2xl font-black">{value as string}</div><div className="mt-1 text-xs font-bold text-[#4e9450]">{change as string} este mes</div></div>)}</div>}
              {demoView === 'conversations' && <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-[#e1e9de] bg-white p-4"><div className="flex items-center gap-2 text-sm font-black"><span className="size-2 rounded-full bg-[#62b85d]" /> WhatsApp</div><p className="mt-3 text-sm text-[#6e7a70]">“¿Tienen Urban Grip para entrega mañana?”</p><div className="mt-4 flex items-center justify-between text-xs font-bold"><span className="rounded-full bg-[#eef4df] px-2 py-1 text-[#4e9450]">Intención de compra</span><span>Ahora</span></div></div><div className="rounded-2xl border border-[#e1e9de] bg-white p-4"><div className="flex items-center gap-2 text-sm font-black"><Inbox className="size-4" /> Bandeja unificada</div><p className="mt-3 text-sm text-[#6e7a70]">Correo, web y WhatsApp en un solo lugar.</p><div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#4e9450]"><TicketCheck className="size-4" /> 12 tickets resueltos</div></div></div>}
              {demoView === 'leads' && <div className="rounded-2xl border border-[#e1e9de] bg-white p-5"><div className="mb-4 flex items-center justify-between"><span className="text-sm font-black">Leads calientes</span><Badge variant="secondary">Actualizado ahora</Badge></div>{[['María González', 'Compra 4 llantas', '92/100'], ['Taller El Motor', 'Pedido recurrente', '86/100'], ['Carlos Pérez', 'Cotización enviada', '78/100']].map(([name, intent, score]) => <div key={name} className="flex items-center justify-between border-t border-[#edf0eb] py-3 text-sm"><div><div className="font-bold">{name}</div><div className="text-xs text-[#829087]">{intent}</div></div><div className="rounded-full bg-[#eef4df] px-3 py-1 text-xs font-black text-[#4e9450]">{score}</div></div>)}</div>}
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-[#829087]"><span className="flex items-center gap-1 rounded-full bg-white px-3 py-2"><BarChart3 className="size-3.5" /> Analítica en tiempo real</span><span className="flex items-center gap-1 rounded-full bg-white px-3 py-2"><TicketCheck className="size-3.5" /> Tickets automáticos</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="beneficios" className="border-y border-[#dfe5dc] bg-white"><div className="mx-auto grid max-w-7xl gap-0 px-5 sm:grid-cols-3 lg:px-8">{[{ icon: Truck, title: 'Entrega confiable', text: 'Recibe tu pedido en 24–48 horas.' }, { icon: Package, title: 'Precios por volumen', text: 'Mientras más compras, más ahorras.' }, { icon: Check, title: 'Compra con respaldo', text: 'Soporte dedicado para tu negocio.' }].map(({ icon: Icon, title, text }) => <div key={title} className="flex gap-4 border-b border-[#edf0eb] py-6 last:border-0 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-0"><div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#eef4df] text-[#183d2a]"><Icon className="size-5" /></div><div><h3 className="font-extrabold">{title}</h3><p className="mt-1 text-sm leading-relaxed text-[#7b887e]">{text}</p></div></div>)}</div></section>

      <footer id="pedidos" className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-[#7b887e] sm:flex-row sm:items-center sm:justify-between lg:px-8"><div><span className="font-black text-[#183d2a]">Rodado</span> · Tu negocio en movimiento.</div><div className="flex gap-5"><a href="#catalogo" className="hover:text-[#183d2a]">Centro de ayuda</a><a href="#catalogo" className="hover:text-[#183d2a]">Términos</a><span>© 2025 Rodado</span></div></footer>
      {toast && <div role="status" className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#183d2a] px-5 py-3 text-sm font-bold text-white shadow-xl"><Check className="size-4 text-[#d7f23b]" /> {toast}<button onClick={() => setToast('')} aria-label="Cerrar notificación"><X className="ml-2 size-4 text-white/70" /></button></div>}
      {cartCount > 0 && <div className="fixed bottom-5 right-5 z-40 hidden rounded-2xl bg-[#d7f23b] p-4 text-[#183d2a] shadow-xl sm:block"><div className="text-xs font-bold uppercase tracking-wider">Tu pedido</div><div className="mt-1 flex items-center gap-3"><span className="text-lg font-black">{money(cartTotal)}</span><span className="text-xs font-bold">{cartCount} unidades</span></div></div>}
    </main>
  )
}
