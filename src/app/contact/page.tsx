import { Metadata } from "next";
import ContactArea from "@/components/contact/contact-area";
import ContactInfoArea from "@/components/contact/contact-info-area";

export const metadata: Metadata = {
    title: "Contact Us - CCGE | Corporate Commerce Global Education",
    description: "Get in touch with CCGE for inquiries about our professional finance certification programs in ACCA, CFA, CMA, CPA, and FRM."
};

export default function ContactPage() {
    return (
        <main>

            {/* contact area start */}
            <ContactArea />
            {/* contact area end */}


            {/* contact info area start */}
            <ContactInfoArea />
            {/* contact info area end */}

            {/* map area start */}
            <div className="tp-map-area">
                <div className="tp-contact-map-content">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3160408782!2d78.24323209999999!3d17.4123487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin" width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
            {/* map area end */}
        </main>
    );
}
