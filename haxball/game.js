//Pegando o id (Campo) do HTML
let canvas = document.getElementById("Campo");

//Definindo como 2D a classe ctx(Context)
const ctx = canvas.getContext("2d"); 

//Desenhar o campo para atualizar a posição do jogador
function drawCampo() {

//Definindo cor do campo
ctx.fillStyle = "#18cc00";

//Pinta o campo   
ctx.fillRect(0,0,900,500);

//Linha horizontal do meio
ctx.beginPath();
ctx.moveTo(450, 0);
ctx.lineTo(450, 500);
ctx.stroke();
ctx.strokeStyle = "white";

//Círculo do meio
ctx.beginPath();
ctx.arc(450, 250, 50, 0, 2 * Math.PI);
ctx.stroke();

//Linha de cima da trave esquerda
ctx.beginPath();
ctx.moveTo(0, 150);
ctx.lineTo(50, 150);
ctx.stroke();
ctx.strokeStyle = "white";

//Linha do lado da trave esquerda
ctx.beginPath();
ctx.moveTo(50, 150);
ctx.lineTo(50, 300);
ctx.stroke();
ctx.strokeStyle = "white";

//Linha de baixo da trave esquerda
ctx.beginPath();
ctx.moveTo(0, 300);
ctx.lineTo(50, 300);
ctx.stroke();
ctx.strokeStyle = "white";

//Linha de cima da trave direita
ctx.beginPath();
ctx.moveTo(900, 150);
ctx.lineTo(850, 150);
ctx.stroke();
ctx.strokeStyle = "white";

//Linha do lado da trave direita
ctx.beginPath();
ctx.moveTo(850, 150);
ctx.lineTo(850, 300);
ctx.stroke();
ctx.strokeStyle = "white";

//Linha de baixo da trave direita
ctx.beginPath();
ctx.moveTo(900, 300);
ctx.lineTo(850, 300);
ctx.stroke();
ctx.strokeStyle = "white";
}

//Definir jogador
let jogador = {
    x:350,
    y:250,
    raio:20,
    color:"red",

    //Velocidade do jogador
    vx:0,
    vy:0,
}

//Definir bot
let bot = {
    x:550,
    y:250,
    raio:20,
    color:"blue",

    //Velocidade do bot
    vx:0,
    vy:0,
}

//Desenhando jogador
function drawJogador(jogador) {
    ctx.beginPath();
    ctx.arc(jogador.x, jogador.y, jogador.raio, 0, 2 * Math.PI)
    ctx.fillStyle = jogador.color;
    ctx.fill();
}

//Definir bola
let bola = {
    x:450,
    y:250,
    raio:15,
    color:"white",

    //Velocidade da bola
    vx:0,
    vy:0,
}

//Definindo placar
let placarVermelho = 0;
let placarAzul = 0;

//Definindo cronômetro
let tempoRestante = 120; 

//Definindo tempo exato que cronômetro começou
let tempoInicio = Date.now();

//Definindo partida encerrada (corrigindo bug do alerta infinito)
let partidaEncerrada = false;

//Definindo ataque do bot
let botAtacando = false;

//Desenhando bola
function drawBola(bola) {
    ctx.beginPath();
    ctx.arc(bola.x, bola.y, bola.raio, 0, 2 * Math.PI);
    ctx.fillStyle = bola.color;
    ctx.fill();
}

//Desenhando placar
function drawPlacar(){
    ctx.textAlign = "center";
    ctx.beginPath();
    ctx.font = "36px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(placarVermelho, 405, 40);
    ctx.fillStyle = "white";
    ctx.fillText("-", 450, 40);
    ctx.fillStyle = "blue";
    ctx.fillText(placarAzul, 495, 40);
}

//Desenhando cronômetro 
function drawCronometro(tempoRestante){
    ctx.textAlign = "center";
    let minutos = Math.floor(tempoRestante / 60);
    let segundos = tempoRestante % 60;
    let tempoFormatado = minutos.toString().padStart(2, "0") + ":" + segundos.toString().padStart(2, "0");
    ctx.beginPath();
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(tempoFormatado, 800, 40);
}

//Função para reiniciar partida após tempo encerrado
function reiniciarPartida(){
    if(partidaEncerrada){
        bola.x = 450;
        bola.y = 250;
        bola.vx = 0;
        bola.vy = 0;
        jogador.x = 350;
        jogador.y = 250;
        jogador.vx = 0;
        jogador.vy = 0;
        bot.x = 550;
        bot.y = 250;
        bot.vx = 0;
        bot.vy = 0;
        placarVermelho = 0;
        placarAzul = 0;
        tempoRestante = 120;
        tempoInicio = Date.now();
        partidaEncerrada = false;
    }
}

