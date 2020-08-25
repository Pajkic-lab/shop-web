import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
    return (
        <Carousel>
                <div>
                    <img src="https://www.mi-srbija.rs/img/slider/cfa7b243d8d679f4e82484bd244e3a1cd0113bfa398bcd93ef10987ef991f8e6.png" alt="slika" />
                </div>
                <div>
                    <img src="https://www.mi-srbija.rs/img/slider/cfd6b47b031a27a0b765bf7eb70cd68e3aaf56018aaa7cef9303f59d305c73cf.png" alt="slika" />
                </div>
                <div>
                    <img src="https://www.mi-srbija.rs/img/slider/86b414d8b35d947803b6d1b593491555b65bc87f31900fd3a57a9f0208328be4.png" alt="slika" />
                </div>
        </Carousel>
    )
}

export default Banner
