import { useEffect, useState } from 'react'

const useOutsideClick = (ref) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsVisible(false);
            }
        }

        document.addEventListener("mousedown", handleClick)
        return () => {
            document.removeEventListener("mousedown", handleClick);
        }
    }, [ref])
    return { ref, isVisible, setIsVisible }
}


export default useOutsideClick;