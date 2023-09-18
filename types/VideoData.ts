import { v4 } from 'uuid';

class VideoData {
  #id: string;
  #name: string;
  #playTime: number;
  constructor(name: string, playTime: number) {
    if (
      !/.{8}/.test(name) ||
      typeof playTime !== 'number' ||
      playTime.toString().length > 8
    ) {
      throw new Error();
    }
    this.#id = v4().replace(/-/g, '').substring(0, 8);
    this.#name = name;
    this.#playTime = playTime;
  }

  get id() {
    return this.#id;
  }

  set id(value: string) {
    this.#id = value;
  }

  get name() {
    return this.#name;
  }

  set name(value: string) {
    this.#name = value;
  }
  get playTime() {
    return this.#playTime;
  }

  set playTime(value: number) {
    this.#playTime = value;
  }
}

export default VideoData;
