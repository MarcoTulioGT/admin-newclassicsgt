import { BuildingStorefrontIcon, AdjustmentsHorizontalIcon, PuzzlePieceIcon } from '@heroicons/react/24/solid';
import { lusitana, anton, rajdhani } from '@/app/ui/fonts';


interface logoProps {
  size: string,
  color: string
}

export default function AcmeLogo({size, color}: logoProps) {
  return (
    <div
      className={`${rajdhani.className} flex flex-row  leading-6 ${color}`}
    >
      <AdjustmentsHorizontalIcon className="h-12 w-12 rotate-[2deg]" />
      <p className={`${size} px-5`}> NEW CLASSICS GT</p>
    </div>
  );
}

