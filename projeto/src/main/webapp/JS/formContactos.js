function lerFormulario() {
    return {
        nome: document.getElementById("adicionarNome").value.trim(),
        numero: document.getElementById("adicionarNumero").value.trim(),
        email: document.getElementById("adicionarEmail").value.trim(),
        nota: document.getElementById("adicionarNota").value.trim()
    };
}

function preencherFormulario(contacto) {
    document.getElementById("adicionarNome").value = contacto.nome || "";
    document.getElementById("adicionarNumero").value = contacto.numero || "";
    document.getElementById("adicionarEmail").value = contacto.email || "";
    document.getElementById("adicionarNota").value = contacto.nota || "";
}

function obterIdContactoAtual() {
    const parametros = new URLSearchParams(window.location.search);
    return parametros.get("id");
}

function limparErros() {
    document.getElementById("erroNome").textContent = "";
    document.getElementById("erroNumero").textContent = "";
    document.getElementById("erroEmail").textContent = "";
    document.getElementById("erroNota").textContent = "";

    document.getElementById("adicionarNome").classList.remove("input-erro");
    document.getElementById("adicionarNumero").classList.remove("input-erro");
    document.getElementById("adicionarEmail").classList.remove("input-erro");
    document.getElementById("adicionarNota").classList.remove("input-erro");
}

function mostrarErro(campoId, erroId, mensagem) {
    document.getElementById(erroId).textContent = mensagem;
    document.getElementById(campoId).classList.add("input-erro");
}

function validarContacto(contacto) {
    let formularioValido = true;

    limparErros();

    if (!contacto.nome) {
        mostrarErro("adicionarNome", "erroNome", "O nome é obrigatório.");
        formularioValido = false;
    }

    if (contacto.nome && contacto.nome.length < 3) {
        mostrarErro("adicionarNome", "erroNome", "O nome deve conter pelo menos 3 caracteres.");
        formularioValido = false;
    }

    if (!contacto.numero) {
        mostrarErro("adicionarNumero", "erroNumero", "O número de telefone é obrigatório.");
        formularioValido = false;
    }

    if (contacto.numero && !/^[0-9]{9}$/.test(contacto.numero)) {
        mostrarErro("adicionarNumero", "erroNumero", "O número deve conter exatamente 9 dígitos.");
        formularioValido = false;
    }

    if (contacto.numero && !/^[92]/.test(contacto.numero)) {
        mostrarErro("adicionarNumero", "erroNumero", "O número deve começar por 9 ou por 2.");
        formularioValido = false;
    }

    if (contacto.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacto.email)) {
        mostrarErro("adicionarEmail", "erroEmail", "Insira um endereço de email válido.");
        formularioValido = false;
    }

    return formularioValido;
}

function atualizarInterfaceEdicao(contactoId) {
    if (!contactoId) {
        return;
    }

    const titulo = document.querySelector(".site-brand");
    const botao = document.getElementById("adicionarContacto");
    const contacto = getContactoById(contactoId);

    if (!contacto) {
        return;
    }

    if (titulo) {
        titulo.textContent = "Editar Contacto";
    }

    if (botao) {
        botao.textContent = "Guardar Alterações";
    }

    preencherFormulario(contacto);
}

function guardarOuAtualizarContacto() {
    const contacto = lerFormulario();
    const contactoId = obterIdContactoAtual();

    if (!validarContacto(contacto)) {
        return;
    }

    if (contactoId) {
        atualizarContacto({
            id: contactoId,
            nome: contacto.nome,
            numero: contacto.numero,
            email: contacto.email,
            nota: contacto.nota
        });
    } else {
        guardarContacto(contacto);
    }

    window.location.href = "../index.html";
}

document.addEventListener("DOMContentLoaded", function() {
    const botaoAdicionar = document.getElementById("adicionarContacto");
    const contactoId = obterIdContactoAtual();

    atualizarInterfaceEdicao(contactoId);

    if (!botaoAdicionar) {
        return;
    }

    botaoAdicionar.addEventListener("click", guardarOuAtualizarContacto);
});