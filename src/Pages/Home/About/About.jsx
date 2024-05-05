import person from "../../../assets/images/about_us/person.jpg"
import parts from "../../../assets/images/about_us/parts.jpg"
const About = () => {
  return (
    <div className="hero my-24">
      <div className="hero-content flex-col gap-10 lg:flex-row">
        <div className="lg:w-1/2 relative">
        <img
          src={person}
          className="w-[460px] h-[473px] object-cover object-left rounded-lg shadow-2xl "
        />
        <img
          src={parts}
          className="w-[320px] h-[325px] rounded-lg border-8 border-white absolute right-5 top-1/2 object-cover object-leftrounded-lg shadow-2xl "
        />
        </div>
        <div className="lg:w-1/2 space-y-5 p-8">
            <h3 className="text-[#FF3811] text-xl font bold">About Us</h3>
          <h1 className="text-5xl font-bold">We are qualified <br /> &  of experience in this field</h1>
          <p className="py-6">
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don{"'"}t look even slightly believable. 
          </p>
          <p>the majority have suffered alteration in some form, by injected humour, or randomised words which don{"'"}t look even slightly believable. </p>
          <button className="btn bg-[#FF3811] text-white">Get More Info</button>
        </div>
      </div>
    </div>
  );
};

export default About;
