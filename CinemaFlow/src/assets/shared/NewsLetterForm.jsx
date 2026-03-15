import React, { useState, useEffect } from "react";
import img from '../image/img5.png'

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="max-w-147.5 w-full mb-3.5">
      <form onSubmit={handleSubmit} className="relative flex flex-col justify-center">

        {status === "success" && (
          <div className="w-full py-6 min-h-18 flex items-center justify-center bg-transparent border border-solid border-border-light rounded-2xl text-[16px] leading-normal text-center gap-1">
            <img src={img} className="w-4 h-4"/>
            Thanks for subscribing to our newsletter!
          </div>
        )}

        {status === "error" && (
          <div className="w-full py-6 min-h-18 flex items-center justify-center bg-transparent border border-solid border-border-red rounded-2xl text-text-red text-center text-[16px] leading-normal">
            Oops! Something went wrong while submitting the form.
          </div>
        )}

        {!status && (
          <>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-6 text-text-light-gray text-[11px] md:text-[16px] lg:text-[18px] font-family font-medium md:min-h-24.5 lg:min-h-18 border-b border-b-border-gray hover:border-border-white bg-transparent outline-none duration-300"
            />

            <button
              type="submit"
              className="mt-4 px-4 py-2 lg:px-8 lg:py-3 bg-white border border-solid border-border-white text-text-darker text-[13px] lg:text-sm font-medium rounded-full transition-transform duration-300 min-[470px]:absolute min-[470px]:right-1 min-[470px]:mt-0"
            >
              Subscribe
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default NewsletterForm;