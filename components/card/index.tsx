import { CheckBadgeIcon, ChevronRightIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface CardProps {
  title: string;
  link: string;
  cardInsideClass?: string;
  iconContainerClass?: string;
  cardContainerClass?: string;
  query?: any;
  iconName?: any;
}

const Card: React.FC<CardProps> = ({
  title,
  link,
  cardContainerClass,
  cardInsideClass,
  iconContainerClass,
  query,
  iconName
}) => {
  return (
    <Link href={query ? { pathname: link, query: query } : link}>
      <div
        className={`flex  items-center justify-between ${cardContainerClass} rounded-md bg-white px-8 py-5 `}
      >
        <div className={`flex items-center gap-5 ${iconContainerClass}`}>
          <div>{iconName}</div>
          <p className="mb-0 text-lg  font-semibold ">{title}</p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EFF8FF]">
          <ChevronRightIcon className="h-3 w-3" />
        </div>
      </div>
    </Link>
  );
};

export default Card;
