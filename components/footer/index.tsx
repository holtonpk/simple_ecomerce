import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black/70 text-white">
      <div className="container px-4 py-6 mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/3">
            <h2 className="text-lg font-bold mb-4">About Us</h2>
            <p className="mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu
              lobortis felis, a interdum risus.
            </p>
            <p className="mb-2">
              Maecenas tincidunt lectus sed sapien vestibulum, non porttitor
              dolor aliquam.
            </p>
          </div>
          <div className="w-full md:w-1/3">
            <h2 className="text-lg font-bold mb-4">Links</h2>
            <ul className="list-none">
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  Returns Policy
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300"></a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h2 className="text-lg font-bold mb-4">Contact Us</h2>
            <ul className="list-none">
              <li className="mb-2">
                <span className="mr-2">
                  <i className="fas fa-envelope"></i>
                </span>
                info@example.com
              </li>
              <li className="mb-2">
                <span className="mr-2">
                  <i className="fas fa-phone"></i>
                </span>
                +1 (123) 456-7890
              </li>
              <li className="mb-2">
                <span className="mr-2">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                123 Main St, New York, NY 10001
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-black text-white text-sm py-2">
        <div className="container px-4 mx-auto">
          <p className="text-center">
            &copy; 2023 Acme Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
