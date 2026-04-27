import React from 'react'

const index = () => {
    return (
        <div>
            <div className="w-full  pt-[10vh] md:pt-[20vh] ">
                <div className="w-full px-4  pb-[10vh] md:pb-[25vh] center flex-col ">
                    <div className="w-full md:w-[60%] h-full">
                        <p className="text-xl font-medium text-black font3">Privacy Policy</p>
                        <div className="mt-5 space-y-8">
                            <p className="leading-tight text-sm md:text-lg font2">
                                At The Vyu, we don’t just build websites or apps — we create digital stories that captivate, connect, and convert. Our motto is simple: blend bold design with clean, scalable code to create experiences people actually enjoy using. Whether it’s an animated frontend that makes users linger, or a powerful backend built to scale for lakhs, we aim for one thing — impact with elegance.
                            </p>

                            {/* Section 1 */}
                            <div>
                                <p className="text-xl font-medium text-black font3">1. Information We Collect</p>
                                <ul className="list-disc ml-6 mt-2 text-sm md:text-lg font2 leading-snug">
                                    <li>Name</li>
                                    <li>Email address</li>
                                    <li>Phone number</li>
                                    <li>Company name</li>
                                    <li>Project or business requirements</li>
                                </ul>
                            </div>

                            {/* Section 2 */}
                            <div>
                                <p className="text-xl font-medium text-black font3">2. How We Use Your Information</p>
                                <ul className="list-disc ml-6 mt-2 text-sm md:text-lg font2 leading-snug">
                                    <li>Respond to your inquiries or requests</li>
                                    <li>Understand your business needs</li>
                                    <li>Offer personalized digital solutions</li>
                                    <li>Send project updates, proposals, or marketing content (only if you opt-in)</li>
                                    <li>Improve our services and communication</li>
                                </ul>
                            </div>

                            {/* Section 3 */}
                            <div>
                                <p className="text-xl font-medium text-black font3">3. Data Protection</p>
                                <p className="mt-2 text-sm md:text-lg font2 leading-snug">
                                    We implement appropriate technical and organizational measures to protect your data from unauthorized access, misuse, or disclosure. Your data is stored securely and only accessible to authorized personnel.
                                </p>
                            </div>

                            {/* Section 4 */}
                            <div>
                                <p className="text-xl font-medium text-black font3">4. Sharing of Information</p>
                                <p className="mt-2 text-sm md:text-lg font2 leading-snug">
                                    We do <strong>not</strong> sell, rent, or trade your personal information. Your data may be shared only with third-party tools or service providers strictly for business purposes (e.g., email services, CRM) — and only when necessary to serve you better.
                                </p>
                            </div>

                            {/* Section 5 */}
                            <div>
                                <p className="text-xl font-medium text-black font3">5. Your Rights</p>
                                <ul className="list-disc ml-6 mt-2 text-sm md:text-lg font2 leading-snug">
                                    <li>Request access to your data</li>
                                    <li>Correct or update your personal details</li>
                                    <li>Request deletion of your data from our records</li>
                                </ul>
                               
                            </div>

                            {/* Section 6 */}
                            <div>
                                <p className="text-xl font-medium text-black font3">6. Changes to This Policy</p>
                                <p className="mt-2 text-sm md:text-lg font2 leading-snug">
                                    We may update this Privacy Policy occasionally. The latest version will always be available at
                                    <br /> <span className="underline text-blue-700">
                                        <a href="https://www.thevyu.com/privacy-policy" target="_blank" rel="noopener noreferrer">
                                            www.thevyu.com/privacy-policy
                                        </a>
                                    </span>
                                </p>
                            </div>

                            {/* Section 7 */}
                            <div>
                                <p className="text-xl font-medium text-black font3">7. Contact Us</p>
                                <p className="mt-2 text-sm md:text-lg font2 leading-snug">
                                    If you have any questions or concerns about this policy or your data, please email us at:
                                    <br />
                                    📧 <a href="mailto:hello@thevyu.com" className="underline text-blue-700">hello@thevyu.com</a>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default index