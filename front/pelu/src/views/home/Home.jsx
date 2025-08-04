import Styles from './Home.module.css';

const Home = () => {
  return (
    <main className={Styles.container}>
      <h2 className={Styles.leyend}>...nothing like being home</h2>
      <h1 className={Styles.welcome}>¡Bienvenid@!</h1>
    </main>
  );
};

export default Home;
