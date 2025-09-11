// src/pages/Home.tsx
import { Box, CircularProgress, Typography, useTheme, type Theme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { CardAuthor, CardBrowse, CardForYou } from "../component/CardView";
import Header from "../component/Header";


export type Item = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  author: string;
  rating: number;
};

export type DataState = Item[];

type CardPalette = Theme["palette"]["cards"][string];




const mockData = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    description:
      "A story about following your dreams. A story about following your dreams. A story about following your dreams. A story about following your dreams. A story about following your dreams.",
    image_url: "https://picsum.photos/200/300?random=1",
    rating: 4.7,
  },
  {
    id: 2,
    title: "The Name of the Rose",
    author: "Umberto Eco",
    description: "A medieval murder mystery in an abbey.",
    image_url: "https://picsum.photos/200/300?random=2",
    rating: 4.4,
  },
  {
    id: 3,
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    description: "Sci-fi comedy about the adventures of Arthur Dent.",
    image_url: "https://picsum.photos/200/300?random=3",
    rating: 4.8,
  },
  {
    id: 4,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A classic of modern American literature.",
    image_url: "https://picsum.photos/200/300?random=4",
    rating: 4.9,
  },
  {
    id: 20,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A classic of modern American literature.",
    image_url: "https://picsum.photos/200/300?random=4",
    rating: 4.9,
  },

];

const mockData2 = [
  {
    id: 1,
    title: "The Brief Wondrous Life of Oscar Wao",
    author: "Junot D az",
    description: "A story about the struggles of the immigrant experience.",
    image_url: "https://picsum.photos/200/300?random=5",
    rating: 4.2,
  },
  {
    id: 2,
    title: "The Nightingale",
    author: "Kristin Hannah",
    description: "A story about the struggles of the immigrant experience.",
    image_url: "https://picsum.photos/200/300?random=6",
    rating: 4.5,
  },
  {
    id: 3,
    title: "The Hate U Give",
    author: "Angie Thomas",
    description: "A story about the struggles of the immigrant experience.",
    image_url: "https://picsum.photos/200/300?random=7",
    rating: 4.8,
  },
  {
    id: 4,
    title: "The Poppy War",
    author: "R.F. Kuang",
    description: "A story about the struggles of the immigrant experience.",
    image_url: "https://picsum.photos/200/300?random=8",
    rating: 4.9,
  },
  {
    id: 5,
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    description: "A story about the struggles of the immigrant experience.",
    image_url: "https://picsum.photos/200/300?random=9",
    rating: 4.7,
  },
  {
    id: 6,
    title: "The Song of Achilles",
    author: "Madeline Miller",
    description: "A story about the struggles of the immigrant experience.",
    image_url: "https://picsum.photos/200/300?random=10",
    rating: 4.1,
  },
];

// ... import เดิมทั้งหมด

const Home = () => {
  const [dataRecomented, setDataRecomented] = useState<DataState>([]);
  const [dataDefault, setDataDefault] = useState<DataState>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();


  // drag-to-scroll เดิม
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);

  const myTheme: CardPalette[] = [
    theme.palette.cards.sky,
    theme.palette.cards.orange,
    theme.palette.cards.mint,
    theme.palette.cards.purple,
    theme.palette.cards.pink,
  ];
  // const bg = myTheme[index % myTheme.length].mytheme

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = scrollerRef.current;
    if (!el) return;
    setIsDown(true);
    setStartX(e.clientX);
    setStartScrollLeft(el.scrollLeft);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDown) return;
    const el = scrollerRef.current;
    if (!el) return;
    const dx = e.clientX - startX;
    el.scrollLeft = startScrollLeft - dx;
  };

  const onPointerUpOrLeave = () => {
    setIsDown(false);
  };

  // เพิ่มฟังก์ชันนี้: แปลงลูกกลิ้งแนวตั้ง -> เลื่อนแนวนอน
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;

    // แปลงแนวตั้ง -> แนวนอน โดยไม่ต้อง preventDefault
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDataRecomented(mockData);
      setDataDefault(mockData2);
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (

    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 4,
          }}
        >

          <CircularProgress />
        </Box>
      ) : (

        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            height: "100vh",
          }}
        >


          <Header />



          
            <Box>
              <Typography variant="h6" sx={{ mt: 3 }}>
                For You
              </Typography>
              <Box
                ref={scrollerRef}
                onWheel={onWheel}
                sx={{
                  py: 1,
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  whiteSpace: "nowrap",
                  overflowX: "auto",
                  overflowY: "hidden",
                  // สำคัญ: กัน scroll chaining ไม่ให้เด้งไป parent/page
                  overscrollBehaviorX: "contain",
                  overscrollBehaviorY: "none",
                  userSelect: "none",
                  scrollbarWidth: "none", // Firefox
                  msOverflowStyle: "none", // IE/Edge legacy
                  "::-webkit-scrollbar": {
                    display: "none", // Chrome/Safari
                  },
                }}
              >
                {dataRecomented.map((book, index) => (
                  <CardForYou key={book.id} item={book} rating={book.rating} bg={myTheme[index % myTheme.length]} />
                ))}
              </Box>

            </Box>



            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                }}
              >
                <Typography variant="h6" sx={{ mt: 0 }}>
                  Browse
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, auto)", // ขนาดเท่ากับเนื้อหา
                    gap: 1,
                    justifyContent: "start", // บังคับให้อยู่ชิดซ้าย
                  }}
                >


                  {dataDefault.map((book, index) => (

                    <CardBrowse key={book.id} items={book} rating={book.rating}
                    />

                  ))}


                </Box>
              </Box>


              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  alignItems: "center",
                  justifyContent: "center",  // จัดแนวนอนให้ลูกทั้งหมดมาอยู่กลาง
                }}
              >
                <Box
              
              >
                <Typography variant="h6">
                  Author
                </Typography>
                {dataDefault.map((book, index) => (
                  <CardAuthor key={book.id} item={book} />
                ))}

                </Box>
              </Box>


            </Box>

        </Box>
      )}


    </>

  );
};

export default Home;
