<script lang="ts">
	import { renderChart, type Chart } from 'svelte-chart-apex';

	function getRandomInt(min: number, max: number) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
	}

	const getExample = () => {
		const exampleData = [];
		let curr_date = new Date();
		for (let idx = 0; idx < 20; idx++) {
			curr_date = new Date(curr_date.getTime() + getRandomInt(0, 45) * 60000);
			exampleData.push({
				x: curr_date,
				y: idx * 2 >= 60 ? 59 : idx * 2
			});
		}
		return exampleData;
	};

	// 현재 생각 중인 방식은 00 = b5 대응 이런식으로 하는 거
	const chart: Chart = {
		options: {
			series: [
				{
					name: '푼 문제',
					data: getExample()
				}
			],
			chart: {
				height: 350,
				width: 500,
				type: 'line',
				dropShadow: {
					enabled: true,
					color: '#000',
					top: 18,
					left: 7,
					blur: 10,
					opacity: 0.2
				},
				toolbar: {
					show: false
				}
			},
			stroke: {
				curve: 'stepline'
			},
			title: {
				text: '문제 티어',
				align: 'left'
			},
			grid: {
				borderColor: '#e7e7e7',
				row: {
					colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
					opacity: 0.5
				}
			},
			markers: {
				size: 1
			},
			xaxis: {
				type: 'datetime'
			},
			yaxis: {
				title: {
					text: 'Tier',
					rotate: 0
				},
				min: 0,
				max: 59,
				tickAmount: 6,
				labels: {
					formatter: (value) => {
						let color = ['B', 'S', 'G', 'P', 'D', 'R'][Math.floor(value / 10)];
						let num = Math.floor((value % 10) / 2) + 1;
						return color + num;
					}
				}
			},
			tooltip: {
				custom: function ({ series, seriesIndex, dataPointIndex, w }) {
					return (
						'<div class="arrow_box">' +
						'<span>' +
						series[seriesIndex][dataPointIndex] +
						'</span>' +
						'</div>'
					);
				}
			}
		}
	};
</script>

<div use:renderChart={chart}></div>

<style>
</style>
