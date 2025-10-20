"use client";
import React, { useState } from "react";
import ModalVideo from "react-modal-video";

type IProps = {
  videoId: string;
  children: React.ReactNode;
};

export default function VideoProvider({ videoId, children }: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId={videoId}
        onClose={() => setIsOpen(false)}
      />
      <button
        onClick={() => setIsOpen(true)}
        className="tp-video-btn"
        style={{ border: "none", background: "transparent", cursor: "pointer" }}
      >
        {children}
      </button>
    </>
  );
}

