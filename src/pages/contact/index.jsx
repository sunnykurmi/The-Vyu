import AnimatedButton from "@/components/buttons/AnimatedButton";
import { RiCloseLine } from "@remixicon/react";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { Const } from "@/utils/Constants";
import SeoHeader from "@/components/seo/SeoHeader";
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';


gsap.registerPlugin(ScrollTrigger);

const ContactUs = ({ meta }) => {
  const [visible, setVisible] = useState(false);
  const [successPopup, setsuccessPopup] = useState(false)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [error, setError] = useState("");
  const MAX_FILES = 5;
  const MAX_TOTAL_SIZE_MB = 50;
  const VALID_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const [formData, setFormData] = useState({
    interestIn: [],
    name: "",
    email: "",
    contact: "",
    aboutProject: "",
    projectBudget: "",
    files: [],
  });

  const handleToggleInterest = (interest) => {
    setFormData((prev) => {
      const exists = prev.interestIn.includes(interest);
      return {
        ...prev,
        interestIn: exists
          ? prev.interestIn.filter((i) => i !== interest)
          : [...prev.interestIn, interest],
      };
    });
  };

  const handleBudgetSelect = (budget) => {
    setFormData((prev) => ({ ...prev, projectBudget: budget }));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const totalFiles = [...formData.files, ...newFiles];
    const filtered = [];

    let totalSize = formData.files.reduce((acc, f) => acc + f.size, 0);

    for (const file of newFiles) {
      if (!VALID_TYPES.includes(file.type)) {
        alert(`File type not allowed: ${file.name}`);
        continue;
      }

      if (formData.files.length + filtered.length >= MAX_FILES) {
        alert("You can only upload up to 5 files.");
        break;
      }

      if (totalSize + file.size > MAX_TOTAL_SIZE_MB * 1024 * 1024) {
        alert(`Adding ${file.name} exceeds the 50MB limit.`);
        break;
      }

      filtered.push(file);
      totalSize += file.size;
    }

    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...filtered],
    }));
  };

  const removeFile = (index) => {
    const newFiles = [...formData.files];
    newFiles.splice(index, 1);
    setFormData((prev) => ({ ...prev, files: newFiles }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email" && value && !emailRegex.test(value)) {
      setError("Invalid email format");
    } else {
      setError("");
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.interestIn.length) {
      setError("Select your interest");
      return;
    }
    if (!formData.name) {
      setError("Name is Required");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!/^\d{10}$/.test(formData.contact)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!formData.aboutProject) {
      setError("Provide project details");
      return;
    }
    setsuccessPopup(true);
    setTimeout(() => {
      setsuccessPopup(false);
      setFormData({
        interestIn: [],
        name: "",
        email: "",
        contact: "",
        aboutProject: "",
        projectBudget: "",
        files: [],
      });
    }, 4000);
  };


  useEffect(() => {
    if (successPopup) {
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
    }
  }, [successPopup]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      setsuccessPopup(false);
    }, 300);
  };

  return (
    <>
      {
        successPopup && (
          <div
            className={`fixed w-full h-screen bg-[#00000059] z-[9999] center transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"
              }`}
          >
            <div className="w-[45vh] h-[50vh] relative flex flex-col items-center justify-evenly  text-center px-5 rounded-lg bg-white">
              <RiCloseLine
                onClick={handleClose} className=" cursor-pointer absolute right-[-40%] top-5" />
              <div className="w-full h-[50%] ">
                <img className="w-full h-full object-contain" src="/logo/cactus.gif" alt="" />
              </div>
              <p className="text-sm">Thank you for your interest in VYU. Our team will be in touch with you shortly to move things forward.</p>
              <button className=" w-full h-10 rounded-full bg-black center text-white">success</button>
            </div>
          </div>
        )
      }
      <SeoHeader meta={meta} />
      <div className="relative h-fit">
        <div className="bg-white flex w-full justify-center px-5 md:px-0 pt-[25vh] md:pt-[15vh] mb-[20vh] text-black min-h-screen">
          <main className=" w-full md:w-[41%] flex flex-col gap-6">
            <p className=" text-4xl md:text-[3vw] font-extralight leading-none flex flex-wrap items-center gap-1 font2">
              <span className="font-normal">
                {" "}
                Let's Create <br /> Good  <i> "stuff"</i> Together.{" "}
              </span>
            </p>
            <form
              className="flex flex-col gap-6  mt-10 md:mt-20">
              <div className="flex flex-col gap-3">
                <label className="font-light text-base font3 text-gray-500">
                  I'm interested in...
                </label>
                <span className="text-xs text-red-400 -translate-y-2">
                  {error === "Select your interest" ? error : ""}
                </span>
                <div className="flex w-full flex-wrap gap-3 text-xs md:text-base">
                  {[
                    "Website Development",
                    "App Development",
                    "Animated Website",
                    "UI/UX Design",
                    "SEO Services",
                    "ERP Development",
                    "Branding",
                    "Figma Design",
                    "AWS Services",
                    "E-commerce",
                    "Custom Software",
                  ].map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      className={` text-sm md:text-base font3 font-normal border rounded-full  whitespace-nowrap transition duration-300 ${formData.interestIn.includes(item)
                        ? "bg-[#000000dd] text-white"
                        : "border-gray-300 hover:bg-gray-100"
                        }`}
                      onClick={() => handleToggleInterest(item)}
                    >
                      <AnimatedButton text={item} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex w-full font3 flex-col gap-5 mt-10">
                <div className="w-full">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    autoComplete="name"
                    className="border-b w-full border-gray-300 focus:border-black outline-none text-gray-600 placeholder-gray-300 py-2 text-base font-normal"
                  />
                  <span className="text-xs text-red-400 -translate-y-2">
                    {error === "Name is Required" ? error : ""}
                  </span>
                </div>
                <div className="w-full">
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    autoComplete="email"
                    className="border-b w-full border-gray-300 focus:border-black outline-none text-gray-600 placeholder-gray-300 py-2 text-base font-normal"
                  />
                  <span className="text-xs text-red-500">
                    {error ===
                      ("Please enter a valid email address." ||
                        "Invalid email format")
                      ? error
                      : ""}
                  </span>
                </div>
                <div data-lenis-prevent className="w-full">
                  <PhoneInput
                    country={'in'}
                    value={formData.contact}
                    onChange={(phone) =>
                      setFormData((prev) => ({ ...prev, contact: phone }))
                    }
                    inputProps={{
                      name: 'contact',
                      required: true,
                    }}
                    placeholder="Enter Phone Number"
                    containerStyle={{ width: '100%' }}
                    inputStyle={{
                      width: '100%',
                      border: 'none',
                      borderBottom: '1px solid #D1D5DB',
                      outline: 'none',
                      color: '#4B5563',
                      fontSize: '1rem',
                      fontWeight: '400',
                    }}
                    buttonStyle={{ border: 'none' , background: 'none'}}
                  />

                  <span className="text-xs -translate-y-4 text-red-500">
                    {error === 'Please enter a valid 10-digit phone number.' ||
                      error === 'Invalid phone number format'
                      ? error
                      : ''}
                  </span>
                </div>
                <textarea
                  name="aboutProject"
                  value={formData.aboutProject}
                  onChange={handleChange}
                  placeholder="Tell us about your project"
                  rows="3"
                  className="border-b border-gray-300 focus:border-black outline-none text-gray-600 placeholder-gray-300 py-2 text-base font-normal resize-none"
                />
                <span className="text-xs text-red-400  ">
                  {error === "Provide project details" ? error : ""}
                </span>
              </div>
              <div className="flex flex-col mt-10">
                <label className="text-base font3 font-normal">
                  Project budget (USD)
                </label>
                <div className="flex flex-wrap gap-3 text-base mt-5">
                  {["< 40k", "40-80k", "80-120k", "> 120k"].map(
                    (item, index) => (
                      <button
                        key={index}
                        type="button"
                        className={` text-sm md:text-base font3 font-normal border rounded-full  whitespace-nowrap duration-300 transition ${formData.projectBudget === item
                          ? " bg-[#000000dd]  text-white"
                          : "border-gray-600 hover:bg-gray-100"
                          }`}
                        onClick={() => handleBudgetSelect(item)}
                      >
                        <AnimatedButton text={item} />
                      </button>
                    )
                  )}
                </div>
              </div>
              <div className="mt-10">
                <div
                  className={`border w-fit font3 border-gray-600 rounded-full text-gray-800 text-xs md:text-base hover:bg-[#000000dd] hover:text-white transition duration-300 ${formData.files.length >= MAX_FILES
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                    }`}
                >
                  <label
                    htmlFor="attachment-upload"
                    className="flex items-center gap-2  text-sm md:text-base font-normal  cursor-pointer select-none"
                    style={{ width: "fit-content" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className=" ml-3 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.414a4 4 0 00-5.656-5.656l-6.415 6.415a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                    <AnimatedButton padding={true} text={"Add attachment"} />
                    <input
                      id="attachment-upload"
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      disabled={formData.files.length >= MAX_FILES}
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                <p className="text-xs text-zinc-500 mt-1 ml-1">
                  Only PDF and Word files, max total size: 50MB, max 5 files.
                </p>

                {formData.files.length > 0 && (
                  <div className="flex flex-col mt-3 gap-2 text-base text-black">
                    {formData.files.map((file, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="truncate max-w-xs">{file.name}</span>
                        <RiCloseLine
                          onClick={() => removeFile(index)}
                          className="cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-10 z-[9] bg-white">
                <button
                  onClick={handleSubmit}
                  className="border font3 center border-gray-600 rounded-full  text-gray-800 text-base w-full hover:bg-[#000000dd] hover:text-white transition duration-300"
                >
                  <AnimatedButton text={"Send Request"} />
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </>
  );
};

export default ContactUs;

export async function getStaticProps() {
  const meta = {
    title: "Get in Touch | Creative Web Studio in Mumbai – The Vyu",
    description:
      "Have a project in mind? We’d love to hear from you. Reach out to The Vyu and let’s create something remarkable together.",
    og: {
      title: "Get in Touch | Creative Web Studio in Mumbai – The Vyu",
      description:
        "Have a project in mind? We’d love to hear from you. Reach out to The Vyu and let’s create something remarkable together.",
    },
    twitter: {
      title: "Get in Touch | Creative Web Studio in Mumbai – The Vyu",
      description:
        "Have a project in mind? We’d love to hear from you. Reach out to The Vyu and let’s create something remarkable together.",
    },
    keywords: [],
    author: Const.Brand,
    robots: "index,follow",
  };
  return { props: { meta: meta } };
}
