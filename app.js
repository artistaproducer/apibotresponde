/*Dependencias de puppeter en shell
(para poderlas instalar en linux -distribucion Debian):

sudo apt-get install libxkbcommon-x11-0
sudo apt-get install libgtk-3-0
sudo apt-get install libgbm1

*/
//const puppeteer = require('puppeteer');
const puppeteer = require('puppeteer-extra');
/* const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin()) */
const fetch= require('node-fetch');
require("dotenv").config();
let browser = "";
const fs  =  require('fs').promises;
const port = process.env.PORT || 8080;
var express = require('express')
var cors = require('cors')
var app = express()
app.use(cors())

const browserPromise = puppeteer.launch({
    headless:true,
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });



browserPromise.then(async browserResult => {https://script.google.com/macros/s/AKfycbzHEa53uZqdbxkngX95aLH7w6CqGR-fvDnavmJGYViM6dFyukr-QT84j43-Zrc-avusxQ/exec
    browser=browserResult;
app.listen(port, () => {
      console.log(`Servidor de Express escuchando en el puerto ${port}`);
    });
console.log("el navegador esta lanzado")

  })
  .catch(error => {
    console.error('Error al lanzar el navegador:', error);
  });
var pageChatGPT = false;
/* https://script.google.com/macros/s/AKfycbzHEa53uZqdbxkngX95aLH7w6CqGR-fvDnavmJGYViM6dFyukr-QT84j43-Zrc-avusxQ/exec?accion=actualizar&date=12345&codigo=6789
https://script.google.com/macros/s/AKfycbzHEa53uZqdbxkngX95aLH7w6CqGR-fvDnavmJGYViM6dFyukr-QT84j43-Zrc-avusxQ/exec?accion=consultar */






async function lanzarEiniciar() {
    var page = await browser.newPage();
    
    //await page.goto(videoUrl);
    await page.goto("https://poe.com");
    //await page.screenshot({"path":"y2mate-search.jpg"});
    // Establecer la cookie en la página
      // Habilitar el monitoreo de la red
  /* const client = await page.target().createCDPSession();
  await client.send('Network.enable');

  // Capturar los mensajes recibidos a través del WebSocket
  client.on('Network.webSocketFrameReceived', ({ response }) => {
    console.log(`Mensaje recibido a través del WebSocket: ${response.payloadData}`);
  });

  // Capturar los mensajes enviados a través del WebSocket
  client.on('Network.webSocketFrameSent', ({ response }) => {
    console.log(`Mensaje enviado a través del WebSocket: ${response.payloadData}`);
  }); */
    var cookiesString = await fs.readFile("./cookies.json");
    var cookies =  JSON.parse(cookiesString);
    await page.setCookie(...cookies)
  /*   cookies =  {
        "domain": "poe.com",
        "expirationDate": 1715352622.688476,
        "hostOnly": true,
        "httpOnly": true,
        "name": "p-b",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "G2j5iKrYXEtD5DqZn1Uwig%3D%3D"
    } 
  await page.setCookie(cookies);*/
    var local = ["poe-tchannel-channel","poe-chan56-8888-wqijmlmzlobmipghlfrd"]
  await page.evaluate((local)=>{
    const [key, value] = local;
    localStorage.setItem(key,value);
  }, local)
    /* await page.close();
    return resp; */
    await wait(2000)
    await page.reload();
console.log("esperando segundos")
await wait(10000)

pageChatGPT = page;
/* var cookies = await page.cookies()
await fs.writeFile("./cookies.json",JSON.stringify(cookies, null, 2)) */
console.log("la pagina esta lista para recibir solicitudes")
/* elemento para ir al chat gpt
"a[href='/chatgpt']"
*/

/* ELemento que aparece cuando termina de escribiruna respuesta, es el elemto de like y dislike
document.querySelector(".ChatMessageFeedbackButtons_feedbackButtonsContainer__0Xd3I")
*/
await page.screenshot()
  .then(async (screenshotBuffer) => {
    const base64Image = screenshotBuffer.toString('base64');
     var payload = {
        archivo_name: "capturay2mate.jpg",
        file_mime: "image/jpeg",
        archivo_base64: base64Image 
      };

      var result = await fetch(
        'https://script.google.com/macros/s/AKfycbz9GV4R7FOQOoTukIl8RDmdqw_sOy00z8H1IJDgA8dCQIMCbxO031VFF4TbwjSqBf0PIg/exec',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      )
        .then((res) => res.json())
        .then((res) => {
console.log(res)
resp = res;}
);
  })
  .catch((error) => {
    console.log('Error al capturar la pantalla:', error);
  });
    /* await page.close();
    return resp; */
}


