import { useState } from 'react'
import './MovingBackground.css'
import type { ReactNode } from 'react'

interface MovingBackgroundProps {
  children?: ReactNode
  /** Overlay to dim the background and improve text contrast (0–1). */
  overlayOpacity?: number
  /** Optional class for the wrapper. */
  className?: string
  /** Optional: path or URL to a looping video (e.g. hero-bg.mp4). High quality, slow motion works best. */
  videoSrc?: string
  /** Optional: path or URL to an animated image/GIF for background. Used if videoSrc is not set. */
  imageSrc?: string
}

export default function MovingBackground({
  children,
  overlayOpacity = 0.4,
  className = '',
  videoSrc,
  imageSrc,
}: MovingBackgroundProps) {
  const [videoError, setVideoError] = useState(false)
  const useVideo = Boolean(videoSrc) && !videoError
  const useImage = Boolean(imageSrc) && (!useVideo || videoError)

  return (
    <div className={`moving-bg ${className}`.trim()} aria-hidden="true">
      {/* Fallback: gradient + blobs when no media or video fails */}
      <div className={`moving-bg__canvas ${useVideo || useImage ? 'moving-bg__canvas--behind' : ''}`}>
        <div className="moving-bg__gradient" />
        <div className="moving-bg__blob moving-bg__blob--1" />
        <div className="moving-bg__blob moving-bg__blob--2" />
        <div className="moving-bg__blob moving-bg__blob--3" />
        <div className="moving-bg__blob moving-bg__blob--4" />
        <div className="moving-bg__noise" />
      </div>

      {/* Video layer: slow, high-quality loop (like w-background-video) */}
      {useVideo && videoSrc && (
        <div className="moving-bg__video-wrap">
          <video
            className="moving-bg__video"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoError(true)}
          />
        </div>
      )}

      {/* GIF / image layer (alternative to video) */}
      {useImage && imageSrc && (
        <div className="moving-bg__image" style={{ backgroundImage: `url(${imageSrc})` }} />
      )}

      <div
        className={`moving-bg__overlay moving-bg__overlay--${overlayOpacity <= 0.25 ? 'light' : overlayOpacity <= 0.45 ? 'medium' : 'dark'}`}
      />
      {children && <div className="moving-bg__content">{children}</div>}
    </div>
  )
}