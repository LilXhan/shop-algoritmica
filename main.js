//
const list = document.querySelector('#list');
const templateList = document.querySelector('#templateList');
const fragmentList = document.createDocumentFragment();

// Total

const listFooter = document.querySelector('#listFooter');
const templateFooter = document.querySelector('#templateFooter');

let arrayCarrito = [];

document.addEventListener('click', (e) => {
  if (e.target.matches('#listCss')) {
    printCarrito();
  };
  if (e.target.matches('.col-sm-3 .card-body .btn')) {
    add(e);
  };
  if (e.target.matches('div .btn-success')) {
    featureAdd(e);
  };
  if (e.target.matches('div .btn-danger')) {
    featureDelete(e);
  }
});

const add = (e) => {
  const component = {
    nombre: e.target.dataset.item,
    precio: Number(e.target.dataset.precio),
    cantidad: 1
  };

  const verification = arrayCarrito.some(item => item.nombre === component.nombre);
  const indice = arrayCarrito.findIndex(item => item.nombre === component.nombre);

  if (verification === false) {
    arrayCarrito.push(component);
  } else {
    arrayCarrito[indice].cantidad++;
  }
  printCarrito();
  printTotal();
};

const printCarrito = () => {
  list.textContent = '';
  arrayCarrito.forEach(item => {
    const cloneTemplateList = templateList.content.firstElementChild.cloneNode(true);
    cloneTemplateList.querySelector('#component').textContent = item.nombre;
    cloneTemplateList.querySelector('.badge').textContent = item.cantidad;
    cloneTemplateList.querySelector('.lead').textContent = `Precio: $${item.cantidad * item.precio}`;
    cloneTemplateList.querySelector('div .btn-success').dataset.id = item.nombre;
    cloneTemplateList.querySelector('div .btn-danger').dataset.id = item.nombre;
    fragmentList.appendChild(cloneTemplateList);
  });
  list.appendChild(fragmentList);
  printTotal();
};



const printTotal = () => {
  listFooter.textContent = '';

  const total = arrayCarrito.reduce((acc, current) => acc + current.cantidad * current.precio, 0)
  if(total > 0) {
  const cloneTemplateFooter = templateFooter.content.firstElementChild.cloneNode(true);
  cloneTemplateFooter.querySelector('.card-body #total').textContent = `Precio Total: $${total}`
  listFooter.appendChild(cloneTemplateFooter);
  }
}


const featureAdd = (e) => {
  arrayCarrito = arrayCarrito.map(item => {
    if (e.target.dataset.id === item.nombre) {
      item.cantidad++;
    }
    return item;
  });
  printCarrito();
};

const featureDelete = (e) => {
  arrayCarrito = arrayCarrito.filter(item => {
    if (e.target.dataset.id === item.nombre && item.cantidad > 0) {
      item.cantidad--;
      if (item.cantidad === 0) return;
      return item;
    }else {
     return item;
    }
  });
  printCarrito();
};
