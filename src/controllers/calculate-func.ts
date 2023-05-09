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

	constructor(private mainParent: Element, private sideParent: Element) {
		this.chartDrawer = new CanvasController(this.mainParent);
		this.chartResult = new CanvasController(this.sideParent);

		this.drawer = new DrawerController(this.chartDrawer.cvs);
		this.result = new ResultController(this.chartResult.cvs);

		window.dispatchEvent(new Event("resize"));
	}

	public start(): void {
		if (this.frame) return;

		const func = (x: number) => Math.sin(x);

		this.drawer.draw(func, 0, Math.PI * 2);
		this.drawer.update();

		const animate = () => {
			const x = this.uniform(this.drawer.minX, this.drawer.maxX);
			const y = this.uniform(this.drawer.minY, this.drawer.maxY);

			const v = func(x);

			if (y > 0 && y > v) this.drawer.datasets[0].data.push({ x, y });
			if (y > 0 && y < v) this.drawer.datasets[1].data.push({ x, y });
			if (y < 0 && y > v) this.drawer.datasets[2].data.push({ x, y });
			if (y < 0 && y < v) this.drawer.datasets[3].data.push({ x, y });

			this.drawer.update();

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

	private uniform(min: number, max: number): number {
		if (min > max) [min, max] = [max, min];

		return Math.random() * (max - min) + min;
	}
}
