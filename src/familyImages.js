const familyImages = {
  Aromobatidae: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Allobates_zaparo.jpg',
  Bufonidae: 'https://multimedia20stg.blob.core.windows.net/especiesreduced/balioslateral.jpg',
  Centrolenidae: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Centrolene_buckleyi.jpg',
  Ceratophryidae: 'https://multimedia20stg.blob.core.windows.net/especies/mg6683.jpg',
  Craugastoridae: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn05HhVCvRjriMoP4H29vkJyTQfFj5sNbb5_-DblgkykktZG805YL0IUnm&s=10',
  Strabomantidae: 'https://multimedia20stg.blob.core.windows.net/especies/20090204_03730.jpg',
  Dendrobatidae: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Epipedobates_tricolor_close.jpg',
  Hemiphractidae: 'https://multimedia20stg.blob.core.windows.net/especies/2014_02_10_44156.jpg',
  Hylidae: 'https://multimedia20stg.blob.core.windows.net/especies/1354QCAZ_2017_09_20_11609.jpg',
  Leptodactylidae: 'https://multimedia20stg.blob.core.windows.net/especies/_mg_0092.jpg',
  Microhylidae: 'https://multimedia20stg.blob.core.windows.net/especies/20070801_7278.jpg',
  Pipidae: 'https://multimedia20stg.blob.core.windows.net/especies/20090712_094302.jpg',
  Ranidae: 'https://multimedia20stg.blob.core.windows.net/especies/r_000272.jpg',
  Telmatobiidae: 'https://c1.staticflickr.com/9/8584/29523776944_1468c6df78_c.jpg',
  Plethodontidae: 'https://multimedia20stg.blob.core.windows.net/especies/115-1553_IMG.jpg',
  Caeciliidae: 'https://multimedia20stg.blob.core.windows.net/especies/02394_s_10afattwuq0456.jpg',
  Rhinatrematidae: 'https://multimedia20stg.blob.core.windows.net/especies/2007-02-13_bicolor_f_dl_tng_cr_8_.jpg',
  Siphonopidae: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Siphonops_annulatus_IRDias_2014.png',
  Typhlonectidae: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Chthonerpeton_indistinctum.jpg'
};

function normalize(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function getFamilyFromCard(card) {
  const title = card.querySelector('.cardTop b');
  return title?.textContent?.trim();
}

function getFamilyFromModal(modal) {
  const title = modal.querySelector('.modalHead h2');
  return title?.textContent?.trim();
}

function makeImage(family, variant = 'card') {
  const src = familyImages[family];
  if (!src) return null;
  const wrap = document.createElement('div');
  wrap.className = variant === 'modal' ? 'familyImage familyImageModal' : 'familyImage';
  const img = document.createElement('img');
  img.src = src;
  img.alt = `Imagen representativa de ${family}`;
  img.loading = 'lazy';
  img.referrerPolicy = 'no-referrer';
  img.onerror = () => wrap.classList.add('imageError');
  wrap.appendChild(img);
  return wrap;
}

function injectCardImages() {
  document.querySelectorAll('.familyCard').forEach(card => {
    if (card.querySelector('.familyImage')) return;
    const family = getFamilyFromCard(card);
    const image = makeImage(family, 'card');
    const common = card.querySelector('.common');
    if (image && common) common.insertAdjacentElement('afterend', image);
  });
}

function injectModalImage() {
  const modal = document.querySelector('.modal');
  if (!modal || modal.querySelector('.familyImageModal')) return;
  const family = getFamilyFromModal(modal);
  const image = makeImage(family, 'modal');
  const head = modal.querySelector('.modalHead');
  if (image && head) head.insertAdjacentElement('afterend', image);
}

function injectImages() {
  injectCardImages();
  injectModalImage();
}

const observer = new MutationObserver(injectImages);
window.addEventListener('DOMContentLoaded', () => {
  injectImages();
  observer.observe(document.body, { childList: true, subtree: true });
});
setTimeout(injectImages, 500);
setTimeout(injectImages, 1500);
