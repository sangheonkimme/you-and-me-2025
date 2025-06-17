import { useEffect, useRef } from 'react';

const VideoChatPage = () => {
  const videoRef = useRef();

  useEffect(() => {
    getMedia();
  }, []);

  const getMedia = async () => {
    let myStream;
    try {
      myStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      videoRef.current.srcObject = myStream ? myStream : null;
      console.log(myStream);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      Video
      <video ref={videoRef} autoPlay playsInline></video>
    </div>
  );
};

export default VideoChatPage;
