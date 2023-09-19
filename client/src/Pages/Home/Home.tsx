import { useEffect, useState } from "react";
import Time from "../../Components/Time/Time";
import styles from "./Home.module.scss";

type Props = { socket: any };

const Home = ({ socket }: Props) => {
  return <div className={styles.home}>Home page</div>;
};

export default Home;
