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
console.log(socket)