//Função que atualiza o cronômetro
function atualizarCronometro(){
    if(partidaEncerrada){
        return;
    }
    let tempoAtual = Date.now();
    let tempoDecorrido = Math.floor((tempoAtual - tempoInicio) / 1000);
    tempoRestante = 120 - tempoDecorrido;

    if(tempoRestante <= 0){
        tempoRestante = 0;
        partidaEncerrada = true;
        alert("O tempo acabou! Placar final: " + placarVermelho + " - " + placarAzul);
        reiniciarPartida();
    }
}

//Objeto que armazena as teclas pressionadas
let teclas = {
        w : false,
        s : false,
        a : false,
        d : false,
        ArrowUp : false,
        ArrowDown : false,
        ArrowLeft : false,
        ArrowRight : false,
        space : false,
        x : false,
        chute : false,
}

//Função que atualiza a posição do jogador (ao pressionar as teclas)
document.addEventListener("keydown", function(event){ 
    switch(event.key) {         
        case "w":    
        teclas.w = true;
        break;         
        case "s":      
        teclas.s = true;
        break;         
        case "a":            
        teclas.a = true;
        break;         
        case "d": 
        teclas.d = true;  
        break;  
        case "ArrowUp":
        teclas.ArrowUp = true;
        break;
        case "ArrowDown": 
        teclas.ArrowDown = true;
        break;
        case "ArrowLeft":
        teclas.ArrowLeft = true;
        break;
        case "ArrowRight":
        teclas.ArrowRight = true;
        break;   
        case " ": 
        teclas.space = true;
        teclas.chute = true;
        break;
        case "x": 
        teclas.x = true;
        teclas.chute = true;
        break;
    }
});

//Função que atualiza a posição do jogador (ao soltar as teclas)
document.addEventListener("keyup", function(event){
    switch(event.key) {
        case "w":    
        teclas.w = false;
        break;         
        case "s":      
        teclas.s = false;
        break;         
        case "a":            
        teclas.a = false;
        break;         
        case "d": 
        teclas.d = false;  
        break;  
        case "ArrowUp":
        teclas.ArrowUp = false;
        break;
        case "ArrowDown": 
        teclas.ArrowDown = false;
        break;
        case "ArrowLeft":
        teclas.ArrowLeft = false;
        break;
        case "ArrowRight":
        teclas.ArrowRight = false;
        break;  
        case " ":
        teclas.space = false;
        break;
        case "x": 
        teclas.x = false;
        break;
    }
});

