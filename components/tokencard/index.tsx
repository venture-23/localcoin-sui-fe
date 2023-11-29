interface tokenProps {
  name: string;
  value: number;
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
  cardInsideClass
  // iconContainerClass
}) => {
  return (
    <div className={`flex  items-center ${cardContainerClass} rounded-md bg-white p-4 shadow-lg`}>
      <div className={`flex flex-col items-center ${cardInsideClass}`}>
        {/* <div className={`${iconContainerClass}`}>Icon</div> */}
        <p className="text-xm mb-0 text-center font-medium ">{tokenDetails.name}</p>
        {/* <p className="text-base text-gray-700">{description}</p> */}
      </div>
      <div className={`flex flex-col items-center ${cardInsideClass}`}>
        <p className="text-xm justify-right mb-0 text-center font-medium ">
          {' '}
          $ {tokenDetails.value}
        </p>
      </div>
    </div>
  );
};

export default TokenCard;
