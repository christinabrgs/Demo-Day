

if (typeof document !== 'undefined') {

	// let data = document.getElementById('mydiv').dataset.exercises

	fetch('/chartData', {
		method: 'get',
		headers: { 'Content-Type': 'application/json' },
	})
		.then(response => response.json())
		.then(data => {
			console.log(data)

			const exerciseCounts = {};

			for (let i = 0; i < data.logs.length; i++) {
				const exercise = data.logs[i].exercise.toLowerCase();
				if (exerciseCounts.hasOwnProperty(exercise)) {
					exerciseCounts[exercise] += 1;
				} else {
					exerciseCounts[exercise] = 1;
				}
			}

			console.log(exerciseCounts)

			const cty = document.getElementById("circleChart").getContext("2d");


			const labels = Object.keys(exerciseCounts);
			const datas = Object.values(exerciseCounts);

			new Chart(cty, {
				type: "polarArea",
				data: {
					datasets: [{
						data: datas,
						backgroundColor: [
							'rgb(255, 99, 132)',
							'rgb(75, 192, 192)',
							'rgb(255, 205, 86)',
							'rgb(201, 203, 207)',
							'rgb(54, 162, 235)'
						]
					}],
					labels: labels,
					hoverOffset: 4
				},
				options: {
					responsive: true,
					plugins: {
						legend: {
							position: 'bottom'
						}
					}
				}
			});

			//   window.location.reload()
		})
		.catch(error => {
			console.error('Error fetching data:', error);
		})





}