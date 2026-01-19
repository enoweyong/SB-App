import { useState } from 'react';
import './App.css'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Dashboard from './Dashboard'
import CreateBusiness from './CreateBusiness'
import BrowseBusinesses from './BrowseBusinesses'
import BusinessDetails from './BusinessDetails'
import UserProfile from './UserProfile'
import Reviews from './Reviews'
import CreateReview from './CreateReview'

function App() {
  const [currentPage, setCurrentPage] = useState('signin');
  const [userEmail, setUserEmail] = useState('');
  const [userProfilePicture, setUserProfilePicture] = useState(null);
  const [navigationParams, setNavigationParams] = useState({});
  const [businesses, setBusinesses] = useState([
    {
      id: 1,
      name: 'Quick Coffee Shop',
      category: 'Food & Beverage',
      location: 'Downtown, NYC',
      phone: '(555) 123-4567',
      email: 'hello@quickcoffee.com',
      website: 'https://quickcoffee.com',
      description: 'A cozy coffee shop in the heart of downtown serving premium coffee and pastries. Open early morning to late evening.',
      createdAt: '1/15/2026',
      rating: 4.5,
      reviews: [
        {
          id: 1,
          rating: 5,
          title: 'Best coffee in town!',
          comment: 'Amazing atmosphere and the barista really knows their stuff.',
          date: '1/18/2026',
          author: 'John D.',
        },
        {
          id: 2,
          rating: 4,
          title: 'Great location',
          comment: 'Convenient spot but a bit pricey for the portion sizes.',
          date: '1/17/2026',
          author: 'Sarah M.',
        },
      ],
    },
    {
      id: 2,
      name: 'Tech Solutions Inc',
      category: 'Technology',
      location: 'Silicon Valley, CA',
      phone: '(555) 987-6543',
      email: 'support@techsolutions.com',
      website: 'https://techsolutions.com',
      description: 'Leading software development company offering web and mobile solutions for businesses of all sizes.',
      createdAt: '1/10/2026',
      rating: 4.8,
      reviews: [
        {
          id: 3,
          rating: 5,
          title: 'Professional and reliable',
          comment: 'They delivered on time and exceeded expectations on our project.',
          date: '1/16/2026',
          author: 'Mike L.',
        },
      ],
    },
    {
      id: 3,
      name: 'Wellness Center',
      category: 'Healthcare',
      location: 'Midtown, NYC',
      phone: '(555) 456-7890',
      email: 'info@wellnesscenter.com',
      website: 'https://wellnesscenter.com',
      description: 'Full-service wellness center offering yoga, meditation, massage therapy, and nutritional counseling.',
      createdAt: '1/12/2026',
      rating: 4.7,
      reviews: [
        {
          id: 4,
          rating: 5,
          title: 'Life-changing experience',
          comment: 'The yoga classes and massage therapy have transformed my health.',
          date: '1/18/2026',
          author: 'Emma K.',
        },
        {
          id: 5,
          rating: 4,
          title: 'Good services, fair pricing',
          comment: 'Quality services though membership prices could be more affordable.',
          date: '1/15/2026',
          author: 'Alex P.',
        },
      ],
    },
  ]);

  const handleNavigate = (page, params = {}) => {
    setCurrentPage(page);
    setNavigationParams(params);
  };

  const handleSignInSuccess = (email) => {
    setUserEmail(email);
    handleNavigate('dashboard');
  };

  const handleSignUpSuccess = (email) => {
    setUserEmail(email);
    handleNavigate('dashboard');
  };

  const handleLogout = () => {
    setUserEmail('');
    handleNavigate('signin');
  };

  const handleCreateBusiness = (newBusiness) => {
    setBusinesses([...businesses, newBusiness]);
  };

  const handleAddReview = (businessId, newReview) => {
    setBusinesses(
      businesses.map((b) => {
        if (b.id === businessId) {
          const updatedReviews = [...b.reviews, newReview];
          const newRating =
            updatedReviews.reduce((sum, r) => sum + r.rating, 0) /
            updatedReviews.length;
          return {
            ...b,
            reviews: updatedReviews,
            rating: newRating,
          };
        }
        return b;
      })
    );
  };

  const handleDeleteBusiness = (businessId) => {
    if (window.confirm("Are you sure you want to delete this business?")) {
      setBusinesses(businesses.filter((b) => b.id !== businessId));
    }
  };

  const handleDeleteReview = (businessId, reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setBusinesses(
        businesses.map((b) => {
          if (b.id === businessId) {
            const updatedReviews = b.reviews.filter((r) => r.id !== reviewId);
            const newRating =
              updatedReviews.length > 0
                ? updatedReviews.reduce((sum, r) => sum + r.rating, 0) /
                  updatedReviews.length
                : 0;
            return {
              ...b,
              reviews: updatedReviews,
              rating: newRating,
            };
          }
          return b;
        })
      );
    }
  };

  const handleEditBusiness = (businessId, updatedBusiness) => {
    setBusinesses(
      businesses.map((b) =>
        b.id === businessId ? { ...b, ...updatedBusiness } : b
      )
    );
  };

  const handleEditReview = (businessId, reviewId, updatedReview) => {
    setBusinesses(
      businesses.map((b) => {
        if (b.id === businessId) {
          const updatedReviews = b.reviews.map((r) =>
            r.id === reviewId ? { ...r, ...updatedReview } : r
          );
          const newRating =
            updatedReviews.reduce((sum, r) => sum + r.rating, 0) /
            updatedReviews.length;
          return {
            ...b,
            reviews: updatedReviews,
            rating: newRating,
          };
        }
        return b;
      })
    );
  };

  const handleUpdateProfilePicture = (imageData) => {
    setUserProfilePicture(imageData);
  };

  const handleDeleteProfilePicture = () => {
    if (window.confirm("Are you sure you want to delete your profile picture?")) {
      setUserProfilePicture(null);
    }
  };

  return (
    <>
      {currentPage === 'signin' && (
        <SignIn
          onSwitchToSignUp={() => handleNavigate('signup')}
          onSignInSuccess={handleSignInSuccess}
        />
      )}

      {currentPage === 'signup' && (
        <SignUp
          onSwitchToSignIn={() => handleNavigate('signin')}
          onSignUpSuccess={handleSignUpSuccess}
        />
      )}

      {currentPage === 'dashboard' && (
        <Dashboard
          onNavigate={handleNavigate}
          userEmail={userEmail}
          onLogout={handleLogout}
          businesses={businesses}
        />
      )}

      {currentPage === 'create' && (
        <CreateBusiness
          onNavigate={handleNavigate}
          onCreateBusiness={handleCreateBusiness}
        />
      )}

      {currentPage === 'browse' && (
        <BrowseBusinesses
          onNavigate={handleNavigate}
          businesses={businesses}
          searchTerm={navigationParams.search || ''}
        />
      )}

      {currentPage === 'details' && (
        <BusinessDetails
          onNavigate={handleNavigate}
          businesses={businesses}
          businessId={navigationParams.id}
          onAddReview={handleAddReview}
        />
      )}

      {currentPage === 'profile' && (
        <UserProfile
          onNavigate={handleNavigate}
          businesses={businesses}
          userEmail={userEmail}
          userProfilePicture={userProfilePicture}
          onUpdateProfilePicture={handleUpdateProfilePicture}
          onDeleteProfilePicture={handleDeleteProfilePicture}
          onDeleteBusiness={handleDeleteBusiness}
          onDeleteReview={handleDeleteReview}
          onEditBusiness={handleEditBusiness}
          onEditReview={handleEditReview}
        />
      )}

      {currentPage === 'reviews' && (
        <Reviews
          onNavigate={handleNavigate}
          businesses={businesses}
        />
      )}

      {currentPage === 'createreview' && (
        <CreateReview
          onNavigate={handleNavigate}
          businesses={businesses}
          onAddReview={handleAddReview}
        />
      )}
    </>
  )
}

export default App
