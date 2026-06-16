import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Filter, BookOpen, GitBranch, X, Presentation, ShieldCheck, ChevronRight } from 'lucide-react';

const orders = [
  {
    name: 'Anura',
    common: 'ranas y sapos',
    icon: '🐸',
    color: '#20c565',
    summary: 'Conformada por ranas y sapos. Los adultos carecen de cola; es el grupo más numeroso y posee cuerdas vocales. En Ecuador el PDF indica 14 familias, 65 géneros, 621 especies y 291 endémicas.',
    traits: ['Adultos sin cola', 'Patas traseras largas', 'Cabeza y tronco unidos, sin cuello estrecho', 'Machos con sacos gulares para croar', 'Tímpano descubierto', 'Extremidades anteriores con 4 dedos y posteriores con 5 dedos'],
    families: [
      { name:'Aromobatidae', common:'ranas nodrizas', traits:['Antiguamente conformaban la familia Dendrobatidae según el PDF.'], species:['Allobates trilineatus','Allobates zaparo'] },
      { name:'Bufonidae', common:'sapos, jambatos, ranas arlequín', traits:['Son los llamados sapos','Piel rugosa con numerosas glándulas venenosas','Glándula parótida grande y ovoide detrás del ojo','Terrestres e insectívoros','Sin cuidado parental según el esquema del PDF'], species:['Andinophryne colomai','Atelopus arthuri','Atelopus balios','Atelopus bomolochos','Atelopus elegans','Atelopus guanujo','Atelopus ignescens','Atelopus longirostris','Atelopus mindoensis','Atelopus nanay','Atelopus planispina','Atelopus spumarius','Ollotis conifera','Osornophryne antisana','Osornophryne bufoniformis','Osornophryne cofanorum','Osornophryne puruanta','Rhinella festae'] },
      { name:'Centrolenidae', common:'ranas de cristal', traits:['También llamadas ranitas de cristal','Vientre transparente o cristalino','En algunas especies se observan órganos internos','Adaptadas a vida arbórea','Huevos depositados en el envés de hojas sobre arroyos','Machos cuidan las puestas'], species:['Centrolene buckleyi','Centrolene lynchi','Centrolene prosoblepon','Cochranella midas','Cochranella sp.','Nymphargus cochranae'] },
      { name:'Ceratophryidae', common:'sapos bocones, ranitas carnívoras', traits:['Anfibios de cabeza muy ancha','Dientes maxilares sin pedicelo con aspecto de colmillo','Dos procesos odontoideos fuertes en la mandíbula','Larvas con picos córneos y dientes labiales','Anuros agresivos'], species:['Ceratophrys cornuta','Ceratophrys stolzmanni'] },
      { name:'Craugastoridae', common:'ranas cutín', traits:['Familia mostrada en el PDF dentro del orden Anura como ranas cutín.'], species:['Barycholos pulcher','Craugastor longirostris'] },
      { name:'Dendrobatidae', common:'ranas venenosas, ranas cohete', traits:['Ranas pequeñas diurnas','Mayoría terrestres','Colores brillantes de advertencia','Piel con venenos alcaloides','Uno de los progenitores puede transportar renacuajos en la espalda'], species:['Ameerega bilinguis','Ameerega hahneli','Epipedobates anthonyi','Epipedobates tricolor','Hyloxalus awa','Hyloxalus bocagei','Hyloxalus vertebralis','Oophaga sylvatica','Ranitomeya reticulata','Ranitomeya ventrimaculata'] },
      { name:'Eleutherodactylidae', common:'familia listada en el PDF', traits:['El PDF la presenta dentro del bloque de familias de Anura, pero no desarrolla especies específicas en las páginas extraídas.'], species:[] },
      { name:'Hemiphractidae', common:'ranas marsupiales y afines', traits:['Ranas marsupiales con cavidad cutánea dorsal','Los huevos fertilizados se insertan en una cavidad dorsal','Los huevos permanecen en contacto con tejidos vasculares de la madre','Algunas especies presentan cabeza triangular y mimetismo'], species:['Gastrotheca cornuta','Gastrotheca guentheri','Gastrotheca litonedis','Gastrotheca monticola','Gastrotheca orophylax','Gastrotheca pseustes','Gastrotheca riobambae','Hemiphractus fasciatus','Hemiphractus scutatus'] },
      { name:'Hylidae', common:'ranas arborícolas, ranas de torrente', traits:['Ranas arborícolas','Discos redondeados en los dedos','Membranas interdigitales','Depositan huevos en bromelias','Mayoría activas durante la noche','Adaptación a árboles mediante discos expandidos en los dedos'], species:['Cruziohyla calcarifer','Cruziohyla craspedopus','Dendropsophus bifurcus','Dendropsophus brevifrons','Dendropsophus carnifex','Dendropsophus ebraccatus','Dendropsophus marmoratus','Dendropsophus minutus','Dendropsophus parviceps','Dendropsophus sarayacuensis','Hypsiboas calcaratus','Hypsiboas cinerascens','Hypsiboas nympha'] },
      { name:'Leptodactylidae', common:'ranas terrestres', traits:['Incluye especies de gran tamaño','Nidos en espuma','Al capturarlas pueden emitir sonidos como niño recién nacido','Depositan huevos en tierra o nidos de espuma','Muchas especies amazónicas tienen hábitos nocturnos y arbóreos'], species:['Engystomops coloradorum','Engystomops montubio','Engystomops petersi','Leptodactylus andreae','Leptodactylus discodactylus','Leptodactylus knudseni','Leptodactylus labrosus','Leptodactylus melanonotus','Leptodactylus mystaceus','Leptodactylus pentadactylus','Leptodactylus wagneri','Lithodytes lineatus'] },
      { name:'Microhylidae', common:'ranas de hojarasca', traits:['Cuerpo redondeado con forma de gota en vista dorsal','Hocico puntiagudo','Cabeza corta respecto al cuerpo','Ojos pequeños','Extremidades cortas y piel lisa','Depositan muchos huevos pequeños y pigmentados'], species:['Chiasmocleis bassleri','Chiasmocleis ventrimaculata','Hamptophryne boliviana'] },
      { name:'Pipidae', common:'sapo de Surinam', traits:['Completamente acuáticos','Grandes membranas entre los dedos','Cabeza y cuerpo aplanados','Carecen de párpados','Huevos en bolsas en la espalda'], species:['Pipa pipa'] },
      { name:'Ranidae', common:'ranas comunes', traits:['Patas largas y musculosas','Membranas interdigitales en los pies','Cuerpo hidrodinámico ideal para saltar y nadar','Reproducción acuática','Grupo de ranas verdaderas'], species:['Lithobates bwana','Lithobates palmipes','Lithobates vaillanti'] },
      { name:'Strabomantidae', common:'ranas cutín', traits:['El PDF indica antes Leptodactylidae y actual Strabomantidae','Discos de los dedos truncados o en forma de T','Incluye numerosos cutines del género Pristimantis'], species:['Noblella heyeri','Noblella myrmecoides','Oreobates quixensis','Pristimantis achatinus','Pristimantis acuminatus','Pristimantis altamazonicus','Pristimantis condor','Pristimantis conspicillatus','Pristimantis eriphus','Pristimantis galdi'] },
      { name:'Telmatobiidae', common:'kaylas, urcos, ranas acuáticas', traits:['Endémicas de la cordillera andina en Sudamérica según el PDF.'], species:['Telmatobius cirrhacelis','Telmatobius niger','Telmatobius vellardi'] }
    ]
  },
  {
    name: 'Caudata',
    common: 'salamandras',
    icon: '🦎',
    color: '#22a6f2',
    summary: 'Orden de salamandras. El PDF describe cabeza y cuello diferenciados, tronco largo y cilíndrico, cola larga y patas delanteras y traseras de tamaño similar.',
    traits: ['Cabeza y cuello diferenciados', 'Tronco largo y cilíndrico', 'Larga cola', 'Patas delanteras y traseras de igual tamaño'],
    families: [
      { name:'Plethodontidae', common:'salamandras', traits:['Única familia presente en Sudamérica según el PDF','Carecen de pulmones','Respiran por la piel y epitelios de la cavidad bucofaríngea','Fecundación interna','Piel lisa, flexible, sin escamas y generalmente húmeda','Todas son carnívoras'], species:['Bolitoglossa altamazonica','Bolitoglossa biseriata','Bolitoglossa chica','Bolitoglossa equatoriana','Bolitoglossa medemi','Bolitoglossa palmata','Bolitoglossa peruviana','Bolitoglossa sima','Oedipina complex'] }
    ]
  },
  {
    name: 'Gymnophiona',
    common: 'cecilias',
    icon: '🪱',
    color: '#b977ff',
    summary: 'Orden de anfibios sin patas. El PDF los describe con cuerpo largo, casi sin cola, ojos reducidos por su vida subterránea y difícil observación porque rara vez salen de sus madrigueras.',
    traits: ['Anfibios sin patas', 'Cuerpo largo y casi sin cola', 'Ojos reducidos por forma de vida subterránea', 'Excavadoras', 'Difíciles de observar'],
    families: [
      { name:'Caeciliidae', common:'culebras ciegas', traits:['Habitan bajo tierra en galerías de hasta 1 m','Viven entre desechos vegetales, árboles caídos y agua','Miden de 30 cm a 1 m','Hábitos nocturnos','Boca subterminal','Cráneo macizo como adaptación a vida subterránea'], species:['Caecilia abitaguae','Caecilia albiventris','Caecilia attenuata','Caecilia bokermanni','Caecilia crassisquama','Caecilia disossea','Caecilia dunni','Caecilia guntheri','Caecilia leucocephala','Caecilia nigricans','Caecilia orientalis','Caecilia pachynema','Caecilia subterminalis','Caecilia tentaculata','Caecilia tenuissima','Oscaecilia bassleri','Oscaecilia equatorialis'] },
      { name:'Rhinatrematidae', common:'cecilias anilladas', traits:['Cuerpo fuertemente anillado','Ranuras secundarias y terciarias','Cuerpo termina en cola corta pero verdadera','Ojos visibles externamente','Oído medio con columnuela'], species:['Epicrionops bicolor','Epicrionops marmoratus','Epicrionops petersi'] },
      { name:'Siphonopidae', common:'cecilias de bosques húmedos', traits:['Se distribuyen por Sudamérica','Hábitats naturales: bosques húmedos tropicales o subtropicales','También en plantaciones, jardines rurales y zonas degradadas previamente boscosas'], species:['Microcaecilia albiceps','Siphonops annulatus'] },
      { name:'Typhlonectidae', common:'cecilias acuáticas amazónicas', traits:['El PDF indica una especie endémica de la vertiente amazónica de los Andes en Ecuador','Registrada sobre 1.000 m de altitud en la provincia de Napo','También registra una especie de bosque húmedo tropical amazónico'], species:['Chthonerpeton onorei','Potomotyphlus kaupii'] }
    ]
  }
].map(order => ({ ...order, families: [...order.families].sort((a,b)=>a.name.localeCompare(b.name)), familyCount: order.families.length, speciesCount: order.families.reduce((n,f)=>n+f.species.length,0)}));

