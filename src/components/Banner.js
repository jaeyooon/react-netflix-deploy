import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import requests from '../api/requests';
import "./Banner.css"
import styled from 'styled-components';
import MovieModal from './MovieModal';

export default function Banner() {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {   // 비동기 요청
    // 현재 상영중인 영화 정보를 가져오기(여러 영화)  
    const request = await axios.get(requests.fetchNowPlaying);
    console.log(request)

    // 여러 영화 중 영화 하나의 ID 가져오기(랜덤으로)
    const movieId = request.data.results[
      Math.floor(Math.random() * request.data.results.length)
    ].id;

    // 특정 영화의 더 상세한 정보를 가져오기(비디오 정보도 포함)
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, { // response가 movieDetail 안에 다 들어가도록
      params: { append_to_response: "videos" },   // 받아오는 response에 비디오도 같이 넣어서 전달해달라고 요청
    })
    console.log('movieDetail', movieDetail)
    setMovie(movieDetail);
  };

  const truncate = (str, n) => {  // 비디오에 대한 설명글이 100자 이상일 경우, 자른 후 ... 붙이기
    return str?.length > n ? str.substr(0, n - 1) + "..." : str
  }

  const handleClick = (movie) => {
    console.log('moreInfo', movie);
    setModalOpen(true);
  }

  if (!isClicked) {
    return (
      <header
        className='banner'
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className='banner__contents'>
          <h1 className='banner__title'>{movie.title || movie.name || movie.original_name}</h1>
          <div className='banner__buttons'>
            <button
              className='banner__button play'
              onClick={() => setIsClicked(true)}
            >
              Play
            </button>
            <button
              className='banner__button info'
              onClick={() => handleClick(movie)}>
              More Information
            </button>
          </div>
          {
            modalOpen && (
              <MovieModal {...movie} setModalOpen={setModalOpen} />
            )
          }
          <h1 className='banner__description'>{truncate(movie.overview, 100)}</h1>
        </div>
        <div className='banner--fadeBottom'></div>
      </header>
    );
  } else {
    return (
      <Container>
        <HomeContainer>
          <Iframe
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?
            controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
            frameborder="0"
            allow="autoplay; fullscreen"
          ></Iframe>
        </HomeContainer>
      </Container>
    )
  }
}

const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.65;
    border: none;

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
`
