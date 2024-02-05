//Tema elegido: Página que ofece servicios de diseño y remodelación de ambientes, ofreciendo un presupuesto
//inicial mínimo en base al tipo de ambiente seleccionado y superficie.

//Pedidos de datos identificatorios
const Clientes = []

class Cliente {
  constructor(info) {
    this.id = info.idCliente;
    this.nombre = info.nombreCliente;
    this.mail = info.mailCliente;
    this.telefono = info.telefonoCliente;
  }
}

function verificarDatos() {
  let nombre, mail, telefono, verificar;

  do {
    nombre = prompt("Ingrese su nombre:");
    mail = prompt("Ingrese su correo electrónico:");
    telefono = Number(prompt("Ingrese su teléfono:"));

    alert("Ud. Ingresó:\n\nNombre: " + nombre + "\nCorreo electrónico: " + mail + "\nTeléfono: " + telefono + ".");
    verificar = prompt("Son correctos los datos (SI/NO):").toUpperCase();

    if (verificar === "NO") {
      alert("Por favor, ingrese los datos nuevamente.");
    }
  } while (verificar === "NO");

  alert("¡Datos correctos! Nombre: " + nombre + "\nCorreo electrónico: " + mail + "\nTeléfono: " + telefono);
  agregarCliente(nombre, mail, telefono);
}

verificarDatos()
//carga de datos en un array con agregado de ID cliente

function agregarCliente(nombre, mail, telefono) {
  let infoCliente = {
    idCliente: Clientes.length + 1,
    nombreCliente: nombre,
    mailCliente: mail,
    telefonoCliente: telefono
  };

  let nuevoCliente = new Cliente(infoCliente);
  Clientes.push(nuevoCliente);
  ultimoCliente = nuevoCliente;

  alert("Bienvenido. Su número de ID es: " + nuevoCliente.id);
}


//arrays de modalidad de servicios 
const diseno = [
  { id_diseno: 1, ambiente_diseno: "Comedor", precio_diseno: 1100, total_diseno: 0 },
  { id_diseno: 2, ambiente_diseno: "Living", precio_diseno: 1200, total_diseno: 0 },
  { id_diseno: 3, ambiente_diseno: "Cocina", precio_diseno: 1300, total_diseno: 0 },
  { id_diseno: 4, ambiente_diseno: "Baño", precio_diseno: 1400, total_diseno: 0 },
  { id_diseno: 5, ambiente_diseno: "Habitación", precio_diseno: 1000, total_diseno: 0 },
];

const remodelacion = [
  { id_remodelacion: 1, ambiente_remodelacion: "Comedor", precio_remodelacion: 2100, total_remodelacion: 0 },
  { id_remodelacion: 2, ambiente_remodelacion: "Living", precio_remodelacion: 2200, total_remodelacion: 0 },
  { id_remodelacion: 3, ambiente_remodelacion: "Cocina", precio_remodelacion: 2300, total_remodelacion: 0 },
  { id_remodelacion: 4, ambiente_remodelacion: "Baño", precio_remodelacion: 2400, total_remodelacion: 0 },
  { id_remodelacion: 5, ambiente_remodelacion: "Habitación", precio_remodelacion: 2000, total_remodelacion: 0 },
];

//armado de variables a publicar por alert
let opcionesdiseno = "";
let opcionesremodelacion = "";


diseno.forEach(item => {
  opcionesdiseno +=
    "Nro Opción: " + item.id_diseno + "\n" +
    "Ambiente: " + item.ambiente_diseno + "\n" +
    "-----------------------------\n";
});

remodelacion.forEach(item => {
  opcionesremodelacion +=
    "Nro Opción: " + item.id_remodelacion + "\n" +
    "Ambiente: " + item.ambiente_remodelacion + "\n" +
    "-----------------------------\n";
});


