import { MeshCanvas } from "./MeshCanvas";

const CDN =
  "https://cdn.prod.website-files.com/68359b057989673b79f2f2ce";

export function PageBackground() {
  return (
    <div className="page-bg" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${CDN}/6835aeda7a89cdd55853aa26_preloader-bg.avif`}
        srcSet={[
          `${CDN}/6835aeda7a89cdd55853aa26_preloader-bg-p-500.avif 500w`,
          `${CDN}/6835aeda7a89cdd55853aa26_preloader-bg-p-800.avif 800w`,
          `${CDN}/6835aeda7a89cdd55853aa26_preloader-bg.avif 3200w`,
        ].join(", ")}
        sizes="(max-width: 3200px) 100vw, 3200px"
        alt=""
        className="page-bg__image page-bg__image--gradient"
      />
      <div className="page-bg__gradient">
        <MeshCanvas />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${CDN}/6835aedbe87970a6c165b1f3_7c5abfa2aebee7d0df3cefbd3ff574dc_noise.avif`}
        srcSet={[
          `${CDN}/6835aedbe87970a6c165b1f3_7c5abfa2aebee7d0df3cefbd3ff574dc_noise-p-500.png 500w`,
          `${CDN}/6835aedbe87970a6c165b1f3_7c5abfa2aebee7d0df3cefbd3ff574dc_noise-p-800.png 800w`,
          `${CDN}/6835aedbe87970a6c165b1f3_7c5abfa2aebee7d0df3cefbd3ff574dc_noise-p-1080.png 1080w`,
          `${CDN}/6835aedbe87970a6c165b1f3_7c5abfa2aebee7d0df3cefbd3ff574dc_noise-p-1600.png 1600w`,
          `${CDN}/6835aedbe87970a6c165b1f3_7c5abfa2aebee7d0df3cefbd3ff574dc_noise.avif 2400w`,
        ].join(", ")}
        sizes="100vw"
        alt=""
        className="page-bg__image page-bg__image--noise"
      />
    </div>
  );
}
