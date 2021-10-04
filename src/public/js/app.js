const socket = io()

const welcomeEl = document.getElementById('welcome')
const welcomeFormEl = welcomeEl.querySelector('form')

const handleWelcomeSubmit = evt => {
  evt.preventDefault();
  const inputEl = evt.target.querySelector('input')
  socket.emit('room', { payload: inputEl.value })
  inputEl.value = ''
}

welcomeFormEl.addEventListener('submit', handleWelcomeSubmit)