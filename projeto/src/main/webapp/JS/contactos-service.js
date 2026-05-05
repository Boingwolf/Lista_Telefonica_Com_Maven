const LISTA_CONTACTOS = "contactos";

function getContactos() {
    const contactosGuardados = localStorage.getItem(LISTA_CONTACTOS);
    return contactosGuardados ? JSON.parse(contactosGuardados) : [];
}

function setContactos(contactos) {
    localStorage.setItem(LISTA_CONTACTOS, JSON.stringify(contactos));
}

function guardarContacto(contacto) {
    const contactos = getContactos();

    contactos.push({
        id: Date.now().toString(),
        nome: contacto.nome,
        numero: contacto.numero,
        email: contacto.email,
        nota: contacto.nota
    });

    setContactos(contactos);
}

function atualizarContacto(contactoAtualizado) {
    const contactos = getContactos().map(function(contacto) {
        if (contacto.id !== contactoAtualizado.id) {
            return contacto;
        }

        return contactoAtualizado;
    });

    setContactos(contactos);
}

function eliminarContacto(id) {
    const contactos = getContactos().filter(function(contacto) {
        return contacto.id !== id;
    });

    setContactos(contactos);
}

function getContactoById(id) {
    return getContactos().find(function(contacto) {
        return contacto.id === id;
    }) || null;
}
