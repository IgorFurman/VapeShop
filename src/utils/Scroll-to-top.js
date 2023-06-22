import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const  ScrollToTop = ( {children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, 100);  
}, [pathname]);

  return children;
}
export default ScrollToTop
