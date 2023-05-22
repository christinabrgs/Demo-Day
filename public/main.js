
if (typeof document !== 'undefined') {

  const logButton = document.querySelector('.logWorkout')

  logButton.addEventListener('click', logWorkout)


  function logWorkout() {
    let data = []
    // create an object of data we want to save to the server
    // loop through each of the rows in the table by doing const rows = document.querySelectorAll('newRow')
    const rows = document.querySelectorAll('.newRow')



    for (let i = 0; i < rows.length; i++) {
      let arr = Array.from(rows[i].getElementsByTagName("td")).map(td => td.querySelector('input').value)

      console.log(arr)

      let obj = {
      'date': arr[0],
      'exercise': arr[1],
      'sets': arr[2],
      'reps': arr[3],
      'weight': arr[4],
      'pr': arr[5],
      'rating': Number(arr[6]),
      }

      data.push(obj)

    }

    fetch('/createLog', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(data => {
        console.log(data)
        window.location.reload()
      })

  }




  function addSet(tableName) {
    console.log(tableName)
    const table = document.getElementsByClassName(tableName)
    const rowCount = table[0].rows.length
    let row = table[0].insertRow(rowCount)
    row.classList.add('newRow')
    const cell1 = row.insertCell(0)
    const input1 = document.createElement('input')
    input1.type = 'date'
    input1.classList.add('newRow')
    input1.setAttribute("class", "workout ml-1 mr-0.5 my-1 rounded-md")
    cell1.appendChild(input1)

    const cell2 = row.insertCell(1)
    const input2 = document.createElement('input')
    input2.type = 'text'
    input2.classList.add('newRow')
    input2.setAttribute("class", "workout w-32 mx-0.5 my-1 rounded-md")
    cell2.appendChild(input2)

    const cell3 = row.insertCell(2)
    const input3 = document.createElement('input')
    input3.type = 'number'
    input3.classList.add('newRow')
    input3.setAttribute("class", "workout mx-0.5 my-1 text-black w-20 px-2 rounded-md")
    cell3.appendChild(input3)

    const cell4 = row.insertCell(3)
    const input4 = document.createElement('input')
    input4.type = 'number'
    input4.classList.add('newRow')
    input4.setAttribute("class", "workout mx-0.5 my-1 text-black w-20 px-2 rounded-md")
    cell4.appendChild(input4)

    const cell5 = row.insertCell(4)
    const input5 = document.createElement('input')
    input5.type = 'number'
    input5.classList.add('newRow')
    input5.setAttribute("class", "workout mx-0.5 my-1 w-32 rounded-md")
    cell5.appendChild(input5)

    const cell6 = row.insertCell(5)
    const input6 = document.createElement('input')
    input6.type = 'checkbox'
    input6.value = 'true' 
    console.log(input6.value)
    input6.classList.add('newRow')
    input6.setAttribute("class", "workout rounded-md w-20")
    cell6.appendChild(input6)

    // Radio
    const cell7 = row.insertCell(6)
    const inputOne = document.createElement('input')
    const labelOne = document.createElement('label')
    inputOne.type = 'radio'
    labelOne.innerText = '1'
    inputOne.classList.add('newRow')
    labelOne.setAttribute("class", "px-1")

    const inputTwo = document.createElement('input')
    const labelTwo = document.createElement('label')
    inputTwo.type = 'radio'
    labelTwo.innerText = '2'
    inputTwo.classList.add('newRow')
    labelTwo.setAttribute("class", "px-1")

    const inputThree = document.createElement('input')
    const labelThree = document.createElement('label')
    inputThree.type = 'radio'
    labelThree.innerText = '3'
    inputThree.classList.add('newRow')
    labelThree.setAttribute("class", "px-1")

    const inputFour = document.createElement('input')
    const labelFour = document.createElement('label')
    inputFour.type = 'radio'
    labelFour.innerText = '4'
    inputFour.classList.add('newRow')
    labelFour.setAttribute("class", "px-1")

    const inputFive = document.createElement('input')
    const labelFive = document.createElement('label')
    inputFive.type = 'radio'
    labelFive.innerText = '5'
    inputFive.classList.add('newRow')
    labelFive.setAttribute("class", "px-1")

    cell7.appendChild(inputOne)
    cell7.appendChild(labelOne)
    cell7.appendChild(inputTwo)
    cell7.appendChild(labelTwo)
    cell7.appendChild(inputThree)
    cell7.appendChild(labelThree)
    cell7.appendChild(inputFour)
    cell7.appendChild(labelFour)
    cell7.appendChild(inputFive)
    cell7.appendChild(labelFive)



    const cell8 = row.insertCell(7)
    const input8 = document.createElement('input')
    input8.type = 'checkbox'
    input8.classList.add('newRow')
    input8.setAttribute("class", "workout rounded-md w-20")
    cell8.appendChild(input8)

  }



  function removeSet(tableName) {
    const table = document.getElementsByClassName(tableName)
    let rowCount = table[0].rows.length
    for (let i = 0; i < rowCount; i++) {
      const row = table[0].rows[i]
      let checkBox = row.cells[7].childNodes[0]
      console.log(checkBox.checked)
      console.log(row.cells)

      if (checkBox.checked) {
        table[0].deleteRow(i)
        rowCount--
        i--
      }
    }
  }
}


