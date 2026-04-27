import AnimatedTitle from '@/components/buttons/AnimatedTitle';
import { useEffect, useState } from 'react';

const ContactSection = () => {
    const [selectedPlan, setSelectedPlan] = useState("");
    const [emailPopup, setEmailPopup] = useState(false);
    const [errorPopup, setErrorPopup] = useState(false);
    const [popupPosition, setPopupPosition] = useState("right-[-43vh]");
    const [showGif, setShowGif] = useState(false);
    const [showGif2, setShowGif2] = useState(false);
    const [email, setemail] = useState("")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    useEffect(() => {
        const updateSelectedPlan = () => {
            const planFromStorage = localStorage.getItem("zcomBtnType");
            setSelectedPlan(planFromStorage || "");
        };

        updateSelectedPlan();
        window.addEventListener("storage", updateSelectedPlan);
        window.addEventListener("zcomPlanChanged", updateSelectedPlan);

        return () => {
            window.removeEventListener("storage", updateSelectedPlan);
            window.removeEventListener("zcomPlanChanged", updateSelectedPlan);
        };
    }, []);

    const handleEmailSubmit = () => {
     if (email.trim() === "") {
        setErrorPopup(true);
        setShowGif2(true);

        setTimeout(() => {
            setPopupPosition("right-6");
        }, 50);

        setTimeout(() => {
            setShowGif2(false);
            setPopupPosition("right-[-43vh]");
        }, 2100);

        setTimeout(() => {
            setErrorPopup(false);
        }, 2600);
        return;
    }

    if (!emailRegex.test(email)) {
        return;
    }

        setEmailPopup(true);
        setShowGif(true);

        setTimeout(() => {
            setPopupPosition("right-6");
        }, 50);

        setTimeout(() => {
            setShowGif(false);
            setPopupPosition("right-[-43vh]");
        }, 2100);

        setTimeout(() => {
            setEmailPopup(false);
        }, 2600);
        setemail("")
    };

    return (
        <div id='zcom-contact' className="w-full h-[30vh] md:my-20 px-4 md:px-10 center overflow-hidden">

            {emailPopup && (
                <div className={`
                    fixed h-20 pr-6 shadow-2xl bg-white rounded-xl overflow-hidden z-[99] top-20 
                    flex items-center transition-all duration-500 ease-in-out
                    ${popupPosition}
                `}>
                    <div className="w-20 overflow-hidden h-full center">
                        {showGif && (
                            <img className='scale-150' src="/logo/green tick.gif" alt="Success" />
                        )}
                    </div>
                    <p>Email submitted successfully</p>
                </div>
            )}
            {errorPopup && (
                <div className={`
                    fixed h-20 pr-6 shadow-2xl bg-[#F5F5F5] rounded-xl overflow-hidden z-[99] top-20 
                    flex items-center transition-all duration-500 ease-in-out
                    ${popupPosition}
                `}>
                    <div className="w-20 overflow-hidden h-full center">
                        {showGif2 && (
                            <img className='scale-150' src="/logo/close.gif" alt="error" />
                        )}
                    </div>
                    <p>Enter Valid Email</p>
                </div>
            )}

            <div className="relative w-full h-[20vh] md:h-[25vh] md:hover:h-[40vh] transition-all duration-500 origin-center overflow-hidden">
                <div id='clip_container' className="transition-all duration-700 ease-in-out">
                    <div className="absolute z-[9] w-full h-full bg-[#000000ad]"></div>
                    <video
                        loop
                        autoPlay
                        muted
                        className="w-full h-full md:translate-y-[-20vh] object-center object-cover"
                        src="/zcomm/form_bg_video.webm"
                    />
                    <div className="w-[90%] md:w-fit absolute z-[99] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-transparent flex flex-col md:flex-row gap-5 items-center">
                        <div className="text-white w-full md:w-[26vw]">
                            <input
                            name='email'
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                                className='text-base w-full bg-transparent border-b outline-none text-white placeholder-white'
                                type="text"
                                placeholder='Enter Email'
                            />
                            <p className='text-sm leading-none mt-2 opacity-80'>
                                {selectedPlan && (
                                    <span>
                                        You have selected the {selectedPlan} plan.<br />
                                    </span>
                                )}
                                <span>
                                    Please enter your email below to claim your 1 month free trial.
                                </span>
                            </p>
                        </div>
                        <button
                            onClick={handleEmailSubmit}
                            className='w-full cursor-pointer translate-y-[-2vh] text-white py-2 center md:w-28 text-xs border rounded-full hover:bg-black hover:text-white hover:border-none transition duration-300 uppercase'
                        >
                            <div className='cursor-pointer'>
                                <AnimatedTitle text="Connect" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
