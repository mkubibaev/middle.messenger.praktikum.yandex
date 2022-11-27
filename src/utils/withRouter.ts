import { BlockConstructable, Router } from 'core';

type WithRouterProps = { router: Router };

export function withRouter<P extends WithRouterProps>(WrappedBlock: BlockConstructable<P>) {
  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends WrappedBlock<P> {
    static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, router: window.router });
    }
  } as BlockConstructable<Omit<P, 'router'>>;
}
