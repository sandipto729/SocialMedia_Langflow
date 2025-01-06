import React from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './Login.module.scss';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './../../store//userslice';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSelector } from 'react-redux';
import Loader2 from './../../components/layout/loader/loader';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';


const Login = () => {
  const user = useSelector(state => state?.user?.user);
  const checkUser = () => {
    console.log(user);
    if (user) {
      Navigate('/school/profile');
    }
  }
  useEffect(() => {
    checkUser();
  }, [user]);


  const [showPassword, setShowPassword] = React.useState(false);
  const Navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const fetchUser = async () => {
    try {
      const response = await fetch(SummaryApi.UserProfile.url, {
        method: SummaryApi.UserProfile.method,
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      const result = await response.json();
      if (!result.success) {
        // toast.error(result.message);
        dispatch(setUserDetails(null));
        return;
      }
      dispatch(setUserDetails(result.user));
    } catch (err) {
      toast.error(err.message);
    }
  }

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      const response = await fetch(SummaryApi.UserSignIn.url, {
        method: SummaryApi.UserSignIn.method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });
      const result = await response.json();
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      fetchUser();
      Navigate('/school/profile');
    } catch (err) {
      toast.error(err.message);
    }
    finally {
      setLoading(false);
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className={styles['form-group']}>
            <label>Email:</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              placeholder="Email"
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div className={styles['form-group']}>
            <label>Password:</label>
            <div className={styles['password-container']}>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: 'Password is required' })}
                placeholder="Password"
              />
              <span
                className={styles['eye-icon']}
                onClick={handlePasswordVisibility}
                role="button"
                tabIndex="0"
              >
                {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
              </span>
            </div>
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </div>


          {/* Submit Button */}
          <div className={styles['form-group']}>
            {loading ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-30px', marginBottom: '-30px' }}><Loader2 /></div> : <button type="submit" className={styles.button}>Login</button>}
          </div>

        </form>
        <div className={styles['contact-admin']}>
          *If you face problems logging in, please contact the administrator.
        </div>

      </div>
      <Footer />
    </>

  );
};

export default Login;