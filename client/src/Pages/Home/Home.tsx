import { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import { v4 as uuidv4 } from 'uuid';
import Button from 'Components/Button/Button';
import Input from 'Components/Input/Input';
import arrow from 'assets/images/arrow.png';

type Props = {};

type Controller = {
  controller_id: number;
  controller_name: string;
};

const Home = ({}: Props) => {
  const [room, setRoom] = useState('');
  const [controller, setController] = useState([]);
  const [isControllerExist, setIsControllerExist] = useState(false);
  const [activeController, setActiveController] = useState('');

  const handleCreateRoom = () => {
    const key = uuidv4();
    console.log(key);

    fetch(`http://localhost:5000/create-room/${room}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        room: room,
        key: key,
      }),
    })
      .then((response) => response.json())
      .then(() => localStorage.setItem('controller_key', key))
      .then(() => (window.location.href = `${room}/controller`));
  };

  useEffect(() => {
    const controller_key = localStorage.getItem('controller_key');
    if (controller_key !== null) {
      fetch(`http://localhost:5000/active-controller/${controller_key}`)
        .then((response) => response.json())
        .then((data) =>
          setActiveController(data.length > 0 ? data[0].controller_name : '')
        );
    }
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/controller-list')
      .then((response) => response.json())
      .then((data) => setController(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const res = controller.find(findController);
    typeof res === 'object'
      ? setIsControllerExist(true)
      : setIsControllerExist(false);
  }, [room]);

  const findController = (controller: Controller) => {
    return controller.controller_name === room;
  };

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Create your room</h1>
      <div className={styles.formWrapper}>
        <div className={styles.inputWrapper}>
          <Input
            placeholder="start typing"
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          {room.length > 0 && !isControllerExist && (
            <p className={styles.free}>FREE</p>
          )}
          {isControllerExist && <p className={styles.taken}>TAKEN</p>}
        </div>
        <Button
          text="Create"
          onClick={handleCreateRoom}
          disabled={isControllerExist}
        />
      </div>
      {activeController && (
        <p className={styles.activeController}>
          You already have an active controller.
          <br />
          Visit the controller page:{' '}
          <a className={styles.link} href={`/${activeController}/controller`}>
            <span>{activeController}</span> <img src={arrow} width={12} />
          </a>
        </p>
      )}
    </div>
  );
};

export default Home;
