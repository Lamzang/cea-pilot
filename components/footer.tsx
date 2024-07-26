import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-center">
      <div className="bg-black w-full min-h-28 text-white flex">
        <div className="flex flex-col w-1/4">
          <div className="text-2xl">About Us</div>
          <div>Our Story</div>
          <div>Our Team</div>
          <div>Our Vision</div>
        </div>
        <div className="flex flex-col w-1/4">
          <div className="text-2xl">Contact Us</div>
          <div>Address: 1234 Main St, Anytown, USA</div>
          <div>Email: helloworld@gmail.com</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
