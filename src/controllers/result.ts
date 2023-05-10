import Chart from "chart.js/auto";

export default class ResultController {
	private chart: Chart;

	constructor(private canvas: HTMLCanvasElement) {
		this.chart = new Chart(this.canvas, {
			data: {
				datasets: [
					{
						data: [] as { x: number; y: number }[],
						type: "scatter",
						pointRadius: 0.8,
						animation: {
							duration: 0,
						},
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
			},
		});
	}

	public get datasets() {
		return this.chart.data.datasets;
	}

	public clear(): void {
		this.chart.data.datasets[0].data = [];
	}

	public update(): void {
		this.chart.update();
	}
}
