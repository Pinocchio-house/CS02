import { LinkedList, Node } from './types/LinkedList';
import VideoData from './types/VideoData';

(() => {
  console.log('---영상클립 생성---');
  const linkedList = new LinkedList();
  const playTimes = [12, 1, 7, 4, 9, 15, 2, 3, 143, 10, 12, 4, 1];

  for (let i = 1; i <= 13; i++) {
    linkedList.push(
      new VideoData('    제목' + (i < 10 ? `0${i}` : i), playTimes[i - 1])
    );
  }

  linkedList.each((node: Node) => {
    const { id, name, playTime } = node.data as VideoData;

    console.log(`${name.replace(/\s/g, '')}(${id}):${playTime}초`);
  });
})();
