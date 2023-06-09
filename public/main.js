
if (typeof document !== 'undefined') {

  const logButton = document.querySelector('.logWorkout')
  const pickedWorkout = document.querySelector('select').value
  const populateButton = document.querySelector('#populate')

  populateButton.addEventListener('click', populateExercises)

  function logWorkout() {
    let data = []
    const rows = document.querySelectorAll('.newRow')
    let arr;
    console.log('this is the rows', rows)
    console.log('this is the row length', rows.length)

    for (let i = 0; i < rows.length; i++) {
      arr = Array.from(rows[i].getElementsByTagName("td")).map(td => td.querySelector('input').value)

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

      // console.log(obj)
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

  logButton.addEventListener('click', logWorkout)

  // set initial date value as today
  function dateValue() {
    document.getElementById('dateValue').valueAsDate = new Date()
  }

  dateValue()

  console.log(pickedWorkout)






  // add and delete row on button click
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
    input1.valueAsDate = new Date()
    input1.setAttribute("class", "workout ml-1 mr-0.5 my-1 rounded-md")
    cell1.appendChild(input1)

    const cell2 = row.insertCell(1)
    const input2 = document.createElement('input')
    input2.type = 'text'
    input2.classList.add('newRow')
    input2.setAttribute("class", "workout w-32 mx-0.5 my-1 rounded-md")
    cell2.appendChild(input2)


    // populateExercises(table)


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
    input5.value = '0'
    input5.classList.add('newRow')
    input5.setAttribute("class", "workout mx-0.5 my-1 w-32 pl-6 rounded-md")
    cell5.appendChild(input5)

    const cell6 = row.insertCell(5)
    const input6 = document.createElement('input')
    input6.type = 'checkbox'
    input6.value = 'off'
    input6.classList.add('newRow')
    input6.setAttribute("class", "workout rounded-md w-20")
    cell6.appendChild(input6)

    // Radio
    const cell7 = row.insertCell(6)

    const form = document.createElement('form')

    const inputOne = document.createElement('input')
    const labelOne = document.createElement('label')
    inputOne.type = 'radio'
    inputOne.value = 1
    inputOne.name = 'rate'
    labelOne.innerText = '1'
    labelOne.setAttribute("class", "px-1")

    const inputTwo = document.createElement('input')
    const labelTwo = document.createElement('label')
    inputTwo.type = 'radio'
    inputTwo.value = 2
    labelTwo.innerText = '2'
    inputTwo.name = 'rate'
    labelTwo.setAttribute("class", "px-1")

    const inputThree = document.createElement('input')
    const labelThree = document.createElement('label')
    inputThree.type = 'radio'
    inputThree.value = 3
    labelThree.innerText = '3'
    inputThree.name = 'rate'
    labelThree.setAttribute("class", "px-1")

    const inputFour = document.createElement('input')
    const labelFour = document.createElement('label')
    inputFour.type = 'radio'
    inputFour.value = 4
    inputFour.name = 'rate'
    labelFour.innerText = '4'
    labelFour.setAttribute("class", "px-1")

    const inputFive = document.createElement('input')
    const labelFive = document.createElement('label')
    inputFive.type = 'radio'
    inputFive.value = 5
    inputFive.name = 'rate'
    labelFive.innerText = '5'
    labelFive.setAttribute("class", "px-1")

    form.appendChild(inputOne)
    form.appendChild(labelOne)
    form.appendChild(inputTwo)
    form.appendChild(labelTwo)
    form.appendChild(inputThree)
    form.appendChild(labelThree)
    form.appendChild(inputFour)
    form.appendChild(labelFour)
    form.appendChild(inputFive)
    form.appendChild(labelFive)

    cell7.appendChild(form)




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


  function addRow(tableName, exerciseName) {

    const table = document.getElementsByClassName(tableName)
    const rowCount = table[0].rows.length
    let row = table[0].insertRow(rowCount)
    row.classList.add('newRow')
    const cell1 = row.insertCell(0)
    const input1 = document.createElement('input')
    input1.type = 'date'
    input1.classList.add('newRow')
    input1.valueAsDate = new Date()
    input1.setAttribute("class", "workout ml-1 mr-0.5 my-1 rounded-md")
    cell1.appendChild(input1)

    const cell2 = row.insertCell(1)
    const input2 = document.createElement('input')
    input2.type = 'text'
    input2.value = exerciseName
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
    input5.value = '0'
    input5.classList.add('newRow')
    input5.setAttribute("class", "workout mx-0.5 my-1 w-32 pl-6 rounded-md")
    cell5.appendChild(input5)

    const cell6 = row.insertCell(5)
    const input6 = document.createElement('input')
    input6.type = 'checkbox'
    input6.value = 'off'
    input6.classList.add('newRow')
    input6.setAttribute("class", "workout rounded-md w-20")
    cell6.appendChild(input6)

      // Radio
      const cell7 = row.insertCell(6)

      const form = document.createElement('form')
  
      const inputOne = document.createElement('input')
      const labelOne = document.createElement('label')
      inputOne.type = 'radio'
      inputOne.value = 1
      inputOne.name = 'rate'
      labelOne.innerText = '1'
      labelOne.setAttribute("class", "px-1")
  
      const inputTwo = document.createElement('input')
      const labelTwo = document.createElement('label')
      inputTwo.type = 'radio'
      inputTwo.value = 2
      labelTwo.innerText = '2'
      inputTwo.name = 'rate'
      labelTwo.setAttribute("class", "px-1")
  
      const inputThree = document.createElement('input')
      const labelThree = document.createElement('label')
      inputThree.type = 'radio'
      inputThree.value = 3
      labelThree.innerText = '3'
      inputThree.name = 'rate'
      labelThree.setAttribute("class", "px-1")
  
      const inputFour = document.createElement('input')
      const labelFour = document.createElement('label')
      inputFour.type = 'radio'
      inputFour.value = 4
      inputFour.name = 'rate'
      labelFour.innerText = '4'
      labelFour.setAttribute("class", "px-1")
  
      const inputFive = document.createElement('input')
      const labelFive = document.createElement('label')
      inputFive.type = 'radio'
      inputFive.value = 5
      inputFive.name = 'rate'
      labelFive.innerText = '5'
      labelFive.setAttribute("class", "px-1")
  
      form.appendChild(inputOne)
      form.appendChild(labelOne)
      form.appendChild(inputTwo)
      form.appendChild(labelTwo)
      form.appendChild(inputThree)
      form.appendChild(labelThree)
      form.appendChild(inputFour)
      form.appendChild(labelFour)
      form.appendChild(inputFive)
      form.appendChild(labelFive)
  
      cell7.appendChild(form)


    const cell8 = row.insertCell(7)
    const input8 = document.createElement('input')
    input8.type = 'checkbox'
    input8.classList.add('newRow')
    input8.setAttribute("class", "workout rounded-md w-20")
    cell8.appendChild(input8)
  }



  function populateExercises() {
    let exerciseNames;
    console.log('populate exercises call')
    fetch('/workoutData', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);

        const exerciseContainer = document.querySelector('#exercise');

        for (let i = 0; i < data.workouts.length; i++) {
          if (data.workouts[i].workoutJSON.workoutName === pickedWorkout) {


            const exercises = data.workouts[i].workoutJSON.exercises;
            exerciseNames = exercises
            console.log('this exercise', exercises)
          }
        }
        exerciseNames.forEach(exercise => {
          addRow('workoutTable', exercise.name)
          const input = document.createElement('input');

          exerciseContainer.appendChild(input);
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }













}


