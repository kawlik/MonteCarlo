export default class CanvasController {
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;

	private callback?: () => void;

	constructor(private parrent: Element, willReadFrequently = false) {
		this.canvas = this.parrent.appendChild(document.createElement("canvas"));
		this.context = this.canvas.getContext("2d", {
			willReadFrequently,
		})!;

		window.addEventListener("resize", () => {
			this.adjust();
			this.update();
		});
	}

	public set onUpdate(callback: () => void) {
		this.callback = callback;
	}

	public get ctx() {
		return this.context;
	}

	public get cvs() {
		return this.canvas;
	}

	private adjust(): void {
		const width = this.parrent.clientWidth;
		const height = this.parrent.clientHeight;

		// resize resolution
		this.canvas.width = width;
		this.canvas.height = height;

		// resize via style
		this.canvas.style.width = width + "px";
		this.canvas.style.height = height + "px";

		// center relative to parrent
		this.canvas.style.position = "absolute";
		this.canvas.style.left = "50%";
		this.canvas.style.top = "50%";

		// center relative to center
		this.canvas.style.transform = "translate(-50%, -50%)";
	}

	private update(): void {
		if (!!this.callback) this.callback();
	}
}
