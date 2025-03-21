// VARIÁVEIS COM OS VALORES DOS PRODUTOS
var valorProduto1 = 99.99
var valorProduto2 = 50.49
var valorProduto3 = 49.99
var valorProduto4 = 149.99
var valorProduto5 = 349.99
var valorProduto6 = 389.99

//DECLARANDO NOMES DOS PRODUTOS
var nomeProduto1 = "Hugo Boss Bottled"
var nomeProduto2 = "Carolina Herrera"
var nomeProduto3 = "Invictus Legend"
var nomeProduto4 = "La vie Est Belle"
var nomeProduto5 = "Rebanne One Million"
var nomeProduto6 = "Sauvage Parfum"

// DEFININDO COMO VARIÁVEIS GLOBAIS
var valorEmRealProduto1, valorEmRealProduto2, valorEmRealProduto3, valorEmRealProduto4, valorEmRealProduto5, valorEmRealProduto6

// VARIÁVEIS COM OS VALORES DO FRETE
var freteSudeste = 3.00
var freteSul = 5.00
var freteCentroOeste = 6.50
var freteNordeste = 9.00
var freteNorte = 12.00

// IMPRESSÃO DAS VARIÁVEIS DOS VALORES DOS PRODUTOS
document.getElementById('valorProduto1').innerHTML = `US$${valorProduto1}`
document.getElementById('valorProduto2').innerHTML = `US$${valorProduto2}` 
document.getElementById('valorProduto3').innerHTML = `US$${valorProduto3}` 
document.getElementById('valorProduto4').innerHTML = `US$${valorProduto4}` 
document.getElementById('valorProduto5').innerHTML = `US$${valorProduto5}` 
document.getElementById('valorProduto6').innerHTML = `US$${valorProduto6}` 

//IMPRESSÃO DAS VARIÁVEIS DOS NOMES DOS PRODUTOS
document.getElementById('nomeProduto1').innerHTML = nomeProduto1
document.getElementById('nomeProduto2').innerHTML = nomeProduto2
document.getElementById('nomeProduto3').innerHTML = nomeProduto3
document.getElementById('nomeProduto4').innerHTML = nomeProduto4
document.getElementById('nomeProduto5').innerHTML = nomeProduto5
document.getElementById('nomeProduto6').innerHTML = nomeProduto6


// COTAÇÃO DA MOEDA E VALOR EM TEMPO REAL
fetch('https://economia.awesomeapi.com.br/last/USD-BRL').then(resposta => {
    return resposta.json()
}).then(economia => {
    console.log(economia)
    document.getElementById('valorDolar').innerHTML = `USD-BRL: ${economia.USDBRL.bid}` ;

    // CONVERSÃO DO REAL PARA DÓLAR
    valorEmRealProduto1 = valorProduto1 * economia.USDBRL.bid;
    document.getElementById('valorEmRealProduto1').innerHTML = `R$${valorEmRealProduto1.toFixed(2)} `;

    valorEmRealProduto2 = valorProduto2 * economia.USDBRL.bid;
    document.getElementById('valorEmRealProduto2').innerHTML = `R$${valorEmRealProduto2.toFixed(2)}`;

    valorEmRealProduto3 = valorProduto3 * economia.USDBRL.bid;
    document.getElementById('valorEmRealProduto3').innerHTML = `R$${valorEmRealProduto3.toFixed(2)}`;

    valorEmRealProduto4 = valorProduto4 * economia.USDBRL.bid;
    document.getElementById('valorEmRealProduto4').innerHTML = `R$${valorEmRealProduto4.toFixed(2)}`;

    valorEmRealProduto5 = valorProduto5 * economia.USDBRL.bid;
    document.getElementById('valorEmRealProduto5').innerHTML = `R$${valorEmRealProduto5.toFixed(2)}`;

    valorEmRealProduto6 = valorProduto6 * economia.USDBRL.bid;
    document.getElementById('valorEmRealProduto6').innerHTML = `R$${valorEmRealProduto6.toFixed(2)}`;
})

// CALCULANDO O VALOR FINAL 
function calcularValorFinal() {
    var valorFinalProduto1 = valorEmRealProduto1 + valorFrete;
    var valorFinalProduto2 = valorEmRealProduto2 + valorFrete;
    var valorFinalProduto3 = valorEmRealProduto3 + valorFrete;
    var valorFinalProduto4 = valorEmRealProduto4 + valorFrete;
    var valorFinalProduto5 = valorEmRealProduto5 + valorFrete;
    var valorFinalProduto6 = valorEmRealProduto6 + valorFrete;

    document.getElementById('valorFinalProduto1').innerHTML = `Valor a pagar: R$${valorFinalProduto1.toFixed(2)}`;
    document.getElementById('valorFinalProduto2').innerHTML = `Valor a pagar: R$${valorFinalProduto2.toFixed(2)}`;
    document.getElementById('valorFinalProduto3').innerHTML = `Valor a pagar: R$${valorFinalProduto3.toFixed(2)}`;
    document.getElementById('valorFinalProduto4').innerHTML = `Valor a pagar: R$${valorFinalProduto4.toFixed(2)}`;
    document.getElementById('valorFinalProduto5').innerHTML = `Valor a pagar: R$${valorFinalProduto5.toFixed(2)}`;    
    document.getElementById('valorFinalProduto6').innerHTML = `Valor a pagar: RS$${valorFinalProduto6.toFixed(2)}`;    
}

///////////////////////// API DE CEP /////////////////////////

////////////// INDENTIFICANDO O ENDEREÇO COM A API DE CEP //////////////
const preencherFormulario = (endereco) => {

    document.getElementById('estado').value = endereco.uf
    document.getElementById('cidade').value = endereco.localidade
}
//Autopreenchimento
const cepValido = (cep) => {
    if (cep.length == 8) {
        return true;
    }else{
        return false;
    }
}
// BUSCANDO CEP
const pesquisarCep = async () => {
    const cep = document.getElementById('cep').value
    const url = `https://viacep.com.br/ws/${cep}/json/`
    if (cepValido(cep)) {
        const dados = await fetch(url);
        const endereco =await dados.json();
            preencherFormulario(endereco);
        calcularFrete();
    }
}
document.getElementById('cep').addEventListener('focusout', pesquisarCep)

// VALOR DE FRETE DE ACORDO COM A REGIÃO
function calcularFrete() {
    var estado = document.getElementById('estado').value;

    if (["SP", "ES", "RJ", "MG"].includes(estado)) {
        valorFrete = freteSudeste;

    } else if (["RS", "SC", "PR"].includes(estado)) {
        valorFrete = freteSul;

    } else if (["MT", "MS", "GO", "DF"].includes(estado)) {
        valorFrete = freteCentroOeste;

    } else if (["BA", "SE", "AL", "PE", "PB", "RN", "CE", "PI", "MA"].includes(estado)) {
        valorFrete = freteNordeste;

    } else if (["AM", "RR", "AP", "PA", "TO", "RO", "AC"].includes(estado)) {
        valorFrete = freteNorte;

    } else {
        alert('CEP inválido')
        // valorFrete = 12; //Caso a UF não seja indentificada
    }

    document.getElementById("valorDoFrete").innerHTML = `Frete: R$ ${valorFrete}`;

    calcularValorFinal();
}

function apertar() {
    
               Swal.fire({
               title: "Compra efetuada com sucesso",
               icon: "success"
    });
           }