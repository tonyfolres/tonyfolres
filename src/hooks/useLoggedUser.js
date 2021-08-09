import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default () => {
  const userId = localStorage.getItem('userId');

  const verifyLoggedUser = (redirectUrl) => {
    const navigate = useNavigate();
    useEffect(() => {
      if (!userId) {
        navigate(
          `/login${
            redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''
          }`
        );
      }
    }, [userId, redirectUrl, navigate]);
  };

  return { userId, verifyLoggedUser };
};
