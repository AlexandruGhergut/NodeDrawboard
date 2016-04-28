var username = prompt("Enter your username: ");
var textBox = document.getElementById("inputTextBox");
var messageList = document.getElementById("messages");

function appendMessage(message, backgroundColor) {
	var listItem = document.createElement("li");
	var listItemText = document.createTextNode(message);
	listItem.appendChild(listItemText);
	if (arguments.length == 2)
		listItem.style.background = backgroundColor;
		
	messages.appendChild(listItem);
}

function sendMessage() {
	var message = username + ": " + document.getElementById("inputTextBox").value;
	textBox.value = ""; // clear textbox
	appendMessage(message, "white");
	socket.emit("chat_message", message);
	console.log("message");
	return false;
} 
