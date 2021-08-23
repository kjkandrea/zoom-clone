console.log(
  document.body.children[0].textContent
)

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