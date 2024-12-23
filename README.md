# Event Management App

## Overview
The Event Management App is a cross-platform mobile application built using React Native. This app enables users to browse, create, and manage events efficiently. The focus is on providing a seamless user experience with high performance, intuitive navigation, and scalable architecture.

---

## Features
- **Browse Events**: Users can view upcoming, ongoing, and past events.
- **Search and Filter**: Search events by title and location.
- **Create Events**: Organizers can create new events with relevant details like title, date, location and description.
- **Event Details**: View detailed information about an event, including the organizer’s contact.
- **Pagination**: Efficient loading of events with paginated data.
- **Theme**: Maintained theme structure for fonts

---

## Prerequisites
1. **Node.js**: Version 14 or higher.
2. **React Native CLI**: Install globally using:
   
bash
   npm install -g react-native-cli

3. **Android Studio**: For Android emulator setup.
4. **Xcode**: For iOS emulator (macOS only).
5. **Dependencies**: Ensure the following are installed:
   - React Navigation

---

## Installation
1. Install dependencies:
   
bash
   npm install


---

## Running the Application
1. **Start the Metro Bundler**:
   
bash
   npm start

2. **Run on Android Emulator**:
   
bash
   npm run android

3. **Run on iOS Emulator** (macOS only):
   
bash
   npm run ios


---

## Folder Structure
.
|___src
   ├── screens/           # Application screens (e.g., Home, EventDetails, CreateEvent)
   ├── services/          # Mock data 
   ├── navigation/        # React Navigation setup
   ├── redux/             # State Management
   ├── theme/             # Reusable fonts
 
├── App.js             # Entry point of the app
├── package.json       # Dependencies and scripts
└── README.md          # Documentation


---

## Architecture
### Thought Process
1. **Modular Design**: Components and screens are separated for reusability and maintainability.
2. **State Management**: Lightweight state managed locally within components.

### Key Decisions
- **React Navigation** for navigation to ensure a smooth user experience.
- **Axios** for API calls due to its simplicity and robust error handling.
- **Mock Data**: Used for development and testing purposes.

---

## Areas for Improvement
1. **Backend Integration**: Replace mock data with a real backend API.
2. **Enhanced Search**: Add filtering by categories, dates, and attendees.
3. **Authentication**: Implement user authentication for personalized experiences.
4. **Offline Mode**: Add offline support with local data caching.
5. **Testing**: Add unit tests for components and API integration.

---

## Contact
For queries or feedback, reach out to [srivarshinirr@gmail.com](mailto:srivarshinirr@gmail.com).