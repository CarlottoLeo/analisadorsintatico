var posicao00 = new Object();
posicao00.producao = "S → aBc";
posicao00.gerador = "aBc";
posicao00.naoTerminal = "S";
posicao00.producaoInversa = "cBa";

var posicao10 = new Object();
posicao10.producao = "-";
posicao10.gerador = "";
posicao10.naoTerminal = "";
posicao10.producaoInversa = "-";

var posicao20 = new Object();
posicao20.producao = "-";
posicao20.gerador = "";
posicao20.naoTerminal = "";
posicao20.producaoInversa = "-";

var posicao30 = new Object();
posicao30.producao = "C → aAc";
posicao30.gerador = "aAc";
posicao30.naoTerminal = "C";
posicao30.producaoInversa = "cAa";

var posicao01 = new Object();
posicao01.producao = "-";
posicao01.gerador = "";
posicao01.naoTerminal = "";
posicao01.producaoInversa = "-";

var posicao11 = new Object();
posicao11.producao = "A → bCc";
posicao11.gerador = "bCc";
posicao11.naoTerminal = "A";
posicao11.producaoInversa = "cCb";

var posicao21 = new Object();
posicao21.producao = "B → baA";
posicao21.gerador = "baA";
posicao21.naoTerminal = "B";
posicao21.producaoInversa = "Aab";

var posicao31 = new Object();
posicao31.producao = "-";
posicao31.gerador = "";
posicao31.naoTerminal = "";
posicao31.producaoInversa = "-";

var posicao02 = new Object();
posicao02.producao = "S → cCb";
posicao02.gerador = "cCb";
posicao02.naoTerminal = "S";
posicao02.producaoInversa = "bCc";

var posicao12 = new Object();
posicao12.producao = "A → cB";
posicao12.gerador = "cB";
posicao12.naoTerminal = "A";
posicao12.producaoInversa = "Bc";

var posicao22 = new Object();
posicao22.producao = "B → ε";
posicao22.gerador = "";
posicao22.naoTerminal = "B";
posicao22.producaoInversa = "";

var posicao32 = new Object();
posicao32.producao = "C → caS";
posicao32.gerador = "caS";
posicao32.naoTerminal = "C";
posicao32.producaoInversa = "Sac";

var posicao03 = new Object();
posicao03.producao = "-";
posicao03.gerador = "";
posicao03.naoTerminal = "";
posicao03.producaoInversa = "-";

var posicao13 = new Object();
posicao13.producao = "-";
posicao13.gerador = "";
posicao13.naoTerminal = "";
posicao13.producaoInversa = "-";

var posicao23 = new Object();
posicao23.producao = "-";
posicao23.gerador = "";
posicao23.naoTerminal = "";
posicao23.producaoInversa = "-";

var posicao33 = new Object();
posicao33.producao = "-";
posicao33.gerador = "";
posicao33.naoTerminal = "";
posicao33.producaoInversa = "-";

var matrizTabela = [
    [posicao00, posicao01, posicao02, posicao03],
    [posicao10, posicao11, posicao12, posicao13],
    [posicao20, posicao21, posicao22, posicao23],
    [posicao30, posicao31, posicao32, posicao33]
];

var mapaDePosicoes = {
    "S": 0,
    "A": 1,
    "B": 2,
    "C": 3,
    "a": 0,
    "b": 1,
    "c": 2,
    "$": 3
}

var pilha = "$S";
var fila = "ababcaaccc$";
var contador = 1;
var letrasPercoridas = 0;
var sucesso = true;
var executar = true;
var saidaAcao = $(".valoresAcao"); //tabela onde serão escritas as ações realizadas

