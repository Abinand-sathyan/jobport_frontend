import React from "react";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Footer from "../UserContents/findjob/FooterDiv/Footer";
import landimage from "../../Assets/pexels-fauxels-3184465.jpg";
import "./Landing.css";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];
const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    //     <div>
    //       <main>
    //       <section className='bg-siteviolet  text-black h-divheight top-0  dark:text-white relative'>
    //         <div class>
    //         <div className="max-w-6xl absolute left-8 right-8 top-5  sm:top-10 md:top-16 h-20 lg:top-24 font-bold text-4xl text-center  sm:text-5sl sm:text-left text-indigo-700
    //          top-32 mx-auto  flex justify-between items-center border  z-10 ammrounded-md border-none">
    //               <h1>Find the<span class="text-slate-300 dark:text-indigo-300"> right </span>fit.</h1>
    //       </div>
    //       </div>

    //       <form className="max-w-6xl absolute left-8 right-8  sm:top-32 md:top-40 h-20 lg:top-48 top-32 mx-auto bg-white text-xl px-9 flex justify-between  items-center border  z-10 rounded-md">

    //       <div className='sm:mr-40 md:mr-60 mx-3 hidden md:block'>
    //       <input type="search" placeholder='Search jobs,keywords,companies ' className='w-80 border-none outline-none'/></div>
    //       <div className='md:mr-60  mx-3 sm:hidden items-center justify-between text-center flex-row'>
    //       <input type="search" placeholder='Search job titles or key words'  className='w-80 border-none outline-none'/>
    //       </div>
    //       <button type="button" class="focus:outline-none text-white hidden md:block bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg
    //       px-5 py-5 mb-2 mr-0 top-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"><BsSearch/></button>

    //       </form>
    //       </section>
    //     </main>
    // </div>
    <div className="bg-white">
      <div className="containerlind relative isolate px-6  lg:px-8">
        {/* <div
    className="absolute inset-x-0 -top-45 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
    aria-hidden="true"
  >
    <div
      className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
      style={{
        clipPath:
          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
      }}
    />
  </div> */}
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            {/* <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
        Announcing our next round of funding.{' '}
        <a href="#" className="font-semibold text-indigo-600">
          <span className="absolute inset-0" aria-hidden="true" />
          Read more <span aria-hidden="true">&rarr;</span>
        </a>
      </div> */}
          </div>
          <div className="text-center">
           <Link to="/login"><h1 className="text-4xl font-bold tracking-tight text-amber-500 sm:text-6xl">
              Find your dream job{" "}
              <span className="text-white">
                today with our <span className="text-amber-500">simpler</span>
              </span>
            </h1></Link>
            <p className="mt-6 text-lg leading-8 text-gray-800">
              Unlock your potential with our comprehensive job search platform.
              Join the millions of successful job seekers on our platform
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/login"
                className="rounded-md bg-siteviolet px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
              <Link
                to="/login"
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Add job <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
