import React from 'react'

const Section4 = () => {
  return (
    <div id='home-section1' className='home-section4'>
        <h1>Plans & pricing</h1>
        <h4>Everything you need to <br /> sell online, all in one place</h4>
        <p>Whether you’re building a website, managing inventory, or responding to customers, you can do it all with Shopify.</p>
        <div className='mailbox'>
            <input type="text" placeholder='Enter your email address' />
            <button>Start free trail</button>
        </div>
        <div className='mailbox-mobile'>
        <input className='input-mobile' type="text" placeholder='Enter your email address' />
        <button className='btn-mobile'>Start free trail</button>
      </div>
        <h6>Try Shopify free, no credit card required. By entering your email, you agree to receive marketing emails from Shopify.</h6>
    </div>
  )
}

export default Section4