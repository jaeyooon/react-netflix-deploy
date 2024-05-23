import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import "./Row.css";
import MovieModal from './MovieModal';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Row({ title, fetchUrl, isLargeRow, id }) {

  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {    // 비동기 요청
    const request = await axios.get(fetchUrl);
    //console.log('request', request);
    setMovies(request.data.results);    // 영화 정보들을 movies state에 넣어줌.
  }

  const handleClick = (movie) => {    // 클릭한 movie 정보를 가져옴
    setModalOpen(true);
    setMovieSelected(movie);    // movie 정보를 넣어줌
  }

  return (
    <section className='row'>
      <h2>{title}</h2>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation    // arrow 버튼을 사용 여부
        pagination={{ clickable: true }}
        loop={true}
        breakpoints={{
          1378: {
            slidesPerView: 6,   // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 6,  // 몇개의 슬라이드를 넘길지
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3
          }
        }}
      >
        <div id={id} className='row__posters'>
          {movies.map(movie => (
            <SwiperSlide>
              <img
                key={movie.id}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                alt={movie.name}
                onClick={() => handleClick(movie)}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
      {
        modalOpen && (
          <MovieModal {...movieSelected} setModalOpen={setModalOpen} />   // props로 movie 정보 넣어줌.
        )
      }
    </section>
  )
}
