import { useEffect, useMemo, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface InfiniteScrollProps<T> {
  items: T[];
  rowRenderer: (item: T) => React.ReactNode;
  onPageEnd: () => void;
  className?: string;
}

const InfiniteScroll = <T extends object | string>({
  items,
  rowRenderer,
  className = "",
  onPageEnd,
}: InfiniteScrollProps<T>) => {
  // const [data, setData] = useState<T[]>([]);
  // const element = useRef<HTMLDivElement>(null);

  // const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  //   const entry = entries[0];
  //   if (entry.isIntersecting) {
  //     onPageEnd();
  //   }
  // };

  // const intersectionObserver = new IntersectionObserver(handleIntersection);

  // useEffect(() => {
  //   if (element?.current) {
  //     intersectionObserver.observe(element.current);
  //   }
  //   return () => {
  //     intersectionObserver.disconnect();
  //   };
  // }, []);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      onPageEnd();
    }
  }, [inView]);

  return (
    <>
      {items?.length ? (
        <div className={className}>
          {items.map((item) => rowRenderer(item))}
        </div>
      ) : null}

      <div className="py-2 " ref={ref}></div>
    </>
  );
};

export default InfiniteScroll;
