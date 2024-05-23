import React, { useEffect, useState } from 'react'
import "./Nav.css"
import { useNavigate, useLocation } from 'react-router-dom';

export default function Nav() {

  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const location = useLocation()

  useEffect(() => {
    window.addEventListener("scroll", () => {   // 스크롤할 때 함수 호출
      //console.log('window.scrollY', window.scrollY)
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    })

    return () => {    // ✨해당 컴포넌트를 사용하지 않을 때는 더해준 이벤트리스너를 제거해줌
      window.removeEventListener("scroll", () => { })
    }
  }, [])

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  }

  useEffect(() => {
    const splittedPathname = location?.pathname?.split('/')[1]
    if (!isNaN(splittedPathname)) {
      setSearchValue('')    // 검색어 입력 후 해당 영화의 상세페이지로 갔을 때 검색창이 초기화되도록 하기 위해
    }
  }, [location.pathname])

  return (
    <nav className={`nav ${show && "nav__black"}`}>
      <img
        alt='Netflix logo'
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/200px-Netflix_2015_logo.svg.png'
        className='nav__logo'
        onClick={() => {
          navigate('/')
          setSearchValue("")
        }}  // 넷플릭스 로고를 클릭했을때 메인페이지로 돌아오도록
      />

      <input
        value={searchValue}
        onChange={handleChange}
        className="nav__input"
        type="text"
        placeholder="영화를 검색해주세요."
      />

      <img
        alt='User logged'
        src='https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41'
        className='nav__avatar'
      />
    </nav>
  )
}
