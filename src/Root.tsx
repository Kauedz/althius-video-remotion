import { Composition } from "remotion";
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene3 } from "./scenes/Scene3";
import { Scene4 } from "./scenes/Scene4";
import { Scene5 } from "./scenes/Scene5";
import { Scene6 } from "./scenes/Scene6";

// 30fps | 1 frame = 1/30s
// Cena 1: 10s = 300 frames
// Cena 2: 10s = 300 frames
// Cena 3: 15s = 450 frames
// Cena 4: 20s = 600 frames
// Cena 5: 25s = 750 frames
// Cena 6: 20s = 600 frames
// Total: 100s = 3000 frames

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="AlthiusVideo"
        component={AlthiusFullVideo}
        durationInFrames={3000}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition id="Scene1" component={Scene1} durationInFrames={300} fps={30} width={1920} height={1080} />
      <Composition id="Scene2" component={Scene2} durationInFrames={300} fps={30} width={1920} height={1080} />
      <Composition id="Scene3" component={Scene3} durationInFrames={450} fps={30} width={1920} height={1080} />
      <Composition id="Scene4" component={Scene4} durationInFrames={600} fps={30} width={1920} height={1080} />
      <Composition id="Scene5" component={Scene5} durationInFrames={750} fps={30} width={1920} height={1080} />
      <Composition id="Scene6" component={Scene6} durationInFrames={600} fps={30} width={1920} height={1080} />
    </>
  );
};

const AlthiusFullVideo: React.FC = () => {
  const { useCurrentFrame, useVideoConfig, Sequence } = require("remotion");
  return (
    <>
      <Sequence from={0} durationInFrames={300}><Scene1 /></Sequence>
      <Sequence from={300} durationInFrames={300}><Scene2 /></Sequence>
      <Sequence from={600} durationInFrames={450}><Scene3 /></Sequence>
      <Sequence from={1050} durationInFrames={600}><Scene4 /></Sequence>
      <Sequence from={1650} durationInFrames={750}><Scene5 /></Sequence>
      <Sequence from={2400} durationInFrames={600}><Scene6 /></Sequence>
    </>
  );
};
