// src/component/CardView.tsx
import StarHalfRoundedIcon from '@mui/icons-material/StarHalfRounded';
import StarIcon from "@mui/icons-material/StarRateRounded";
import type { Theme } from "@mui/material/styles";
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';


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
  image_url: string;
  author: string[];
  rating: number;
  genre: string;
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
    const maxStars = 5;
    const fullStars = Math.floor(star);
    const hasHalfStar = star % 1 !== 0;
    for (let i = 0; i < fullStars; i++) {
      starArr.push(
        <StarIcon
          key={i}
          fontSize="medium"
          sx={{ color: "primary.contrastText" }}
        />
      );
    }
    if (hasHalfStar) {
      starArr.push(
        <StarHalfRoundedIcon
          key={starArr.length}
          fontSize="medium"
          sx={{ color: "primary.contrastText" }}
        />
      );
    }
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      starArr.push(
        <StarBorderRoundedIcon
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
              {item.author[0]}
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
    const maxStars = 5;
    const fullStars = Math.floor(star);
    const hasHalfStar = star % 1 !== 0;
    for (let i = 0; i < fullStars; i++) {
      starArr.push(
        <StarIcon
          key={i}
          fontSize="medium"
          sx={{ color: "text.primary" }}
        />
      );
    }
    if (hasHalfStar) {
      starArr.push(
        <StarHalfRoundedIcon
          key={starArr.length}
          fontSize="medium"
          sx={{ color: "text.primary" }}
        />
      );
    }
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      starArr.push(
        <StarBorderRoundedIcon
          key={starArr.length}
          fontSize="medium"
          sx={{ color: "primary.contrastText" }}
        />
      );
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
            <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
              <Box>
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
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {items.author[0]}
              </Typography>
              </Box>

              <Box sx={{
                display: "flex",
                whiteSpace: "nowrap",
                alignItems: "center",
                flexDirection: "row",
              }} >{renderStar()}</Box>
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
      starArr.push(<StarHalfRoundedIcon key={starArr.length} fontSize="medium" />);
    }
    return starArr;
  };

  return (
    <>
      <Card
        sx={{
          alignItems: "flex-start",
          justifyContent: "flex-start",
          boxShadow: "none",
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "row",
          maxWidth: 700,
          
          flexShrink: 1,
          borderRadius: 0,
          transition: "transform 0.3s ease", // เพิ่ม transition
          "&:hover": {
            transform: "scale(0.98)", // ย่อเล็กเมื่อ hover (หรือเปลี่ยน trigger เป็น container overflow)
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // xs: column, sm+: row
            justifyContent: "center",
            alignContent: "center",
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
              width: { xs: "100%", sm: 110 },
              height: { xs: "auto", sm: 150 }, // กำหนดขนาดสูงสุด
              objectFit: "cover",
              borderRadius: 0,
              pointerEvents: "auto",
              userSelect: "none",
              WebkitUserDrag: "none",
              flexShrink: 1,
              
            }}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              overflow: "hidden",
              height: "100%",
              flex: "1 1 auto",
              minWidth: 0,
            }}
          >
            <CardContent
              sx={{
                p: 1,
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
                height: "100%",
              }}
            >
              <Typography
                gutterBottom
                variant="body1"
                fontWeight={600}
                fontSize={18}
                component="div"
                m={0}
                flexWrap="wrap"
                sx={{
                  whiteSpace: "nowrap",

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
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  lineHeight: 1.2, // Make line height tighter
                  mb: 0.2,
                  whiteSpace: "nowrap",
                }}
              >
                <Typography component="span" sx={{ mr: 1 }} fontWeight={500}>
                  Start Date
                </Typography>
                {items.started_date}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                whiteSpace="wrap"
                sx={{
                  whiteSpace: "nowrap",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  lineHeight: 1.2, // Make line height tighter
                  mt: 0,
                }}
              >
                <Typography component="span" sx={{ mr: 1 }} fontWeight={500}>
                  End Date
                </Typography>
                {items.ended_date}
              </Typography>
                {items.status === "Returned" ? (
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      mt: 1,
                      width: "fit-content",
                      color: "success.main",
                      borderColor: "success.main",
                    }}
                  >
                    Returned
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      mt: 1,
                      width: "fit-content",
                      color: "warning.main",
                      borderColor: "warning.main",
                    }}
                  >
                    In Use
                  </Button>
                )}
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
          py: 0.5,
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
          <Typography
            m={0}
            gutterBottom
            variant="body1"
            fontWeight={600}
            component="div"
          >
            {item.author[0]}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export { CardAuthor, CardBrowse, CardForYou, CardHistory };
