import { EmailThree, LocationFour, TelSvgTwo } from "../svg";

const contactInfoData = [
    {
        icon: <EmailThree />,
        title: 'Email Us',
        description: 'Get in touch via email',
        linkText: 'info@ccge.in',
        href: 'mailto:info@ccge.in'
    },
    {
        icon: <TelSvgTwo />,
        title: 'Call Us',
        description: 'Mon-Sat from 9am to 6pm',
        linkText: '+91 96666 60713 / 14',
        href: 'tel:+919666660713'
    },
    {
        icon: <LocationFour />,
        title: 'Visit Us',
        description: 'Come visit our office',
        linkText: 'Hyderabad, Telangana, India',
        href: '#'
    }
];

export default function ContactInfoArea() {
    return (
        <section className="tp-contact-info-area tp-contact-p pb-90">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="tp-contact-info-wrapper text-center">
                            <h3 className="tp-contact-main-title">Let us know how we can help</h3>
                        </div>
                        <div className="row">
                            {contactInfoData.map((item, index) => (
                                <div key={index} className="col-lg-4 col-md-6">
                                    <div className="tp-contact-info-item mb-30">
                                        <div className="tp-contact-info-icon">
                                            <span>{item.icon}</span>
                                        </div>
                                        <h4 className="tp-contact-info-title">{item.title}</h4>
                                        <p>{item.description}</p>
                                        <a href={item.href}>{item.linkText}</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
