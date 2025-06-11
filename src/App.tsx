import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import Index from '@/pages/index';
import BlogList from '@/pages/blog/BlogList';
import CreateBlog from '@/pages/blog/CreateBlog';
import EditBlog from '@/pages/blog/EditBlog';
import ViewBlog from '@/pages/blog/ViewBlog';
import NotFound from '@/pages/NotFound';
import BookstoreList from '@/pages/bookstore/BookstoreList';
import CreateBook from '@/pages/bookstore/CreateBook';
import EditBook from '@/pages/bookstore/EditBook';
import ViewBook from '@/pages/bookstore/ViewBook';
import EventList from '@/pages/events/EventList';
import CreateEvent from '@/pages/events/CreateEvent';
import EditEvent from '@/pages/events/EditEvent';
import RegisteredEvents from '@/pages/events/RegisteredEvents';
import PaymentHistory from '@/pages/payments/Index';
import DonationHistory from '@/pages/donations/DonationHistory';
import ContactMessages from '@/pages/contacts/ContactMessages';
import NewMembers from '@/pages/members/NewMembers';
import SermonList from '@/pages/sermons/SermonList';
import CreateSermon from '@/pages/sermons/CreateSermon';
import EditSermon from '@/pages/sermons/EditSermon';
import ViewSermon from '@/pages/sermons/ViewSermon';
import PrayerRequestList from '@/pages/prayer-requests/PrayerRequestList';
import SignIn from '@/pages/auth/SignIn';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import OtpVerification from '@/pages/auth/OtpVerification';
import SetNewPassword from '@/pages/auth/SetNewPassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/auth/signin" replace />,
  },
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: 'home',
        element: <Index />,
      },
      {
        path: 'new-members',
        element: <NewMembers />,
      },
      {
        path: 'articles',
        element: <BlogList />,
      },
      {
        path: 'articles/create',
        element: <CreateBlog />,
      },
      {
        path: 'articles/:id/edit',
        element: <EditBlog />,
      },
      {
        path: 'articles/:id',
        element: <ViewBlog />,
      },
      {
        path: 'bookstore',
        element: <BookstoreList />,
      },
      {
        path: 'bookstore/create',
        element: <CreateBook />,
      },
      {
        path: 'bookstore/:id/edit',
        element: <EditBook />,
      },
      {
        path: 'bookstore/:id',
        element: <ViewBook />,
      },
      {
        path: 'events',
        element: <EventList />,
      },
      {
        path: 'events/create',
        element: <CreateEvent />,
      },
      {
        path: 'events/:id/edit',
        element: <EditEvent />,
      },
      {
        path: 'events/registered',
        element: <RegisteredEvents />,
      },
      {
        path: 'contacts',
        element: <ContactMessages />,
      },
      {
        path: 'payments',
        element: <PaymentHistory />,
      },
      {
        path: 'donations',
        element: <DonationHistory />,
      },
      {
        path: 'prayer-requests',
        element: <PrayerRequestList />,
      },
      {
        path: 'sermons',
        element: <SermonList />,
      },
      {
        path: 'sermons/create',
        element: <CreateSermon />,
      },
      {
        path: 'sermons/:id/edit',
        element: <EditSermon />,
      },
      {
        path: 'sermons/:id',
        element: <ViewSermon />,
      },
    ],
  },
  {
    path: '/auth/signin',
    element: <SignIn />,
  },
  {
    path: '/auth/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/auth/otp-verification',
    element: <OtpVerification />,
  },
  {
    path: '/auth/set-new-password',
    element: <SetNewPassword />,
  },
]);

export default router;
