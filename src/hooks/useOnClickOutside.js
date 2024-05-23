import { useEffect } from 'react'

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      console.log('ref', ref.current);
      if (!ref.current || ref.current.contains(event.target)) {
        return;   // 모달 창 내부를 클릭시 return으로 끝내줌
      }
      handler();    // 모달 창 바깥을 클릭할 경우 모달 창 닫히도록
    };

    document.addEventListener("mousedown", listener);   // 모달 창 바깥을 클릭했을 때 callback 함수 호출하는 Event 등록
    document.addEventListener("touchstart", listener);
    return () => {  // 컴포넌트가 언마운트 됐을 때 Event remove
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    }
  }, []);
}

export default useOnClickOutside