$(document).ready(function() {
    $(".insereSentença").click(function() {
        limparCampos();
        //$('.executarSentenca').removeAttr('disabled');
        //$('.executarTodaSentenca').removeAttr('disabled');
        $('button, html [type="button"], [type="reset"], [type="submit"]').removeAttr('disabled');

        var sentencaEntrada = $(".sentencaEntrada").val().trim() + "$";
        fila = sentencaEntrada; //adiciona à variavel global fila a sentença digitada
        var quantidade = sentencaEntrada.length;

        //monta a Fila dos caracteres
        for (var i = 0; i < quantidade; i++) {
            var html = "<div class='posicao posicao-" + i + "'>" + sentencaEntrada[i] + "</div>";
            $(".filaCararteres").append(html);
        }
        $('.posicao-0').addClass('letraSublinhada');
    });

    $(".limparTabela").click(function() {
        limparCampos();
    });

    //Gera a Sentenca
    $('.tabela_geradora').click(function() {
        $(this).data();
        //console.log($(this).data());
        var linha = $(this).data('linha');
        var col = $(this).data('col');

        var posicaoMatrizGeracao = matrizTabela[linha][col];//Acha a posicao na matriz

        //console.log("Gerou: " + posicaoMatrizGeracao["gerador"]);
        //console.log("Nao Terminal: " + posicaoMatrizGeracao["naoTerminal"]);

        var sentencaQueGerou = $('.geracao-gramatica').text().trim();//Sentenca anterior
        var sentencaGerada = sentencaQueGerou.replace(posicaoMatrizGeracao["naoTerminal"], posicaoMatrizGeracao["gerador"]);

        $('.geracao-gramatica').html(sentencaGerada);

        var naoTerminalNaoAchado = false; //nao terminal não encontrado
        for (var i = 0; i < sentencaGerada.length; i++) { //itera por toda a geracao

            if (!naoTerminalNaoAchado) {
                $(".tabela-geracao-gramatica tbody tr").css("background-color", "#EF5350");
            }

            if (sentencaGerada[i] === "S" && !naoTerminalNaoAchado) { //se encontrar o S e o nao terminal ainda nao tenha sido encontrado
                $("#S").css("background-color", "#66BB6A");
                naoTerminalNaoAchado = true;
            }

            if (sentencaGerada[i] === "A" && !naoTerminalNaoAchado) { //se encontrar o A e o não nao terminal ainda nao tenha sido encontrado
                $("#A").css("background-color", "#66BB6A");
                naoTerminalNaoAchado = true;
            }

            if (sentencaGerada[i] === "B" && !naoTerminalNaoAchado) { //se encontrar o B e o nao terminal ainda nao tenha sido encontrado
                $("#B").css("background-color", "#66BB6A");
                naoTerminalNaoAchado = true;
            }

            if (sentencaGerada[i] === "C" && !naoTerminalNaoAchado) { //se encontrar o C e o nao terminal ainda nao tenha sido encontrado
                $("#C").css("background-color", "#66BB6A");
                naoTerminalNaoAchado = true;
            }
        }

    });

    $('.ok-gerador').click(function() {
        var pegaSentenca = $('.geracao-gramatica').text();
        $('.sentencaEntrada').val(pegaSentenca.trim());
        limparTabelaGeracao();
    });
});

