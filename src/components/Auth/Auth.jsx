import { frappe } from 'shared/frappeService';
import cls from './Auth.module.css';
import useAuthStore from 'store/auth.store';

const Auth = () => {
  const { data, setUser, setPwd, setIsAuthenticated, setUserInfo } = useAuthStore();
  const navigate = useAuthStore(state => state.navigate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await frappe.client.post('/api/method/login', {
        usr: data.usr,
        pwd: data.pwd,
      });
      const logged = await frappe.getLoggedUser();
      
      if (logged) {
        setIsAuthenticated(true);
        setUserInfo(logged || data.usr);
        navigate('/main');
      } else {
        setIsAuthenticated(false);
        setUserInfo(null);
      }
      
    } catch (error) {
      setIsAuthenticated(false);
      setUserInfo(null);
      alert('Ошибка входа: ' + (error?.response?.data?.message || error.message));
    }
  }

  return (
    <form className={cls.authForm}>
      <div className={cls.formBody}>
        <div className={cls.formGroup}>
          <input
            type="text"
            id="usr"
            name="usr"
            value={data.usr}
            placeholder="example@gmail.com"
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className={cls.formGroup}>
          <input
            type="password"
            id="pwd"
            name="pwd"
            value={data.pwd}
            placeholder="•••••"
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>
        <button type="submit" className={cls.button} onClick={handleSubmit}>Войти</button>
      </div>
    </form>
  )
}

export default Auth