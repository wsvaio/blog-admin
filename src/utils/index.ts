import { createEventBus } from "@wsvaio/utils";
export { default as ISearch } from "~icons/carbon/search";

export const log = console.log;

export const bus = createEventBus();

export const jumpToGithubAccess = (redirect_uri: string) => {
  location.replace(
    `https://github.com/login/oauth/authorize?client_id=Iv1.aa50f0300c8e7494&scope=user&redirect_uri=${redirect_uri}`,
  );
};