function SpeciesName({ name }) { return <em className="scientific">{name}</em>; }

function Modal({ family, order, onClose }) {
  return <AnimatePresence>{family && <motion.div className="modalBackdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}>
    <motion.article className="modal" style={{'--c': order.color}} initial={{opacity:0,y:28,scale:.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:28,scale:.96}} onClick={e=>e.stopPropagation()}>
      <button className="close" onClick={onClose}><X size={20}/></button>
      <div className="modalHead"><div className="bigIcon">{order.icon}</div><div><p className="eyebrow">Orden {order.name} · Familia</p><h2>{family.name}</h2><p className="common">{family.common}</p></div></div>
      <div className="infoGrid">
        <section><h3>Características de la familia</h3>{family.traits.map(t=><p key={t}>• {t}</p>)}</section>
        <section><h3>Características del orden</h3>{order.traits.map(t=><p key={t}>• {t}</p>)}</section>
        <section className="wide"><h3>Especies endémicas y/o representativas mencionadas en el PDF</h3>{family.species.length ? <div className="speciesGrid">{family.species.map(s=><div className="species" key={s}><SpeciesName name={s}/></div>)}</div> : <p>El PDF lista esta familia, pero no detalla especies científicas para esta sección.</p>}</section>
      </div>
    </motion.article>
  </motion.div>}</AnimatePresence>
}

