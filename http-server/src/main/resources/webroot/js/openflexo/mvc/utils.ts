import { Api, BindingId, RuntimeBindingId, createExtendedRuntimeBinding, ChangeListener } from "../api/Api"

/**
 * Updates a binding runtime's by listening to the change of the given url.
 * It clears old listeners and creates a new RuntimeBindingId.
 */
export function updateBindingRuntime(
  api: Api, binding: string,
  oldRuntimeBinding: RuntimeBindingId<any>|null, changelistener: ChangeListener,
  runtime: string|null, extensions : Map<string, string>|null
): RuntimeBindingId<any>|null {

  if (oldRuntimeBinding !== null) {
    api.removeChangeListener(oldRuntimeBinding, changelistener);
  }

  if (runtime !== null && extensions !== null) {
    let runtimeBinding = createExtendedRuntimeBinding(binding, runtime, extensions);
    api.addChangeListener(runtimeBinding, changelistener);
    return runtimeBinding;
  } else {
    return null;
  }
}
