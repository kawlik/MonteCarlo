import { createRoot, createSignal } from "solid-js";

// controllers
import CanvasController from "./canvas";
import RandomController from "./random";
import ResultController from "./result";

export default class CalculatePiController {
	public static readonly colorOut = "#BAD7F2";
	public static readonly colorIn = "#F2BAC9";

	private random: CanvasController;
	private result: CanvasController;
	private circle: CanvasController;

	private chartRandom: RandomController;
	private chartResult: ResultController;

	private frame: number = 0;
	private anim: boolean = false;

	private readonly signals = createRoot(function () {
		const [pi, setPi] = createSignal(0);

		return { pi, setPi };
	});

	constructor(private mainParent: Element, private sideParent: Element) {
		this.circle = new CanvasController(this.mainParent);
		this.random = new CanvasController(this.mainParent);
		this.result = new CanvasController(this.sideParent);

		this.chartRandom = new RandomController(this.random.cvs);
		this.chartResult = new ResultController(this.result.cvs);

		// callbacks
		this.circle.onUpdate = () => this.drawCircle();

		// adjust
		window.dispatchEvent(new Event("resize"));
	}

	public get pi() {
		return this.signals.pi;
	}

	public start(): void {
		if (this.anim) return;

		this.anim = true;

		this.chartRandom.clear();
		this.chartResult.clear();

		this.signals.setPi(0);

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

		this.anim = false;
	}

	private addNewRandomPoint(): void {
		const x = Math.random();
		const y = Math.random();
		const i = Math.sqrt((x - 0.5) ** 2 + (y - 0.5) ** 2) <= 1 ? 1 : 0;

		if (Math.sqrt(x ** 2 + y ** 2) > 1) {
			this.chartRandom.datasets[0].data.push({ x, y });
		} else {
			this.chartRandom.datasets[1].data.push({ x, y });
		}
	}

	private addNewResultPoint(): void {
		const numIn = this.chartRandom.datasets[1].data.length;
		const numOut = this.chartRandom.datasets[0].data.length;

		const dt = numIn + numOut;
		const pi = (4 * numIn) / dt;

		this.chartResult.datasets[0].data.push({ x: dt, y: pi });
		this.signals.setPi(pi);
	}

	private drawCircle(): void {
		const width = this.mainParent.clientWidth;
		const height = this.mainParent.clientHeight;
		const radius = Math.max(width, height);

		this.circle.ctx.fillStyle = CalculatePiController.colorOut;
		this.circle.ctx.fillRect(0, 0, width, height);
		this.circle.ctx.roundRect(0, 0, width, height, radius);
		this.circle.ctx.fillStyle = CalculatePiController.colorIn;
		this.circle.ctx.fill();
	}
}
