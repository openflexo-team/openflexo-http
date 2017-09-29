import { Component } from "../ui/Component"
import { Api, BindingId, RuntimeBindingId, ChangeEvent } from "../api/Api"

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
    runtime: string|null,extensions = new Map<string, string>()
  ) {
    if (this.enableRuntimeBinding !== null) {
        this.api.removeChangeListener(this.enableRuntimeBinding, this.enableChangeListener);
    }
    this.enableRuntimeBinding = null;
    if (runtime !== null) {
        if (this.enable !== null) {
            this.enable.contextUrl = runtime;
            this.enableRuntimeBinding = new RuntimeBindingId(this.enable, runtime,extensions);
            //this.api.evaluate<boolean>(this.enableRuntimeBinding).then(this.enableChangeListener);
            this.api.addChangeListener(this.enableRuntimeBinding, this.enableChangeListener);
        } else {
            this.setEnable(true);
        }

    } else {
        this.setEnable(false);
    }
  }
}
