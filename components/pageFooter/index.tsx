import Image from "next/image"
import Link from "next/link"


const footerLinks = [
    {
        id: 1,
        link: '/',
        title: 'Home',
    },
    {
        id: 2,
        link: '/',
        title: 'Request/Pay',
    },
    {
        id: 3,
        link: '/',
        title: 'Campaigns',
    },
]

export const PageFooter = () => {
    return (
        <div className="sticky-footer">
            {footerLinks.map(item => (
                <div key={item.id} className={[item.id === 2 ? "relative w-full h-[100%]" : ""].join(" ")}>
                    {item.id === 2 ? (
                        <div className="req-pay-link">
                            <Image
                                src={'/req_pay_icon.png'}
                                width={33}
                                height={30}
                                className="opacity-[100%]"
                                alt="Req Pay icon"
                            />
                        <Link href={'/'}>
                            Request/Pay
                        </Link>
                    </div>
                    ) : (
                        <Link href={item.link}>
                            {item.title}
                        </Link>
                    )}
                    
                </div>
            ))}
        </div>
    )
    
}