function executarPassoaPasso() {
    var topoPilha = pilha.charAt(pilha.length - 1);
    var primeiroCharFila = fila.charAt(0);

    //console.log("topoPilha: " + topoPilha);
    //console.log("primeiroCharFila: " + primeiroCharFila);

    if (primeiroCharFila != 'S' && primeiroCharFila != 'A' && primeiroCharFila != 'B' && primeiroCharFila != 'C') {

        if (topoPilha === "$" && primeiroCharFila === "$") {

            $('.executarSentenca').attr('disabled', 'disabled');
            $('.executarTodaSentenca').attr('disabled', 'disabled');

            var maisUmaLinhaTabela = "<tr>" +
                "<td> " + pilha + " </td>" +
                "<td>" + fila + "</td>" +
                "<td> Aceito em: " + contador + " iterações</td>" +
                "</tr>";
            saidaAcao.append(maisUmaLinhaTabela); //escreve a Acao feita na tabela
            executar = false;

        } else if (topoPilha === primeiroCharFila) {//Desempilha
            var htmlAcao1 = "<tr>" +
                "<td>" + pilha + "</td>" +
                "<td>" + fila + "</td>" +
                "<td> Lê " + topoPilha + "</td>" +
                "</tr>";
            saidaAcao.append(htmlAcao1); //escreve a Acao feita na tabela

            pilha = pilha.substr(0, pilha.length - 1); //desempilha a pilha
            fila = fila.substr(1, fila.length); //desempilha a fila
            contador++; //Numero de iteracoes

            //Marca a letra que esta na fila
            $('.posicao-' + letrasPercoridas).removeClass('letraSublinhada');
            letrasPercoridas++;
            $('.posicao-' + letrasPercoridas).addClass('letraSublinhada');

        } else {
            var topoPilhaMapa = mapaDePosicoes[topoPilha];
            var primeiroCharFilaMapa = mapaDePosicoes[primeiroCharFila];
            var elementoMatriz = null;

            if(topoPilha == 'S' || topoPilha == 'A' || topoPilha == 'B' || topoPilha == 'C'){
                elementoMatriz = matrizTabela[topoPilhaMapa][primeiroCharFilaMapa];
            }


            if ( (topoPilha == '$' && primeiroCharFila != '$') || (elementoMatriz == null) ) {//elementoMatriz = para ver se nao tem caracter que nao existe na gramatica, ex D,F
                var htmlAcao3 = "<tr>" +
                    "<td>" + pilha + "</td>" +
                    "<td>" + fila + "</td>" +
                    "<td> erro em " + contador + " iterações </td>" +
                    "</tr>";
                saidaAcao.append(htmlAcao3);
                $('.executarSentenca').attr('disabled', 'disabled');
                $('.executarTodaSentenca').attr('disabled', 'disabled');
                sucesso = false;
                executar = false;
            } else if (elementoMatriz["producaoInversa"] != "-") {//Monta na coluna da Pilha
                //console.log("elementoMatriz: " + elementoMatriz["producao"]);

                var htmlAcao2 = "<tr>" +
                    "<td>" + pilha + "</td>" +
                    "<td>" + fila + "</td>" +
                    "<td>" + elementoMatriz["producao"] + "</td>" +
                    "</tr>";
                saidaAcao.append(htmlAcao2); //escreve a Acao feita na tabela

                pilha = pilha.substr(0, pilha.length - 1); //desempilha a pilha
                pilha += elementoMatriz["producaoInversa"]; // atribui a regra inversa
                contador++; //Numero de iteracoes

            } else {
                var htmlAcao3 = "<tr>" +
                    "<td>" + pilha + "</td>" +
                    "<td>" + fila + "</td>" +
                    "<td> erro em " + contador + " iterações </td>" +
                    "</tr>";
                saidaAcao.append(htmlAcao3);
                $('.executarSentenca').attr('disabled', 'disabled');
                $('.executarTodaSentenca').attr('disabled', 'disabled');
                sucesso = false;
                executar = false;
            }


        }
        scrollPage();
    } else {
        var htmlAcao5 = "<tr>" +
            "<td>" + pilha + "</td>" +
            "<td>" + fila + "</td>" +
            "<td> erro em " + contador + " iterações </td>" +
            "</tr>";
        saidaAcao.append(htmlAcao5);
        $('.executarSentenca').attr('disabled', 'disabled');
        $('.executarTodaSentenca').attr('disabled', 'disabled');
        sucesso = false;
        executar = false;
    }
}

function executarTudo() {
    var topoPilha = pilha.charAt(pilha.length - 1);
    var primeiroCharFila = fila.charAt(0);

    $('.executarTodaSentenca').attr('disabled', 'disabled');
    $('.executarSentenca').attr('disabled', 'disabled');
    executarPassoaPasso();

        //Este IF eh para quando termina o passo a passo, ai ele constroe a ultima linha
    if (topoPilha === "$" && primeiroCharFila === "$") {
        if ((topoPilha != "$" || primeiroCharFila != "$") && sucesso) {//sucesso era pra nao ficar em loop quando a sentenca acabava

            $('.executarSentenca').attr('disabled', 'disabled');
            $('.executarTodaSentenca').attr('disabled', 'disabled');
            var maisUmaLinhaTabela = "<tr>" +
                "<td> " + pilha + " </td>" +
                "<td>" + fila + "</td>" +
                "<td> Aceito em: " + contador + " iterações</td>" +
                "</tr>";
            saidaAcao.append(maisUmaLinhaTabela);
            executar = false;
        }
    }
    if (executar) {
        setTimeout(executarTudo, 300);
    }
}

function limparTabelaGeracao() {
    $(".tabela-geracao-gramatica tbody tr").css("background-color", "#EF5350");
    $("#S").css("background-color", "#66BB6A");
    $('.geracao-gramatica').html("S");
}

function limparCampos() {
    $('.filaCararteres').html("");
    $('.valoresAcao').html("");
    $('.geracao-gramatica').html("S");
    pilha = "$S";
    sucesso = true;
    contador = 1;
    executar = true;
    letrasPercoridas = 0;
}

function scrollPage() {
    $('body').animate({
        scrollTop: $('body').height()
    }, 10);
}