//selectora de opciones y cálculo de presupuesto
while (true) {
  let modalidad = Number(prompt("Indique la modalidad elegida:\n1- Diseño\n2- Remodelación"));

  // Validación de modalidad 
  if (isNaN(modalidad) || (modalidad !== 1 && modalidad !== 2)) {
    alert("Por favor, ingrese una opción válida (1 o 2).");
    continue;
  }

  let metros, opcionDiseno, opcionRemodelacion, subtotal;

  if (modalidad === 1) {
    while (true) {
      opcionDiseno = Number(prompt(opcionesdiseno + "Seleccione una opción de 1 a 5, o indique 9 para terminar:"));

      if (opcionDiseno !== 9) {
        metros = Number(prompt("Ingrese metros cuadrados del ambiente a diseñar:"));
       //se creo función para buscar el precio en el array según opción elegida 
        function PrecioPorId(diseno, opcionDiseno) {
          const opcion = diseno.find(item => item.id_diseno === opcionDiseno);
          return opcion ? opcion.precio_diseno : null; //usa para retornar la constante opcion. condicion es el valor encontrado. si devuelve valor.
         }
        const precio = PrecioPorId(diseno, opcionDiseno);

        if (precio !== null) {
          subtotal = precio * metros;
          alert("Subtotal: $ " + precio + " * " + metros + "mts 2 = " + subtotal);
          const index = diseno.findIndex(item => item.id_diseno === opcionDiseno);

          if (index !== -1) {
            diseno[index].total_diseno += subtotal;
            alert("Subtotal acumulado para la opción " + opcionDiseno + ": $" + diseno[index].total_diseno);
          } else {
            alert("Error al actualizar el total_diseno.");
          }
        } else {
          alert("Error en opción elegida.");
        }
      } else {
        const totalDisenoSuma = diseno.reduce((acumulador, item) => acumulador + item.total_diseno, 0);
        const disenoFiltrado = diseno.filter(item => item.total_diseno !== 0);

        if (disenoFiltrado.length > 0) {
          const subtotalesDiseño = disenoFiltrado.map(item => `Subtotal por Diseño de ${item.ambiente_diseno}: $ ${item.total_diseno}`).join('\n');
          alert(`Estimado: ${ultimoCliente.nombre} \n Presupuesto por Diseño:\n${subtotalesDiseño}\n Presupuesto Total: ${totalDisenoSuma}`);
        }
        break;
      }
    }
  } else if (modalidad === 2) {
    while (true) {
      opcionRemodelacion = Number(prompt(opcionesremodelacion + "Seleccione una opción de 1 a 5, o indique 9 para terminar:"));

      if (opcionRemodelacion !== 9) {
        metros = Number(prompt("Ingrese metros cuadrados del ambiente a remodelar:"));
         //se creo función para buscar el precio en el array según opción elegida 
        function PrecioPorIdR(remodelacion, opcionRemodelacion) {
          const opcionR = remodelacion.find(item => item.id_remodelacion === opcionRemodelacion);
          return opcionR ? opcionR.precio_remodelacion : null;
        }
        const precio = PrecioPorIdR(remodelacion, opcionRemodelacion);

        if (precio !== null) {
          subtotal = precio * metros;
          alert("Subtotal: $ " + precio + " * " + metros + "mts 2 = " + subtotal);
          const index = remodelacion.findIndex(item => item.id_remodelacion === opcionRemodelacion);

          if (index !== -1) {
            remodelacion[index].total_remodelacion += subtotal;
            alert("Subtotal acumulado para la opción " + opcionRemodelacion + ": $" + remodelacion[index].total_remodelacion);
          } else {
            alert("Error al actualizar el total_remodelacion.");
          }
        } else {
          alert("Error en opción elegida.");
        }
      } else {
        const totalRemodelacionSuma = remodelacion.reduce((acumulador, item) => acumulador + item.total_remodelacion, 0);
        const remodelacionFiltrado = remodelacion.filter(item => item.total_remodelacion !== 0);

        if (remodelacionFiltrado.length > 0) {
          const subtotalesRemodelacion = remodelacionFiltrado.map(item => `Subtotal por Remodelación de ${item.ambiente_remodelacion}: $ ${item.total_remodelacion}`).join('\n');
          alert(`Estimado: ${ultimoCliente.nombre} \n Presupuesto por Remodelación:\n${subtotalesRemodelacion}\n Presupuesto Total: ${totalRemodelacionSuma}`);
        }
        break;
      }
    }
  }
  break;
}