function FamilyCard({ family, order, index, onOpen }) {
  return <motion.button className="familyCard" style={{'--c': order.color}} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:index*.025}} onClick={()=>onOpen(family, order)}>
    <div className="cardTop"><span>{String(index+1).padStart(2,'0')}</span><b>{family.name}</b></div>
    <p className="common">{family.common}</p>
    <p className="traitPreview">{family.traits.slice(0,2).join('. ')}.</p>
    <div className="miniSpecies">{family.species.slice(0,4).map(s=><SpeciesName key={s} name={s}/>)}{family.species.length>4 && <span>+{family.species.length-4} más</span>}</div>
    <div className="openLine">Ver ficha <ChevronRight size={16}/></div>
  </motion.button>
}

export default function App() {
  const [active, setActive] = useState('Todos');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [presentation, setPresentation] = useState(false);

  const filteredOrders = useMemo(() => orders.filter(o => active === 'Todos' || o.name === active).map(o => ({...o, families: o.families.filter(f => `${o.name} ${f.name} ${f.common} ${f.traits.join(' ')} ${f.species.join(' ')}`.toLowerCase().includes(query.toLowerCase()))})).filter(o => o.families.length), [active, query]);
  const totals = orders.reduce((acc,o)=>({families:acc.families+o.familyCount,species:acc.species+o.speciesCount}),{families:0,species:0});
  const openModal = (family, order) => { setSelected(family); setSelectedOrder(order); };

  return <main className={presentation ? 'app presentation' : 'app'}>
    <section className="hero">
      <div className="heroOrb one"/><div className="heroOrb two"/>
      <div className="badge"><ShieldCheck size={16}/> Información extraída del PDF</div>
      <h1>Clase Amphibia</h1>
      <p className="subtitle">Esquema alfabético por órdenes y familias, con nombres científicos en cursiva y especies endémicas o representativas mencionadas en el documento.</p>
      <div className="stats"><div><b>3</b><span>órdenes</span></div><div><b>{totals.families}</b><span>familias</span></div><div><b>{totals.species}</b><span>especies listadas</span></div></div>
      <button className="presentationBtn" onClick={()=>setPresentation(!presentation)}><Presentation size={18}/>{presentation ? 'Salir del modo presentación' : 'Modo presentación'}</button>
    </section>

    <section className="controls">
      <label><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar orden, familia o especie..."/></label>
      <label><Filter size={18}/><select value={active} onChange={e=>setActive(e.target.value)}><option>Todos</option>{orders.map(o=><option key={o.name}>{o.name}</option>)}</select></label>
    </section>

    <section className="treeIntro">
      <BookOpen size={20}/><div><h2>Esquema general</h2><p>Clase Amphibia → órdenes en orden alfabético → familias en orden alfabético → especies científicas en cursiva.</p></div>
    </section>

    <section className="orders">
      {filteredOrders.map(order => <section className="orderBlock" key={order.name} style={{'--c':order.color}}>
        <div className="orderHeader"><div className="orderIcon">{order.icon}</div><div><p className="eyebrow">Orden</p><h2>{order.name}</h2><p>{order.common}</p></div><div className="orderNumbers"><span>{order.families.length} familias</span><span>{order.speciesCount} especies</span></div></div>
        <p className="orderSummary">{order.summary}</p>
        <div className="orderTraits">{order.traits.map(t=><span key={t}>{t}</span>)}</div>
        <div className="cardsGrid">{order.families.map((family,i)=><FamilyCard key={family.name} family={family} order={order} index={i} onOpen={openModal}/>)}</div>
      </section>)}
    </section>

    <footer><GitBranch size={18}/> Fauna33 · Clase Amphibia · esquema taxonómico interactivo</footer>
    <Modal family={selected} order={selectedOrder || orders[0]} onClose={()=>setSelected(null)}/>
  </main>
}