(async ()=>{
browserPromise.then(async browserResult => {
        browser=browserResult;
setTimeout(async ()=>{
	lanzarEiniciar();
    //var result= await searchVideoByUrl("https://www.youtube.com/watch?v=Qh4-hTA-Xgg")
//console.log(result)
},2000)


  })
  .catch(error => {
    console.error('Error al lanzar el navegador:', error);
  });


})()





app.post('/talk', express.json(),async function (req, res) {

	//console.log(videoUrl )
    const reqBody = req.body
    const respuesta ={
        noError:true
    }
	var botRespuesta= await talk(reqBody);
    if(botRespuesta=="ocurrio un error al intentar tener una respuesta"){
        respuesta.noError=false;
    } else{
        respuesta.botRespuesta = botRespuesta;
    }


    res.json(respuesta)

	
})

function wait(ms){
return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

async function talk(cuerpo) {
    if(cuerpo.clearContext){
    await pageChatGPT.click(".ChatMessageInputView_paintbrushWraper__DHMNW");
   // document.querySelector(".ChatMessageInputView_paintbrushWraper__DHMNW").click()

    }
    await pageChatGPT.evaluate((promt_recibido)=>{
    	document.querySelector(".ChatMessageInputView_textInput__Aervw").value = promt_recibido
    }, cuerpo.promt)
await pageChatGPT.click(".Button_button__GWnCw.ChatMessageInputView_sendButton__reEpT");
/* await wait(3000)
await pageChatGPT.screenshot()
  .then(async (screenshotBuffer) => {
    const base64Image = screenshotBuffer.toString('base64');
     var payload = {
        archivo_name: "capturay2mate.jpg",
        file_mime: "image/jpeg",
        archivo_base64: base64Image 
      };
      var result = await fetch(
        'https://script.google.com/macros/s/AKfycbz9GV4R7FOQOoTukIl8RDmdqw_sOy00z8H1IJDgA8dCQIMCbxO031VFF4TbwjSqBf0PIg/exec',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      )
        .then((res) => res.json())
        .then((res) => {
console.log(res)
resp = res;}
);
  })
  .catch((error) => {
    console.log('Error al capturar la pantalla:', error);
  }); */
    /* await page.close();
    return resp; */
await (function name() {
    return new Promise(async (resolve,reject)=>{
        for (let index = 0; index <20; index++) {
            try {
                await pageChatGPT.waitForSelector(".ChatMessageFeedbackButtons_feedbackButtonsContainer__0Xd3I", { timeout: 2000 });
                // Si se encuentra el selector, se ejecutan estas instrucciones:
                console.log('Se encontró el selector.');
                resolve(true);
                break;
                
              } catch (error) {
                // Si no se encuentra el selector, se ejecutan estas instrucciones:
                console.log('No se encontró el selector.');
                await pageChatGPT.reload();
              }
            
        }
    })
})()



var respuesta = await pageChatGPT.evaluate(() => {

    return document.querySelector(".ChatMessageFeedbackButtons_feedbackButtonsContainer__0Xd3I").parentNode.querySelector(".ChatMessage_messageRow__7yIr2").innerText
    // Aquí puedes ejecutar la función que quieras cuando el elemento reaparezca
});
//console.log(respuesta)
if(typeof respuesta=="string") return respuesta
return "ocurrio un error al intentar tener una respuesta"
}/*Dependencias de puppeter en shell
(para poderlas instalar en linux -distribucion Debian):

sudo apt-get install libxkbcommon-x11-0
sudo apt-get install libgtk-3-0
sudo apt-get install libgbm1

*/
//const puppeteer = require('puppeteer');
const puppeteer = require('puppeteer-extra');
/* const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin()) */
const fetch= require('node-fetch');
require("dotenv").config();
let browser = "";
const fs  =  require('fs').promises;
const port = process.env.PORT || 8080;
var express = require('express')
var cors = require('cors')
var app = express()
app.use(cors())

const browserPromise = puppeteer.launch({
    headless:true,
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });



browserPromise.then(async browserResult => {https://script.google.com/macros/s/AKfycbzHEa53uZqdbxkngX95aLH7w6CqGR-fvDnavmJGYViM6dFyukr-QT84j43-Zrc-avusxQ/exec
    browser=browserResult;
app.listen(port, () => {
      console.log(`Servidor de Express escuchando en el puerto ${port}`);
    });
console.log("el navegador esta lanzado")

  })
  .catch(error => {
    console.error('Error al lanzar el navegador:', error);
  });
var pageChatGPT = false;
/* https://script.google.com/macros/s/AKfycbzHEa53uZqdbxkngX95aLH7w6CqGR-fvDnavmJGYViM6dFyukr-QT84j43-Zrc-avusxQ/exec?accion=actualizar&date=12345&codigo=6789
https://script.google.com/macros/s/AKfycbzHEa53uZqdbxkngX95aLH7w6CqGR-fvDnavmJGYViM6dFyukr-QT84j43-Zrc-avusxQ/exec?accion=consultar */






async function lanzarEiniciar() {
    var page = await browser.newPage();
    
    //await page.goto(videoUrl);
    await page.goto("https://poe.com");
    //await page.screenshot({"path":"y2mate-search.jpg"});
    // Establecer la cookie en la página
      // Habilitar el monitoreo de la red
  /* const client = await page.target().createCDPSession();
  await client.send('Network.enable');

  // Capturar los mensajes recibidos a través del WebSocket
  client.on('Network.webSocketFrameReceived', ({ response }) => {
    console.log(`Mensaje recibido a través del WebSocket: ${response.payloadData}`);
  });

  // Capturar los mensajes enviados a través del WebSocket
  client.on('Network.webSocketFrameSent', ({ response }) => {
    console.log(`Mensaje enviado a través del WebSocket: ${response.payloadData}`);
  }); */
    var cookiesString = await fs.readFile("./cookies.json");
    var cookies =  JSON.parse(cookiesString);
    await page.setCookie(...cookies)
  /*   cookies =  {
        "domain": "poe.com",
        "expirationDate": 1715352622.688476,
        "hostOnly": true,
        "httpOnly": true,
        "name": "p-b",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "G2j5iKrYXEtD5DqZn1Uwig%3D%3D"
    } 
  await page.setCookie(cookies);*/
    var local = ["poe-tchannel-channel","poe-chan56-8888-wqijmlmzlobmipghlfrd"]
  await page.evaluate((local)=>{
    const [key, value] = local;
    localStorage.setItem(key,value);
  }, local)
    /* await page.close();
    return resp; */
    await wait(2000)
    await page.reload();
console.log("esperando segundos")
await wait(10000)

pageChatGPT = page;
/* var cookies = await page.cookies()
await fs.writeFile("./cookies.json",JSON.stringify(cookies, null, 2)) */
console.log("la pagina esta lista para recibir solicitudes")
/* elemento para ir al chat gpt
"a[href='/chatgpt']"
*/

/* ELemento que aparece cuando termina de escribiruna respuesta, es el elemto de like y dislike
document.querySelector(".ChatMessageFeedbackButtons_feedbackButtonsContainer__0Xd3I")
*/
await page.screenshot()
  .then(async (screenshotBuffer) => {
    const base64Image = screenshotBuffer.toString('base64');
     var payload = {
        archivo_name: "capturay2mate.jpg",
        file_mime: "image/jpeg",
        archivo_base64: base64Image 
      };

      var result = await fetch(
        'https://script.google.com/macros/s/AKfycbz9GV4R7FOQOoTukIl8RDmdqw_sOy00z8H1IJDgA8dCQIMCbxO031VFF4TbwjSqBf0PIg/exec',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      )
        .then((res) => res.json())
        .then((res) => {
console.log(res)
resp = res;}
);
  })
  .catch((error) => {
    console.log('Error al capturar la pantalla:', error);
  });
    /* await page.close();
    return resp; */
}


(async ()=>{
browserPromise.then(async browserResult => {
        browser=browserResult;
setTimeout(async ()=>{
	lanzarEiniciar();
    //var result= await searchVideoByUrl("https://www.youtube.com/watch?v=Qh4-hTA-Xgg")
//console.log(result)
},2000)


  })
  .catch(error => {
    console.error('Error al lanzar el navegador:', error);
  });


})()





app.post('/talk', express.json(),async function (req, res) {

	//console.log(videoUrl )
    const reqBody = req.body
    const respuesta ={
        noError:true
    }
	var botRespuesta= await talk(reqBody);
    if(botRespuesta=="ocurrio un error al intentar tener una respuesta"){
        respuesta.noError=false;
    } else{
        respuesta.botRespuesta = botRespuesta;
    }


    res.json(respuesta)

	
})

function wait(ms){
return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

async function talk(cuerpo) {
    if(cuerpo.clearContext){
    await pageChatGPT.click(".ChatMessageInputView_paintbrushWraper__DHMNW");
   // document.querySelector(".ChatMessageInputView_paintbrushWraper__DHMNW").click()

    }
    await pageChatGPT.evaluate((promt_recibido)=>{
    	document.querySelector(".ChatMessageInputView_textInput__Aervw").value = promt_recibido
    }, cuerpo.promt)
await pageChatGPT.click(".Button_button__GWnCw.ChatMessageInputView_sendButton__reEpT");
/* await wait(3000)
await pageChatGPT.screenshot()
  .then(async (screenshotBuffer) => {
    const base64Image = screenshotBuffer.toString('base64');
     var payload = {
        archivo_name: "capturay2mate.jpg",
        file_mime: "image/jpeg",
        archivo_base64: base64Image 
      };
      var result = await fetch(
        'https://script.google.com/macros/s/AKfycbz9GV4R7FOQOoTukIl8RDmdqw_sOy00z8H1IJDgA8dCQIMCbxO031VFF4TbwjSqBf0PIg/exec',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      )
        .then((res) => res.json())
        .then((res) => {
console.log(res)
resp = res;}
);
  })
  .catch((error) => {
    console.log('Error al capturar la pantalla:', error);
  }); */
    /* await page.close();
    return resp; */
await (function name() {
    return new Promise(async (resolve,reject)=>{
        for (let index = 0; index <20; index++) {
            try {
                await pageChatGPT.waitForSelector(".ChatMessageFeedbackButtons_feedbackButtonsContainer__0Xd3I", { timeout: 2000 });
                // Si se encuentra el selector, se ejecutan estas instrucciones:
                console.log('Se encontró el selector.');
                resolve(true);
                break;
                
              } catch (error) {
                // Si no se encuentra el selector, se ejecutan estas instrucciones:
                console.log('No se encontró el selector.');
                await pageChatGPT.reload();
              }
            
        }
    })
})()



var respuesta = await pageChatGPT.evaluate(() => {

    return document.querySelector(".ChatMessageFeedbackButtons_feedbackButtonsContainer__0Xd3I").parentNode.querySelector(".ChatMessage_messageRow__7yIr2").innerText
    // Aquí puedes ejecutar la función que quieras cuando el elemento reaparezca
});
//console.log(respuesta)
if(typeof respuesta=="string") return respuesta
return "ocurrio un error al intentar tener una respuesta"
}
