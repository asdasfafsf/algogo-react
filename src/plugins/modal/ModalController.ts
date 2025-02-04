/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from 'react';

interface ModalInfo {
  key: string;
  Component: React.FC<any> | null;
  props: unknown;
  resolve: (value: any) => void;
  reject: (value: any) => void;
}

export default class ModalController {
  private flagState: [number, Dispatch<SetStateAction<number>>];

  private modalInfos: ModalInfo[] = [];

  constructor(flagState: [number, Dispatch<SetStateAction<number>>]) {
    this.flagState = flagState;
  }

  private flush() {
    const setFlag = this.flagState[1];
    setFlag((prev) => prev + 1);
  }

  list() {
    return this.modalInfos;
  }

  remove(key: string) {
    const target = this.modalInfos.find((elem) => elem.key === key);
    if (target) {
      this.flush();
      target.resolve(true);
    }
    this.modalInfos = this.modalInfos.filter((elem) => elem.key !== key);
  }

  top() {
    return this.modalInfos[this.modalInfos.length - 1];
  }

  private handlePromises(key: string, resolver: (value: any) => void, value: any) {
    resolver(value);
    this.modalInfos = this.modalInfos.filter((elem) => key !== elem.key);
    this.flush();
  }

  clear() {
    while (this.modalInfos.length) {
      this.pop();
    }
    this.flush();
  }

  pop() {
    this.top()?.reject('Close modal');
    this.modalInfos.pop();
    this.flush();
  }

  async push(key: string, Component: React.FC<any> | null, props: unknown) {
    return new Promise((resolve, reject) => {
      this.modalInfos.push({
        key,
        Component,
        props,
        resolve: (value) => this.handlePromises(key, resolve, value),
        reject: (reason) => this.handlePromises(key, reject, reason),
      });
      this.flush();
    });
  }
}
