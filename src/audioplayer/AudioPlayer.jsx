export default function AudioPlayer(props) {
  return (
    <audio id="audioPlayer" loop="loop">
      <source src={props.audioTrackSrc} type="audio/mpeg" />
    </audio>
  );
}