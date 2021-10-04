const messageList = document.getElementById('message-list')
const messageForm = document.getElementById('send-form')
const nicknameForm = document.getElementById('nickname-form')

document.addEventListener('DOMContentLoaded', () => nicknameForm.querySelector('input').focus())

const makeSendJson = (type, payload) => JSON.stringify({ type, payload})
const curriedMakeSendJson = R.curry(makeSendJson)
const makeMessage = curriedMakeSendJson('message')
const makeNickname = curriedMakeSendJson('nickname')

const handleSubmit = evt => {
  evt.preventDefault();
  const input = evt.target.querySelector('input')
  socket.send(makeMessage(input.value))
  input.value = ''
  input.focus()
}

messageForm.addEventListener('submit', handleSubmit)

const handleNicknameSubmit = evt => {
  evt.preventDefault();
  const input = evt.target.querySelector('input')
  socket.send(makeNickname(input.value))
}

nicknameForm.addEventListener('submit', handleNicknameSubmit)

const socket = new WebSocket(`ws://${window.location.host}`)

socket.addEventListener('open', () => console.log('🧚 WebSocket Connected to Server.'))
socket.addEventListener('close', () => console.log('🧚 WebSocket Disconnected from Server.'))

socket.addEventListener('message', msg => {
  const { nickname, message } = JSON.parse(msg.data)
  const messageTemplate = (nickname, message) => `
      <dl>
          <dt>${nickname}</dt>
          <dd>${message}</dd>
      </dl>
  `
  const el = document.createElement('li')
  el.innerHTML = messageTemplate(nickname, message)

  messageList.append(el)
})
