interface WaveDividerProps {
  fillClassName?: string;
  className?: string;
  overlap?: number;
}

export function WaveDivider({
  fillClassName = 'fill-white',
  className = '',
  overlap = 100,
}: WaveDividerProps) {
  return (
    <div
      className={`absolute bottom-0 left-0 right-0 h-[60px] w-full overflow-hidden leading-[0] 
                 md:h-[150px] ${className}`}
      style={{ transform: `translateY(${overlap}px)` }}>
      <svg
        viewBox='0 0 1440 100'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M 0 43.9999 C 409 92 1518 16 1549 40 V 100 H 0 V 43.9999 Z'
          className={fillClassName}></path>
      </svg>
    </div>
  );
}
