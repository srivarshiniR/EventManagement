import axios from 'axios';

// Mock data
const mockData = [
    {
        id: 1,
        title: "Music Fest",
        date: "25/12/2024",
        time: "18:00",
        location: "NYC",
        status: "Upcoming",
        attendees: 100,
        description: "A vibrant celebration featuring live performances by renowned bands and artists across various genres. Experience the thrill of music, food, and fun in an electrifying atmosphere.",
        organizer: {
            name: "John Doe",
            contact: "john.doe@example.com",
        },
        images: [
            "https://cdn.pixabay.com/photo/2018/06/10/11/38/festival-3466251_960_720.jpg",
            "https://cdn.pixabay.com/photo/2024/11/26/19/49/ai-generated-9226588_960_720.jpg",
            "https://cdn.pixabay.com/photo/2023/09/28/16/45/concert-8282026_1280.jpg",
        ],
    },
    {
        id: 2,
        title: "Tech Conference",
        date: "20/12/2024",
        time: "10:00",
        location: "SF",
        status: "Ongoing",
        attendees: 300,
        description: "A premier event bringing together innovators, industry leaders, and tech enthusiasts. Explore the latest advancements in technology, network with experts, and attend insightful keynote sessions.",
        organizer: {
            name: "Tech Corp",
            contact: "info@techcorp.com",
        },
        images: [
            "https://img.freepik.com/free-vector/gradient-halftone-technology-webinar_23-2149078605.jpg",
            "https://img.freepik.com/free-photo/image-by-rawpixel-com_53876-165282.jpg",
        ],
    },
    {
        id: 3,
        title: "Art Expo",
        date: "23/12/2024",
        time: "09:00",
        location: "LA",
        status: "Completed",
        attendees: 50,
        description: "A showcase of creativity and talent, presenting stunning artworks from local and international artists. Immerse yourself in a world of paintings, sculptures, and contemporary designs.",
        organizer: {
            name: "Art Society",
            contact: "artsociety@example.com",
        },
        images: [
            "https://thumbs.dreamstime.com/b/art-expo-valencia-city-338737270.jpg",
            "https://thumbs.dreamstime.com/b/harbin-china-january-international-snow-sculpture-art-expo-gigantic-buildings-th-sun-island-located-80767847.jpg",
            "https://thumbs.dreamstime.com/b/art-expo-malaysia-2010-16788173.jpg",
        ],
    },
    {
        id: 4,
        title: "Culinary Carnival",
        date: "24/12/2024",
        time: "12:00",
        location: "Chicago",
        status: "Upcoming",
        attendees: 120,
        description: "A delightful feast of flavors featuring top chefs and gourmet dishes from around the world.",
        organizer: {
            name: "Gourmet World",
            contact: "info@gourmetworld.com",
        },
        images: [
            "https://cdn.pixabay.com/photo/2018/06/10/11/38/festival-3466251_960_720.jpg",
            "https://cdn.pixabay.com/photo/2024/11/26/19/49/ai-generated-9226588_960_720.jpg",
            "https://cdn.pixabay.com/photo/2023/09/28/16/45/concert-8282026_1280.jpg",
        ],
    },
    {
        id: 5,
        title: "Book Fair",
        date: "25/12/2025",
        time: "09:00",
        location: "Boston",
        status: "Upcoming",
        attendees: 200,
        description: "A paradise for book lovers showcasing literary works from bestselling authors and new talents.",
        organizer: {
            name: "Lit Society",
            contact: "info@litsociety.com",
        },
        images: [
            "https://cdn.pixabay.com/photo/2018/06/10/11/38/festival-3466251_960_720.jpg",
            "https://cdn.pixabay.com/photo/2024/11/26/19/49/ai-generated-9226588_960_720.jpg",
            "https://cdn.pixabay.com/photo/2023/09/28/16/45/concert-8282026_1280.jpg",
        ],
    },
    {
        id: 6,
        title: "Startup Summit",
        date: "05/12/2024",
        time: "14:00",
        location: "Seattle",
        status: "Upcoming",
        attendees: 500,
        description: "A gathering of innovators and entrepreneurs to share insights and ideas for startups.",
        organizer: {
            name: "Innovators Inc.",
            contact: "info@innovators.com",
        },
        images: [
            "https://cdn.pixabay.com/photo/2018/06/10/11/38/festival-3466251_960_720.jpg",
            "https://cdn.pixabay.com/photo/2024/11/26/19/49/ai-generated-9226588_960_720.jpg",
            "https://cdn.pixabay.com/photo/2023/09/28/16/45/concert-8282026_1280.jpg",
        ],
    },
    {
        id: 7,
        title: "Health Expo",
        date: "28/12/2024",
        time: "10:00",
        location: "Miami",
        status: "Upcoming",
        attendees: 250,
        description: "A platform to explore the latest health and wellness trends.",
        organizer: {
            name: "Health Today",
            contact: "info@healthtoday.com",
        },
        images: [
            "https://cdn.pixabay.com/photo/2018/06/10/11/38/festival-3466251_960_720.jpg",
            "https://cdn.pixabay.com/photo/2024/11/26/19/49/ai-generated-9226588_960_720.jpg",
            "https://cdn.pixabay.com/photo/2023/09/28/16/45/concert-8282026_1280.jpg",
        ],
    },
    {
        id: 8,
        title: "Fashion Show",
        date: "12/02/2025",
        time: "19:00",
        location: "Paris",
        status: "Upcoming",
        attendees: 400,
        description: "A glamorous event showcasing the latest trends in the fashion world.",
        organizer: {
            name: "Fashion Forward",
            contact: "info@fashionforward.com",
        },
        images: [
            "https://cdn.pixabay.com/photo/2018/06/10/11/38/festival-3466251_960_720.jpg",
            "https://cdn.pixabay.com/photo/2024/11/26/19/49/ai-generated-9226588_960_720.jpg",
            "https://cdn.pixabay.com/photo/2023/09/28/16/45/concert-8282026_1280.jpg",
        ],
    },
    {
        id: 9,
        title: "Science Symposium",
        date: "03/03/2025",
        time: "09:00",
        location: "London",
        status: "Upcoming",
        attendees: 150,
        description: "An event to discuss groundbreaking scientific discoveries and research.",
        organizer: {
            name: "Sci World",
            contact: "info@sciworld.com",
        },
        images: [
            "https://cdn.pixabay.com/photo/2018/06/10/11/38/festival-3466251_960_720.jpg",
            "https://cdn.pixabay.com/photo/2024/11/26/19/49/ai-generated-9226588_960_720.jpg",
            "https://cdn.pixabay.com/photo/2023/09/28/16/45/concert-8282026_1280.jpg",
        ],
    },
    {
        id: 10,
        title: "Dance Festival",
        date: "25/12/2024",
        time: "16:00",
        location: "Mumbai",
        status: "Upcoming",
        attendees: 320,
        description: "A vibrant celebration of dance forms from around the world.",
        organizer: {
            name: "Dance League",
            contact: "info@danceleague.com",
        },
        images: [
            "https://cdn.pixabay.com/photo/2018/06/10/11/38/festival-3466251_960_720.jpg",
            "https://cdn.pixabay.com/photo/2024/11/26/19/49/ai-generated-9226588_960_720.jpg",
            "https://cdn.pixabay.com/photo/2023/09/28/16/45/concert-8282026_1280.jpg",
        ],
    },
    {
        id: 11,
        title: "Gaming Expo",
        date: "15/03/2025",
        time: "10:00",
        location: "Seattle",
        status: "Upcoming",
        attendees: 450,
        description: "Dive into the world of gaming with demos, competitions, and previews of the latest games and gear.",
        organizer: {
            name: "Gamerz Co.",
            contact: "info@gamerzco.com",
        },
        images: [
            "https://cdn.pixabay.com/photo/2018/06/10/11/38/festival-3466251_960_720.jpg",
            "https://cdn.pixabay.com/photo/2024/11/26/19/49/ai-generated-9226588_960_720.jpg",
            "https://cdn.pixabay.com/photo/2023/09/28/16/45/concert-8282026_1280.jpg",
        ],
    },
    {
        id: 12,
        title: "Book Lovers' Meetup",
        date: "20/02/2025",
        time: "14:00",
        location: "Austin",
        status: "Upcoming",
        attendees: 120,
        description: "A gathering for book enthusiasts to discuss literature, share stories, and exchange book recommendations.",
        organizer: {
            name: "Read World",
            contact: "contact@readworld.com",
        },
        images: [
            "https://cdn.pixabay.com/photo/2018/06/10/11/38/festival-3466251_960_720.jpg",
            "https://cdn.pixabay.com/photo/2024/11/26/19/49/ai-generated-9226588_960_720.jpg",
            "https://cdn.pixabay.com/photo/2023/09/28/16/45/concert-8282026_1280.jpg",
        ],
    },
    {
        id: 13,
        title: "Startup Pitch Fest",
        date: "28/01/2025",
        time: "09:00",
        location: "Boston",
        status: "Upcoming",
        attendees: 200,
        description: "An exciting opportunity for startups to pitch ideas and network with investors and mentors.",
        organizer: {
            name: "Innovators Hub",
            contact: "hello@innovatorshub.com",
        },
        images: [
            "https://cdn.pixabay.com/photo/2018/06/10/11/38/festival-3466251_960_720.jpg",
            "https://cdn.pixabay.com/photo/2024/11/26/19/49/ai-generated-9226588_960_720.jpg",
            "https://cdn.pixabay.com/photo/2023/09/28/16/45/concert-8282026_1280.jpg",
        ],
    },
    {
        id: 14,
        title: "Marathon 2025",
        date: "01/05/2025",
        time: "06:00",
        location: "Chicago",
        status: "Upcoming",
        attendees: 500,
        description: "Run for fitness and charity in this annual marathon, featuring scenic routes and vibrant cheer zones.",
        organizer: {
            name: "Marathon Club",
            contact: "marathonclub@example.com",
        },
        images: [
            "https://cdn.pixabay.com/photo/2018/06/10/11/38/festival-3466251_960_720.jpg",
            "https://cdn.pixabay.com/photo/2024/11/26/19/49/ai-generated-9226588_960_720.jpg",
            "https://cdn.pixabay.com/photo/2023/09/28/16/45/concert-8282026_1280.jpg",
        ],
    },
    {
        id: 15,
        title: "Food Carnival",
        date: "15/04/2025",
        time: "12:00",
        location: "Houston",
        status: "Upcoming",
        attendees: 300,
        description: "A paradise for foodies offering a variety of dishes, cooking workshops, and live music.",
        organizer: {
            name: "Taste Events",
            contact: "events@taste.com",
        },
        images: [
            "https://cdn.pixabay.com/photo/2018/06/10/11/38/festival-3466251_960_720.jpg",
            "https://cdn.pixabay.com/photo/2024/11/26/19/49/ai-generated-9226588_960_720.jpg",
            "https://cdn.pixabay.com/photo/2023/09/28/16/45/concert-8282026_1280.jpg",
        ],
    },
    {
        id: 16,
        title: "Yoga Retreat",
        date: "10/06/2025",
        time: "08:00",
        location: "San Diego",
        status: "Upcoming",
        attendees: 80,
        description: "Rejuvenate your mind and body with yoga sessions, meditation workshops, and health talks.",
        organizer: {
            name: "Zen Life",
            contact: "zenlife@example.com",
        },
        images: [
            "https://cdn.pixabay.com/photo/2018/06/10/11/38/festival-3466251_960_720.jpg",
            "https://cdn.pixabay.com/photo/2024/11/26/19/49/ai-generated-9226588_960_720.jpg",
            "https://cdn.pixabay.com/photo/2023/09/28/16/45/concert-8282026_1280.jpg",
        ],
    },
    {
        id: 17,
        title: "Movie Marathon Night",
        date: "25/02/2025",
        time: "18:00",
        location: "Denver",
        status: "Upcoming",
        attendees: 60,
        description: "Join us for a back-to-back screening of classic and blockbuster movies with free popcorn.",
        organizer: {
            name: "Cineplex",
            contact: "info@cineplex.com",
        },
        images: [
            "https://cdn.pixabay.com/photo/2018/06/10/11/38/festival-3466251_960_720.jpg",
            "https://cdn.pixabay.com/photo/2024/11/26/19/49/ai-generated-9226588_960_720.jpg",
            "https://cdn.pixabay.com/photo/2023/09/28/16/45/concert-8282026_1280.jpg",
        ],
    },
    {
        id: 18,
        title: "Fashion Forward 2025",
        date: "05/03/2025",
        time: "16:00",
        location: "Miami",
        status: "Upcoming",
        attendees: 350,
        description: "A spectacular showcase of the latest trends in fashion featuring top designers and models.",
        organizer: {
            name: "Style Studio",
            contact: "style@studio.com",
        },
        images: [
            "https://cdn.pixabay.com/photo/2018/06/10/11/38/festival-3466251_960_720.jpg",
            "https://cdn.pixabay.com/photo/2024/11/26/19/49/ai-generated-9226588_960_720.jpg",
            "https://cdn.pixabay.com/photo/2023/09/28/16/45/concert-8282026_1280.jpg",
        ],
    },
    {
        id: 19,
        title: "Kids' Science Fair",
        date: "12/04/2025",
        time: "10:00",
        location: "Dallas",
        status: "Upcoming",
        attendees: 150,
        description: "Encourage curiosity and learning with exciting science experiments and interactive exhibits.",
        organizer: {
            name: "Bright Minds",
            contact: "info@brightminds.com",
        },
        images: [
            "https://cdn.pixabay.com/photo/2018/06/10/11/38/festival-3466251_960_720.jpg",
            "https://cdn.pixabay.com/photo/2024/11/26/19/49/ai-generated-9226588_960_720.jpg",
            "https://cdn.pixabay.com/photo/2023/09/28/16/45/concert-8282026_1280.jpg",
        ],
    },
    {
        id: 20,
        title: "Charity Gala Dinner",
        date: "20/06/2025",
        time: "19:00",
        location: "Las Vegas",
        status: "Upcoming",
        attendees: 220,
        description: "An elegant evening of fine dining and entertainment to raise funds for a noble cause.",
        organizer: {
            name: "Give Back",
            contact: "info@giveback.org",
        },
        images: [
            "https://cdn.pixabay.com/photo/2018/06/10/11/38/festival-3466251_960_720.jpg",
            "https://cdn.pixabay.com/photo/2024/11/26/19/49/ai-generated-9226588_960_720.jpg",
            "https://cdn.pixabay.com/photo/2023/09/28/16/45/concert-8282026_1280.jpg",
        ],
    },
];



export const mockEventsAPI = async (page = 1, searchQuery = "") => {
    const filteredEvents = mockData.filter(
        (event) =>
            event?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event?.location?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return {
        events: filteredEvents,
        hasMore: false,
    };
};

// Simulate a POST request to create a new event
export const createEventAPI = async (newEvent) => {
    // Simulating a delay for API call
    return new Promise((resolve) => {
        setTimeout(() => {
            const event = { ...newEvent, id: mockData.length + 1 }; 
            mockData.push(event);
            resolve(event);
        }, 1000);
    });
};
