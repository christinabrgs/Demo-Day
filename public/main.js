
let trash = document.getElementsByClassName("fa-circle-minus");


Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const date = this.parentNode.childNodes[0]
        const entry = this.parentNode.childNodes[1]
        fetch('/delete', {
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
