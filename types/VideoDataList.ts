import { LinkedList, Node } from './LinkedList';
import VideoData from './VideoData';

class VideoDataList extends LinkedList {
  view() {
    return new Promise((resolve, reject) => {
      let text = '';
      let end = false;

      if (this.isEmpty()) {
        resolve(`|---[end]`)
      }

      const id = setInterval(() => {
        if (end) {
          clearInterval(id);
          resolve(`|${text}---[end]`);
        }
      });

      this.each((node: Node) => {
        const { id, playTime } = node.data as VideoData;
        text += `---[${id}, ${playTime}sec]`;
        if (this.isLastItem(node)) {
          end = true;
        }
      });
    });
  }

  totalPlayTime() {
    return new Promise((resolve, reject) => {
      let end = false;
      let stack = 0;
      const id = setInterval(() => {
        if (end === true) {
          clearInterval(id);
        }
        resolve(stack);
      }, 1);
  
      this.each((node: Node) => {
        const { playTime } = node.data as VideoData;
        stack += playTime
        if (this.isLastItem(node)) {
          end = true;
        }
      })
    })
  }
}

export default VideoDataList;
