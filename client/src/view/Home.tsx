// src/pages/Home.tsx
import { Box, CircularProgress, Typography, useTheme, type Theme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { CardAuthor, CardBrowse, CardForYou } from "../component/CardView";
import Header from "../component/Header";

import booksData from "../data/all_books.json";

  


export type Item = {
  id: number;
  title: string;
  image_url: string;
  author: string[];
  rating: number;
  genre: string;
};

export type DataState = Item[];

type CardPalette = Theme["palette"]["cards"][string];




const mockData = [
  {
    id: 1,
    title: "Frankenstein or The Modern Prometheus",
    author: ["Mary Shelley"],
    image_url: "https://covers.openlibrary.org/b/id/12356249-L.jpg",
    rating: 3,
    genre: "science"
  },
  {
    id: 2,
    title: "Brave New World",
    author: ["Aldous Huxley"],
    image_url: "https://covers.openlibrary.org/b/id/8231823-L.jpg",
    rating: 4.5,
    genre: "science"
  },
  {
    id: 3,
    title: "The Invisible Man",
    author: ["H. G. Wells"],
    image_url: "https://covers.openlibrary.org/b/id/6419199-L.jpg",
    rating: 0,
    genre: "science"
  },
  {
    id: 4,
    title: "De rerum natura",
    author: ["Titus Lucretius Carus"],
    image_url: "https://covers.openlibrary.org/b/id/566208-L.jpg",
    rating: 0,
    genre: "science"
  },
  {
    id: 5,
    title: "Le Tour du Monde en Quatre-Vingts Jours",
    author: ["Jules Verne"],
    image_url: "https://covers.openlibrary.org/b/id/6976035-L.jpg",
    rating: 0,
    genre: "science"
  },
];


const mockData2 = [
  {
    id: 6,
    title: "Two years before the mast",
    author: ["Richard Henry Dana"],
    image_url: "https://covers.openlibrary.org/b/id/8245243-L.jpg",
    rating: 4.5,
    genre: "science"
  },
  {
    id: 7,
    title: "Houghton Mifflin Science California",
    author: ["Houghton Mifflin Company Staff"],
    image_url: "https://covers.openlibrary.org/b/id/12746894-L.jpg",
    rating: 4.5,
    genre: "science"
  },
  {
    id: 8,
    title: "History",
    author: ["Herodotus"],
    image_url: "https://covers.openlibrary.org/b/id/9829028-L.jpg",
    rating: 4.5,
    genre: "science"
  },
  {
    id: 9,
    title: "Houghton Mifflin Science Leveled Readers",
    author: ["Houghton Mifflin Company Staff"],
    image_url: "https://covers.openlibrary.org/b/id/12917356-L.jpg",
    rating: 4.5,
    genre: "science"
  },
  {
    id: 10,
    title: "[William Wheeler Hubbell, authorized to apply for patents.]",
    author: ["United States. Congress. Senate. Committee on Patents"],
    image_url: "https://covers.openlibrary.org/b/id/10200621-L.jpg",
    rating: 4.5,
    genre: "science"
  },
  {
    id: 11,
    title: "The principall navigations, voiages, and discoveries of the English nations",
    author: ["Richard Hakluyt", "Jack Beeching", "Richard David", "Edmund Goldsmid"],
    image_url: "https://covers.openlibrary.org/b/id/6052194-L.jpg",
    rating: 4.5,
    genre: "science"
  }
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
