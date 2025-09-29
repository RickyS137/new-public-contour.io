import FrappeService from 'shared/frappeService';
import cls from './Auth.module.css';
import useAuthStore from 'store/auth.store';

const Auth = () => {
  const { data, setUser, setPwd  } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    const frappe = new FrappeService();
    frappe.client.post('/api/method/login', {
      usr: data.usr,
      pwd: data.pwd
    }).then(response => {
      console.log('Успешный вход:', response);
    })
    .catch(error => {
      console.error('Ошибка входа:', error);
    });
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