interface tokenProps {
  name: string;
  value: number;
  amount: string;
}
interface CardProps {
  tokenDetails: tokenProps;
  cardInsideClass?: string;
  iconContainerClass?: string;
  cardContainerClass?: string;
}

const TokenCard: React.FC<CardProps> = ({
  tokenDetails,
  cardContainerClass,
  cardInsideClass,
  iconContainerClass
}) => {
  return (
    <div className={`flex  items-center ${cardContainerClass} my-1 rounded-[4px] bg-white p-5 `}>
      <div className={`flex  items-center gap-4 ${cardInsideClass}`}>
        <div className={`${iconContainerClass} h-10 w-10 rounded-full bg-blue-500`}></div>

        <p className="text-lg font-semibold uppercase  ">{tokenDetails?.name}</p>
        {/* <p className="text-base text-gray-700">{description}</p> */}
      </div>
      <div className={`flex flex-col items-center ${cardInsideClass}`}>
        <p className="text-lg font-medium text-gray-500 ">
          {' '}
          $ {tokenDetails?.value || tokenDetails?.amount || ''}
        </p>
      </div>
    </div>
  );
};

export default TokenCard;
