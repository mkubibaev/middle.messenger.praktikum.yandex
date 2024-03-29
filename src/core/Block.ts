import { v4 as uuidv4 } from 'uuid';
import Handlebars from 'handlebars';
import { isEqual } from 'utils/isEqual';
import EventBus from './EventBus';

type Events = Values<typeof Block.EVENTS>;

export interface BlockConstructable<Props extends {}> {
  new(props: Props): Block<Props>;
  componentName: string
}

export default class Block<Props extends Record<string, any>> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = uuidv4();

  protected _element: Nullable<HTMLElement> = null;

  readonly props: Props;

  protected children: { [id: string]: Block<Props> } = {};

  eventBus: () => EventBus<Events>;

  protected state: any = {};

  refs: { [key: string]: Block<any> } = {};

  constructor(props?: Props) {
    const eventBus = new EventBus<Events>();

    this.getStateFromProps(props);
    this.props = this._makePropsProxy(props || {} as Props);
    this.state = this._makePropsProxy(this.state);
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  private _checkInDom() {
    const elementInDOM = document.body.contains(this._element);

    if (elementInDOM) {
      setTimeout(() => this._checkInDom(), 1000);
      return;
    }

    this.eventBus().emit(Block.EVENTS.FLOW_CWU, this.props);
  }

  _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected getStateFromProps(props: any): void {
    this.state = {};
  }

  init() {
    this._element = this._createDocumentElement('div');
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  private _componentDidMount(props: Props) {
    this.componentDidMount(props);
  }

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidMount(props: any) {
  }

  private _componentWillUnmount() {
    this.eventBus().destroy();
    this.componentWillUnmount();
  }

  componentWillUnmount() {
  }

  _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(oldProps: Props, newProps: Props) {
    return !isEqual(oldProps, newProps);
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  setState = (nextState: any) => {
    if (!nextState) {
      return;
    }

    Object.assign(this.state, nextState);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this._compile();

    this._removeEvents();
    const newElement = fragment.firstElementChild!;

    this._element!.replaceWith(newElement);

    this._element = newElement as HTMLElement;
    this._addEvents();
  }

  protected render(): string {
    return '';
  }

  getContent(): HTMLElement {
    // Хак, чтобы вызвать CDM только после добавления в DOM
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        }
      }, 100);
    }

    return this.element!;
  }

  private _makePropsProxy(props: any): any {
    const self = this;

    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        const currentValue = target[prop];
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target, [prop]: currentValue }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    }) as unknown as Props;
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  private _removeEvents() {
    const { events } = (this.props as any) as Record<string, () => void>;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events)
      .forEach(([event, listener]) => {
        this._element!.removeEventListener(event, listener);
      });
  }

  private _addEvents() {
    const { events } = (this.props as any) as Record<string, () => void>;

    if (!events) {
      return;
    }

    Object.entries(events)
      .forEach(([event, listener]) => {
        this._element!.addEventListener(event, listener);
      });
  }

  private _compile(): DocumentFragment {
    const fragment = document.createElement('template');
    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template({
      ...this.state,
      ...this.props,
      children: this.children,
      refs: this.refs,
    });

    /**
     * Заменяем заглушки на компоненты
     */
    Object.entries(this.children)
      .forEach(([id, component]) => {
        /**
         * Ищем заглушку по id
         */
        const stub = fragment.content.querySelector(`[data-id="${id}"]`);

        if (!stub) {
          return;
        }

        const stubChilds = stub.childNodes.length ? stub.childNodes : [];

        /**
         * Заменяем заглушку на component._element
         */
        const content = component.getContent();
        stub.replaceWith(content);

        /**
         * Ищем элемент layout-а, куда вставлять детей
         */
        const layoutContent = content.querySelector(`[data-layout="${id}"]`);

        if (layoutContent && stubChilds.length) {
          layoutContent.append(...stubChilds);
        }
      });

    /**
     * Возвращаем фрагмент
     */
    return fragment.content;
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}
