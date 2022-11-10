const mongoose = require("mongoose");

const userId1 = mongoose.Types.ObjectId();
const userId2 = mongoose.Types.ObjectId();
const userId3 = mongoose.Types.ObjectId();
const userId4 = mongoose.Types.ObjectId();

const gameId1 = mongoose.Types.ObjectId();
const gameId2 = mongoose.Types.ObjectId();
const gameId3 = mongoose.Types.ObjectId();
const gameId4 = mongoose.Types.ObjectId();
const gameId5 = mongoose.Types.ObjectId();
const gameId6 = mongoose.Types.ObjectId();
const gameId7 = mongoose.Types.ObjectId();

exports.users = [
  {
    _id: userId1,
    username: "test user",
    email: "testuser@gmail.com",
    password: "asdfasdf",
    image: "https://randomuser.me/api/portraits/med/men/75.jpg",
    hosting: [gameId1],
    participating: [gameId1, gameId2, gameId3, gameId5, gameId7],
  },
  {
    _id: userId2,
    username: "ronaldo",
    email: "ronaldo@gmail.com",
    password: "asdfasdf",
    image: "https://randomuser.me/api/portraits/med/men/5.jpg",
    hosting: [gameId2, gameId3, gameId5, gameId7],
    participating: [gameId1, gameId2, gameId5, gameId7],
  },
  {
    _id: userId3,
    username: "messi",
    email: "messi@gmail.com",
    password: "asdfasdf",
    image: "https://randomuser.me/api/portraits/med/men/15.jpg",
    hosting: [],
    participating: [gameId2, gameId5, gameId7],
  },
  {
    _id: userId4,
    username: "lukaku",
    email: "lukaku@gmail.com",
    password: "asdfasdf",
    image: "https://randomuser.me/api/portraits/med/men/25.jpg",
    hosting: [gameId4, gameId6],
    participating: [gameId2, gameId4, gameId5, gameId6, gameId7],
  },
];

exports.games = [
  {
    _id: gameId1,
    date: "2022-12-04",
    time: "12:00",
    host: userId1,
    price: 0,
    maxParticipants: 12,
    participants: [userId1, userId2],
    place: "4 vesty rd",
    city: "bootle",
    description: "Small game on small pitch",
  },
  {
    _id: gameId2,
    date: "2022-12-04",
    time: "12:00",
    host: userId2,
    price: 3,
    maxParticipants: 4,
    participants: [userId1, userId2, userId3, userId4],
    place: "Caldway Playing Fields",
    city: "liverpool",
    description:
      "Classic match on full pitch with everything you need to feel like pro",
  },
  {
    _id: gameId3,
    date: "2022-12-04",
    time: "12:00",
    host: userId2,
    price: 0,
    maxParticipants: 12,
    participants: [userId1, userId2],
    place: "prescot soccer centre",
    city: "prescot",
    description: "Bunch of noobs needed to have fun try to kick the ball",
  },
  {
    _id: gameId4,
    date: "2022-12-04",
    time: "12:00",
    host: userId4,
    price: 0,
    maxParticipants: 12,
    participants: [userId4],
    place: "Hough End Playing Fields",
    city: "manchester",
    description: "Bunch of noobs needed to have fun try to kick the ball",
  },
  {
    _id: gameId5,
    date: "2022-12-04",
    time: "12:00",
    host: userId2,
    price: 0,
    maxParticipants: 12,
    participants: [userId1, userId3, userId2, userId4],
    place: "Hough End Playing Fields",
    city: "manchester",
    description: "Bunch of noobs needed to have fun try to kick the ball",
  },
  {
    _id: gameId6,
    date: "2022-12-04",
    time: "12:00",
    host: userId4,
    price: 0,
    maxParticipants: 12,
    participants: [userId4],
    place: "307 elland rd",
    city: "leeds",
    description: "Bunch of noobs needed to have fun try to kick the ball",
  },
  {
    _id: gameId7,
    date: "2022-12-04",
    time: "12:00",
    host: userId2,
    price: 0,
    maxParticipants: 10,
    participants: [userId1, userId4, userId2, userId3],
    place: "Hacken Bridge Rd",
    city: "bolton",
    description: "Bunch of noobs needed to have fun try to kick the ball",
  },
];
