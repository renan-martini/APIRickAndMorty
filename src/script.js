class ApiRickAndMorty{
    static page = 1
    static async generateCharacters(){
        const main = document.querySelector("main")
        main.innerHTML = ""

        ApiRickAndMorty.verificarPage()

        const characters = await fetch(`https://rickandmortyapi.com/api/character?page=${ApiRickAndMorty.page}`)
                            .then(response => response.json())
                            .then(response => response.results)
                            .catch((erro) => console.log("erro"))


        characters.forEach(personagem => {
            const card = ApiRickAndMorty.montarCard(personagem)
            main.append(card)
        });
    }

    static montarCard(personagem){
        const card = document.createElement("div")
        const nome = document.createElement("h3")
        const img = document.createElement("img")
        const caracteristicas = document.createElement("div")
        const gender = document.createElement("span")
        const especie = document.createElement("span")

        card.classList.add("character--card")
        caracteristicas.classList.add("caracteristicas")

        nome.innerText = personagem.name
        img.src = personagem.image
        gender.innerText = personagem.gender
        especie.innerText = "- " + personagem.species

        caracteristicas.append(gender, especie)
        card.append(nome, img, caracteristicas)

        return card

    }

    static trocaPage(e){
        if(e.target.innerText.includes("Prev")){
            if(ApiRickAndMorty.page > 1){
                ApiRickAndMorty.page--
            }
            
            ApiRickAndMorty.generateCharacters()
            ApiRickAndMorty.verificarPage()
        }else{
            if(ApiRickAndMorty.page < 42){
                ApiRickAndMorty.page++
            }
            ApiRickAndMorty.generateCharacters()
            ApiRickAndMorty.verificarPage()
        }
    }

    static verificarPage(){
        const prevPage = document.querySelector(".button--prev")
        const nxtPage = document.querySelector(".button--nxt")

        if(ApiRickAndMorty.page === 1){
            prevPage.style.display = "none"
        }else if(ApiRickAndMorty.page === 42){
            nxtPage.style.display = "none"
        }else{
            prevPage.style.display = "inline-block"
            nxtPage.style.display = "inline-block"
        }
    }
}

ApiRickAndMorty.generateCharacters()

const prevPage = document.querySelector(".button--prev")
const nxtPage = document.querySelector(".button--nxt")

prevPage.addEventListener("click", ApiRickAndMorty.trocaPage)
nxtPage.addEventListener("click", ApiRickAndMorty.trocaPage)