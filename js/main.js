const listPokemons = document.querySelector("#pokemons"); //LISTA DOS POKEMONS
const details = document.querySelector("#details");//

function main(limit = 5) { //MAIN FUNÇÃO PRINCIPAL RESPONSÁVEL POR FAZER O REQUEST DA API DO GRAFITE WEEL
  const pokemons = `{ 
    pokemons(first: ${limit}){
      id,
      name,
      classification,
      image
    }
  }`;
  //QUERY QUE VAI MANDAR PRA API
  requestApi(pokemons).then(res => showPokemons(res.pokemons)); //TRATAR COMO PROMISE THEN PARA DAR UMA RESPOSTA
}

function getOnePokemon(id) { //
  const query = `{
    pokemon(id: "${id}"){
      id,
      name,
      image,
      weaknesses,
      weight {
        minimum
        maximum
      },
      height {
        minimum
        maximum
      },
      maxHP,
      resistant
    }
  }`;

  requestApi(query).then(res => showPokemon(res.pokemon));
}
//FUNÇÃO SHOW POKEMON AVI SER CHAMADA NA RESOLUÇÃO DA PROMISSE DO POKEMON GETONEPOKEMON 
//APENAS UM POKEMON CHAMADO POR VEZ.
function showPokemon(pokemon) { 
  let template = `
  <div class="card">
    <img class="card-img-top" src="${pokemon.image}">
    <div class="card-body">
      <h5 class="card-title">${pokemon.name}</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Peso: <strong> max - ${
        pokemon.weight.maximum
      } | min -  ${pokemon.weight.minimum} </strong></li>
      <li class="list-group-item">Altura: <strong> max - ${
        pokemon.height.maximum
      } | min -  ${pokemon.height.minimum} </strong></li>
      <li class="list-group-item">HP: <strong>${pokemon.maxHP}</strong></li>
      <li class="list-group-item">Fraquesas: <strong>${pokemon.weaknesses.join(
        ", "
      )}</strong></li>
      <li class="list-group-item">Resistência: <strong>${pokemon.resistant.join(
        ", "
      )}</strong></li>
    </ul>
  </div>
  `;

  details.innerHTML = template;
}
//FUNÇÃO QUE CONSTRUA O TEMPLATE PRA QUANDO ELE RETORNA O THEN DA API
    //FUNÇÃO PARA QUE QUANDO ELE RETORNA OS POKEMONS ELE ENVIA PARA O TEMPLATE.
    //ESSA FUNÇÃO VAI RECEBER OS POKEMONS QUE VAI CHEGAR DA API
function showPokemons(pokemons) {
  let template = "";

    //CADA INTEREÇÃO QUE FIZAR VAI ME RETORNAR UM POKEMON
  pokemons.forEach(
    pokemon =>
      (template += `
      <li class="media">
        <img class="mr-3" width="100" src="${pokemon.image}">
        <div class="media-body">
          <h5>${pokemon.name}</h5>
          <p>${pokemon.classification}</p>
          <button class="btn btn-secondary btn-sm" onclick="getOnePokemon('${
            pokemon.id
          }')">Ver detalhes</button>
        </div>
      </li>
    `)
  );
    //COLOQUE TODAS AS INFORMAÇÕES NO TEMPLATE
  listPokemons.innerHTML = `
    <ul class="list-unstyled">
        ${template}
    </ul>
    <button class="btn btn-block btn-info" onclick="main(${pokemons.length +
      5})">Mais...</button>
  `;
}

async function requestApi(query) { //RECEBE A QUERY COMO PARÂMETRO 
  let response = await fetch(`https://graphql-pokemon.now.sh/?query=${query}`); //PEGAR O RESPONSE DA CHAMADA DO API DO GRAFITE WEEL
  //UTILIZANDO O FETCH DO JAVASCRIPT PARA FAZER AS REQUISIÇÕES USANDO O ASYNC PARA SER ASSINCRONAS E ELA VAI SER RESOLVER ESPERANDO
  //A CHAMADA API DO FAT A QUERY É VIA GET 

  response = await response.json(); //SE DER CERTO A CHAMADA DO API ELE VAI TRAZER AS INFORMAÇÕES NO FORMATO JSON 
  // E VAI ARMAZENAR NO RSPONSE

  return response.data; // PARA TRAZER OS POKEMONS DE UMA VEZ
}

main();