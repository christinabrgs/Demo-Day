
let trash = document.getElementsByClassName("fa-circle-minus");
let star = document.getElementsByClassName("fa-star");

Array.from(trash).forEach(function (element) {
  element.addEventListener('click', function () {
    const date = this.parentNode.childNodes[0].innerText
    const entry = this.parentNode.childNodes[1].innerText

    console.log(date, entry)
    fetch('journal', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'date': date,
        'entry': entry
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});


Array.from(star).forEach(function (element) {
  element.addEventListener('click', function () {
    const date = this.parentNode.childNodes[0].innerText
    const entry = this.parentNode.childNodes[1].innerText
    const newValue = true
    fetch('/bookmarks', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'date': date,
        'entry': entry,
        'bookmark': newValue,
      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
  })
})
