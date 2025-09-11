// src/component/CardView.tsx
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarIcon from "@mui/icons-material/StarRateRounded";
import type { Theme } from "@mui/material/styles";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

// ------- Types -------
export type Item = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  author: string;
  rating: number;
};

type CardPalette = Theme["palette"]["cards"][string];


// ------- CardForYou -------
type CardForYouProps = {
  item: Item; // รับข้อมูลหนังสือ 1 รายการ
  rating?: number; // เลือกส่งหรือไม่ส่งก็ได้ (default 4.5)
  bg: CardPalette;
};

const CardForYou = ({ item, rating = 4.5, bg }: CardForYouProps) => {
  const [star] = useState(rating);
  const theme = useTheme();
  const sky = theme.palette.cards.sky;

  const renderStar = () => {
    const starArr = [];
    for (let i = 0; i < Math.floor(star); i++) {
      starArr.push(
        <StarIcon
          key={i}
          fontSize="medium"
          sx={{ color: "primary.contrastText" }}
        />
      );
    }
    if (star % 1 !== 0) {
      starArr.push(
        <StarHalfIcon
          key={starArr.length}
          fontSize="medium"
          sx={{ color: "primary.contrastText" }}
        />
      );
    }
    return starArr;
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        maxWidth: 500,
        flexShrink: 0,
        backgroundImage: bg.bg,
        "&:hover": { backgroundImage: bg.bgHover },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: "1 1 auto",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <CardMedia
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          component="img"
          alt={item.title}
          image={item.image_url}
          sx={{
            width: 200,
            height: 250,
            objectFit: "cover",
            objectPosition: "top",
            flex: "0 0 auto",
            borderRadius: 1.5,
            pointerEvents: "auto", // ให้รับ onClick เพื่อจะได้ stopPropagation ได้
            userSelect: "none",
            WebkitUserDrag: "none",
            p: 2,
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
            p: 1,
            height: "100%",
            flex: "1 1 auto",
            minWidth: 0,
          }}
        >
          <CardContent sx={{ p: 1 }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              m={0}
              noWrap
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                color: "primary.contrastText",
                fontWeight: 700,
              }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              whiteSpace="wrap"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",

                minHeight: "3em",
                color: "primary.contrastText",
              }}
            >
              {item.description}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",

                mt: 2,
                gap: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0,
                }}
              >
                {renderStar()}
              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
                whiteSpace="wrap"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: "primary.contrastText",
                  fontWeight: 600,
                }}
              >
                {item.rating}
              </Typography>
            </Box>
          </CardContent>

          <CardActions
            sx={{
              mt: "auto",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignSelf: "stretch",
              px: 1,
              pb: 1,
            }}
          >
            <Button
              size="small"
              variant="outlined"
              sx={{
                py: "10px",
                width: "100%",
                borderRadius: "5px",
                color: "primary.contrastText",
                borderColor: "primary.contrastText",
                border: "2px solid",
              }}
            >
              More
            </Button>
          </CardActions>
        </Box>
      </Box>
    </Card>
  );
};

// ------- CardBrowse (ถ้าจะใช้แสดงหลายรายการในภายหลัง) -------


export type CardBrowseProps = {
  items: Item; // ไม่บังคับส่ง ตอนนี้ยังไม่แสดงอะไร ถ้าจะใช้ภายหลังสามารถ map ได้
  rating: number;
};

