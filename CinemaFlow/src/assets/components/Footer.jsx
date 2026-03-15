import img4 from "../image/img4.png";

const Footer = () => {
  return (
    <footer className="py-4 px-6">
      <div className="max-w-313 mx-auto flex flex-col lg:flex-row lg:justify-between items-center gap-5 text-[12.5px] lg:text-[16px] text-text-light-gray font-family font-medium">

        {/* Left Side */}
        <p className="text-center lg:text-left">
          Copyright © Cinemaflow | Designed by{" "}
          <a
            href="https://www.brixtemplates.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-white underline hover:text-text-light-gray"
          >
            BRIX Templates
          </a>{" "}
          - Powered by{" "}
          <a
            href="https://www.webflow.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-white underline hover:text-text-light-gray"
          >
            Webflow
          </a>
        </p>

        {/* Right Side */}
        <a
          href="https://www.brixtemplates.com/more-webflow-templates"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-text-white font-medium w-full lg:w-auto justify-center"
        >
          <div className="p-1 flex items-center justify-center rounded-md bg-bg-dark w-5 h-5 lg:w-7 lg:h-7">
            <img
              src={img4}
              alt="Webflow Icon - Cinemaflow - Webflow Template | BRIX Templates"
              className="max-w-full h-auto"
            />
          </div>
          <span>More Webflow Templates</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;