//Loop para verificar (verificar teclas, atualizar jogador, limpar canvas...)
function loop() {
    requestAnimationFrame(loop);
    
    if(teclas.w){
        jogador.vy -= 1;
    }
    if(teclas.s){
        jogador.vy += 1;
    }
    if(teclas.a){
        jogador.vx -= 1;
    }
    if(teclas.d){
        jogador.vx += 1;
    }
    if(teclas.ArrowUp){
        jogador.vy -= 1;
    }
    if(teclas.ArrowDown){
        jogador.vy += 1;
    }
    if(teclas.ArrowLeft){
        jogador.vx -= 1;
    }
    if(teclas.ArrowRight){
        jogador.vx += 1;
    }

    //Fórmulas: Math.max() = Retorna o maior valor entre os valores passados como parâmetro. Math.min() = Retorna o menor valor entre os valores passados como parâmetro. Math.sqrt = Retorna a raiz quadrada de um número. Math.atan2() = Descobe o ângulo e direção. Math.cos() = Converte o ângulo para coordenada x. Math.sin() = Converte o ângulo para coordenada y.

    //Limitando a velocidade do jogador
    jogador.vx = Math.max(-7, Math.min(7, jogador.vx));
    jogador.vy = Math.max(-7, Math.min(7, jogador.vy));

    //Fazendo o jogador desacelerar quando não estiver pressionando as teclas
    if(!teclas.a && !teclas.d && !teclas.ArrowLeft && !teclas.ArrowRight){
        jogador.vx *= 0.9;
    }

    if(!teclas.w && !teclas.s && !teclas.ArrowUp && !teclas.ArrowDown){
        jogador.vy *= 0.9;
    }

    //Atualizando a posição do jogador
    jogador.x += jogador.vx;
    jogador.y += jogador.vy;

    //Implementando a IA do bot
    //Exemplo: O bot segue a bola e tenta chutar o gol esquerdo
    if(bola.x > 450 || botAtacando){
    let alvoX = bola.x + 30;
    let alvoY = bola.y;
    let dxIABot = alvoX - bot.x;
    let dyIABot = alvoY - bot.y;
    let distanciaIABot = Math.sqrt(dxIABot * dxIABot + dyIABot * dyIABot);

    if(distanciaIABot > 0){
    let anguloIABot = Math.atan2(dyIABot, dxIABot);
    bot.vx += Math.cos(anguloIABot) * 0.8;
    bot.vy += Math.sin(anguloIABot) * 0.8;

    bot.vx = Math.max(-6, Math.min(6, bot.vx));
    bot.vy = Math.max(-6, Math.min(6, bot.vy));
    }

    if(distanciaIABot < 50)
        botAtacando = true;
    }
    //Implementando a física do bot
    bot.x += bot.vx;
    bot.y += bot.vy;

    //Implementando o atrito do bot
    bot.vx *= 0.9;
    bot.vy *= 0.9;

    //Implementando os limites do bot para não sair do campo
    if(bot.x < bot.raio){
        bot.x = bot.raio;
        bot.vx = 0;
    }

    if(bot.y < bot.raio){
        bot.y = bot.raio;
        bot.vy = 0;
    }

    if(bot.x > 900 - bot.raio){
        bot.x = 900 - bot.raio;
        bot.vx = 0;
    }

    if(bot.y > 500 - bot.raio){
        bot.y = 500 - bot.raio;
        bot.vy = 0;
    }

    //Verificação de gol (bola entra na trave esquerda)
    if(bola.x < -15 && bola.y > 150 && bola.y < 300){
        bola.x = 450;
        bola.y = 250;
        bola.vx = 0;
        bola.vy = 0;
        jogador.x = 350;
        jogador.y = 250;
        jogador.vx = 0;
        jogador.vy = 0;
        bot.x = 550;
        bot.y = 250;
        bot.vx = 0;
        bot.vy = 0;
        //Tentando resolver bug de não conseguir mover o jogador após gol
        teclas.w = false;
        teclas.s = false;
        teclas.a = false;
        teclas.d = false;
        teclas.ArrowUp = false;
        teclas.ArrowDown = false;
        teclas.ArrowLeft = false;
        teclas.ArrowRight = false;
        teclas.space = false;
        teclas.x = false;
        teclas.chute = false;
        placarAzul++;
        botAtacando = false;
        alert("GOL DO TIME AZUL!");
    }

    //Verificação de gol (bola entra na trave direita)
    if(bola.x > 915 && bola.y > 150 && bola.y < 300){
        bola.x = 450;
        bola.y = 250;
        bola.vx = 0;
        bola.vy = 0;
        jogador.x = 350;
        jogador.y = 250;
        jogador.vx = 0;
        jogador.vy = 0;
        bot.x = 550;
        bot.y = 250;
        bot.vx = 0;
        bot.vy = 0;
        //Tentando resolver bug de não conseguir mover o jogador após gol
        teclas.w = false;
        teclas.s = false;
        teclas.a = false;
        teclas.d = false;
        teclas.ArrowUp = false;
        teclas.ArrowDown = false;
        teclas.ArrowLeft = false;
        teclas.ArrowRight = false;
        teclas.space = false;
        teclas.x = false;
        teclas.chute = false;
        placarVermelho++;
        botAtacando = false;
        alert("GOL DO TIME VERMELHO!");
    }

    //Calculando força de impacto do jogador na bola
    let forçaImpacto = Math.sqrt(jogador.vx * jogador.vx + jogador.vy * jogador.vy);

    //Limitando a bola para não sair do campo (gol lado esquerdo)
    if(bola.x < bola.raio && (bola.y < 150 || bola.y > 300)){

        bola.x = bola.raio;
        bola.vx = -bola.vx; 
    }

    if(bola.y < bola.raio){
        bola.y = bola.raio;
        bola.vy = -bola.vy;
    }
             //Width (gol lado direito)
    if(bola.x > 885 && (bola.y < 150 || bola.y > 300)){
        bola.x = 900 -bola.raio;
        bola.vx = -bola.vx;
    }
             //Height
    if(bola.y > 500 - bola.raio){
        bola.y = 500 - bola.raio;
        bola.vy = -bola.vy;
    }

    //Limitando o jogador para não sair do campo
    if(jogador.x < jogador.raio){
        jogador.x = jogador.raio;
        jogador.vx = 0;
    }

    if(jogador.y < jogador.raio){
        jogador.y = jogador.raio;
        jogador.vy = 0;
    }
                //Width
    if(jogador.x > 900 - jogador.raio){
        jogador.x = 900 - jogador.raio;
        jogador.vx = 0;
    }
                //Height
    if(jogador.y > 500 - jogador.raio){
        jogador.y = 500 - jogador.raio;
        jogador.vy = 0;
    }

    //Implementando a colisão entre o jogador e a bola
    let dx = bola.x - jogador.x;
    let dy = bola.y - jogador.y;
    let distancia = Math.sqrt(dx * dx + dy * dy);
    let angulo = Math.atan2(dy, dx)

    if(distancia < bola.raio + jogador.raio){
    let força = forçaImpacto;
    let distanciaSobreposta = bola.raio + jogador.raio - distancia;
    jogador.x -= Math.cos(angulo) * distanciaSobreposta;
    jogador.y -= Math.sin(angulo) * distanciaSobreposta;
    bola.x += Math.cos(angulo) * distanciaSobreposta;
    bola.y += Math.sin(angulo) * distanciaSobreposta;
    bola.vx = força * Math.cos(angulo);
    bola.vy = força * Math.sin(angulo);
    }

    //Implementando a colisão do bot com a bola
    let dxBotBola = bola.x - bot.x;
    let dyBotBola = bola.y - bot.y;
    let distanciaBotBola = Math.sqrt(dxBotBola * dxBotBola + dyBotBola * dyBotBola);
    let anguloBotBola = Math.atan2(dyBotBola, dxBotBola);

    if(distanciaBotBola < bot.raio + bola.raio){
    let distanciaSobrepostaBotBola = bot.raio + bola.raio - distanciaBotBola;

    bola.x += Math.cos(anguloBotBola) * distanciaSobrepostaBotBola;
    bola.y += Math.sin(anguloBotBola) * distanciaSobrepostaBotBola;

    let velocidadeRelativa = (bola.vx - bot.vx) * Math.cos(anguloBotBola) + (bola.vy - bot.vy) * Math.sin(anguloBotBola);

    if(velocidadeRelativa < 0){
    bola.vx -= 2 * velocidadeRelativa * Math.cos(anguloBotBola);
    bola.vy -= 2 * velocidadeRelativa * Math.sin(anguloBotBola);
    }
    }

    //Implementando a colisão do bot com o jogador
    let dxBot = bot.x - jogador.x;
    let dyBot = bot.y - jogador.y;
    let distanciaBot = Math.sqrt(dxBot * dxBot + dyBot * dyBot);
    let anguloBot = Math.atan2(dyBot, dxBot);

    if(distanciaBot < bot.raio + jogador.raio){
    let distanciaSobrepostaBot = bot.raio + jogador.raio - distanciaBot;

    bot.x += Math.cos(anguloBot) * (distanciaSobrepostaBot / 2);
    bot.y += Math.sin(anguloBot) * (distanciaSobrepostaBot / 2);

    jogador.x -= Math.cos(anguloBot) * (distanciaSobrepostaBot / 2);
    jogador.y -= Math.sin(anguloBot) * (distanciaSobrepostaBot / 2);
    }

    //Verificando se o jogador está pressionando a tecla de chute e se a bola está próxima o suficiente para ser chutada, 55 é a distância máxima para o chute
    if (teclas.chute && distancia < 55){

    //Impede que o chute seja repetido enquanto a tecla estiver pressionada
    teclas.chute = false; 

    //Força do chute
    let forçaChute = 10 

    //Calculando o ângulo do chute
    bola.vx = forçaChute * Math.cos(angulo);
    bola.vy = forçaChute * Math.sin(angulo);
    }

    //Implementando a física da bola
    bola.x += bola.vx;
    bola.y += bola.vy;

    //Implementando o atrito da bola
    bola.vx *= 0.99;
    bola.vy *= 0.99;
    
    //Corrigindo os limites da bola depois do movimento
    if(bola.x < bola.raio && (bola.y < 150 || bola.y > 300)){
    bola.x = bola.raio;
    bola.vx = -bola.vx;
    }

    if(bola.y < bola.raio){
    bola.y = bola.raio;
    bola.vy = -bola.vy;
    }

    if(bola.x > 900 - bola.raio && (bola.y < 150 || bola.y > 300)){
    bola.x = 900 - bola.raio;
    bola.vx = -bola.vx;
    }

    if(bola.y > 500 - bola.raio){
    bola.y = 500 - bola.raio;
    bola.vy = -bola.vy;
    }

//Limpando o canvas para  atualizar a posição do jogador
ctx.clearRect(0, 0, 900, 500);

//Chamando as funções para desenhar tudo
drawCampo();
drawJogador(jogador);
drawJogador(bot);
drawBola(bola);
drawPlacar();
atualizarCronometro();
drawCronometro(tempoRestante);
}

//Chama o loop para executar tudo
loop(); 










