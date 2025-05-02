

const allImages = [
  { src: "images/CaretakingServices.jpg", link: "caretaking.html", name: "Caretaking Services" },
  { src: "images/CleaningServices.jpg", link: "cleaning.html", name: "Cleaning Services" },
  { src: "images/ElectricianServices.jpg", link: "electrician.html", name: "Electrician Services" },
  { src: "images/FridgeRepairServices.jpg", link: "fridge.html", name: "Fridge Repair" },
  { src: "images/ManicureServices.jpg", link: "manicure.html", name: "Manicure Services" },
  { src: "images/paintingService.webp", link: "paintingService.html", name: "Painting Services" },
  { src: "images/plumbingServices.jpg", link: "plumbingServices.html", name: "Plumbing Services" },
  { src: "images/SaloonServices.jpg", link: "SaloonServices.html", name: "Saloon Services" },
  { src: "images/SecurityServices.jpg", link: "SecurityServices.html", name: "Security Services" },
  { src: "images/SpaServices.jpg", link: "SpaServices.html", name: "Spa Services" }
];

const electricalImages = [
  { src: "images/Electronic items servicse/PCrepairServices.webp", link: "pc.html", name: "PC Repair" },
  { src: "images/Electronic items servicse/TvService.jpg", link: "tv.html", name: "TV Repair" },
  { src: "images/Electronic items servicse/Washingmachineservices.jpg", link: "washing.html", name: "Washing Machine Service" },
  { src: "images/Electronic items servicse/waterpurifierservices.jpg", link: "water.html", name: "Water Purifier Service" }
];

let cart = [];

function renderGallery(images) {
  const gallery = document.getElementById('serviceGallery');
  gallery.innerHTML = '';

  images.forEach(img => {
    const container = document.createElement('div');

    const a = document.createElement('a');
    a.href = img.link;
    a.target = "_blank";

    const image = document.createElement('img');
    image.src = img.src;
    image.alt = img.name;
    
    a.appendChild(image);
    container.appendChild(a);

    const addButton = document.createElement('button');
    addButton.textContent = "Add to Cart";
    addButton.onclick = () => addToCart(img);

    container.appendChild(addButton);
    gallery.appendChild(container);
  });
}

function addToCart(item) {
  cart.push(item);
  updateCart();
}

function updateCart() {
  const cartCount = document.getElementById('cartCount');
  cartCount.textContent = cart.length;

  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';

  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.name;

    const name = document.createElement('span');
    name.textContent = item.name;

    cartItem.appendChild(img);
    cartItem.appendChild(name);
    cartItems.appendChild(cartItem);
  });
}

function filterElectrical() {
  renderGallery(electricalImages);
}

function showAll() {
  renderGallery(allImages);
}

window.onload = () => showAll();
