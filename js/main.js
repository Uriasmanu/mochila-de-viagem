// Operador lógico que retorna com dados salvos, ou string vazia, utilizando localStorage.getItem, modificando o valor de `string` com JSON.parse()

const form = document.getElementById("novoItem") 
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []   

// Uso do forEach para que todos os itens já escritos na lista sejam mantidos ao atualizar a página 
itens.forEach( (elemento) => {    
    criaElemento(elemento)
} )     

// Refatoração do addEventListener para receber as funções extras da função criaElemento
form.addEventListener("submit", (evento) => {   
    evento.preventDefault()            

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    // Const para conferir se o elemento nome no array tens ja existe

    const existe = itens.find (elemento => elemento.nome === nome.value);

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
        }

    // Condicional para conferir se o elemento 
    if (existe) {
        itemAtual.id = existe.id // esse existe.id referece ao item recem adicionado, se ele existe então substitui

        atualizaElemento(itemAtual) // então a função recebe esse item atualizado

        itens[existe.id] = itemAtual // não entendi o que acontece aqui
    } else{
        itemAtual.id = itens.length // Se o elemento não existe, então esse novo item recebe o id referente a posição dele no array

        criaElemento(itemAtual) // cria um novo elemento

        itens.push(itemAtual) // adiciona ele na lista
    }

    criaElemento(itemAtual)

    itens.push(itemAtual)

    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
})

// Refatoração da função `criaElemento` para que possua apenas a função que faça sentido ao nome. 

function criaElemento(item) {  
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id //Não entendi muito bem como funciona essa parte
    novoItem.appendChild(numeroItem)

    novoItem.innerHTML += item.nome

    lista.appendChild(novoItem)
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade // Não entendi como funciona esta parte
}