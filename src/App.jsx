import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Filter, BookOpen, GitBranch, X, Presentation, ChevronRight } from 'lucide-react';

const sp = (scientific, common = '') => ({ scientific, common });

const orders = [
  {
    name: 'Anura', common: 'ranas y sapos', icon: '🐸', color: '#20c565',
    summary: 'Conformada por ranas y sapos. Los adultos carecen de cola; es el grupo más numeroso y posee cuerdas vocales. En Ecuador se registran 14 familias, 65 géneros, 621 especies y 291 endémicas.',
    traits: ['Adultos sin cola', 'Patas traseras largas', 'Cabeza y tronco unidos, sin cuello estrecho', 'Machos con sacos gulares para croar', 'Tímpano descubierto', 'Extremidades anteriores con 4 dedos y posteriores con 5 dedos'],
    families: [
      { name:'Aromobatidae', common:'ranas nodrizas', traits:['Ranas nodrizas','Familia relacionada históricamente con Dendrobatidae','Incluye especies representativas del género Allobates'], species:[sp('Allobates trilineatus','rana nodriza rayada'), sp('Allobates zaparo','rana nodriza zaparo')] },
      { name:'Bufonidae', common:'sapos, jambatos, ranas arlequín', traits:['Son los llamados sapos','Piel rugosa con numerosas glándulas venenosas','Glándula parótida grande y ovoide detrás del ojo','Terrestres e insectívoros','Sin cuidado parental'], species:[sp('Andinophryne colomai','sapo andino de Coloma'),sp('Atelopus arthuri','jambato de Arthuri'),sp('Atelopus balios','jambato del río Pescado'),sp('Atelopus bomolochos','jambato de Mazán'),sp('Atelopus elegans','jambato elegante'),sp('Atelopus guanujo','jambato de Guanujo'),sp('Atelopus ignescens','jambato negro'),sp('Atelopus longirostris','jambato hocicudo'),sp('Atelopus mindoensis','jambato de Mindo'),sp('Atelopus nanay','jambato de Nanay'),sp('Atelopus planispina','jambato'),sp('Atelopus spumarius','jambato'),sp('Ollotis conifera','sapo crestado'),sp('Osornophryne antisana','sapo de Antisana'),sp('Osornophryne bufoniformis','sapo andino'),sp('Osornophryne cofanorum','sapo cofán'),sp('Osornophryne puruanta','sapo de Puruanta'),sp('Rhinella festae','sapo de Festa')] },
      { name:'Centrolenidae', common:'ranas de cristal', traits:['Vientre transparente o cristalino','En algunas especies se observan órganos internos','Adaptadas a vida arbórea','Huevos depositados en el envés de hojas sobre arroyos','Machos cuidan las puestas'], species:[sp('Centrolene buckleyi','rana de cristal de Buckley'),sp('Centrolene lynchi','rana de cristal de Lynch'),sp('Centrolene prosoblepon','rana de cristal'),sp('Cochranella midas','rana de cristal Midas'),sp('Nymphargus cochranae','rana de cristal de Cochran')] },
      { name:'Ceratophryidae', common:'sapos bocones, ranitas carnívoras', traits:['Cabeza muy ancha','Dientes maxilares sin pedicelo con aspecto de colmillo','Dos procesos odontoideos fuertes en la mandíbula','Larvas con picos córneos y dientes labiales','Anuros agresivos'], species:[sp('Ceratophrys cornuta','sapo bocón cornudo'),sp('Ceratophrys stolzmanni','sapo bocón de Stolzmann')] },
      { name:'Craugastoridae', common:'ranas cutín', traits:['Ranas cutín','Familia de anuros representada por especies terrestres','Incluye especies de los géneros Barycholos y Craugastor'], species:[sp('Barycholos pulcher','cutín de Chimbo'),sp('Craugastor longirostris','cutín de hocico largo')] },
      { name:'Dendrobatidae', common:'ranas venenosas, ranas cohete', traits:['Ranas pequeñas diurnas','Mayoría terrestres','Colores brillantes de advertencia','Piel con venenos alcaloides','Uno de los progenitores puede transportar renacuajos en la espalda'], species:[sp('Ameerega bilinguis','rana venenosa ecuatoriana'),sp('Ameerega hahneli','rana venenosa de Yurimaguas'),sp('Epipedobates anthonyi','rana nodriza de la epibatidina'),sp('Epipedobates tricolor','ranita arborícola'),sp('Hyloxalus awa','rana cohete awa'),sp('Hyloxalus bocagei','rana cohete de Bocage'),sp('Hyloxalus vertebralis','rana cohete de Cuenca'),sp('Oophaga sylvatica','kiki'),sp('Ranitomeya reticulata','rana venenosa rojiza'),sp('Ranitomeya ventrimaculata','ranita venenosa de Sarayacu')] },
      { name:'Hemiphractidae', common:'ranas marsupiales y afines', traits:['Ranas marsupiales con cavidad cutánea dorsal','Huevos fertilizados insertados en cavidad dorsal','Huevos en contacto con tejidos vasculares de la madre','Algunas especies presentan cabeza triangular y mimetismo'], species:[sp('Gastrotheca cornuta','rana marsupial cornuda'),sp('Gastrotheca guentheri','rana marsupial dentada'),sp('Gastrotheca litonedis','rana marsupial azuaya'),sp('Gastrotheca monticola','rana marsupial de montaña'),sp('Gastrotheca orophylax','rana marsupial de Papallacta'),sp('Gastrotheca pseustes','rana marsupial de San Lucas'),sp('Gastrotheca riobambae','rana marsupial'),sp('Hemiphractus fasciatus','rana de cabeza triangular de Günther'),sp('Hemiphractus scutatus','rana de cabeza triangular cornuda incubadora')] },
      { name:'Hylidae', common:'ranas arborícolas, ranas de torrente', traits:['Ranas arborícolas','Discos redondeados en los dedos','Membranas interdigitales','Depositan huevos en bromelias','Mayoría activas durante la noche','Discos expandidos como adaptación a la vida en árboles'], species:[sp('Cruziohyla calcarifer','rana espléndida'),sp('Cruziohyla craspedopus','rana de hoja amazónica'),sp('Dendropsophus bifurcus','ranita payaso pequeña'),sp('Dendropsophus brevifrons','ranita arbórea de Crump'),sp('Dendropsophus carnifex','ranita arbórea de Lynch'),sp('Dendropsophus ebraccatus','ranita reloj de arena'),sp('Dendropsophus marmoratus','ranita marmórea'),sp('Dendropsophus minutus','ranita amarilla común'),sp('Dendropsophus parviceps','ranita caricorta'),sp('Dendropsophus sarayacuensis','ranita de Sarayacu'),sp('Hypsiboas calcaratus','rana arbórea de espolones'),sp('Hypsiboas cinerascens','rana granosa'),sp('Hypsiboas nympha','rana arbórea ninfa')] },
      { name:'Leptodactylidae', common:'ranas terrestres', traits:['Incluye especies de gran tamaño','Nidos en espuma','Al capturarlas pueden emitir sonidos como niño recién nacido','Depositan huevos en tierra o nidos de espuma','Muchas especies amazónicas tienen hábitos nocturnos y arbóreos'], species:[sp('Engystomops coloradorum','rana túngara Tsáchila'),sp('Engystomops montubio','rana túngara montubia'),sp('Engystomops petersi','rana enana de Peters'),sp('Leptodactylus andreae','rana toro tropical'),sp('Leptodactylus discodactylus','rana terrestre de Vanzolini'),sp('Leptodactylus knudseni','sapo terrestre amazónico'),sp('Leptodactylus labrosus','rana terrestre labiosa'),sp('Leptodactylus melanonotus','rana selvática negra'),sp('Leptodactylus mystaceus','sapo-rana terrestre común'),sp('Leptodactylus pentadactylus','rana terrestre gigante'),sp('Leptodactylus wagneri','rana terrestre de Wagner'),sp('Lithodytes lineatus','rana terrestre rayada')] },
      { name:'Microhylidae', common:'ranas de hojarasca', traits:['Cuerpo redondeado con forma de gota en vista dorsal','Hocico puntiagudo','Cabeza corta respecto al cuerpo','Ojos pequeños','Extremidades cortas y piel lisa','Depositan muchos huevos pequeños y pigmentados'], species:[sp('Chiasmocleis bassleri','rana de hojarasca de hocico puntón'),sp('Chiasmocleis ventrimaculata','rana de hojarasca del río Pastaza'),sp('Hamptophryne boliviana','rana de hojarasca boliviana')] },
      { name:'Pipidae', common:'sapo de Surinam', traits:['Completamente acuáticos','Grandes membranas entre los dedos','Cabeza y cuerpo aplanados','Carecen de párpados','Huevos en bolsas en la espalda'], species:[sp('Pipa pipa','rana sin lengua')] },
      { name:'Ranidae', common:'ranas comunes', traits:['Patas largas y musculosas','Membranas interdigitales en los pies','Cuerpo hidrodinámico ideal para saltar y nadar','Reproducción acuática','Grupo de ranas verdaderas'], species:[sp('Lithobates bwana','rana común del río de Dixon'),sp('Lithobates palmipes','rana común del río Amazonas'),sp('Lithobates vaillanti','rana común de Vaillant')] },
      { name:'Strabomantidae', common:'ranas cutín', traits:['Antes Leptodactylidae; actual Strabomantidae','Discos de los dedos truncados o en forma de T','Incluye cutines y sapitos de hojarasca'], species:[sp('Noblella heyeri','rana sureña de Heyer'),sp('Noblella myrmecoides','rana sureña de Loreto'),sp('Oreobates quixensis','sapito bocón amazónico'),sp('Pristimantis achatinus','cutín común de occidente'),sp('Pristimantis acuminatus','cutín puntiagudo'),sp('Pristimantis altamazonicus','cutín amazónico'),sp('Pristimantis condor','cutín condor'),sp('Pristimantis conspicillatus','cutín de Zamora'),sp('Pristimantis eriphus','cutín de musgo'),sp('Pristimantis galdi','cutín verde amazónico')] },
      { name:'Telmatobiidae', common:'kaylas, urcos, ranas acuáticas', traits:['Endémicas de la cordillera andina en Sudamérica','Ranas acuáticas andinas'], species:[sp('Telmatobius cirrhacelis','uco de Loja'),sp('Telmatobius niger','uco de manchas naranjas'),sp('Telmatobius vellardi','uco de Vellard')] }
    ]
  },
  {
    name: 'Caudata', common: 'salamandras', icon: '🦎', color: '#22a6f2',
    summary: 'Orden de salamandras. Presentan cabeza y cuello diferenciados, tronco largo y cilíndrico, cola larga y patas delanteras y traseras de tamaño similar.',
    traits: ['Cabeza y cuello diferenciados', 'Tronco largo y cilíndrico', 'Larga cola', 'Patas delanteras y traseras de igual tamaño'],
    families: [
      { name:'Plethodontidae', common:'salamandras', traits:['Única familia presente en Sudamérica','Carecen de pulmones','Respiran por la piel y epitelios de la cavidad bucofaríngea','Fecundación interna','Piel lisa, flexible, sin escamas y generalmente húmeda','Todas son carnívoras'], species:[sp('Bolitoglossa altamazonica','salamandra amazónica'),sp('Bolitoglossa biseriata','salamandra de dos bandas'),sp('Bolitoglossa chica','salamandra chica'),sp('Bolitoglossa equatoriana','salamandra ecuatoriana'),sp('Bolitoglossa medemi','salamandra de Medem'),sp('Bolitoglossa palmata','salamandra palmeada'),sp('Bolitoglossa peruviana','salamandra peruana'),sp('Bolitoglossa sima','salamandra del noroccidente'),sp('Oedipina complex','salamandra de Gamboa')] }
    ]
  },
  {
    name: 'Gymnophiona', common: 'cecilias', icon: '🪱', color: '#b977ff',
    summary: 'Orden de anfibios sin patas. Tienen cuerpo largo, casi sin cola, ojos reducidos por su vida subterránea y son difíciles de observar porque rara vez salen de sus madrigueras.',
    traits: ['Anfibios sin patas', 'Cuerpo largo y casi sin cola', 'Ojos reducidos por forma de vida subterránea', 'Excavadoras', 'Difíciles de observar'],
    families: [
      { name:'Caeciliidae', common:'culebras ciegas', traits:['Habitan bajo tierra en galerías de hasta 1 m','Viven entre desechos vegetales, árboles caídos y agua','Miden de 30 cm a 1 m','Hábitos nocturnos','Boca subterminal','Cráneo macizo como adaptación a vida subterránea'], species:[sp('Caecilia abitaguae','cecilia de Abitagua'),sp('Caecilia albiventris','cecilia de vientre blanco'),sp('Caecilia attenuata','cecilia de Santa Rosa'),sp('Caecilia bokermanni','cecilia de Bokermann'),sp('Caecilia crassisquama','cecilia de Normandía'),sp('Caecilia disossea','cecilia del río Santiago'),sp('Caecilia dunni','cecilia de Dunn'),sp('Caecilia guntheri','cecilia de Gunther'),sp('Caecilia leucocephala','cecilia de cabeza blanca'),sp('Caecilia nigricans','cecilia del río Lita'),sp('Caecilia orientalis','cecilia oriental'),sp('Caecilia pachynema','cecilia de Intac'),sp('Caecilia subterminalis','cecilia de Taylor'),sp('Caecilia tentaculata','cecilia Yamba'),sp('Caecilia tenuissima','cecilia de Guayaquil'),sp('Oscaecilia bassleri','cecilia del río Pastaza'),sp('Oscaecilia equatorialis','cecilia de Ecuador')] },
      { name:'Rhinatrematidae', common:'cecilias anilladas', traits:['Cuerpo fuertemente anillado','Ranuras secundarias y terciarias','Cuerpo termina en cola corta pero verdadera','Ojos visibles externamente','Oído medio con columnuela'], species:[sp('Epicrionops bicolor','cecilia bicolor'),sp('Epicrionops petersi','cecilia de Peters')] },
      { name:'Siphonopidae', common:'cecilias de bosques húmedos', traits:['Se distribuyen por Sudamérica','Habitan bosques húmedos tropicales o subtropicales','También se registran en plantaciones, jardines rurales y zonas degradadas previamente boscosas'], species:[sp('Microcaecilia albiceps','microcecilia de cabeza blanca'),sp('Siphonops annulatus','cecilia de anillos')] },
      { name:'Typhlonectidae', common:'cecilias acuáticas amazónicas', traits:['Cecilias asociadas a bosque húmedo tropical amazónico','Una especie se registra sobre 1.000 m de altitud en la provincia de Napo'], species:[sp('Chthonerpeton onorei','cecilia de El Reventador'),sp('Potomotyphlus kaupii','cecilia de Kaupi')] }
    ]
  }
].map(order => ({
  ...order,
  families: [...order.families].sort((a,b)=>a.name.localeCompare(b.name)).map(f => ({ ...f, species: [...f.species].sort((a,b)=>a.scientific.localeCompare(b.scientific)) })),
})).map(order => ({ ...order, familyCount: order.families.length, speciesCount: order.families.reduce((n,f)=>n+f.species.length,0)}));

