import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <section id="hero">

            <div className="hero-content" data-aos="fade-up">
            <h1>Auto Claim?</h1>
            <h2><span>Frog</span>et About It!</h2>
            <h3>File in minutes with <strong>Frog<span>ressive</span></strong></h3>
            <div className='pt-4'>
                <Link to="/form" className="btn-get-started">Get Started</Link>
            </div>
            </div>

            <div className="hero-slider swiper">
            <div className="swiper-wrapper">
                <div className="swiper-slide" style={{ backgroundImage: `url('src/assets/img/hero-carousel/1.jpg')` }}></div>
                <div className="swiper-slide" style={{ backgroundImage: `url('src/assets/img/hero-carousel/2.jpg')` }}></div>
                <div className="swiper-slide" style={{ backgroundImage: `url('src/assets/img/hero-carousel/3.jpg')` }}></div>
                <div className="swiper-slide" style={{ backgroundImage: `url('src/assets/img/hero-carousel/4.jpg')` }}></div>
                <div className="swiper-slide" style={{ backgroundImage: `url('src/assets/img/hero-carousel/5.jpg')` }}></div>
            </div>
            </div>

        </section>
    )
}

export default Home