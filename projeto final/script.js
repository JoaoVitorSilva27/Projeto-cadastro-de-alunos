const listaAlunos = [
]


// CADASTRO DE ALUNOS

function salvar() {


    //VARIAVEIS

    const codigo = document.getElementById('codigo')
    const nome = document.getElementById('nome')
    const sobrenome = document.getElementById('sobrenome')
    const email = document.getElementById('email')

    const codigoValue = codigo.value.trim()
    const nomeValue = nome.value.trim()
    const sobrenomeValue = sobrenome.value.trim()
    const emailValue = email.value.trim()


    const nota1 = document.getElementById('nota1')
    const nota2 = document.getElementById('nota2')
    const nota3 = document.getElementById('nota3')

    const nota1Value = document.getElementById('nota1').value.trim()
    const nota2Value = document.getElementById('nota2').value.trim()
    const nota3Value = document.getElementById('nota3').value.trim()


    // VERIFICAÇÂO SE ESTA TUDO PREENCHIDO
    // Colocar throw new error('') junto aos alerts de erro
    if (codigoValue === "") {
        alert('======================ERRO=========================' +
            "                              " +
            'Para cadastrar um(a) aluno(a) voce deve atrelar um codigo a ele(a)!');
        return
    }
    if (nomeValue === "" || sobrenomeValue === "") {
        alert('======================ERRO=========================' +
            "                              " +
            'Preencha o campo de nome e sobrenome do aluno(a) para poder cadastra-lo(a)!')
        return
    }
    if (emailValue === "") {
        alert('======================ERRO=========================' +
            "                              " +
            'Insira o email do(a) aluno(a) no campo de prenchimento para prosseguir')
        return
    }
    if (isNaN(nota1Value) || isNaN(nota2Value) || isNaN(nota3Value)) {
        alert('======================ERRO=========================' +
            "                              " +
            'As notas devem ser preenchidas apenas com numeros')
        return
    }
    if (nota1Value === "" || nota2Value === "" || nota3Value === "") {
        alert('======================ERRO=========================' +
            "                              " +
            'Voce não pode cadastar um(a) aluno(a) sem suas notas!')
        return
    }

    // VERIFICAÇÂO SE É JA CONSTA NO SISTEMA ALGUM IGUAL (EVITAR DUPLICADOS)

    const alunofiltrocodigo = listaAlunos.find(aluno => aluno.Codigo === codigoValue.toLowerCase())
    const alunofiltronome = listaAlunos.find(aluno => aluno.Nome.toLowerCase() === nomeValue.toLowerCase())
    const alunofiltrosobrenome = listaAlunos.find(aluno => aluno.Sobrenome.toLowerCase() === sobrenomeValue.toLowerCase())
    const alunofiltroemail = listaAlunos.find(aluno => aluno.Email === emailValue.toLowerCase())

    if (alunofiltrocodigo) {
        alert('Codigo de aluno ja alocado a outro aluno no sistema, favor utilizar outro!')
        return
    } if (alunofiltronome && alunofiltrosobrenome) {
        alert('Nome de aluno ja existente no sistema, favor utilizar outro!')
        return
    }
     if (alunofiltroemail) {
        alert('Email ja cadastrado na lista, favor utilizar outro!')
        return
    }


    // PUSH NO ARRAY / OBJETO
    listaAlunos.push({
        Codigo: codigoValue,
        Nome: nomeValue,
        Sobrenome: sobrenomeValue,
        Email: emailValue,
        Notas: [Number(nota1Value), Number(nota2Value), Number(nota3Value)],
        Media: (Number(nota1Value) + Number(nota2Value) + Number(nota3Value)) / 3,
        MatriculaAtiva: true
    })


    // PARA DEIXAR INPUTS EM BRANCO
    codigo.value = ""
    nome.value = ""
    sobrenome.value = ""
    email.value = ""
    nota1.value = ""
    nota2.value = ""
    nota3.value = ""

    // MSG PARA INDICAR SALVAMENTO
    const msgsalvo = document.getElementById('msgsalvo')
    msgsalvo.innerText = "Aluno(a) salvo com sucesso!"

    mostrarlista()

}


