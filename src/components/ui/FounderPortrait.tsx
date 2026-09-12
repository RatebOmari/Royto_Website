import Image from "next/image";

/**
 * The founder portrait. 4:5 frame, same treatment as the placeholder it
 * replaced — the frame and ratio are the constant; the image is the change.
 * Priority is off: the portrait is below the fold on both pages it appears
 * on, so it must not compete with the hero for bandwidth.
 */
export function FounderPortrait({ name }: { name: string }) {
  return (
    <figure className="m-0">
      <div className="relative aspect-[4/5] overflow-hidden rounded-panel border border-line bg-paper-raised">
        <Image
          src="/founder.jpg"
          alt={`${name}, founder of Royto`}
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 40vw, 100vw"
          className="object-cover object-top"
        />
      </div>
    </figure>
  );
}
