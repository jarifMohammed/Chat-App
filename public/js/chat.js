const socket = io()

const messageForm = document.querySelector('#message-form')
const messageFormInput= messageForm.querySelector('input')
const messageFormButton = messageForm.querySelector('button')
const sendLocationButton =  document.querySelector('#location')
const messages = document.querySelector('#messages')

const messageTemplate = document.querySelector('#message-template').innerHTML


socket.on('message',(message) => {
    console.log(message);
    const html = Mustache.render(messageTemplate, { message })
    messages.insertAdjacentHTML('beforeend', html)
})






messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageFormButton.setAttribute('disabled', 'disabled')

    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (error) => {
        messageFormButton.removeAttribute('disabled')
        messageFormInput.value = ''
        messageFormInput.focus()
        if(error){
            return console.log(error);
        }
        console.log('Message delivered');
    })

})

sendLocationButton .addEventListener('click', () => {
    if(!navigator.geolocation){
        return alert('not supported by your browser')

    }
    sendLocationButton.setAttribute('disabled', 'disabled')
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            sendLocationButton.removeAttribute('disabled')
            console.log('Location shared');
        })

    })
})