// PARTE DE FILTRAGEM
function bfiltro() {
    const filtrotxt = document.getElementById('filtro')
    const filtrado = document.getElementById('filtrado')

    const alunofiltro = listaAlunos.find(aluno => aluno.Codigo === filtrotxt.value)


    if (alunofiltro) {
        filtrado.innerText = `${alunofiltro.Nome} ${alunofiltro.Sobrenome} | ${alunofiltro.Email} | Notas: ${alunofiltro.Notas} | Media: ${Math.round(alunofiltro.Media)}`

        filtrotxt.value = ""
        console.log('ACHOU')
    }
    if (!alunofiltro) {
        filtrado.innerText = `Aluno não encontrado!`
    }
}


//APAGAR ALUNO PELO CODIGO
function bapagar() {
    const filtrotxt = document.getElementById('filtro')
    const filtrado = document.getElementById('filtrado')

    listaAlunos.splice(listaAlunos.indexOf(listaAlunos.find(aluno => aluno.Codigo === filtrotxt.value)) , 1
    )

    mostrarlista()

}

function bdesativar() {
    const filtrotxt = document.getElementById('filtro')
    const alunofiltro = listaAlunos.find(aluno => aluno.Codigo === filtrotxt.value)

    alunofiltro.MatriculaAtiva = false

    mostrarlista()
}


function mostrarlista() {
    const elementoUl = document.getElementById("itemaluno");
    elementoUl.innerHTML = ""

    for (const aluno of listaAlunos) {
        const elementoLi = document.createElement("li");
        elementoLi.innerText = `${aluno.Codigo} - ${aluno.Nome} ${aluno.Sobrenome} | ${aluno.Email} | Notas: ${aluno.Notas} |Media: ${Math.round(aluno.Media)} | Status da matricula: ${aluno.MatriculaAtiva} `;
        elementoUl.appendChild(elementoLi);
    }
}

function mostrarativos() {
    const ulativo = document.getElementById('mostrarlista2')

    ulativo.innerHTML = ""

    for (const aluno of listaAlunos) {
        const liativo = document.createElement('li')
        if (aluno.MatriculaAtiva === true) {
            liativo.innerText = `${aluno.Codigo} - ${aluno.Nome} ${aluno.Sobrenome} | ${aluno.Email} | Media: ${Math.round(aluno.Media)} | Notas: ${aluno.Notas}`
            ulativo.appendChild(liativo)
        }
    }
}

function mostrarinativos() {
    const ulativo = document.getElementById('mostrarlista2')

    ulativo.innerHTML = ""

    for (const aluno of listaAlunos) {
        const liativo = document.createElement('li')
        if (aluno.MatriculaAtiva === false) {
            liativo.innerText = `${aluno.Codigo} - ${aluno.Nome} ${aluno.Sobrenome} | ${aluno.Email} | Media: ${Math.round(aluno.Media)} | Notas: ${aluno.Notas}`
            ulativo.appendChild(liativo)
        }
    }
}

function mostrarmedia() {
    const ulativo = document.getElementById('mostrarlista2')

    ulativo.innerHTML = ""

    for (const aluno of listaAlunos) {
        const liativo = document.createElement('li')
        if (aluno.Media >= 6) {
            liativo.innerText = `${aluno.Codigo} - ${aluno.Nome} ${aluno.Sobrenome} | ${aluno.Email} | Media: ${Math.round(aluno.Media)} | Notas: ${aluno.Notas}`
            ulativo.appendChild(liativo)
        }
    }
}

function mostrarnmedia() {
    const ulativo = document.getElementById('mostrarlista2')

    ulativo.innerHTML = ""

    for (const aluno of listaAlunos) {
        const liativo = document.createElement('li')
        if (aluno.Media < 6) {
            liativo.innerText = `${aluno.Codigo} - ${aluno.Nome} ${aluno.Sobrenome} | ${aluno.Email} | Media: ${Math.round(aluno.Media)}  | Notas: ${aluno.Notas}`
            ulativo.appendChild(liativo)
        }
    }
}