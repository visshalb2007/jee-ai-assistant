async function sendMessage(){

    let message = document.getElementById("msg").value;

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

    let chatBox = document.getElementById("chat-box");

    chatBox.innerHTML += `
        <p><b>You:</b> ${message}</p>
        <p><b>AI:</b> ${data.reply}</p>
    `;
}