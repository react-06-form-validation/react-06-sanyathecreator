import styles from './ErrorMessage.module.css';
const ErrorMessage = (_props) => {
  // TODO: implement error message rendering according to README requirements
  return <p className={styles.errorMessage}>{_props.message}</p>;
};

export default ErrorMessage;
