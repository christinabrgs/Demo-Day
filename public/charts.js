

if (typeof document !== 'undefined') {

	// anychart.onDocumentReady(function () {

	fetch('/chartData', {
		method: 'get',
		headers: { 'Content-Type': 'application/json' },
	})
		.then(response => response.json())
		.then(data => {
			console.log(data)


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

			// pass the mapped data to the calendar function
			var chart = anychart.calendar(exercisesByDate);

			chart.listen('chartDraw', function () {
				document.getElementById('container').style.height = chart.getActualHeight() + 'px';
			});

			chart.title("Logged Workouts");
			chart.container('container');
			chart.draw();














			// LINE CHART
			// const sortedData = data.logs.map(entry => ({
			// 	exercise: entry.exercise,
			// 	weight: entry.weight,
			// 	date: new Date(entry.date)
			// }));

			// const groupedData = {};

			// sortedData.forEach(entry => {
			// 	const exercise = entry.exercise;
			// 	if (!groupedData[exercise]) {
			// 		groupedData[exercise] = [];
			// 	}
			// 	groupedData[exercise].push(entry);
			// });

			// // Chart.register(ChartTime);

			// const datasets = Object.entries(groupedData).map(([exercise, entries]) => ({
			// 	label: exercise,
			// 	data: entries.map(entry => ({
			// 		x: moment(entry.date).format("dddd, MMMM Do"),
			// 		y: entry.weight
			// 	}))
			// }));

			// datasets.sort((a, b) => a.data[0].x - b.data[0].x)

			// console.log(datasets)

			// const ctx = document.getElementById("myChart").getContext("2d");

			// new Chart(ctx, {
			// 	type: "line",
			// 	data: {
			// 		datasets: datasets
			// 	},
			// 	options: {
			// 		scales: {
			// 			x: {
			// 				type: "time",
			// 				time: {
			// 					unit: "day"
			// 				},
			// 				display: true,
			// 				scaleLabel: {
			// 					display: true,
			// 					labelString: "Date"
			// 				}
			// 			},
			// 			y: {
			// 				display: true,
			// 				scaleLabel: {
			// 					display: true,
			// 					labelString: "Weight"
			// 				}
			// 			}
			// 		}
			// 	}
			// })

			//   window.location.reload()
		})
		.catch(error => {
			console.error('Error fetching data:', error);
		})


	// })


}