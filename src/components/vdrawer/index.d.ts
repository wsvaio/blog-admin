import { DrawerProps, FormProps, FormInstance } from "element-plus";
declare global {
  type vdrawerCtx = {
    drawer: Writeable<Partial<DrawerProps>>;
    form: Writeable<Partial<FormProps>>;
    payload: Record<any, any> & { $name?: string; $show?: boolean; $slot?: string };
    loading: boolean;
    act: (options?: string | vdrawerCtx["payload"]) => Promise<any>;
    elFormRef?: FormInstance;
    close: () => void;
  };
}

export {};
