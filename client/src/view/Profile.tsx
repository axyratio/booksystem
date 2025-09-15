import { Grid } from "@mui/material";
import {ProfileView} from "../component/ProfileView";

export type BookHistoryItem = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  author: string;
  rating: number;
  status: string;
  started_date: string;
  ended_date: string;
};

export type ProfileProps = {
  profile_url: string;
  username: string;
  email: string;
  birth_date: string;
  firstname: string;
  lastname: string;

};

const mockData: ProfileProps = {
  profile_url: "https://picsum.photos/200/300?random=99",
  username: "johnny12345",
  email: "john.doe123@example.com",
  birth_date: "1999-01-12",
  firstname: "John",
  lastname: "Doe",

}

const bookData: BookHistoryItem[] = [
  {
    id: 1,
    image_url: "https://picsum.photos/200/300?random=111",
    title: "The Alchemist",
    description:
      "The Alchemist is a novel by Paulo Coelho, exploring spirituality, self-discovery, and the power of dreams.",
    rating: 4.5,
    author: "Paulo Coelho",
    started_date: "2020-01-01",
    ended_date: "2020-02-01",
    status: "Returned",
  },
  {
    id: 2,
    image_url: "https://picsum.photos/200/300?random=112",
    title: "The Power of Habit",
    description:
      "The Power of Habit is a book by Charles Duhigg, exploring the science of habit formation and how it can be used to improve our lives.",
    rating: 4.2,
    author: "Charles Duhigg",
    started_date: "2020-02-01",
    ended_date: "2020-03-01",
    status: "Returned",
  },
  {
    id: 3,
    image_url: "https://picsum.photos/200/300?random=113",
    title: "The Catcher in the Rye",
    description:
      "The Catcher in the Rye is a novel by J.D. Salinger, exploring themes of teenage angst, alienation, and disillusionment.",
    rating: 4.1,
    author: "J.D. Salinger",
    started_date: "2020-03-01",
    ended_date: "2020-04-01",
    status: "Returned",
  },
  {
    id: 4,
    image_url: "https://picsum.photos/200/300?random=114",
    title: "To Kill a Mockingbird",
    description:
      "To Kill a Mockingbird is a novel by Harper Lee, exploring issues of racial injustice, tolerance, and the loss of innocence.",
    rating: 4.3,
    author: "Harper Lee",
    started_date: "2020-04-01",
    ended_date: "2020-05-01",
    status: "Returned",
  },
  {
    id: 5,
    image_url: "https://picsum.photos/200/300?random=115",
    title: "The Great Gatsby",
    description:
      "The Great Gatsby is a novel by F. Scott Fitzgerald, exploring themes of wealth, class, and the corrupting influence of power.",
    rating: 4.1,
    author: "F. Scott Fitzgerald",
    started_date: "2020-05-01",
    ended_date: "2020-06-01",
    status: "Returned",
  },
  {
    id: 6,
    image_url: "https://picsum.photos/200/300?random=116",
    title: "1984",
    description:
      "1984 is a novel by George Orwell, depicting a dystopian future where the government exercises total control over its citizens.",
    rating: 4.3,
    author: "George Orwell",
    started_date: "2020-06-01",
    ended_date: "2020-07-01",
    status: "In Use",
  },
]

const Profile = () => {
    return (
        
                <ProfileView items={mockData} bookItems={bookData} />

    )
}

export default Profile
