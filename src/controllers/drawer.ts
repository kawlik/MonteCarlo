import CanvasController from "./canvas";

export default class DrawerController {
	public static readonly colorOut = "#BAD7F2";
	public static readonly colorIn = "#F2BAC9";

	private overlay: CanvasController;
	private surface: CanvasController;

	private callback?: () => void;

	private readonly modes = {
		drawing: false,
		inverse: false,
	};

	private readonly mouse = {
		r: 0.01,
		x: 0,
		y: 0,
	};

	constructor(private mainParent: Element) {
		// overlay has to be on top
		this.surface = new CanvasController(this.mainParent, true);
		this.overlay = new CanvasController(this.mainParent);

		this.overlay.cvs.style.cursor = "none";
		this.surface.cvs.style.cursor = "none";

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

		this.overlay.cvs.addEventListener("mouseleave", () => {
			this.clearOverlay();
		});

		// press events
		this.overlay.cvs.addEventListener("mousedown", () => {
			this.modes.drawing = true;

			this.clearOverlay();
			this.drawBrush();
		});

		this.overlay.cvs.addEventListener("mouseup", () => {
			this.modes.drawing = false;
		});

		// wheel events
		this.overlay.cvs.addEventListener("wheel", (e) => {
			if (e.deltaY > 0) this.mouse.r = Math.min(0.15, this.mouse.r + 0.01);
			if (e.deltaY < 0) this.mouse.r = Math.max(0.01, this.mouse.r - 0.01);

			this.clearOverlay();
			this.drawBrush();
		});

		// window events
		window.addEventListener("keydown", (e) => {
			if (e.code === "ShiftLeft") this.modes.inverse = true;
		});

		window.addEventListener("keyup", (e) => {
			if (e.code === "ShiftLeft") this.modes.inverse = false;
		});

		window.addEventListener("resize", (e) => {
			this.clearOverlay();
			this.clearSurface();
		});
	}

	public set onUpdate(callback: () => void) {
		this.callback = callback;
	}

	public getPixelData(x: number, y: number): 0 | 1 {
		x = Math.floor(x * this.surface.cvs.width);
		y = Math.floor(y * this.surface.cvs.height);

		const data = this.surface.ctx.getImageData(x, y, 1, 1).data;

		// test exact colors
		if (data[0] === 0xba && data[1] === 0xd7 && data[2] === 0xf2) return 0;
		if (data[0] === 0xf2 && data[1] === 0xba && data[2] === 0xc9) return 1;

		const d1 = (data[0] - 0xba) ** 2 + (data[1] - 0xd7) ** 2 + (data[2] - 0xf2) ** 2;
		const d2 = (data[0] - 0xf2) ** 2 + (data[1] - 0xba) ** 2 + (data[2] - 0xc9) ** 2;

		return d1 < d2 ? 0 : 1;
	}

	private clearOverlay(): void {
		this.overlay.ctx.clearRect(0, 0, this.overlay.cvs.width, this.overlay.cvs.height);
	}

	private clearSurface(): void {
		this.surface.ctx.fillStyle = DrawerController.colorOut;
		this.surface.ctx.fillRect(0, 0, this.surface.cvs.width, this.surface.cvs.height);
	}

	private drawBrush(): void {
		if (this.modes.drawing) {
			this.drawCircle(this.surface);
			this.drawCircle(this.overlay);

			// notify on content update
			if (!!this.callback) this.callback();
		}

		const r = this.mouse.r * this.overlay.cvs.width;
		const x = this.mouse.x;
		const y = this.mouse.y;

		this.overlay.ctx.beginPath();
		this.overlay.ctx.lineWidth = 3;
		this.overlay.ctx.strokeStyle = "#EFEFEF";
		this.overlay.ctx.arc(x, y, r, 0, 2 * Math.PI);
		this.overlay.ctx.stroke();
	}

	private drawCircle(canvas: CanvasController): void {
		const r = this.mouse.r * canvas.cvs.width;
		const x = this.mouse.x;
		const y = this.mouse.y;

		const color = this.modes.inverse ? DrawerController.colorOut : DrawerController.colorIn;

		canvas.ctx.beginPath();
		canvas.ctx.fillStyle = color;
		canvas.ctx.roundRect(x - r, y - r, r * 2, r * 2, r);
		canvas.ctx.fill();
	}

	private setMousePosition(e: MouseEvent): void {
		const { top, left } = this.surface.cvs.getBoundingClientRect();

		this.mouse.x = e.clientX - left;
		this.mouse.y = e.clientY - top;
	}
}
