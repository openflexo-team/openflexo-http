import { Component } from "../ui/Component";
import { Api, BindingId, RuntimeBindingId, ChangeEvent } from "../api/Api";
import { updateBindingRuntime } from "./utils";

export abstract class BoundComponent  extends Component {

  readonly container : HTMLSpanElement | HTMLDivElement;

  public visible: BindingId<boolean>|null = null;
  public enable: BindingId<boolean>|null = null;

  private visibleRuntimeBinding: RuntimeBindingId<boolean>|null = null
  private readonly visibleChangeListener = (value) => this.setVisible(value)

  private enableRuntimeBinding: RuntimeBindingId<boolean>|null = null
  private readonly enableChangeListener = (value) => this.setEnable(value);

  constructor(public readonly api: Api) {
    super();
  }

  public abstract setEnable(enable: boolean);

  updateRuntime(
    runtime: string|null, extensions = new Map<string, string>()
  ) {
    if (this.enable != null) {
      this.enableRuntimeBinding = updateBindingRuntime(
          this.api, this.enable, this.enableRuntimeBinding,
          this.enableChangeListener, runtime, extensions
      );
    } else {
      this.setEnable(runtime !== null);
    }

    if (this.visible != null) {
      this.visibleRuntimeBinding = updateBindingRuntime(
          this.api, this.visible, this.visibleRuntimeBinding,
          this.visibleChangeListener, runtime, extensions
      );
    }

  }
}
