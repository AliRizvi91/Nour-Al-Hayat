import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './Slices/RoomSlice';
import FeedbackReducer from './Slices/FeedbackSlice';
import FeatureReducer from './Slices/FeaturesSlice';
import GalleryReducer from './Slices/GallerySlice';
import EventReducer from './Slices/EventSlice';
import MessageReducer from './Slices/MessageSlice';
import GiftReducer from './Slices/GiftSlice';
import HotelReducer from './Slices/HotelSlice';
import StatusReducer from './Slices/StatusSlice';
import BookingReducer from './Slices/BookingSlice';
import UserReducer from './Slices/UserSlice';

export const store = configureStore({
  reducer: {
    userStore: UserReducer,
    roomStore: roomReducer,
    feedbackStore: FeedbackReducer,
    featureStore: FeatureReducer,
    galleryStore: GalleryReducer,
    EventStore: EventReducer,
    MessageStore: MessageReducer,
    GiftStore: GiftReducer,
    HotelStore: HotelReducer,
    StatusStore: StatusReducer,
    BookingStore: BookingReducer,
  },
});

export default store;
