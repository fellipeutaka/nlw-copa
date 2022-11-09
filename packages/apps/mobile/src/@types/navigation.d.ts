export declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface RootParamList {
      new: undefined;
      polls: undefined;
      find: undefined;
      details: {
        id: string;
        title: string;
        code: string;
      };
    }
  }
}
