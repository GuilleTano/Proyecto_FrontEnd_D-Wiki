const CALU_CHAT = "http://localhost:3000/preguntarCalubot";


async function sendMessage(mensaje) {

  const message = mensaje;

  return fetch(CALU_CHAT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: message })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.caluAnswer);
    const answer = data.caluAnswer.content;

    return answer
  })
  .catch(error => console.error(error));

}

// Falta que la pantalla se fije en el nuevo mensaje cuando aparece


function mostrarEnPantalla(src, text) {

  const msj = `
            <div class="row justify-content-center p-2 border-bottom border-2 border-light">
              <div class="col-md-1">
                <img src=${src} alt="userIco" class="rounded-circle" style="width:60px;">
              </div>
              <div class="col-md-8 py-3">
                <p class="m-0">${text}</p>
              </div>
            </div>
  `;

  document.getElementById("chatScreen").innerHTML += msj;

  return
}


document.addEventListener("DOMContentLoaded", function () {

  const askInput = document.getElementById("AskInput");
  const askButton = document.getElementById("AskBtn");
  askInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      askButton.click();
    }
  });


  let srcUser = "images/logo-tamers.png";
  let srcCulumon = "images/icoCalu.png";

  askButton.addEventListener("click", async function () {

    const newMess = askInput.value;
    askInput.value = "";
    mostrarEnPantalla(srcUser, newMess);

    const answer = await sendMessage(newMess);
    mostrarEnPantalla(srcCulumon, answer);

  });

});

