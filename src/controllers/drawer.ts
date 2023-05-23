import CanvasController from "./canvas";
import OverlayController from "./drawer/overlay";

export default class DrawerController {
	private surface: CanvasController;
	private overlay: OverlayController;

	constructor(private mainParent: Element) {
		this.surface = new CanvasController(this.mainParent);
		this.overlay = new OverlayController(this.mainParent);
	}
}
