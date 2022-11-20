import { BlockConstructable } from 'core';

type WithIsLoading = {
  isLoading: boolean;
};

export function withIsLoading<P extends WithIsLoading>(WrappedBlock: BlockConstructable<P>) {
  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, isLoading: () => window.store.getState().isLoading });
    }
  } as BlockConstructable<Omit<P, 'isLoading'>>;
}
