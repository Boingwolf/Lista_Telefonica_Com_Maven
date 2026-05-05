function renderizarDetalheContacto() {
    const detalheNome = document.getElementById("detalheNome");

    if (!detalheNome) {
        return;
    }

    const parametros = new URLSearchParams(window.location.search);
    const contactoId = parametros.get("id");
    const contacto = getContactoById(contactoId);

    if (!contacto) {
        detalheNome.textContent = "Contacto não encontrado";
        document.getElementById("detalheNumero").textContent = "";
        document.getElementById("detalheEmail").textContent = "";
        document.getElementById("detalheNota").textContent = "";
        return;
    }

    detalheNome.textContent = contacto.nome;
    document.getElementById("detalheNumero").textContent = "Número: " + contacto.numero;
    document.getElementById("detalheEmail").textContent = "Email: " + contacto.email;
    document.getElementById("detalheNota").textContent = "Nota: " + contacto.nota;
}

document.addEventListener("DOMContentLoaded", function() {
    renderizarDetalheContacto();
});
