declare global {
  type vtableCtx = {
    params: record<any, any>;
    checkList: record<any, any>[];
    loading: boolean;
    refresh: () => void;
  };
}

export {};
