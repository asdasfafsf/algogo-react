import {
  createElement,
  type ComponentType,
  type Dispatch,
  type ReactElement,
  type SetStateAction,
} from "react";

export interface ModalComponentProps<Result> {
  resolve: (value: Result) => void;
  reject: (reason?: unknown) => void;
}

interface ModalInfo {
  id: string;
  key: string;
  element: ReactElement;
}

export interface ModalHandle<Result> {
  id: string;
  result: Promise<Result>;
  resolve: (value: Result) => void;
  reject: (reason?: unknown) => void;
}

export default class ModalController {
  private flagState: [number, Dispatch<SetStateAction<number>>];

  private modalInfos: ModalInfo[] = [];

  private pendingModalInfos: ModalInfo[] = [];

  private nextId = 0;

  private requestedRenderVersion: number;

  private committedRenderVersion = 0;

  private hasPendingRender = false;

  constructor(flagState: [number, Dispatch<SetStateAction<number>>]) {
    this.flagState = flagState;
    this.requestedRenderVersion = flagState[0];
  }

  private requestRender() {
    this.hasPendingRender = true;
    this.requestedRenderVersion += 1;
    const setFlag = this.flagState[1];
    setFlag(this.requestedRenderVersion);
  }

  list() {
    return this.modalInfos;
  }

  private remove(id: string) {
    const nextPendingModalInfos = this.pendingModalInfos.filter(
      (modal) => modal.id !== id,
    );
    if (nextPendingModalInfos.length !== this.pendingModalInfos.length) {
      this.pendingModalInfos = nextPendingModalInfos;
      return true;
    }

    const nextModalInfos = this.modalInfos.filter((modal) => modal.id !== id);
    if (nextModalInfos.length === this.modalInfos.length) return false;

    this.modalInfos = nextModalInfos;
    this.requestRender();
    return true;
  }

  commitRender(renderVersion: number) {
    if (
      renderVersion <= this.committedRenderVersion ||
      renderVersion < this.requestedRenderVersion
    ) {
      return;
    }

    this.committedRenderVersion = renderVersion;
    this.hasPendingRender = false;

    const nextModal = this.pendingModalInfos.shift();
    if (!nextModal) return;

    this.modalInfos = [...this.modalInfos, nextModal];
    this.requestRender();
  }

  open<Props extends object, Result>(
    key: string,
    Component: ComponentType<Props & ModalComponentProps<Result>>,
    props: Props,
  ): ModalHandle<Result> {
    const id = `${key}-${this.nextId++}`;
    let resolveResult!: (value: Result) => void;
    let rejectResult!: (reason?: unknown) => void;
    const result = new Promise<Result>((resolve, reject) => {
      resolveResult = resolve;
      rejectResult = reject;
    });
    const resolve = (value: Result) => {
      if (this.remove(id)) resolveResult(value);
    };
    const reject = (reason?: unknown) => {
      if (this.remove(id)) rejectResult(reason);
    };
    const element = createElement(Component, { ...props, resolve, reject });

    const modalInfo = { id, key, element };
    if (this.hasPendingRender) {
      this.pendingModalInfos.push(modalInfo);
    } else {
      this.modalInfos = [...this.modalInfos, modalInfo];
      this.requestRender();
    }

    return { id, result, resolve, reject };
  }

  push<Props extends object, Result>(
    key: string,
    Component: ComponentType<Props & ModalComponentProps<Result>>,
    props: Props,
  ) {
    return this.open(key, Component, props).result;
  }
}
