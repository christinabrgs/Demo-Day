

if (typeof document !== 'undefined') {

	// anychart.onDocumentReady(function () {

	fetch('/chartData', {
		method: 'get',
		headers: { 'Content-Type': 'application/json' },
	})
		.then(response => response.json())
		.then(data => {
			console.log(data)
			const ctx = document.getElementById('myChart');
			const container = document.getElementById('calendar-container');

			const exercisesByDate = data.logs.reduce((acc, { date }) => {
				const formattedDate = date.split('T')[0]; // Extract the date part from the string

				if (acc.find(obj => obj.x === formattedDate)) {
					const existingObj = acc.find(obj => obj.x === formattedDate);
					existingObj.value++;
				} else {
					acc.push({ x: formattedDate, value: 1 });
				}

				return acc;
			}, []);

			console.log(exercisesByDate);



			// Process the data to create datasets for the line graph
			const lineData = {
				labels: exercisesByDate.map(obj => obj.x),
				datasets: [{
					label: 'Exercises',
					data: exercisesByDate.map(obj => obj.value),
					fill: false,
					borderColor: 'blue',
					tension: 0.1
				}]
			};

			new Chart(ctx, {
				type: 'line',
				data: lineData,
				options: {
					scales: {
						y: {
							beginAtZero: true
						}
					}
				}
			});







			// // pass the mapped data to the calendar function
			// var chart = anychart.calendar(exercisesByDate);

			// chart.listen('chartDraw', function () {
			// 	document.getElementById('container').style.height = chart.getActualHeight() + 'px';
			// });

			// chart.title("");
			// chart.container('container');
			// chart.draw();


			//   window.location.reload()
		})
		.catch(error => {
			console.error('Error fetching data:', error);
		})


	// })


}