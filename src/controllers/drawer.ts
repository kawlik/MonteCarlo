import CanvasController from "./canvas";

export default class DrawerController {
	public static readonly colorOut = "#BAD7F2";
	public static readonly colorIn = "#F2BAC9";

	private overlay: CanvasController;
	private surface: CanvasController;

	private readonly mouse = {
		r: 0.01,
		x: 0,
		y: 0,
	};

	private readonly stage = {
		drawing: false,
		inverse: false,
	};

	constructor(private mainParent: Element) {
		// overlay has to be on top
		this.surface = new CanvasController(this.mainParent);
		this.overlay = new CanvasController(this.mainParent);

		this.overlay.cvs.style.cursor = "none";
		this.surface.cvs.style.cursor = "none";

		// key events
		this.overlay.cvs.addEventListener("keydown", (e) => {});
		this.overlay.cvs.addEventListener("keydup", (e) => {});

		// mouse events
		this.overlay.cvs.addEventListener("mouseenter", (e) => {
			this.setMousePosition(e);

			this.clearOverlay();
			this.drawBrush();
		});

		this.overlay.cvs.addEventListener("mousemove", (e) => {
			this.setMousePosition(e);

			this.clearOverlay();
			this.drawBrush();
		});

		// press events
		this.overlay.cvs.addEventListener("mousedown", () => {
			this.stage.drawing = true;

			this.clearOverlay();
			this.drawBrush();
		});

		this.overlay.cvs.addEventListener("mouseup", () => {
			this.stage.drawing = false;
		});

		// wheel events
		this.overlay.cvs.addEventListener("wheel", (e) => {
			if (e.deltaY > 0) this.mouse.r = Math.min(0.15, this.mouse.r + 0.01);
			if (e.deltaY < 0) this.mouse.r = Math.max(0.01, this.mouse.r - 0.01);

			this.clearOverlay();
			this.drawBrush();
		});

		// window events
		window.addEventListener("resize", (e) => {
			this.clearOverlay();
			this.clearSurface();
		});
	}

	private clearOverlay(): void {
		this.overlay.ctx.clearRect(0, 0, this.overlay.cvs.width, this.overlay.cvs.height);
	}

	private clearSurface(): void {
		this.surface.ctx.fillStyle = DrawerController.colorOut;
		this.surface.ctx.fillRect(0, 0, this.surface.cvs.width, this.surface.cvs.height);
	}

	private drawBrush(): void {
		if (this.stage.drawing) {
			this.drawCircle(this.surface);
			this.drawCircle(this.overlay);
		}

		const r = this.mouse.r * this.overlay.cvs.width;
		const x = this.mouse.x * this.overlay.cvs.width;
		const y = this.mouse.y * this.overlay.cvs.height;

		this.overlay.ctx.beginPath();
		this.overlay.ctx.lineWidth = 3;
		this.overlay.ctx.strokeStyle = "#EFEFEF";
		this.overlay.ctx.arc(x, y, r, 0, 2 * Math.PI);
		this.overlay.ctx.stroke();
	}

	private drawCircle(canvas: CanvasController): void {
		const r = this.mouse.r * canvas.cvs.width;
		const x = this.mouse.x * canvas.cvs.width;
		const y = this.mouse.y * canvas.cvs.height;

		canvas.ctx.beginPath();
		canvas.ctx.fillStyle = DrawerController.colorIn;
		canvas.ctx.roundRect(x - r, y - r, r * 2, r * 2, r);
		canvas.ctx.fill();
	}

	private setMousePosition(e: MouseEvent): void {
		const { top, left, width, height } = this.surface.cvs.getClientRects()[0];

		this.mouse.x = (e.clientX - left) / width;
		this.mouse.y = (e.clientY - top) / height;
	}
}
