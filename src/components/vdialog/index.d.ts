import { DialogProps, FormProps, FormInstance } from "element-plus";
declare global {
  type vdialogCtx = {
    dialog: Writeable<Partial<DialogProps>>;
    form: Writeable<Partial<FormProps>>;
    payload: Record<any, any> & { $show?: boolean; $slot?: string; $name?: string };
    loading: boolean;
    act: (options?: string | vdialogCtx["payload"]) => Promise<any>;
    elFormRef?: FormInstance;
    close: () => void;
  };
}

export {};
