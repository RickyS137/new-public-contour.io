const AuthModalMobile = ({ open, onAccept, onCancel }) => {
  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Предупреждение</h2>
        <p>
          ГИС ББ предназначена для работы на ПК в браузерах с российскими сертификатами безопасности (Яндекс Браузер и Хромиум ГОСТ). На мобильных устройствах корректность отображения информации не гарантируется
        </p>
        <div style={styles.buttonContainer}>
          <button style={styles.accept} onClick={onAccept}>Принять предупреждение, зайти в закрытый контур</button>
          <button style={styles.cancel} onClick={onCancel}>Остаться на открытом контуре</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#fff',
    padding: '24px',
    borderRadius: '8px',
    maxWidth: '90%',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    gap: '10px',
  },
  accept: {
    padding: '10px 20px',
    background: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancel: {
    padding: '10px 20px',
    background: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default AuthModalMobile;