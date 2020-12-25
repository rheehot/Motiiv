import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay, Scrollbar } from 'swiper';
import Grid from './Grid';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import './GridSlider.scss';
SwiperCore.use([Pagination, Navigation, Autoplay,  Scrollbar ]);

const TitleText = styled.div`
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 2rem;
`;
const Template = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`;
function GridSlider({text, postList}) {
    return (
        <Template>
            <TitleText>{text}</TitleText>
            { postList &&
                <Swiper
                    navigation
                    spaceBetween={10}
                    /* slidesPerGroup={perview} */
                    
                    slidesPerView={4}
                    breakpoints={
                        {
                            100:{
                                slidesPerView: 1
                            },
                            600: {
                                slidesPerView: 2
                            },
                            900:{
                                slidesPerView: 3
                            },
                            1380:{
                                slidesPerView: 4
                            }
                        }
                    } 
                    //slidesPerColumnFill='column'
                    //loopedSlides={6}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    pagination={{ clickable: true }}
                    //scrollbar={{ draggable: true }}
                    autoplay 
                    style={{height:'auto', width:'100%', maxWidth:'150rem'}}
                >
                    {
                        postList.map((post, idx)=>(
                            <SwiperSlide>
                                <Grid flag={0} key={`Grid-${idx}`} post={post}></Grid>
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            }
        </Template>
    )
}

export default React.memo(GridSlider)
