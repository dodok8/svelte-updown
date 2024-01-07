<script lang="ts">
	import { renderChart, type Chart } from 'svelte-chart-apex';
	import { convertNumTier, getExample, getRandomInt } from './utils';

	const data = getExample();

	const chart: Chart = {
		options: {
			series: [
				{
					name: '푼 문제',
					data: data
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
					formatter: convertNumTier
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
