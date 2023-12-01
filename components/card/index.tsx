import { CheckBadgeIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
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
      <div className={`flex  items-center ${cardContainerClass} rounded-md bg-white p-4 shadow-lg`}>
        <div className={`flex flex-col items-center ${cardInsideClass}`}>
          <div className={`${iconContainerClass}`}>
            {/* <UserIcon /> */}
            {iconName}
            {/* <ClockIcon /> */}
            {/* <CheckBadgeIcon /> */}
          </div>
          <p className="text-xm mb-0 mt-2 text-center font-medium ">{title}</p>
          {/* <p className="text-base text-gray-700">{description}</p> */}
        </div>
      </div>
    </Link>
  );
};

export default Card;
