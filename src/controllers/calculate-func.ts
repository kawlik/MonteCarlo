import { createRoot, createSignal } from "solid-js";

// controllers
import CanvasController from "./canvas";
import DrawerController from "./drawer";
import ResultController from "./result";

export default class CalculateFuncController {
	private chartDrawer: CanvasController;
	private chartResult: CanvasController;

	private drawer: DrawerController;
	private result: ResultController;

	private frame?: number;

	private readonly signals = createRoot(function () {
		const [int, setInt] = createSignal(0);

		return { int, setInt };
	});

	constructor(private mainParent: Element, private sideParent: Element) {
		this.chartDrawer = new CanvasController(this.mainParent);
		this.chartResult = new CanvasController(this.sideParent);

		this.drawer = new DrawerController(this.chartDrawer.cvs);
		this.result = new ResultController(this.chartResult.cvs);

		window.dispatchEvent(new Event("resize"));
	}

	public get int() {
		return this.signals.int;
	}

	public start(): void {
		if (this.frame) return;

		const func = (x: number) => Math.sin(x);

		this.drawer.draw(func, 0, Math.PI * 2);
		this.drawer.update();

		this.result.clear();

		const animate = () => {
			this.addNewRandomPoint(func);
			this.addNewResultPoint();

			this.drawer.update();
			this.result.update();

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
		const x = this.uniform(this.drawer.minX, this.drawer.maxX);
		const y = this.uniform(this.drawer.minY, this.drawer.maxY);

		const v = func(x);

		if (y > 0 && y > v) this.drawer.datasets[0].data.push({ x, y });
		if (y > 0 && y < v) this.drawer.datasets[1].data.push({ x, y });
		if (y < 0 && y > v) this.drawer.datasets[2].data.push({ x, y });
		if (y < 0 && y < v) this.drawer.datasets[3].data.push({ x, y });
	}

	private addNewResultPoint(): void {
		const numPositiveOut = this.drawer.datasets[0].data.length;
		const numPositiveIn = this.drawer.datasets[1].data.length;
		const numNegativeIn = this.drawer.datasets[2].data.length;
		const numNegativeOut = this.drawer.datasets[3].data.length;

		const positive = Math.max((this.drawer.maxX - this.drawer.minX) * this.drawer.maxY, 0);
		const negative = Math.min((this.drawer.maxX - this.drawer.minX) * this.drawer.minY, 0);

		const numPositive = numPositiveIn + numPositiveOut;
		const numNegative = numNegativeIn + numNegativeOut;

		const intPositive = (positive * numPositiveIn) / numPositive;
		const intNegative = (negative * numNegativeIn) / numNegative;

		const dt = numPositive + numNegative;
		const int = intPositive + intNegative;

		this.result.datasets[0].data.push({ x: dt, y: int });
		this.signals.setInt(int);
	}

	private uniform(min: number, max: number): number {
		if (min > max) [min, max] = [max, min];

		return Math.random() * (max - min) + min;
	}
}
