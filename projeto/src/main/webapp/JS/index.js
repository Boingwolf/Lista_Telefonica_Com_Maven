function removerContacto(contactoId) {
    eliminarContacto(contactoId);
    renderizarLista();
}

function renderizarLista() {
    const lista = document.getElementById("listaContactos");

    if (!lista) {
        return;
    }

    const contactos = getContactos();
    lista.innerHTML = "";

    if (contactos.length === 0) {
        const itemVazio = document.createElement("li");
        itemVazio.className = "contacto-vazio";
        itemVazio.textContent = "Ainda não existem contactos.";
        lista.appendChild(itemVazio);
        return;
    }

    contactos.forEach(function(contacto) {
        const item = document.createElement("li");
        item.className = "contacto-item";

        const link = document.createElement("a");
        link.className = "contacto-link";
        link.href = "HTML/contato.html?id=" + contacto.id;

        const nome = document.createElement("strong");
        nome.textContent = contacto.nome;

        const resumo = document.createElement("span");
        resumo.textContent = contacto.numero + " | " + contacto.email;

        const acoes = document.createElement("div");
        acoes.className = "contacto-acoes";

        const botaoEditar = document.createElement("button");
        botaoEditar.type = "button";
        botaoEditar.className = "botao-acao";
        botaoEditar.textContent = "Editar";
        botaoEditar.addEventListener("click", function() {
            window.location.href = "HTML/formContactos.html?id=" + contacto.id;
        });

        const botaoEliminar = document.createElement("button");
        botaoEliminar.type = "button";
        botaoEliminar.className = "botao-acao botao-acao-perigo";
        botaoEliminar.textContent = "Eliminar";
        botaoEliminar.addEventListener("click", function() {
            removerContacto(contacto.id);
        });

        link.appendChild(nome);
        link.appendChild(resumo);
        acoes.appendChild(botaoEditar);
        acoes.appendChild(botaoEliminar);
        item.appendChild(link);
        item.appendChild(acoes);
        lista.appendChild(item);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    renderizarLista();
});
