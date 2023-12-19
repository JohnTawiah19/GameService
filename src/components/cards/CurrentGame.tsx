import { Button } from "..";

type Props = {
  img: string;
  title: string;
};

export function CurrentGame({ img, title }: Props) {
  return (
    <div
      style={{ backgroundImage: `url(${img})` }}
      className="flex flex-col items-start justify-between current-game p-8"
    >
      <h1 className="text-4xl">{title}</h1>
      <Button asChild className="bg-orange-400">
        <a
          href="https://launcher-public-service-prod06.ol.epicgames.com/launcher/api/installer/download/EpicGamesLauncherInstaller.msi"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl px-6 py-2 bg-orange-500"
        >
          Play Now
        </a>
      </Button>
    </div>
  );
}

CurrentGame.defaultProps = {
  title: "Fall guys",
  img: "https://cdn2.unrealengine.com/egs-fallguys-mediatonic-g1a-00-1920x1080-75b891d04ff9.jpg",
};
