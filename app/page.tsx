"use client";

import {
  ArrowRight,
  Bath,
  BedDouble,
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Coffee,
  ConciergeBell,
  DoorOpen,
  Download,
  Home,
  House,
  LayoutDashboard,
  MapPin,
  Menu,
  MessageCircle,
  PackageCheck,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  Users,
  WashingMachine,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

type Zone =
  | "Todas"
  | "Xola"
  | "Colinas de Echegaray"
  | "Condesa"
  | "Colonia del Valle";
type StayType = "Largo plazo" | "Por evento";

type Property = {
  id: number;
  zone: Exclude<Zone, "Todas">;
  title: string;
  type: string;
  image: string;
  monthly: string;
  event: string;
  monthlyPrice: number;
  eventPrice: number;
  feature: string;
  beds: string;
  baths: string;
  badge: string;
};

const properties: Property[] = [
  {
    id: 1,
    zone: "Colinas de Echegaray",
    title: "Casa Blanca · Habitación Terra",
    type: "Habitación privada",
    image: "/images/echegaray-house.png",
    monthly: "$6,900 / mes",
    event: "$690 / noche",
    monthlyPrice: 6900,
    eventPrice: 690,
    feature: "Casa blanca de tres pisos",
    beds: "1 recámara",
    baths: "Cocina compartida",
    badge: "Más solicitada",
  },
  {
    id: 2,
    zone: "Xola",
    title: "Xola Studio Office",
    type: "Oficina equipada",
    image: "/images/xola-offices.png",
    monthly: "$9,500 / mes",
    event: "$1,150 / día",
    monthlyPrice: 9500,
    eventPrice: 1150,
    feature: "Reuniones, producciones o eventos",
    beds: "Sala de juntas",
    baths: "Café incluido",
    badge: "Ideal para equipos",
  },
  {
    id: 3,
    zone: "Condesa",
    title: "Condesa Ámbar",
    type: "Departamento completo",
    image: "/images/condesa-apartment.png",
    monthly: "$22,500 / mes",
    event: "$1,950 / noche",
    monthlyPrice: 22500,
    eventPrice: 1950,
    feature: "Renta mensual o estancia corta",
    beds: "2 recámaras",
    baths: "2 baños",
    badge: "Nuevo",
  },
  {
    id: 4,
    zone: "Colonia del Valle",
    title: "Colonia del Valle Norte",
    type: "Departamento completo",
    image: "/images/del-valle-apartment.png",
    monthly: "$18,900 / mes",
    event: "$1,650 / noche",
    monthlyPrice: 18900,
    eventPrice: 1650,
    feature: "Renta mensual o estancia corta",
    beds: "2 recámaras",
    baths: "1.5 baños",
    badge: "Disponible",
  },
];

const services = [
  {
    id: "laundry",
    title: "Lavandería",
    description: "Lavado, secado y doblado",
    price: 180,
    icon: WashingMachine,
  },
  {
    id: "cleaning",
    title: "Limpieza de habitación",
    description: "Limpieza completa y blancos",
    price: 250,
    icon: Sparkles,
  },
  {
    id: "super",
    title: "Súper a domicilio",
    description: "Recibimos y acomodamos tu compra",
    price: 120,
    icon: ShoppingBag,
  },
  {
    id: "market",
    title: "Mercado a domicilio",
    description: "Productos frescos seleccionados",
    price: 150,
    icon: Store,
  },
];

const zoneDetails = [
  {
    name: "Xola",
    short: "Xola",
    type: "Oficinas equipadas",
    note: "Renta mensual, reuniones, producciones o eventos",
    icon: BriefcaseBusiness,
  },
  {
    name: "Colinas de Echegaray",
    short: "Colinas de Echegaray",
    type: "Casa blanca de tres pisos",
    note: "Habitaciones privadas, departamentos y cocina compartida",
    icon: House,
  },
  {
    name: "Condesa",
    short: "Condesa",
    type: "Departamentos amueblados",
    note: "Renta mensual o estancia corta",
    icon: Building2,
  },
  {
    name: "Colonia del Valle",
    short: "Colonia del Valle",
    type: "Departamentos amueblados",
    note: "Renta mensual o estancia corta",
    icon: Home,
  },
];

const reservations = [
  {
    guest: "Camila Ortega",
    property: "Condesa Ámbar",
    dates: "12 ago — 18 ago",
    total: "$13,880",
    status: "Confirmada",
  },
  {
    guest: "Estudio Norte",
    property: "Xola Studio Office",
    dates: "20 ago — 22 ago",
    total: "$3,750",
    status: "Pendiente",
  },
  {
    guest: "Diego Salas",
    property: "Casa Blanca · Terra",
    dates: "01 sep — 30 sep",
    total: "$7,330",
    status: "Confirmada",
  },
  {
    guest: "María Figueroa",
    property: "Colonia del Valle Norte",
    dates: "05 sep — 09 sep",
    total: "$7,080",
    status: "En revisión",
  },
];

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function HomePage() {
  const [selectedZone, setSelectedZone] = useState<Zone>("Todas");
  const [stayType, setStayType] = useState<StayType>("Largo plazo");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(properties[0]);
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "cleaning",
  ]);
  const [startDate, setStartDate] = useState("2026-08-12");
  const [endDate, setEndDate] = useState("2026-08-15");
  const [toast, setToast] = useState("");

  const filteredProperties = useMemo(
    () =>
      selectedZone === "Todas"
        ? properties
        : properties.filter((property) => property.zone === selectedZone),
    [selectedZone],
  );

  const servicesTotal = services
    .filter((service) => selectedServices.includes(service.id))
    .reduce((sum, service) => sum + service.price, 0);

  const dayCount = Math.max(
    1,
    Math.ceil(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
        (1000 * 60 * 60 * 24),
    ),
  );

  const basePrice =
    stayType === "Largo plazo"
      ? selectedProperty.monthlyPrice
      : selectedProperty.eventPrice * dayCount;

  function openBooking(property: Property) {
    setSelectedProperty(property);
    setBookingOpen(true);
  }

  function toggleService(serviceId: string) {
    setSelectedServices((current) =>
      current.includes(serviceId)
        ? current.filter((id) => id !== serviceId)
        : [...current, serviceId],
    );
  }

  function confirmBooking() {
    setBookingOpen(false);
    setToast("Solicitud guardada. Nuestro equipo te contactará en breve.");
    window.setTimeout(() => setToast(""), 3800);
  }

  if (adminOpen) {
    return <AdminDashboard onClose={() => setAdminOpen(false)} />;
  }

  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#inicio" aria-label="MODO4, inicio">
          MODO4
        </a>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"}>
          <a href="#propiedades" onClick={() => setMenuOpen(false)}>
            Propiedades
          </a>
          <a href="#estancias" onClick={() => setMenuOpen(false)}>
            Estancias
          </a>
          <a href="#servicios" onClick={() => setMenuOpen(false)}>
            Servicios
          </a>
          <a href="#nosotros" onClick={() => setMenuOpen(false)}>
            Nosotros
          </a>
          <button
            className="nav-admin-mobile"
            onClick={() => setAdminOpen(true)}
          >
            Backend
          </button>
        </nav>
        <div className="header-actions">
          <button
            className="admin-trigger"
            onClick={() => setAdminOpen(true)}
            aria-label="Abrir backend de administración"
          >
            <LayoutDashboard size={18} />
            <span>Backend</span>
          </button>
          <button
            className="menu-trigger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-media" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">
            <span>MODO4</span>
            <i />
            Vive. Trabaja. Quédate.
          </p>
          <h1>
            Vive, trabaja
            <br />y quédate en CDMX
          </h1>
          <p className="hero-subtitle">
            Rentas flexibles de habitaciones, departamentos y oficinas en
            cuatro zonas estratégicas de la Ciudad de México.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#propiedades">
              Explorar propiedades <ArrowRight size={18} />
            </a>
            <button
              className="button button-glass"
              onClick={() => {
                setStayType("Por evento");
                setBookingOpen(true);
              }}
            >
              Ver estancias por evento
            </button>
          </div>
        </div>

        <div className="zone-pills" aria-label="Zonas disponibles">
          {zoneDetails.map((zone) => (
            <button
              key={zone.short}
              onClick={() => {
                setSelectedZone(zone.short as Zone);
                document
                  .getElementById("propiedades")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <MapPin size={17} />
              {zone.short}
            </button>
          ))}
        </div>

        <div className="search-panel">
          <label>
            <span>Zona</span>
            <select
              aria-label="Filtrar por zona"
              value={selectedZone}
              onChange={(event) => setSelectedZone(event.target.value as Zone)}
            >
              <option>Todas</option>
              <option>Xola</option>
              <option>Colinas de Echegaray</option>
              <option>Condesa</option>
              <option>Colonia del Valle</option>
            </select>
            <ChevronDown size={18} />
          </label>
          <label>
            <span>Tipo de estancia</span>
            <select
              aria-label="Elegir tipo de estancia"
              value={stayType}
              onChange={(event) => setStayType(event.target.value as StayType)}
            >
              <option>Largo plazo</option>
              <option>Por evento</option>
            </select>
            <ChevronDown size={18} />
          </label>
          <label>
            <span>Fechas</span>
            <button
              className="date-value"
              aria-label="Abrir selección de fechas"
              onClick={() => setBookingOpen(true)}
            >
              {stayType === "Largo plazo" ? "Fechas flexibles" : "Seleccionar fechas"}
            </button>
            <CalendarDays size={18} />
          </label>
          <button
            className="search-submit"
            aria-label="Buscar disponibilidad"
            onClick={() =>
              document
                .getElementById("propiedades")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <Search size={25} />
          </button>
        </div>
      </section>

      <section className="zone-overview" id="estancias">
        <div className="section-kicker">CUATRO FORMAS DE HABITAR LA CIUDAD</div>
        <div className="zone-grid">
          {zoneDetails.map((zone, index) => {
            const Icon = zone.icon;
            return (
              <button
                className="zone-card"
                key={zone.name}
                onClick={() => {
                  setSelectedZone(zone.short as Zone);
                  document
                    .getElementById("propiedades")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="zone-number">0{index + 1}</span>
                <Icon size={24} />
                <h3>{zone.name}</h3>
                <p>{zone.type}</p>
                <small>{zone.note}</small>
                <ArrowRight size={18} className="zone-arrow" />
              </button>
            );
          })}
        </div>
      </section>

      <section className="properties-section" id="propiedades">
        <div className="section-heading">
          <div>
            <p className="section-kicker">ESPACIOS SELECCIONADOS</p>
            <h2>Encuentra tu próximo espacio</h2>
          </div>
          <p>
            Elige una estancia mensual o reserva por pocos días para un evento,
            una producción o una visita a la ciudad.
          </p>
        </div>

        <div className="filter-row" role="tablist" aria-label="Filtrar por zona">
          {(["Todas", "Xola", "Colinas de Echegaray", "Condesa", "Colonia del Valle"] as Zone[]).map(
            (zone) => (
              <button
                key={zone}
                aria-label={`Filtrar propiedades por ${zone}`}
                className={selectedZone === zone ? "active" : ""}
                onClick={() => setSelectedZone(zone)}
              >
                {zone}
              </button>
            ),
          )}
          <div className="stay-toggle">
            <button
              className={stayType === "Largo plazo" ? "active" : ""}
              onClick={() => setStayType("Largo plazo")}
              aria-pressed={stayType === "Largo plazo"}
            >
              Largo plazo
            </button>
            <button
              className={stayType === "Por evento" ? "active" : ""}
              onClick={() => setStayType("Por evento")}
              aria-pressed={stayType === "Por evento"}
            >
              Por evento
            </button>
          </div>
        </div>

        <div className="property-grid">
          {filteredProperties.map((property) => (
            <article className="property-card" key={property.id}>
              <div className="property-image">
                <img
                  src={property.image}
                  alt={`${property.title} de MODO4 en ${property.zone}`}
                />
                <span className="property-badge">{property.badge}</span>
                <button aria-label={`Guardar ${property.title}`}>
                  <Star size={18} />
                </button>
              </div>
              <div className="property-content">
                <div className="property-meta">
                  <span>
                    <MapPin size={14} /> {property.zone}
                  </span>
                  <span>{property.type}</span>
                </div>
                <h3>{property.title}</h3>
                <div className="property-features">
                  <span>
                    {property.zone === "Xola" ? (
                      <Users size={16} />
                    ) : (
                      <BedDouble size={16} />
                    )}
                    {property.beds}
                  </span>
                  <span>
                    {property.zone === "Xola" ? (
                      <Coffee size={16} />
                    ) : (
                      <Bath size={16} />
                    )}
                    {property.baths}
                  </span>
                  <span>
                    <DoorOpen size={16} /> {property.feature}
                  </span>
                </div>
                <div className="property-footer">
                  <div>
                    <small>Desde</small>
                    <strong>
                      {stayType === "Largo plazo"
                        ? property.monthly
                        : property.event}
                    </strong>
                  </div>
                  <button
                    onClick={() => openBooking(property)}
                    aria-label={`Reservar ${property.title}`}
                  >
                    Reservar <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="flexibility-section">
        <div className="flexibility-copy">
          <p className="section-kicker">FLEXIBILIDAD REAL</p>
          <h2>Un espacio para cada momento</h2>
          <p>
            Desde una habitación por varios meses hasta una oficina por un
            lanzamiento: paga solo por el tiempo y los servicios que necesitas.
          </p>
        </div>
        <div className="flexibility-cards">
          <article>
            <CalendarDays size={24} />
            <span>01</span>
            <h3>Renta mensual</h3>
            <p>
              Contratos claros, servicios opcionales y atención durante toda tu
              estancia.
            </p>
          </article>
          <article>
            <Clock3 size={24} />
            <span>02</span>
            <h3>Estancia por evento</h3>
            <p>
              Días flexibles para producciones, equipos, visitas o eventos
              especiales.
            </p>
          </article>
          <article>
            <ConciergeBell size={24} />
            <span>03</span>
            <h3>Todo resuelto</h3>
            <p>
              Agrega limpieza, lavandería y compras a domicilio desde tu
              reserva.
            </p>
          </article>
        </div>
      </section>

      <section className="services-section" id="servicios">
        <div className="services-intro">
          <p className="section-kicker">SERVICIOS A LA CARTA</p>
          <h2>Tu tiempo vale más</h2>
          <p>
            Personaliza tu estancia y agrega servicios cuando los necesites. El
            cargo aparece directamente en tu cuenta.
          </p>
          <button
            className="text-link"
            onClick={() => setBookingOpen(true)}
          >
            Armar mi estancia <ArrowRight size={17} />
          </button>
        </div>
        <div className="service-list">
          {services.map((service) => {
            const Icon = service.icon;
            return (
            <button
              key={service.id}
              aria-pressed={selectedServices.includes(service.id)}
              aria-label={`${selectedServices.includes(service.id) ? "Quitar" : "Agregar"} ${service.title}`}
                className={
                  selectedServices.includes(service.id)
                    ? "service-row selected"
                    : "service-row"
                }
                onClick={() => toggleService(service.id)}
              >
                <span className="service-icon">
                  <Icon size={22} />
                </span>
                <span>
                  <strong>{service.title}</strong>
                  <small>{service.description}</small>
                </span>
                <b>+ {formatMoney(service.price)}</b>
                <i>
                  {selectedServices.includes(service.id) ? (
                    <Check size={16} />
                  ) : (
                    <Plus size={16} />
                  )}
                </i>
              </button>
            );
          })}
        </div>
      </section>

      <section className="closing-section" id="nosotros">
        <div>
          <p className="section-kicker">MODO4</p>
          <h2>Menos complicaciones.<br />Más ciudad.</h2>
        </div>
        <div>
          <p>
            Administramos espacios cuidados, conectados y listos para vivir o
            trabajar. Tú eliges dónde, cuánto tiempo y qué necesitas.
          </p>
          <button
            className="button button-primary"
            onClick={() => setBookingOpen(true)}
          >
            Consultar disponibilidad <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <footer>
        <div className="footer-brand">MODO4</div>
        <div>
          <strong>Explora</strong>
          <a href="#propiedades">Propiedades</a>
          <a href="#estancias">Estancias</a>
          <a href="#servicios">Servicios</a>
        </div>
        <div>
          <strong>Zonas</strong>
          <span>Colinas de Echegaray</span>
          <span>Xola</span>
          <span>Condesa</span>
          <span>Colonia del Valle</span>
        </div>
        <div>
          <strong>Contacto</strong>
          <a href="mailto:hola@modo4.mx">hola@modo4.mx</a>
          <span>+52 55 0000 4004</span>
          <button aria-label="Contactar por WhatsApp">
            <MessageCircle size={16} /> WhatsApp
          </button>
        </div>
        <p className="copyright">
          © 2026 MODO4. Mockup conceptual.
        </p>
      </footer>

      {bookingOpen && (
        <div className="drawer-layer" role="dialog" aria-modal="true">
          <button
            className="drawer-backdrop"
            aria-label="Cerrar"
            onClick={() => setBookingOpen(false)}
          />
          <aside className="booking-drawer">
            <div className="drawer-head">
              <div>
                <span>RESERVA FLEXIBLE</span>
                <h2>Configura tu estancia</h2>
              </div>
              <button
                onClick={() => setBookingOpen(false)}
                aria-label="Cerrar reserva"
              >
                <X size={22} />
              </button>
            </div>

            <div className="drawer-property">
              <img src={selectedProperty.image} alt="" />
              <div>
                <span>{selectedProperty.zone}</span>
                <strong>{selectedProperty.title}</strong>
                <small>{selectedProperty.type}</small>
              </div>
            </div>

            <div className="drawer-section">
              <div className="drawer-label">MODALIDAD</div>
              <div className="drawer-toggle">
                <button
                  className={stayType === "Largo plazo" ? "active" : ""}
                  onClick={() => setStayType("Largo plazo")}
                  aria-pressed={stayType === "Largo plazo"}
                >
                  <CalendarDays size={17} /> Largo plazo
                </button>
                <button
                  className={stayType === "Por evento" ? "active" : ""}
                  onClick={() => setStayType("Por evento")}
                  aria-pressed={stayType === "Por evento"}
                >
                  <Clock3 size={17} /> Por evento
                </button>
              </div>
            </div>

            <div className="drawer-section">
              <div className="drawer-label">FECHAS</div>
              <div className="date-grid">
                <label>
                  <span>Entrada</span>
                  <input
                    type="date"
                    aria-label="Fecha de entrada"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                  />
                </label>
                <label>
                  <span>Salida</span>
                  <input
                    type="date"
                    aria-label="Fecha de salida"
                    value={endDate}
                    min={startDate}
                    onChange={(event) => setEndDate(event.target.value)}
                  />
                </label>
              </div>
            </div>

            <div className="drawer-section">
              <div className="drawer-label">SERVICIOS EXTRA</div>
              <div className="drawer-services">
                {services.map((service) => {
                  const Icon = service.icon;
                  const selected = selectedServices.includes(service.id);
                  return (
                    <button
                      key={service.id}
                      aria-pressed={selected}
                      aria-label={`${selected ? "Quitar" : "Agregar"} ${service.title}`}
                      className={selected ? "selected" : ""}
                      onClick={() => toggleService(service.id)}
                    >
                      <Icon size={19} />
                      <span>
                        <strong>{service.title}</strong>
                        <small>+ {formatMoney(service.price)}</small>
                      </span>
                      <i>{selected && <Check size={14} />}</i>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="price-summary">
              <div>
                <span>
                  {stayType === "Largo plazo"
                    ? "Primer mes"
                    : `Estancia estimada · ${dayCount} ${dayCount === 1 ? "día" : "días"}`}
                </span>
                <b>{formatMoney(basePrice)}</b>
              </div>
              <div>
                <span>Servicios extra</span>
                <b>{formatMoney(servicesTotal)}</b>
              </div>
              <div className="price-total">
                <span>Total estimado</span>
                <strong>{formatMoney(basePrice + servicesTotal)}</strong>
              </div>
            </div>
            <button className="checkout-button" onClick={confirmBooking}>
              Solicitar reserva <ArrowRight size={18} />
            </button>
            <p className="drawer-note">
              No se realizará ningún cargo hasta confirmar disponibilidad.
            </p>
          </aside>
        </div>
      )}

      {toast && (
        <div className="toast">
          <Check size={18} /> {toast}
        </div>
      )}
    </main>
  );
}

function AdminDashboard({ onClose }: { onClose: () => void }) {
  const [adminSection, setAdminSection] = useState("Resumen");

  const navItems = [
    { label: "Resumen", icon: LayoutDashboard },
    { label: "Reservas", icon: CalendarDays },
    { label: "Propiedades", icon: Building2 },
    { label: "Servicios", icon: ConciergeBell },
    { label: "Clientes", icon: Users },
  ];

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-wordmark">
          <span>MODO4</span>
          <small>CONTROL CENTER</small>
        </div>
        <nav>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={adminSection === item.label ? "active" : ""}
                onClick={() => setAdminSection(item.label)}
              >
                <Icon size={19} /> {item.label}
              </button>
            );
          })}
        </nav>
        <div className="admin-sidebar-bottom">
          <button>
            <Settings size={18} /> Configuración
          </button>
          <button onClick={onClose}>
            <ChevronLeft size={18} /> Volver al sitio
          </button>
        </div>
      </aside>

      <section className="admin-main">
        <header className="admin-header">
          <div>
            <p>JUEVES, 24 DE JULIO</p>
            <h1>Buenas tardes, Olivier</h1>
          </div>
          <div className="admin-header-actions">
            <button aria-label="Notificaciones">
              <Bell size={19} />
              <i />
            </button>
            <button className="admin-avatar">OS</button>
          </div>
        </header>

        <div className="admin-toolbar">
          <div>
            <h2>{adminSection}</h2>
            <p>Actividad comercial de tus cuatro ubicaciones.</p>
          </div>
          <button className="admin-primary">
            <Plus size={17} /> Nueva reserva
          </button>
        </div>

        <div className="admin-metrics">
          <article>
            <span>
              <CircleDollarSign size={20} />
            </span>
            <small>Ingresos del mes</small>
            <strong>$286,400</strong>
            <p>
              <b>+14.8%</b> vs. mes anterior
            </p>
          </article>
          <article>
            <span>
              <Building2 size={20} />
            </span>
            <small>Ocupación promedio</small>
            <strong>87%</strong>
            <p>3 espacios disponibles</p>
          </article>
          <article>
            <span>
              <CalendarDays size={20} />
            </span>
            <small>Reservas activas</small>
            <strong>18</strong>
            <p>5 entradas esta semana</p>
          </article>
          <article>
            <span>
              <PackageCheck size={20} />
            </span>
            <small>Servicios vendidos</small>
            <strong>34</strong>
            <p>
              <b>+22%</b> este mes
            </p>
          </article>
        </div>

        <div className="admin-grid">
          <article className="revenue-card">
            <div className="card-head">
              <div>
                <h3>Ingresos</h3>
                <p>Rentas y servicios adicionales</p>
              </div>
              <select defaultValue="6 meses">
                <option>6 meses</option>
                <option>12 meses</option>
              </select>
            </div>
            <div className="chart-wrap">
              <div className="chart-y">
                <span>$300k</span>
                <span>$200k</span>
                <span>$100k</span>
                <span>$0</span>
              </div>
              <div className="chart-bars">
                {[48, 61, 55, 76, 70, 91].map((height, index) => (
                  <div className="bar-group" key={index}>
                    <i style={{ height: `${Math.round(height * 1.55)}px` }} />
                    <span>{["Feb", "Mar", "Abr", "May", "Jun", "Jul"][index]}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="occupancy-card">
            <div className="card-head">
              <div>
                <h3>Ocupación por zona</h3>
                <p>Promedio del mes actual</p>
              </div>
            </div>
            <div className="occupancy-list">
              {[
                ["Condesa", 94],
                ["Colonia del Valle", 89],
                ["Colinas de Echegaray", 86],
                ["Xola", 78],
              ].map(([zone, value]) => (
                <div key={zone}>
                  <p>
                    <span>{zone}</span>
                    <b>{value}%</b>
                  </p>
                  <i>
                    <em style={{ width: `${value}%` }} />
                  </i>
                </div>
              ))}
            </div>
          </article>
        </div>

        <article className="reservation-table-card">
          <div className="card-head">
            <div>
              <h3>Reservas recientes</h3>
              <p>Últimas operaciones y solicitudes</p>
            </div>
            <div className="table-actions">
              <button>
                <Download size={16} /> Exportar
              </button>
              <button>Ver todas <ChevronRight size={16} /></button>
            </div>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Huésped / cliente</th>
                  <th>Espacio</th>
                  <th>Fechas</th>
                  <th>Total</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => (
                  <tr key={reservation.guest}>
                    <td>
                      <span className="guest-avatar">
                        {reservation.guest
                          .split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")}
                      </span>
                      {reservation.guest}
                    </td>
                    <td>{reservation.property}</td>
                    <td>{reservation.dates}</td>
                    <td>
                      <strong>{reservation.total}</strong>
                    </td>
                    <td>
                      <span
                        className={`status status-${reservation.status
                          .toLowerCase()
                          .replace(" ", "-")
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")}`}
                      >
                        {reservation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </main>
  );
}