const CardBrowse = ({ items, rating }: CardBrowseProps) => {
  const [star] = useState(rating);

  const renderStar = () => {
    const starArr = [];
    for (let i = 0; i < Math.floor(star); i++) {
      starArr.push(<StarIcon key={i} fontSize="medium" />);
    }
    if (star % 1 !== 0) {
      starArr.push(<StarHalfIcon key={starArr.length} fontSize="medium" />);
    }
    return starArr;
  };

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "row",
          maxWidth: 450,
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            direction: "row",
            display: "flex",
            flex: "1 1 auto",
            overflow: "hidden",
          }}
        >
          <CardMedia
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            component="img"
            alt={items.title}
            image={items.image_url}
            sx={{
              width: 120,
              height: 150,
              objectFit: "cover",
              objectPosition: "top",
              flex: "0 0 auto",
              borderRadius: 0,
              pointerEvents: "auto", // ให้รับ onClick เพื่อจะได้ stopPropagation ได้
              userSelect: "none",
              WebkitUserDrag: "none",
              p: 2,
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              overflow: "hidden",
              p: 1,
              height: "100%",
              flex: "1 1 auto",
              minWidth: 0,
            }}
          >
            <CardContent sx={{ p: 1 }}>
              <Typography
                gutterBottom
                variant="body1"
                fontWeight={600}
                component="div"
                m={0}
                flexWrap="wrap"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {items.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                whiteSpace="wrap"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {items.author}
              </Typography>

              <Box>{renderStar()}</Box>
            </CardContent>
          </Box>
        </Box>
      </Card>
    </>
  );
};

import type { BookHistoryItem } from "../view/Profile";

type CardHistoryProps = {
  items: BookHistoryItem; // ไม่บังคับส่ง ตอนนี้ยังไม่แสดงอะไร ถ้าจะใช้ภายหลังสามารถ map ได้
  rating: number;
};

const CardHistory = ({ items, rating }: CardHistoryProps) => {
  const [star] = useState(rating);

  const renderStar = () => {
    const starArr = [];
    for (let i = 0; i < Math.floor(star); i++) {
      starArr.push(<StarIcon key={i} fontSize="medium" />);
    }
    if (star % 1 !== 0) {
      starArr.push(<StarHalfIcon key={starArr.length} fontSize="medium" />);
    }
    return starArr;
  };

  return (
    <>
      <Card
        sx={{
          
          boxShadow: "none",
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "row",
          maxWidth: 450,
          
          flexShrink: 1,
          borderRadius: 0
        }}
      >
        <Box
          sx={{
            direction: "row",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            overflow: "hidden",
            // [theme.breakpoints.down("sm")]: {
            //   gap: 2,
            //   flexDirection: "column",
            // }
          }}
        >
          <CardMedia
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            component="img"
            alt={items.title}
            image={items.image_url}
            sx={{
              width: { xs: 150, sm: 120 },   // ✅ จอเล็กกินเต็ม container, จอใหญ่คงที่
              height: "auto",                   // ✅ ให้ภาพรักษาอัตราส่วน
              objectFit: "cover",
              borderRadius: 0,
              pointerEvents: "auto",
              userSelect: "none",
              WebkitUserDrag: "none",
              flexShrink: 1,                     // ✅ ให้บีบตัวเองเมื่อพื้นที่ไม่พอ
              p: 2,
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              overflow: "hidden",
              p: 1,
              height: "100%",
              flex: "1 1 auto",
              minWidth: 0,
            }}
          >
            <CardContent sx={{ p: 1 }}>
              <Typography
                gutterBottom
                variant="body1"
                fontWeight={600}
                component="div"
                m={0}
                flexWrap="wrap"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {items.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                whiteSpace="wrap"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",

                }}
              >
                {items.started_date} - {items.ended_date}
              </Typography>

            </CardContent>
          </Box>
        </Box>
      </Card>
    </>
  );
};


const CardAuthor = ({ item }: { item: Item }) => {
  return (
    <Card
      sx={{
        backgroundColor: "background.default",
        boxShadow: "0px 0px 0px 0px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          py: .5
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
           <Avatar
          sx={{ width: 40, height: 40 }}
          alt="Remy Sharp"
          src={item.image_url}
        />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography m={0}  gutterBottom variant="body1" fontWeight={600} component="div">
            {item.author}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export { CardAuthor, CardBrowse, CardForYou, CardHistory };
