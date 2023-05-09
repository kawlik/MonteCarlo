import Chart from "chart.js/auto";

export default class DrawerController {
	private chart: Chart;

	constructor(private canvas: HTMLCanvasElement) {
		this.chart = new Chart(this.canvas, {
			data: {
				datasets: [
					{
						label: "In",
						data: [] as { x: number; y: number }[],
						type: "bubble",
					},
					{
						label: "Out",
						data: [] as { x: number; y: number }[],
						type: "bubble",
					},
					{
						label: "f(x)",
						pointRadius: 0,
						data: [] as { x: number; y: number }[],
						type: "line",
					},
				],
			},
			options: {
				aspectRatio: 1,
				layout: {
					autoPadding: false,
				},
			},
		});
	}

	public get datasets() {
		return this.chart.data.datasets;
	}

	public draw(func: (x: number) => number, min: number, max: number): void {
		this.clear();

		if (min > max) [min, max] = [max, min];

		this.chart.options.scales!.x!.min = min;
		this.chart.options.scales!.x!.max = max;

		let maxY = 0;
		let minY = 0;

		for (let x = min; x <= max; x += (max - min) / 1000) {
			const y = func(x);

			if (y > maxY) maxY = y;
			if (y < minY) minY = y;

			this.chart.data.datasets[2].data.push({ x, y });
		}

		this.chart.options.scales!.y!.min = minY;
		this.chart.options.scales!.y!.max = maxY;
	}

	public clear(): void {
		this.chart.data.datasets[0].data = [];
		this.chart.data.datasets[1].data = [];
		this.chart.data.datasets[2].data = [];
	}

	public update(): void {
		this.chart.update();
	}
}
