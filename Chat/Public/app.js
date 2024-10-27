const socket = new WebSocket('ws://localhost:8080');

socket.onmessage = function(event) {
    const chatBox = document.getElementById('chat-box');

    // Create a div for the received message
    const message = document.createElement('div');
    
    // Check if the incoming data is a Blob
    if (typeof event.data === 'string') {
        message.textContent = event.data; // Display the message directly if it's a string
    } else if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = function() {
            message.textContent = reader.result; // Convert Blob to text
            message.className = 'message received'; // Add class for styling
            chatBox.appendChild(message);
            chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
        };
        reader.readAsText(event.data); // Read the Blob as text
        return; // Prevents appending the message until it is loaded
    }

    message.className = 'message received'; // Add class for styling
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
};

function sendMessage() {
    const input = document.getElementById('message-input');
    const messageText = input.value;
    if (messageText.trim() !== '') {
        // Create a div for the sent message
        const message = document.createElement('div');
        message.textContent = messageText; // Display the message
        message.className = 'message sent'; // Add class for styling
        
        const chatBox = document.getElementById('chat-box');
        chatBox.appendChild(message); // Append sent message to chat box

        // Send the message as a string
        socket.send(messageText); 
        input.value = ''; // Clear input field
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
    }
}