function SpeciesName({ item }) {
  return <span className="speciesText"><em className="scientific">{item.scientific}</em>{item.common && <span className="commonName"> — {item.common}</span>}</span>;
}

function Modal({ family, order, onClose }) {
  return <AnimatePresence>{family && <motion.div className="modalBackdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}>
    <motion.article className="modal" style={{'--c': order.color}} initial={{opacity:0,y:28,scale:.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:28,scale:.96}} onClick={e=>e.stopPropagation()}>
      <button className="close" onClick={onClose}><X size={20}/></button>
      <div className="modalHead"><div className="bigIcon">{order.icon}</div><div><p className="eyebrow">Orden {order.name} · Familia</p><h2>{family.name}</h2><p className="common">{family.common}</p></div></div>
      <div className="infoGrid familyOnly">
        <section className="wide"><h3>Características de la familia</h3>{family.traits.map(t=><p key={t}>• {t}</p>)}</section>
        <section className="wide"><h3>Especies representativas</h3>{family.species.length ? <div className="speciesGrid">{family.species.map(s=><div className="species" key={s.scientific}><SpeciesName item={s}/></div>)}</div> : <p>No se detallan especies científicas para esta familia.</p>}</section>
      </div>
    </motion.article>
  </motion.div>}</AnimatePresence>
}

