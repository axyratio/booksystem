import { LogoutRounded } from "@mui/icons-material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import { Avatar, Button, Card, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/GridLegacy';
import axios from "axios";
// ใช้ type-only import เพื่อให้ตรงกับตั้งค่า verbatimModuleSyntax
import { CardHistory } from "./CardView";



export type ProfileProps = {
    profile_url: string;
    username: string;
    email: string;
    birth_date: string;
    firstname: string;
    lastname: string;
}

export type HistoryItem = {
    id: number;
    title: string;
    description: string;
    image_url: string;
    author: string;
    rating: number;
    started_date: string;
    ended_date: string;
};

export type ProfileViewProps = {
    items: ProfileProps;
    bookItems: HistoryItem[]; // ให้ตรงกับ CardBrowse
};

const ProfileView = ({ items, bookItems }: ProfileViewProps) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.value === "logout") {
            axios
                .post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true })
                .then((res) => {
                    console.log(res.data);
                    window.location.href = "/";
                });
        }
    };


    return (
        <Stack spacing={2}>
            <Card
                sx={{
                    backgroundColor: "info.main",
                    boxShadow: "0px 0px 10px 0px rgba(0,0,0,20%)",
                    px: 3,
                    py: 2,
                    borderRadius: "0px 0px 20px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    justifyContent: "space-between",
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ cursor: "pointer", userSelect: "none", "&:hover": { color: "primary.main" } }}
                    whiteSpace="nowrap"
                >
                    <ArrowBackIosRoundedIcon sx={{ color: "info.contrastText" }} />
                    <Typography variant="h6" sx={{ color: "info.contrastText" }}>
                        Back
                    </Typography>
                </Stack>

                <Button component="button" value="logout" name="logout" onClick={handleClick}>
                    <LogoutRounded sx={{ color: "info.contrastText", cursor: "pointer" }} />
                </Button>
            </Card>

            <Card sx={{ p: 3, boxShadow: "0px 0px 10px 0px rgba(0,0,0,20%)", display: "flex", flexDirection: "column", gap: 3 }}>
                <Stack spacing={2} >
                    <Stack spacing={0}>
                        <Typography variant="h6" fontWeight="bold">
                            Profile
                        </Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-around">
                        <Stack direction="row" spacing={3} gap={2}>
                            <Avatar src={items.profile_url} sx={{ width: 200, height: 200 }} />

                            <Stack direction="column" spacing={1} sx={{ mt: 2 }} justifyContent="center">
                                <Typography variant="h5" fontWeight="bold">
                                    {items.username}
                                </Typography>

                                <Typography variant="body1" color="text.secondary">
                                    <Typography variant="body1" component="span" fontWeight={600}>Email: </Typography>
                                    <Typography variant="body1" component="span" color="text.secondary">{items.email}</Typography>
                                </Typography>

                                <Typography variant="body1" color="text.secondary">
                                    <Typography variant="body1" component="span" fontWeight={600}>Fullname: </Typography>
                                    <Typography variant="body1" component="span" color="text.secondary">{`${items.firstname} ${items.lastname}`}</Typography>
                                </Typography>

                                <Typography variant="body1" color="text.secondary">
                                    <Typography variant="body1" component="span" fontWeight={600}>Birth Date: </Typography>
                                    <Typography variant="body1" component="span" color="text.secondary">{items.birth_date}</Typography>
                                </Typography>
                            </Stack>
                        </Stack>

                        <Stack>
                            <BorderColorRoundedIcon />
                        </Stack>
                    </Stack>
                </Stack>
            </Card>

            <Card sx={{ p: 3, boxShadow: "0px 0px 10px 0px rgba(0,0,0,20%)" }}>
                <Stack spacing={2}>
                    <Stack direction="column" justifyContent="space-between">
                        <Typography variant="h6" fontWeight="bold">
                            Reading History
                        </Typography>
                    </Stack>

                    <Grid container spacing={0} sx={{ justifyContent: "center"}}  >
                        {bookItems.map((item) => (
                            <Grid xs={12} sm={6} lg={4} key={item.id} sx={{
                                display: "flex", justifyContent: "center"
                            }}>
                                <CardHistory
                                    items={item}
                                    rating={item.rating}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    
                </Stack>
            </Card>
        </Stack>
    );
};

export default ProfileView;
