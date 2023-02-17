import { Ref, isRef } from "vue";

export default (el: Ref<HTMLElement | Window | undefined> | HTMLElement | Window) => {
  if (!isRef(el)) el = ref(el);
  const element = $(el);
  const handlesMap = new Map<keyof HTMLElementEventMap, Set<(ev: Event) => void>>();

  onBeforeUnmount(() => {
    for (const [event, handles] of handlesMap.entries()) {
      for (const handle of handles) {
        element?.removeEventListener(event, handle);
      }
      handlesMap.delete(event);
    }
  });
  return {
    on: (
      events: keyof HTMLElementEventMap | (keyof HTMLElementEventMap)[],
      handles: ((ev: Event) => void) | ((ev: Event) => void)[],
      options?: boolean | AddEventListenerOptions | undefined,
    ) => {
      if (!Array.isArray(events)) events = [events];
      if (!Array.isArray(handles)) handles = [handles];
      for (const event of events) {
        if (!handlesMap.has(event)) handlesMap.set(event, new Set());
        for (const handle of handles) {
          handlesMap.get(event)?.add(handle);
          element?.addEventListener(event, handle, options);
        }
      }
    },
    off: (
      events: keyof HTMLElementEventMap | (keyof HTMLElementEventMap)[],
      handles?: ((ev: Event) => void) | ((ev: Event) => void)[],
      options?: boolean | EventListenerOptions | undefined,
    ) => {
      if (!Array.isArray(events)) events = [events];
      if (!Array.isArray(handles) && handles) handles = [handles];
      for (const event of events) {
        if (!handlesMap.has(event)) return;
        for (const handle of handles || handlesMap.get(event)!) {
          element?.removeEventListener(event, handle, options);
          handlesMap.get(event)!.delete(handle);
        }
      }
    },
  };
};
