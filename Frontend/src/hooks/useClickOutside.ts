import { useEffect, useRef, type RefObject } from 'react'; 

export const useClickOutside = (
  handler: (event: MouseEvent | TouchEvent) => void
): RefObject<HTMLDivElement | null> => { //  Update the return type to allow null
  const domNode = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const maybeHandler = (event: MouseEvent | TouchEvent) => {
      // Check if the click is outside the referenced node
      if (domNode.current && !domNode.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    // Add event listeners
    document.addEventListener('mousedown', maybeHandler);
    document.addEventListener('touchstart', maybeHandler);

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener('mousedown', maybeHandler);
      document.removeEventListener('touchstart', maybeHandler);
    };
  }, [handler]);

  return domNode;
};