import Image from "next/image";
import icon_1 from "@/assets/img/icon/funfact/funfact-2-icon-1.svg";
import icon_2 from "@/assets/img/icon/funfact/funfact-2-icon-2.svg";
import icon_3 from "@/assets/img/icon/funfact/funfact-2-icon-3.svg";
import icon_4 from "@/assets/img/icon/funfact/funfact-2-icon-4.svg";

const funFacts = [
  {
    id: 1,
    title: "100+ Students",
    description: "Trained globally",
    icon: icon_1,
  },
  {
    id: 2,
    title: "95% Success Rate",
    description: "Industry-leading results",
    icon: icon_2,
  },
  {
    id: 3,
    title: "11 Global Programs",
    description: "Industry certifications",
    icon: icon_3,
  },
  {
    id: 4,
    title: "Expert Faculty",
    description: "Industry professionals",
    icon: icon_4,
  },
];

export default function FunFactArea() {
  return (
    <section
      className="funfact-area tp-funfact-bg"
      data-background="assets/img/bg/funfact-2-bg-1.jpg"
      style={{ backgroundImage: "url(/assets/img/bg/funfact-2-bg-1.jpg)" }}
    >
      <div className="container">
        <div className="row">
          {funFacts.map((fact) => (
            <div key={fact.id} className="col-lg-3 col-sm-6">
              <div className="tp-funfact-item d-flex align-items-center">
                <div className="tp-funfact-icon">
                  <span>
                    <Image src={fact.icon} alt="icon" />
                  </span>
                </div>
                <div className="tp-funfact-content">
                  <h4 className="tp-funfact-title">{fact.title}</h4>
                  <span>{fact.description}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
