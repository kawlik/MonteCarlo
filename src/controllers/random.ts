import Chart from "chart.js/auto";

export default class RandomController {
	private chart: Chart;

	constructor(private canvas: HTMLCanvasElement) {
		this.chart = new Chart(this.canvas, {
			data: {
				datasets: [
					{
						data: [] as { x: number; y: number }[],
						type: "bubble",
					},
					{
						data: [] as { x: number; y: number }[],
						type: "bubble",
					},
				],
			},
			options: {
				aspectRatio: 1,
				layout: {
					autoPadding: false,
				},
				plugins: {
					legend: {
						display: false,
					},
				},
				scales: {
					x: {
						display: false,
						min: 0,
						max: 1,
					},
					y: {
						reverse: true,
						display: false,
						min: 0,
						max: 1,
					},
				},
			},
		});
	}

	public get datasets() {
		return this.chart.data.datasets;
	}

	public clear(): void {
		this.chart.data.datasets[0].data = [];
		this.chart.data.datasets[1].data = [];
	}

	public update(): void {
		this.chart.update();
	}
}
