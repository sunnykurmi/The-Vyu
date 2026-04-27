import React, { useEffect, useState } from 'react';
import { IoCheckmarkSharp } from "react-icons/io5";
import TableContainer from './TableContainer';

const Section2 = () => {
    const [plan, setPlan] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [planCost, setplanCost] = useState("month")
    const [devType, setdevType] = useState("web")
    const [zcomBtnType, setzcomBtnType] = useState("")

    const plans = [
        {
            name: "Standard",
            subtitle: "For solo entrepreneurs",
            offer: "₹20/month for first 3 months",
            monthlycost: {
                web: "₹1,000",
                app: "₹5,500",
                both: "₹8,000",
            },
            yearlycost: {
                web: "₹9,000",
                app: "₹49,500",
                both: " ₹72,000",
            },
            billed: "4% Transaction fees for every transaction",
            cardRate: "2% 3rd-party payment providers",
            features: [
                "Upto 250 SKUs",
                "200 emails per month",
                "200 SMS per month",
                "200 Whatsapp Messages",
                "Priority Support within 12 hours",
            ],
            web: {
                name: "web builder",
                subtitle: "₹1,00,000",
            },
            app: {
                name: "app builder",
                subtitle: "₹5,00,000",
            },
            both: {
                name: "both builder",
                subtitle: "₹6,00,000",
            },

        },
        {
            name: "Premium",
            subtitle: "For solo entrepreneurs",
            offer: "₹20/month for first 3 months",
            monthlycost: {
                web: "₹3,000",
                app: "₹7,500",
                both: " ₹10,000",
            },
            yearlycost: {
                web: "₹27,000",
                app: "₹67,500",
                both: " ₹90,000",
            },

            billed: "4% Transaction fees for every transaction",
            cardRate: "2% 3rd-party payment providers",
            features: [
                "Upto 1000 SKUs",
                "500 emails per month",
                "500 SMS per month",
                "500 Whatsapp Messages",
                "Priority Support within 3 hours",
            ], web: {
                name: "web builder",
                subtitle: "₹1,00,000",
            },
            app: {
                name: "app builder",
                subtitle: "₹5,00,000",
            },
            both: {
                name: "both builder",
                subtitle: "₹6,00,000",
            },

        },
        {
            name: "Plus",
            subtitle: "For solo entrepreneurs",
            offer: "₹20/month for first 3 months",
            monthlycost: {
                web: "₹8,000",
                app: "₹25,000",
                both: " ₹30,000",
            },
            yearlycost: {
                web: "₹72,000",
                app: "₹2,25,000",
                both: " ₹2,70,000",
            },
            billed: "4% Transaction fees for every transaction",
            cardRate: "2% 3rd-party payment providers",
            features: [
                "Upto 5000SKUs",
                "3000 emails per month",
                "3000 SMS per month",
                "3000 Whatsapp Messages",
                "Priority Support within 1 hour",
            ], web: {
                name: "web builder",
                subtitle: "₹1,00,000",
            },
            app: {
                name: "app builder",
                subtitle: "₹5,00,000",
            },
            both: {
                name: "both builder",
                subtitle: "₹6,00,000",
            },

        }
    ];

    const changeCostPlan = (type) => {
        if (type === "month") {
            setplanCost("month")
        } else {
            setplanCost("year")
        }
    }
    const changeDevType = (type) => {
        if (type === "web") {
            setdevType("web")
        } else if (type === "app") {
            setdevType("app")
        } else if (type === "both") {
            setdevType("both")
        }
    }

    useEffect(() => {
        // Clear localStorage on component mount (browser refresh)
        if (typeof window !== 'undefined') {
            localStorage.removeItem('zcomBtnType');
        }
    }, []);

    useEffect(() => {
        if (zcomBtnType && typeof window !== 'undefined') {
            localStorage.setItem('zcomBtnType', zcomBtnType);
            window.dispatchEvent(new Event("zcomPlanChanged"));
        }
    }, [zcomBtnType]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 900);
        };
        handleResize(); // Set initially
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const renderPlanCard = (planData, i) => (
        <div className=" plan  hover:bg-gray-100 transition duration-300" key={i}>
            <div>
                {/* <div className={`plan-title ${i === 2 ? 'blue-title-plan' : ''}`}>
                    <p>{planData.offer}</p>
                </div> */}
                <div className="plan-heading">
                    <div>
                        <span className='plan-h'>{planData.name}</span>
                        {/* <p>{planData.subtitle}</p> */}
                        {planData[devType] && (
                            <>
                                {/* <p className="font-semibold">{planData[devType].name}</p> */}
                                <h2 className="text-base text-gray-900">
                                    One time {devType} development cost :
                                    <span className='text-2xl ml-2'>
                                        {planData[devType].subtitle}
                                    </span>
                                </h2>
                            </>
                        )}
                    </div>
                </div>

                <div className="plan-price">
                    <div>
                        <span className='cost'>
                            {planCost === "month"
                                ? planData.monthlycost[devType]
                                : planData.yearlycost[devType]}
                        </span>
                        <p className='inr'>INR <br />  {planCost === "month" ? "/month" : "/year"} </p>
                    </div>
                    <p>{planData.billed}</p>
                </div>
                <hr />
                <div className="card-rate">
                    <p className='list-title'>Card rates starting at</p>
                    <span className='list-item'><IoCheckmarkSharp />{planData.cardRate}</span>
                </div>
                <div className="card-rate">
                    <p className='list-title'>Standout features</p>
                    {planData.features.map((f, idx) => (
                        <span className='list-item' key={idx}><IoCheckmarkSharp />{f}</span>
                    ))}
                </div>
            </div>
            <a href="#zcom-contact">
                <button
                    onClick={() => setzcomBtnType(planData.name)}
                    className='trybtn hover:scale-[.98] transition-all duration-300'>Try for free
                </button>
            </a>
        </div>
    );

    return (
        <div id='zcom-pricing'>
            <p className='text-xl mb-4'>Plans & pricing</p>
            <p>I'm looking for </p>
            <div className=" mb-2 mt-2 h-12 gap-1  rounded-full bg-gray-100 flex items-center justify-center p-1">
                <button
                    onClick={() => changeDevType("web")}
                    className={`px-6 h-full capitalize rounded-full cursor-pointer text-sm leading-5 font-[font1] transition-all duration-500  ${devType === "web" ? "bg-black text-white" : "bg-gray-100 text-black hover:bg-black/5"} `}
                >
                    WEB

                </button>
                <button
                    onClick={() => changeDevType("app")}
                    className={`px-6 h-full capitalize rounded-full  cursor-pointer text-sm leading-5 font-[font1] transition-all duration-500  ${devType === "app" ? "bg-black text-white" : "bg-gray-100 text-black hover:bg-black/5"} `}
                >
                    APP

                </button>
                <button
                    onClick={() => changeDevType("both")}
                    className={`px-6 h-full capitalize rounded-full cursor-pointer text-sm leading-5 font-[font1] transition-all duration-500  ${devType === "both" ? "bg-black text-white" : "bg-gray-100 text-black hover:bg-black/5"} `}>
                    Both
                </button>

            </div>
            <div className=" h-12 mb-2 gap-1 rounded-full bg-gray-100 flex items-center justify-between p-1">
                <button
                    onClick={() => changeCostPlan("month")}
                    className={`  px-5 h-full rounded-full cursor-pointer text-sm leading-5 font-[font1] transition-all duration-500  ${planCost === "month" ? "bg-black text-white" : "bg-gray-100 text-black hover:bg-black/5"} `}
                >
                    Pay Monthly
                </button>
                <button
                    onClick={() => changeCostPlan("year")}
                    className={`  px-5 h-full rounded-full cursor-pointer text-sm leading-5 font-[font1] transition-all duration-500  ${planCost === "year" ? "bg-black text-white" : "bg-gray-100 text-black hover:bg-black/5"} `}
                >
                    Pay Yearly (save 25%)*
                </button>
            </div>


            {isMobile && (
                <div id='types-of-plan'>
                    {plans.map((p, i) => (
                        <span
                            key={i}
                            className={`${plan === i ? 'selected' : ''} ${plan === plans.length - 1 && plan === i ? 'selected-blue' : ''}`}
                            onClick={() => setPlan(i)}
                        >
                            {p.name}
                        </span>
                    ))}
                </div>
            )}

            <div className="plans-container">
                {isMobile
                    ? renderPlanCard(plans[plan], plan)
                    : plans.map((p, i) => renderPlanCard(p, i))
                }
            </div>

            <p className='plans-container-desc'>*Yearly discount available on select plans</p>
            <TableContainer plan={plan} setPlan={setPlan} />
        </div>
    );
};

export default Section2;
