let ctx = null;
let canvas = null;
let pyNew = null;
let heigthSul = null;
let continuar = null;
let contPontos = 0;
let aceleracaoGravidade = 0.9;
let cenarioFundo = new Image();
cenarioFundo.src = "Imagens/bg.png";
let chao = new Image();
chao.src = "Imagens/fg.png";
let passaroImagem = new Image();
passaroImagem.src = "Imagens/bird.png";
let canoNorteImagem = new Image();
canoNorteImagem.src = "Imagens/pipeNorth.png";
let canoSulImagem = new Image();
canoSulImagem.src = "Imagens/pipeSouth.png";
let canosN = [];
let canosS = [];
let gap = 100;
let passaro = {
    px: 40,
    py: 185,
    dx: 1,
    vx: 0,
    vy: 1.05,
    dy: 1,
    width: 35,
    height: 35,
    desenharPassaro() {
        ctx.drawImage(passaroImagem, this.px, this.py, this.width, this.height);


    },
    moverPassaro() {

        this.py += this.vy * this.dy;
        this.desenharPassaro();

    },
    colisaoPassaroChao() {
        if (this.py + this.height >= 420) {
            novaPartida();

        }

    },
    colisaoPassaroTeto() {
        if (this.py <= 0) {
            this.py = 0;
            this.dy = 1;


        }

    }

}
let canoNorte = {
    px: 510,
    py: 0,
    width: 30,
    height: Math.round((Math.random() * 290 + 60)), //60 ate 300
    vx: 1,
    vy: 0,
    dy: 1,
    dx: -1,

    desenharCanoNorte(j) {

        ctx.drawImage(canoNorteImagem, canosN[j].px, canosN[j].py, canosN[j].width, canosN[j].height)


    },

    removerCanoNorte(j) {
        canosN.splice(j, 1);

    }




}
let canoSul = {
    px: 510,
    py: canoNorte.height + gap,
    width: 30,
    vx: 1,
    vy: 0,
    dy: 1,
    dx: -1,

    desenharCanoSul(l) {


        ctx.drawImage(canoSulImagem, canosS[l].px, canosS[l].py, canosS[l].width, canosS[l].height)

    },


    removerCanoSul(l) {
        canosS.splice(l, 1);

    }
}
function novaPartida() {
    // continuar = window.confirm("O passáro chocou com o cano ou com chão. Clica em 'ok' se desejar continuar ou 'cancelar' caso não quera continuar.");
    //if(continuar==false){
    // window.location.assign("http://google.com.br")

    //}else{
    window.location.reload();
    // }


}
function inserirCanosSulNorte() {
    for (let j = 0; j < canosN.length; j++) {

        canosN[j].px += canosN[j].dx * canosN[j].vx;
        canosS[j].px += canosS[j].dx * canosS[j].vx;
        console.log(canosN[j].px)
        console.log(canosS[j].px)
        if ((passaro.px + passaro.width >= canosN[j].px && (passaro.px <= canosN[j].px + canosN[j].width)) && (passaro.py >= 0 && passaro.py <= canosN[j].height)) {
            novaPartida();
        }
        if ((passaro.px + passaro.width >= canosS[j].px && (passaro.px <= canosN[j].px + canosN[j].width)) && (passaro.py <= 500 && passaro.py + passaro.height >= canosS[j].py)) {
            novaPartida();
        }
        if ((passaro.px == canosS[j].px + canoNorte.width)) {
            console.log("entrou no placar")
            placarAtualizado();
        }

        canoNorte.desenharCanoNorte(j);
        canoSul.desenharCanoSul(j);


        if (canosN[j].px === 250) {
            heightNew = Math.round((Math.random() * 290 + 60))
            pyNew = heightNew + gap
            heightSul = 500 - pyNew;


            canosN.push({
                px: canoNorte.px, py: canoNorte.py, vx: canoNorte.vx, vy: canoNorte.vy, dx: canoNorte.dx, dy: canoNorte.dy,
                width: canoNorte.width, height: heightNew
            });
            canosS.push({
                px: canoSul.px, py: pyNew, vx: canoSul.vx, vy: canoSul.vy, dx: canoSul.dx, dy: canoSul.dy,
                width: canoSul.width, height: heightSul
            });



        }
        if (canosN[j].px + canosN.width <= 0) {
            canoNorte.removerCanoNorte(j);
            canoSul.removerCanoSul(j);

        }

    }
}

window.addEventListener("click", () => {

    passaro.dy = -1;
    passaro.desenharPassaro();
    setTimeout(() => {
        passaro.dy = 1;
        passaro.vy = aceleracaoGravidade;
    }, 1000)
}, false)

window.addEventListener("dblclick", () => {
    passaro.vy = 2.7;
    passaro.dy = -1;
    passaro.desenharPassaro();
}, false)
function placarAtualizado() {

    contPontos += 1

    document.getElementById("placar").innerHTML = contPontos;

}
function game() {
    ctx.drawImage(cenarioFundo, 0, 0, 500, 500);
    ctx.drawImage(chao, 0, 420, 500, 80);
    passaro.moverPassaro();
    inserirCanosSulNorte();
    passaro.colisaoPassaroChao();
    passaro.colisaoPassaroTeto();
    window.requestAnimationFrame(game);
}
function carregarJogo() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canosN.push({ px: canoNorte.px, py: canoNorte.py, vx: canoNorte.vx, vy: canoNorte.vy, dx: canoNorte.dx, dy: canoNorte.dy, width: canoNorte.width, height: canoNorte.height });
    heightSul = 500 - canoSul.py;
    canosS.push({
        px: canoSul.px, py: canoSul.py, vx: canoSul.vx, vy: canoSul.vy, dx: canoSul.dx, dy: canoSul.dy,
        width: canoSul.width, height: heightSul
    });
    document.getElementById("placar").innerHTML = contPontos;
    game();
}
window.addEventListener("load", carregarJogo);