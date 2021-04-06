const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', _ => {
	fetch('/albums', {
		method: 'put',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			name: 'Swifty',
			artist: 'Taylor Swift',
			album: 'Reputation'
		})
	})
	.then(res => {
		if (res.ok) return res.json()
	})
	.then(response => {
		window.location.reload(true)
	})
})

deleteButton.addEventListener('click', _ => {
  fetch('/albums', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Swifty'
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
      if (response === 'No album to delete') {
        messageDiv.textContent = 'No album from Swifty to delete'
      } else {
        window.location.reload(true)
      }
    })
    .catch(console.error)
})