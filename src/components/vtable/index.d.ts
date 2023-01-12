declare global {
  type vtableCtx = {
    params: record<any, any>;
    checkList: record<any, any>[];
    refresh: () => void;
  } & vdrawerCtx;
}

export {};
