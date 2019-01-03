/* start the external action and say hello */
console.log("App is alive");

/** create global variable for the currently selected channel */
let currentChannel;

// Functions to execute when DOM has loaded
document.addEventListener("DOMContentLoaded", () => {
    console.log("App is initialized")
    getChannels();
    getMessages();
    loadMessagesIntoChannel();
    displayChannels();
    loadEmojis();
});

//---------------- Channels-----------------------------------

// get existing channels from mock file or database
function getChannels(){
    channels = mockChannels;
}

// get existing messages from mock file or database
function getMessages(){
    messages = mockMessages;
}

// load existing messages into respective channel
function loadMessagesIntoChannel() {
    channels.forEach(channel => {
        messages.forEach(message => {
            if (message.channel === channel.id) {
                channel.messages.push(message)
            }
        })
    })
}

// display channels in channel area 
function displayChannels() {
    const favoriteList = document.getElementById('favorite-channels');
    const regularList = document.getElementById('regular-channels');
    favoriteList.innerHTML = ""
    regularList.innerHTML = ""
    channels.forEach(channel => {
        const channelString = ` <li id="` + channel.id + `" onclick="switchChannel(this.id)">
                                    <i class="material-icons">group</i>
                                    <span class="channel-name">` + channel.name + `</span>
                                    <span class="timestamp">`+ channel.latestMessage() + `</span>
                                </li>`
        if (channel.favorite) {
            favoriteList.innerHTML += channelString
        } else {
            regularList.innerHTML += channelString
        }
    })
}

/** 
 * Switches channel 
 * @param {string} selectedChannelID - ID of channel to switch to.
 */
function switchChannel(selectedChannelID) {
    console.log("selected channel with id: " + selectedChannelID)
    if (!!currentChannel){
        document.getElementById(currentChannel.id).classList.remove("selected")
    }
    document.getElementById(selectedChannelID).classList.add("selected")
    channels.forEach(channel => {
        if (channel.id === selectedChannelID ) {
            currentChannel = channel
        }  
    })
    // hide user prompt and show input area the first time a user selects a channel
    if(!!document.getElementById("select-channel")){
        document.getElementById("select-channel").style.display = "none";
        document.getElementById("input-area").style.display = "flex";
        document.getElementById("message-area-header").style.display = "flex";
    }
    showHeader();
    showMessages();
}

// changes header name and favorite button
function showHeader(){
    document.getElementById("message-area-header").getElementsByTagName('h1')[0].innerHTML = currentChannel.name;
    document.getElementById('favorite-button').innerHTML = (currentChannel.favorite)? "favorite" : "favorite_border";
}

//---------------- Messages-----------------------------------

// Show the messages of the selected channel
function showMessages() {
    const chatArea = document.getElementById('chat-area');
    chatArea.innerHTML = ""
    currentChannel.messages.forEach(message => {
        const messageTime = message.createdOn.toLocaleTimeString("de-DE", {hour: "numeric", minute: "numeric"});
        let messageString;
        if (message.own){
            messageString =   `<div class="message outgoing-message">
                                    <div class="message-wrapper">
                                        <div class="message-content">
                                            <p>` + message.text + `</p>
                                        </div>
                                        <i class="material-icons">account_circle</i>
                                    </div>
                                    <span class="timestamp">`+ messageTime + `</span>
                                </div>`;
        } else {
            messageString =   `<div class="message incoming-message">
                                    <div class="message-wrapper">
                                        <i class="material-icons">account_circle</i>
                                        <div class="message-content">
                                            <h3>` + message.createdBy + `</h3>
                                            <p>` + message.text + `</p>
                                        </div>
                                    </div>
                                    <span class="timestamp">`+ messageTime + `</span>
                                </div>`;
        }
        chatArea.innerHTML += messageString;
    })
    chatArea.scrollTop = chatArea.scrollHeight;
    //update timestamp in channel area
    document.getElementById(currentChannel.id).querySelector(".timestamp").innerHTML = currentChannel.latestMessage();
}


// --------------------- Emojis ----------------------------

// load emojis into div
function loadEmojis() {
    for (let i = 0; i < emojis.length; i++) {
        document.getElementById("emoji-list").innerHTML += `<span class="button">` + emojis[i] + `</span>`
    }
    const emojisInArea = document.getElementById('emoji-list').childNodes 
    for (let i = 0; i < emojisInArea.length; i++) {
        emojisInArea[i].addEventListener('click', function(){
            document.getElementById('message-input').value += this.innerHTML;
            document.getElementById('send-button').style.color = "#00838f";
        });
    }
}

document.getElementById('emoticon-button').addEventListener('click', toggleEmojiArea);
document.getElementById('close-emoticon-button').addEventListener('click', toggleEmojiArea);

function toggleEmojiArea(){
    const emojiArea = document.getElementById('emoji-area');
    const chatArea = document.getElementById('chat-area');
    emojiArea.classList.toggle('toggle-area');
    chatArea.style.height = (emojiArea.classList.contains('toggle-area')) ? "calc(100vh - 132px - 250px)" : "calc(100vh - 132px)";
    chatArea.scrollTop = chatArea.scrollHeight;
}