async function sendMessage(){

    let inputField = document.getElementById("msg");
    let message = inputField.value;

    if(message.trim() === ""){
        return;
    }

    let chatBox = document.getElementById("chat-box");

    chatBox.innerHTML += `
        <div class="message user">
            <b>You:</b><br>${message}
        </div>
    `;

    inputField.value = "";

    let response = await fetch("/chat",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            message:message
        })
    });

    let data = await response.json();

    chatBox.innerHTML += `
        <div class="message bot">
            <b>AI:</b><br>${data.reply}
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById("msg")
.addEventListener("keypress",function(e){

    if(e.key === "Enter"){
        sendMessage();
    }

});