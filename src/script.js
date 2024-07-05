const botaoAdiciona = document.getElementById("botao")
const areaCartoes = document.getElementById("cartoes")
const inpUsuario = document.getElementById("usuario")
botaoAdiciona.addEventListener("click", () => {
    if (inpUsuario.value === ''){
        alert("Entre com um usuário válido")
    } else{
        adicionaCartao()
        inpUsuario.value = ''
    }
})
inpUsuario.addEventListener("keypress", (e) =>{
    if (e.key === 'Enter'){
        criaCartao()
        inpUsuario.value = ''
    }
})
function criaCartao() {
    const novoCartao = document.createElement("div")
    let user = inpUsuario.value
    let link = `https://api.github.com/users/${user}`

    fetch(link)
        .then((resposta) => {
            if (!resposta.ok){
                throw new Error("Usuário não encontrado")
            }
            return resposta.json()
        })
        .then((dados) => {
            let pfp = dados.avatar_url

            novoCartao.innerHTML = `        
            <div class="border-solid border-2 bg-purple-700 border-purple-700 h-96 w-80 flex flex-col m-4 rounded-md" id="box'">
                <img id="profPic" src=${pfp}
                    class="rounded-full  w-20 h-20 border-4 border-black self-center absolute top-40">
                <img id="imgFundo" src="nah-id-win-gojo.png" class=" h-28 w-full self-center">
                <br>
                <br>
                <p class="self-center" id="nomeUsuario">${dados.name}</p>
                <p class="self-center" id="loginId">${dados.login}</p>
                <p class="text-xs font-semibold px-4 py-2">REPOSITÓRIOS</p>
                <div id="divRep" class="w-auto h-44 flex flex-col items-center gap-3 overflow-auto bg-purple-700"></div>
                `
                areaCartoes.appendChild(novoCartao)
                const boxRep = novoCartao.querySelector("#divRep");
                encontraRep(user, boxRep)
            })

        .catch((erro => {
            alert("Usuário não encontrado, por favor digite um usuário existente", erro)
        
        }
        ))
}
function encontraRep(user,boxRep) {
    let linkRep = `https://api.github.com/users/${user}/repos`
    fetch(linkRep)
    .then((resposta) => {
        return resposta.json()
    })
    .then((dadosRep) => {            
            dadosRep.forEach((repo) => {
                const cartao = document.createElement("div")
                
                cartao.innerHTML = `<div class="w-72 h-28 bg-blue-400 rounded-md border-2 border-neutral-300 ps-2 self-center">
                <h6 class="font-bold text-sm" id="nomeRep">${repo.name}</h6>
                <p class="text-sm text-gray-600" id="descricao">${repo.description}</p>
                <span class="bg-blue-600 text-xs font-bold w-auto px-1" id="linguagem">${repo.language}
                </span>
                </div>`               
                boxRep.appendChild(cartao)
            }); 
        })
        .catch((erro) => console.log(erro))
    }