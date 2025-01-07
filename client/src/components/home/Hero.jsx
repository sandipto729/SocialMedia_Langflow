import { HashLink } from "react-router-hash-link";

const Hero = () => {
  return (
    <section id="hero">
      <div className="relative w-full h-[70vh]">
        <div className="absolute top-0 left-0 w-full h-full">
          <img src="/Hero.webp" className="w-full h-full object-fit" />
        </div>
        <div className="relative top-0 left-0 w-full h-full bg-black/70 text-white px-10 flex flex-col items-start justify-evenly">

          <div className="flex flex-col items-start justify-center">
            <div className="mb-10">
              <h1 className="font-extrabold text-6xl 2xl:text-7xl">
                Your Social Media
              </h1>
              <h1 className="font-extrabold text-7xl text-secondary shadow-xl">
                Growth Partner
              </h1>
            </div>

            <div className="">
              <p className="text-2xl">
                Transform Data Into Actionable Strategies
              </p>
              <p className="text-2xl">
                to Boost Engagement and Reach
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <HashLink
              to="/dashboard"
              className="w-44 h-16 mx-7 rounded-xl overflow-hidden bg-secondary bg-opacity-20 backdrop-blur-md shadow-lg flex items-center justify-center hover:border hover:border-blue-700 hover:scale-110 transition-all duration-300">
              <span className="font-semibold">Go to Analytics</span>
            </HashLink>
            <HashLink to='https://www.youtube.com' className="w-20 h-16 mx-7 rounded-xl overflow-hidden bg-white bg-opacity-10 backdrop-blur-md shadow-lg flex items-center justify-center hover:border hover:border-white hover:scale-110 transition-all duration-300"><span className="font-semibold">Demo</span></HashLink>
          </div>

        </div>
      </div>
    </section>

  );
};

export default Hero;
