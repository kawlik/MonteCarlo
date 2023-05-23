import CanvasController from "./canvas";
import OverlayController from "./drawer/overlay";
import SurfaceController from "./drawer/surface";

export default class DrawerController {
	private surface: SurfaceController;
	private overlay: OverlayController;

	constructor(private mainParent: Element) {
		this.surface = new SurfaceController(this.mainParent);
		this.overlay = new OverlayController(this.mainParent, this.surface);

		window.addEventListener("resize", () => this.surface.clear());
	}
}
