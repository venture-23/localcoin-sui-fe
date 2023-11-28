import Link from 'next/link';

interface CardProps {
  title: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ title, link }) => {
  return (
    <div className="m-4 max-w-md overflow-hidden rounded bg-white shadow-lg">
      <div className="flex items-center p-4">
        <div className="ml-4">
          <Link href={link}>
            <div className="text-xm ">{title}</div>
          </Link>
          {/* <p className="text-base text-gray-700">{description}</p> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