function FamilyCard({ family, order, index, onOpen }) {
  return <motion.button className="familyCard" style={{'--c': order.color}} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:index*.025}} onClick={()=>onOpen(family, order)}>
    <div className="cardTop"><span>{String(index+1).padStart(2,'0')}</span><b>{family.name}</b></div>
    <p className="common">{family.common}</p>
    <p className="traitPreview">{family.traits.slice(0,2).join('. ')}.</p>
    <div className="miniSpecies">{family.species.slice(0,3).map(s=><SpeciesName key={s.scientific} item={s}/>)}{family.species.length>3 && <span>+{family.species.length-3} más</span>}</div>
    <div className="openLine">Ver ficha <ChevronRight size={16}/></div>
  </motion.button>
}

export default function App() {
  const [active, setActive] = useState('Todos');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [presentation, setPresentation] = useState(false);
  const filteredOrders = useMemo(() => orders.filter(o => active === 'Todos' || o.name === active).map(o => ({...o, families: o.families.filter(f => `${o.name} ${f.name} ${f.common} ${f.traits.join(' ')} ${f.species.map(s=>`${s.scientific} ${s.common}`).join(' ')}`.toLowerCase().includes(query.toLowerCase()))})).filter(o => o.families.length), [active, query]);
  const openModal = (family, order) => { setSelected(family); setSelectedOrder(order); };

  return <main className={presentation ? 'app presentation' : 'app'}>
    <section className="hero coverOnly"><div className="heroOrb one"/><div className="heroOrb two"/><h1>Clasificación Amphibia</h1></section>
    <section className="controls"><label><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar orden, familia o especie..."/></label><label><Filter size={18}/><select value={active} onChange={e=>setActive(e.target.value)}><option>Todos</option>{orders.map(o=><option key={o.name}>{o.name}</option>)}</select></label></section>
    <section className="treeIntro"><BookOpen size={20}/><div><h2>Esquema general</h2><p>Clase Amphibia → órdenes en orden alfabético → familias en orden alfabético → especies científicas en cursiva.</p></div><button className="presentationBtn small" onClick={()=>setPresentation(!presentation)}><Presentation size={18}/>{presentation ? 'Salir' : 'Presentar'}</button></section>
    <section className="orders">{filteredOrders.map(order => <section className="orderBlock" key={order.name} style={{'--c':order.color}}><div className="orderHeader"><div className="orderIcon">{order.icon}</div><div><p className="eyebrow">Orden</p><h2>{order.name}</h2><p>{order.common}</p></div><div className="orderNumbers"><span>{order.families.length} familias</span><span>{order.speciesCount} especies</span></div></div><p className="orderSummary">{order.summary}</p><div className="orderTraits">{order.traits.map(t=><span key={t}>{t}</span>)}</div><div className="cardsGrid">{order.families.map((family,i)=><FamilyCard key={family.name} family={family} order={order} index={i} onOpen={openModal}/>)}</div></section>)}</section>
    <footer><GitBranch size={18}/> Fauna33 · Clase Amphibia · esquema taxonómico interactivo</footer>
    <Modal family={selected} order={selectedOrder || orders[0]} onClose={()=>setSelected(null)}/>
  </main>
}
