import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

export default function Spinner() {
    const data = [
        { title: 'Captain America: Brave New World', img: 'https://res.cloudinary.com/dnpn8ljki/image/upload/v1748723343/captain_america_brave_new_world_ver2_qgl4de.jpg' },
        { title: 'Chhaava', img: 'https://res.cloudinary.com/dnpn8ljki/image/upload/v1748723343/chhaava_afninc.jpg' },
        { title: 'Companion', img: 'https://res.cloudinary.com/dnpn8ljki/image/upload/v1748723343/companion_qn8fak.jpg' },
        { title: 'Sinners', img: 'https://res.cloudinary.com/dnpn8ljki/image/upload/v1748723343/sinners_ver4_jp4v3l.jpg' },
        { title: 'Avatar: The Way of Water', img: 'https://res.cloudinary.com/dnpn8ljki/image/upload/v1748724801/avatar_the_way_of_water_ver2_sepwem.jpg' },
        { title: 'Black Panther: Wakanda Forever', img: 'https://res.cloudinary.com/dnpn8ljki/image/upload/v1748724778/black_panther_wakanda_forever_ver2_zpnpvj.jpg' },
        { title: 'Top Gun: Maverick', img: 'https://res.cloudinary.com/dnpn8ljki/image/upload/v1748724768/top_gun_maverick_ver3_yyc67d.jpg' },
        { title: 'Jurassic World Dominion', img: 'https://res.cloudinary.com/dnpn8ljki/image/upload/v1748724758/jurassic_world_rebirth_ver2_doxjuz.jpg' },
        { title: 'Doctor Strange in the Multiverse of Madness', img: 'https://res.cloudinary.com/dnpn8ljki/image/upload/v1748724748/doctor_strange_in_the_multiverse_of_madness_o6lufr.jpg' },
        { title: 'Thor: Love and Thunder', img: 'https://res.cloudinary.com/dnpn8ljki/image/upload/v1748724739/thor_love_and_thunder_ver3_tefiwv.jpg' },
        { title: 'Spider-Man: No Way Home', img: 'https://res.cloudinary.com/dnpn8ljki/image/upload/v1748724728/spiderman_no_way_home_ver2_u303tw.jpg' },
        { title: 'The Flash', img: 'https://res.cloudinary.com/dnpn8ljki/image/upload/v1748724728/flash_ver3_a4wwv7.jpg' },
        { title: 'Black Adam', img: 'https://res.cloudinary.com/dnpn8ljki/image/upload/v1748724728/black_adam_ver4_mezgvn.jpg' },
        { title: 'Mission: Impossible 7', img: 'https://res.cloudinary.com/dnpn8ljki/image/upload/v1748724728/mission_impossible__the_final_reckoning_tmxbzm.jpg' },
        { title: 'Fast X', img: 'https://res.cloudinary.com/dnpn8ljki/image/upload/v1748724728/fast_x_ver2_vdj1ob.jpg' },
        { title: 'The Marvels', img: 'https://res.cloudinary.com/dnpn8ljki/image/upload/v1748724728/marvels_ver3_i5pvck.jpg' }
    ];

    return (
        <div className="py-20 bg-gray-900 min-h-screen">
            <Swiper
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView="auto"
                breakpoints={{
                    320: { slidesPerView: 2, spaceBetween: 30, },
                    640: { slidesPerView: 2, spaceBetween: 30, },
                    768: { slidesPerView: 3, spaceBetween: 40, },
                    1024: { slidesPerView: 'auto', spaceBetween: 50, },
                }}
                coverflowEffect={{ rotate: 20, stretch: 0, depth: 200, modifier: 1, slideShadows: true, }}
                autoplay={{ delay: 2500, disableOnInteraction: false, }}
                loop={true}
                modules={[EffectCoverflow, Autoplay]}
                className="mySwiper px-4"
            >
                {data.map(({ title, img }, index) => (
                    <SwiperSlide key={index} className="w-[250px] sm:!w-[280px] md:!w-[300px] lg:!w-[350px] h-[350px] sm:h-[400px] md:h-[450px] lg:h-[520px]">
                        <div className="relative h-full rounded-xl overflow-hidden shadow-2xl group">
                            <img src={img} alt={`Movie ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <h3 className="text-white text-lg md:text-xl font-bold">{title}</h3>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
