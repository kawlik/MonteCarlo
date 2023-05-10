import Chart from "chart.js/auto";

export default class DrawerController {
	private chart: Chart;

	private min_x: number = 0;
	private max_x: number = 0;
	private min_y: number = 0;
	private max_y: number = 0;

	constructor(private canvas: HTMLCanvasElement) {
		this.chart = new Chart(this.canvas, {
			data: {
				datasets: [
					{
						label: "(y > 0) Out",
						data: [] as { x: number; y: number }[],
						type: "bubble",
					},
					{
						label: "(y > 0) In",
						data: [] as { x: number; y: number }[],
						type: "bubble",
					},
					{
						label: "(y < 0) In",
						data: [] as { x: number; y: number }[],
						type: "bubble",
					},
					{
						label: "(y < 0) Out",
						data: [] as { x: number; y: number }[],
						type: "bubble",
					},
					{
						label: "f(x)",
						data: [] as { x: number; y: number }[],
						type: "line",
						pointRadius: 0,
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
			},
		});
	}

	public get datasets() {
		return this.chart.data.datasets;
	}

	public get minX() {
		return this.min_x;
	}

	public get maxX() {
		return this.max_x;
	}

	public get minY() {
		return this.min_y;
	}

	public get maxY() {
		return this.max_y;
	}

	public draw(func: (x: number) => number, minX: number, maxX: number): void {
		if (minX === maxX) return;

		if (minX > maxX) [minX, maxX] = [maxX, minX];

		this.clear();
		let maxY = 0;
		let minY = 0;

		for (let x = minX; x <= maxX; x += (maxX - minX) / 1000) {
			const y = func(x);

			if (y > maxY) maxY = y;
			if (y < minY) minY = y;

			this.chart.data.datasets[4].data.push({ x, y });
		}

		this.setScales(minX, maxX, minY, maxY);
	}

	public clear(): void {
		this.chart.data.datasets[0].data = [];
		this.chart.data.datasets[1].data = [];
		this.chart.data.datasets[2].data = [];
		this.chart.data.datasets[3].data = [];
		this.chart.data.datasets[4].data = [];
	}

	public update(): void {
		this.chart.update();
	}

	public setScales(minX: number, maxX: number, minY: number, maxY: number): void {
		this.chart.options.scales!.x!.min = minX;
		this.chart.options.scales!.x!.max = maxX;
		this.chart.options.scales!.y!.min = minY;
		this.chart.options.scales!.y!.max = maxY;

		this.min_x = minX;
		this.max_x = maxX;
		this.min_y = minY;
		this.max_y = maxY;
	}
}
