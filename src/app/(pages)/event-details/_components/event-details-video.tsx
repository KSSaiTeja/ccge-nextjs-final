import Image from "next/image";
import youtube_img from "@/assets/img/event/event/youtube.png";
import event_details_img from "@/assets/img/event/event/event-details-img.jpg";
import VideoProvider from "@/components/video/video-provider";

export default function EventDetailsVideo() {
  return (
    <div className="tp-event-details-teaser-video mt-30 p-relative">
      <Image
        src={event_details_img}
        alt="event-details-img"
        style={{ height: "auto" }}
      />
      <div className="tp-event-details-teaser-video-popup">
        <VideoProvider videoId="go7QYaQR494">
          <Image
            src={youtube_img}
            alt="youtube-img"
            style={{ height: "auto" }}
          />
        </VideoProvider>
      </div>
    </div>
  );
}
