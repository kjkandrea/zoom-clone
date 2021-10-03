const app = {
  setup() {
    this.bindPetEvent()
  },
  pet() {
    alert('🤚')
  },
  bindPetEvent() {
    const petTrigger = document.querySelector('.petButton')
    petTrigger.addEventListener('click', this.pet)
  }
}

document.addEventListener('DOMContentLoaded', app.setup.bind(app))

const socket = new WebSocket(`ws://${window.location.host}`)

socket.addEventListener('open', () => console.log('🧚 WebSocket Connected to Server.'))
socket.addEventListener('close', () => console.log('🧚 WebSocket Disconnected from Server.'))

socket.addEventListener('message', msg => {
  console.log('server say : ', msg)
})

setTimeout(() => {
  socket.send('hi. server')
}, 2000)

