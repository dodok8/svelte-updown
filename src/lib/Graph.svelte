<script lang="ts">
	import { renderChart, type Chart } from 'svelte-chart-apex';
	import type { TierRange } from './types';

	function getRandomInt(min: number, max: number) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
	}

	const getExample = () => {
		const exampleData = [];
		let curr_date = new Date();
		let curr_tier: TierRange = 10;
		for (let idx = 0; idx < 20; idx++) {
			curr_date = new Date(curr_date.getTime() + getRandomInt(2, 45) * 60000);
			curr_tier += (-1) ** getRandomInt(0, 2);
			if (curr_tier < 0) {
				curr_tier = 0;
			}
			if (curr_tier > 29) {
				curr_tier = 29;
			}
			exampleData.push({
				x: curr_date,
				y: curr_tier
			});
		}
		return exampleData;
	};

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
				curve: 'straight',
				colors: ['#000']
			},
			title: {
				text: '문제 티어',
				align: 'left'
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
				forceNiceScale: true,
				labels: {
					formatter: (value) => {
						let color = ['B', 'S', 'G', 'P', 'D', 'R'][Math.floor(value / 5)];
						let num = Math.floor(value % 5) + 1;
						return color + num;
					}
				}
			},
			annotations: {
				yaxis: ['#ad5600', '#435f7a', '#ec9a00', '#27e2a4', '#00b4fc', '#ff0062'].map(
					(color, idx) => ({
						label: {
							text: ''
						},
						y: idx * 5,
						y2: (idx + 1) * 5,
						fillColor: color
					})
				)
			}
		}
	};
</script>

<div use:renderChart={chart}></div>

<style>
</style>
