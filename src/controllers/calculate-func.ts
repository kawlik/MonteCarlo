import { createRoot, createSignal } from "solid-js";

// controllers
import CanvasController from "./canvas";
import PlotterController from "./plotter";
import ResultController from "./result";

export default class CalculateFuncController {
	private drawer: CanvasController;
	private result: CanvasController;

	private chartPlotter: PlotterController;
	private chartResult: ResultController;

	private frame?: number;

	private eval?: (x: number) => number;
	private minX: number = 0;
	private maxX: number = 1;

	private readonly signals = createRoot(function () {
		const [int, setInt] = createSignal(0);

		return { int, setInt };
	});

	constructor(private mainParent: Element, private sideParent: Element) {
		this.drawer = new CanvasController(this.mainParent);
		this.result = new CanvasController(this.sideParent);

		this.chartPlotter = new PlotterController(this.drawer.cvs);
		this.chartResult = new ResultController(this.result.cvs);

		window.dispatchEvent(new Event("resize"));
	}

	public get int() {
		return this.signals.int;
	}

	public set evaluator(func: (x: number) => number) {
		this.reset();

		this.eval = func;

		this.chartPlotter.plot(func, this.minX, this.maxX);
		this.chartPlotter.update();
	}

	public set x0(value: number) {
		this.reset();

		this.minX = value;
	}

	public set x1(value: number) {
		this.reset();

		this.maxX = value;
	}

	public reset(): void {
		this.stop();

		this.chartPlotter.clear();
		this.chartResult.clear();

		this.chartPlotter.update();
		this.chartResult.update();

		this.signals.setInt(0);
	}

	public start(): void {
		if (this.frame) return;
		if (!this.eval) return;

		this.chartPlotter.clear();
		this.chartResult.clear();

		const animate = () => {
			if (!this.eval) throw "Evaluator Func is undefined!";

			this.addNewRandomPoint(this.eval);
			this.addNewResultPoint();

			this.chartPlotter.update();
			this.chartResult.update();

			this.frame = requestAnimationFrame(animate);
		};

		animate();
	}

	public stop(): void {
		if (this.frame) {
			cancelAnimationFrame(this.frame);

			delete this.frame;
		}
	}

	private addNewRandomPoint(func: (x: number) => number): void {
		const x = this.uniform(this.chartPlotter.minX, this.chartPlotter.maxX);
		const y = this.uniform(this.chartPlotter.minY, this.chartPlotter.maxY);

		const v = func(x);

		if (y > 0 && y > v) this.chartPlotter.datasets[0].data.push({ x, y });
		if (y > 0 && y < v) this.chartPlotter.datasets[1].data.push({ x, y });
		if (y < 0 && y > v) this.chartPlotter.datasets[2].data.push({ x, y });
		if (y < 0 && y < v) this.chartPlotter.datasets[3].data.push({ x, y });
	}

	private addNewResultPoint(): void {
		const numPositiveOut = this.chartPlotter.datasets[0].data.length;
		const numPositiveIn = this.chartPlotter.datasets[1].data.length;
		const numNegativeIn = this.chartPlotter.datasets[2].data.length;
		const numNegativeOut = this.chartPlotter.datasets[3].data.length;

		const positive = Math.max(
			(this.chartPlotter.maxX - this.chartPlotter.minX) * this.chartPlotter.maxY,
			0
		);
		const negative = Math.min(
			(this.chartPlotter.maxX - this.chartPlotter.minX) * this.chartPlotter.minY,
			0
		);

		const numPositive = numPositiveIn + numPositiveOut;
		const numNegative = numNegativeIn + numNegativeOut;

		const intPositive = (positive * numPositiveIn) / numPositive || 0;
		const intNegative = (negative * numNegativeIn) / numNegative || 0;

		const dt = numPositive + numNegative;
		const int = intPositive + intNegative;

		this.chartResult.datasets[0].data.push({ x: dt, y: int });
		this.signals.setInt(int);
	}

	private uniform(min: number, max: number): number {
		if (min > max) [min, max] = [max, min];

		return Math.random() * (max - min) + min;
	}
}
