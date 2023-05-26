import { createRoot, createSignal } from "solid-js";

// controllers
import CanvasController from "./canvas";
import ResultController from "./result";
import DrawerController from "./drawer";
import RandomController from "./random";
import Benchmark from "./benchmark";

export default class CalculateAreaController {
	private drawer: DrawerController;
	private random: CanvasController;
	private result: CanvasController;

	private chartRandom: RandomController;
	private chartResult: ResultController;

	private frame: number = 0;
	private anim: boolean = false;

	private readonly signals = createRoot(function () {
		const [area, setArea] = createSignal(0);

		return { area, setArea };
	});

	constructor(private mainParent: Element, private sideParent: Element) {
		this.drawer = new DrawerController(this.mainParent);
		this.random = new CanvasController(this.mainParent);
		this.result = new CanvasController(this.sideParent);

		this.chartRandom = new RandomController(this.random.cvs);
		this.chartResult = new ResultController(this.result.cvs);

		this.drawer.onUpdate = () => this.stop();
		this.hideRandomChart();

		window.dispatchEvent(new Event("resize"));
	}

	public get area() {
		return this.signals.area;
	}

	public start(): void {
		if (this.anim) return;

		this.anim = true;

		this.showRandomChart();
		this.chartRandom.clear();
		this.chartResult.clear();

		this.signals.setArea(0);

		const animate = () => {
			this.addNewRandomPoint();
			this.addNewResultPoint();

			this.chartRandom.update();
			this.chartResult.update();

			this.frame = requestAnimationFrame(animate);
		};

		animate();
	}

	public stop(): void {
		cancelAnimationFrame(this.frame);

		this.hideRandomChart();
		this.anim = false;
	}

	public test(): { name: string; time: number; value: number }[] {
		this.stop();

		const [exactTime, exactValue] = Benchmark.test(() => this.drawer.getExactValue());
		const [roughTime, roughValue] = Benchmark.test(() => this.drawer.getRoughValue());

		return [
			{ name: "Exact", time: exactTime, value: exactValue },
			{ name: "Rough", time: roughTime, value: roughValue },
		];
	}

	private addNewRandomPoint(): void {
		const x = Math.random();
		const y = Math.random();
		const i = this.drawer.getRelativeColor(x, y);

		this.chartRandom.datasets[i].data.push({ x, y: 1 - y });
	}

	private addNewResultPoint(): void {
		const numIn = this.chartRandom.datasets[1].data.length;
		const numOut = this.chartRandom.datasets[0].data.length;

		const area = numIn / (numIn + numOut);

		this.chartResult.datasets[0].data.push({ x: numIn + numOut, y: area });
		this.signals.setArea(area);
	}

	private hideRandomChart(): void {
		this.random.cvs.style.display = "none";
	}

	private showRandomChart(): void {
		this.random.cvs.style.display = "block";
	}
}
