const LISTA_CONTACTOS = "contactos";

let contactos = carregarContactos();
let contactoEmEdicaoId = null;

function carregarContactos() {
    const contactosGuardados = localStorage.getItem(LISTA_CONTACTOS);
    return contactosGuardados ? JSON.parse(contactosGuardados) : [];
}

function guardarContactos() {
    localStorage.setItem(LISTA_CONTACTOS, JSON.stringify(contactos));
}

function lerFormulario() {
    return {
        id: Date.now().toString(),
        nome: document.getElementById("adicionarNome").value.trim(),
        numero: document.getElementById("adicionarNumero").value.trim(),
        email: document.getElementById("adicionarEmail").value.trim(),
        nota: document.getElementById("adicionarNota").value.trim()
    };
}

function limparFormulario() {
    document.getElementById("adicionarNome").value = "";
    document.getElementById("adicionarNumero").value = "";
    document.getElementById("adicionarEmail").value = "";
    document.getElementById("adicionarNota").value = "";
}

function atualizarTextoBotao() {
    const botaoAdicionar = document.getElementById("adicionarContacto");

    if (!botaoAdicionar) {
        return;
    }

    botaoAdicionar.textContent = contactoEmEdicaoId ? "Guardar Alterações" : "Adicionar Contacto";
}

function preencherFormulario(contacto) {
    document.getElementById("adicionarNome").value = contacto.nome;
    document.getElementById("adicionarNumero").value = contacto.numero;
    document.getElementById("adicionarEmail").value = contacto.email;
    document.getElementById("adicionarNota").value = contacto.nota;
    document.getElementById("adicionarNome").focus();
}

function iniciarEdicaoContacto(contactoId) {
    const contacto = contactos.find(function(item) {
        return item.id === contactoId;
    });

    if (!contacto) {
        return;
    }

    contactoEmEdicaoId = contacto.id;
    preencherFormulario(contacto);
    atualizarTextoBotao();
}

function eliminarContacto(contactoId) {
    contactos = contactos.filter(function(item) {
        return item.id !== contactoId;
    });

    if (contactoEmEdicaoId === contactoId) {
        contactoEmEdicaoId = null;
        limparFormulario();
        atualizarTextoBotao();
    }

    guardarContactos();
    renderizarLista();
}

function renderizarLista() {
    const lista = document.getElementById("listaContactos");

    if (!lista) {
        return;
    }

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
        link.href = "contato.html?id=" + contacto.id;

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
            iniciarEdicaoContacto(contacto.id);
        });

        const botaoEliminar = document.createElement("button");
        botaoEliminar.type = "button";
        botaoEliminar.className = "botao-acao botao-acao-perigo";
        botaoEliminar.textContent = "Eliminar";
        botaoEliminar.addEventListener("click", function() {
            eliminarContacto(contacto.id);
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

function adicionarContacto() {
    const novoContacto = lerFormulario();

    if (!novoContacto.nome || !novoContacto.numero) {
        alert("Por favor, preencha pelo menos o nome e o número do contacto.");
        return;
    }

    if(novoContacto.nome.length < 3) {
        alert("O nome do contacto deve conter pelo menos 3 caracteres.");
        return;
    }

    if (novoContacto.numero.length !== 9) {
        alert("O número de telefone deve conter exatamente 9 dígitos.");
        return;
    }

    if (novoContacto.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(novoContacto.email)) {
        alert("Por favor, insira um endereço de email válido.");
        return;
    }

    if (contactoEmEdicaoId) {
        contactos = contactos.map(function(contacto) {
            if (contacto.id !== contactoEmEdicaoId) {
                return contacto;
            }

            return {
                id: contacto.id,
                nome: novoContacto.nome,
                numero: novoContacto.numero,
                email: novoContacto.email,
                nota: novoContacto.nota
            };
        });

        contactoEmEdicaoId = null;
    } else {
        contactos.push(novoContacto);
    }

    guardarContactos();
    renderizarLista();
    limparFormulario();
    atualizarTextoBotao();
}

function renderizarDetalheContacto() {
    const detalheNome = document.getElementById("detalheNome");

    if (!detalheNome) {
        return;
    }

    const parametros = new URLSearchParams(window.location.search);
    const contactoId = parametros.get("id");
    const contacto = contactos.find(function(item) {
        return item.id === contactoId;
    });

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
    const botaoAdicionar = document.getElementById("adicionarContacto");

    if (botaoAdicionar) {
        botaoAdicionar.addEventListener("click", adicionarContacto);
        atualizarTextoBotao();
        renderizarLista();
    }

    renderizarDetalheContacto();
});