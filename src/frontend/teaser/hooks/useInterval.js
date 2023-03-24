import { useRef, useEffect } from "react";

/**
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/#just-show-me-the-code
 * @param {*} callback
 * @param {*} delay
 */
export default function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
