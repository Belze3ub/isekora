const VideoContainer = ({ url }: {url: string}) => {
  return (
      <iframe
        allow="fullscreen"
        src={url}
        className={`w-full aspect-video`}
      />
  );
};

export default VideoContainer;
