
interface IDummyCardBoxProps {
    boxTitle: string
}

export const DummyCardBox = ({ boxTitle }: IDummyCardBoxProps) => {
    return (
        <div className="h-[124px] flex-none w-[124px] bg-[#EAEBEE] flex items-center justify-center">
            <p className="text-lg font-semibold">
                {boxTitle}
            </p>
        </div>
    )
}