import React from 'react'

const Section1 = () => {
  return (
    <div id='home-section1'>
      <h1>Plans & pricing</h1>
      <h4>Start for free, then enjoy <br />
        ₹20/month for 3 months</h4>
      <p>Choose the best plan for your business. Change plans as you grow.</p>
      <div className='mailbox'>
        <input type="text" placeholder='Enter your email address' />
        <button>Start free trail</button>
      </div>
      <div className='mailbox-mobile'>
        <input className='input-mobile' type="text" placeholder='Enter your email address' />
        <button className='btn-mobile'>Start free trail</button>
      </div>
      <h6>Try Shopify free, no credit card required. By entering your email, <br /> you agree to receive marketing emails from Shopify.</h6>
    </div>
  )
}

export default Section1