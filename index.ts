import { createInterface } from 'readline';
import { stdin as input, stdout as output } from 'process';
import { LinkedList, LinkedListItem, Node } from './types/LinkedList';
import VideoData from './types/VideoData';
import VideoDataList from './types/VideoDataList';

function generateDummyClip() {
  const linkedList = new LinkedList();
  const playTimes = [12, 1, 7, 4, 9, 15, 2, 3, 143, 10, 12, 4, 1];

  for (let i = 1; i <= 13; i++) {
    linkedList.push(
      new VideoData('    제목' + (i < 10 ? `0${i}` : i), playTimes[i - 1])
    );
  }

  return linkedList;
}

(async () => {
  console.log('---영상클립 생성---');
  const clip = generateDummyClip();
  clip.each((node: Node) => {
    const { id, name, playTime } = node.data as VideoData;
    console.log(`${name.replace(/\s/g, '')}(${id}):${playTime}초`);
  });
  console.log('\n\n\n');

  const rl = createInterface({ input, output });

  const videoDataList = new VideoDataList();

  rl.on('line', async (line) => {
    if (line === 'exit') {
      rl.close();
      return;
    }
    if (/^add .{8}$/.test(line)) {
      const _id = line.split(' ')[1];
      const findNode = (await clip.find((item) => {
        const { id } = item.data as VideoData;
        if (id === _id) {
          return true;
        }
      })) as Node;
      if (!findNode) {
        console.log('node not exist');
        return;
      }

      const data = findNode.data as VideoData;
      videoDataList.push(data);
      console.log(await videoDataList.view());
      return;
    }

    if (/^delete .{8}$/.test(line)) {
      const _id = line.split(' ')[1];
      const findNode = (await videoDataList.find((item) => {
        const { id } = item.data as VideoData;
        if (id === _id) {
          return true;
        }
      })) as Node;
      await videoDataList.del(findNode);
      console.log(await videoDataList.view());
      return;
    }

    if (/^insert .{8} \d+$/.test(line)) {
      const [_id, index] = line.split(' ').slice(1);
      const findNode = (await clip.find((item) => {
        const { id } = item.data as VideoData;
        if (id === _id) {
          return true;
        }
      })) as Node;
      if (!findNode) {
        console.log('node not exist');
        return;
      }
      await videoDataList.insert(findNode.data, Number(index));
      console.log(await videoDataList.view());
      return;
    }

    if (line === 'render') {
      Promise.all([videoDataList.count(), videoDataList.totalPlayTime()]).then(
        (values) => {
          console.log(...values);
        }
      );
    }
  });
})();
