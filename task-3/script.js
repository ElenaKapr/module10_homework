/***
Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.
Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».
При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.
Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат:
Добавить в чат механизм отправки гео-локации:
При клике на кнопку «Гео-локация» необходимо отправить данные серверу и в чат вывести ссылку 
на https://www.openstreetmap.org/ с вашей гео-локацией. Сообщение, которое отправит обратно эхо-сервер, не выводить. 
*/
function init() {
    const wsUrl = "wss://echo-ws-service.herokuapp.com";

    const chat = document.querySelector(".chat");
    const chatBtnSend = chat.querySelector(".chat-btn-send");
    const chatBtnGeo = chat.querySelector(".chat-btn-geo");
    const chatInput = chat.querySelector(".chat-input");
    const chatSection = chat.querySelector(".chat-section");

    // Устанавливаем высоту chat
    const chatHeight = Math.floor(document.documentElement.clientHeight * 0.90);
    chat.style.height = chatHeight + "px";

    // Запись нового сообщения
    function writeMessage(message, type) {
        let pre = document.createElement("p");
        
        pre.classList.add("chat-msg", type);
        pre.style.wordBreak = "break-word";
        pre.innerHTML = message;
        chatSection.appendChild(pre);
        chatSection.scrollTop = chatSection.scrollHeight;
    }
      
    // Обработчик для кнопки Отправить
    chatBtnSend.addEventListener('click', () => {
        const message = chatInput.value;
        if (message === "") return;

        writeMessage(message, "send");
        websocket.send(message);
        chatInput.value = "";
    });

    // Обработчик для кнопки Гео-локация
    chatBtnGeo.addEventListener('click', () => {
        let href = '';
        let message = '';

        // Функция, выводящая текст об ошибке
        const error = () => {
            message = 'Невозможно получить ваше местоположение';
            writeMessage(message, "send");
        }
  
        // Функция, срабатывающая при успешном получении геолокации
        const success = (position) => {
            const latitude  = position.coords.latitude;
            const longitude = position.coords.longitude;
  
            href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
            message = `<a href="${href}" target="blank">Гео-локация</a>`;
            writeMessage(message, "send");
        }
  
        if (!navigator.geolocation) {
          message = 'Geolocation не поддерживается вашим браузером';
          writeMessage(message, "send");
        } else {
          navigator.geolocation.getCurrentPosition(success, error);
        };
    });

    // Открываем WebSocker
    let websocket = new WebSocket(wsUrl);
    websocket.onmessage = function(event) {
        writeMessage(event.data, "response");
    };
    websocket.onerror = function(event) {
        writeMessage(
          '<span style="color: red;">ERROR:</span> ' + event.data
        , "response");
    };
};

window.onload = init();