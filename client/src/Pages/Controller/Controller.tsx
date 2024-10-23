import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Time from 'Components/Time/Time';
import styles from './Controller.module.scss';
import Input from 'Components/Input/Input';
import { status } from 'Components/Types/types';
import Button from 'Components/Button/Button';
import arrow from 'assets/images/arrow.png';

type Props = { socket: any };

type Controller = {
  controller_id: number;
  controller_name: string;
};

const Controller = ({ socket }: Props) => {
  const [timer, setTimer] = useState(1);
  const [message, setMessage] = useState('');
  const [currentTime, setCurrentTime] = useState('fetching');
  const timerRef = useRef<any>(null);
  const messageRef = useRef<any>(null);
  const statusRef = useRef<status>('stop');
  const [buttonText, setButtonText] = useState<status>('start');
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [controller, setController] = useState([]);
  const [isControllerExist, setIsControllerExist] = useState(false);
  const [errorArr, setErrorArr] = useState<string[]>([]);

  const messageError = 'Message text can not be over 50 characters';
  const timerError = 'Timer can not be over 24h';

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:5000/controller-list')
      .then((response) => response.json())
      .then((data) => setController(data))
      .then(() => setIsLoading(false))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/controller-key/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (localStorage.getItem('controller_key') !== data[0].controller_key) {
          window.location.href = 'http://localhost:3000/';
        }
      });
  }, []);

  useEffect(() => {
    if (controller.length > 0) {
      controller.find((item: Controller) => {
        return item.controller_name === id ? setIsControllerExist(true) : '';
      });
    }
  }, [controller]);

  socket.emit('join-room', id);

  /* useEffect(() => {
    socket.on('connect', () => console.log(socket.id));
    socket.on('connect_error', () => {
      setTimeout(() => socket.connect(), 5000);
    });
    socket.on('currentTime', (data: any) => setCurrentTime(data));
    socket.on('disconnect', () => setCurrentTime('server disconnected'));
  }, []); */

  const messageSubmitHandler = (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    e.preventDefault();

    const submitterName = e.nativeEvent.submitter?.getAttribute('name');

    if (submitterName === 'send-message') {
      if (!errorArr.includes(timerError) && !errorArr.includes(messageError)) {
        socket.emit('send-message', { message, id });
        setMessage('');
      }
    }
  };

  const submitHandler = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    const submitterName = e.nativeEvent.submitter?.getAttribute('name');

    if (submitterName === 'send') {
      if (!errorArr.includes(timerError) && !errorArr.includes(messageError)) {
        statusRef.current = 'stop';
        socket.emit('stop-timer', { statusRef, id });
        socket.emit('send-timer', { timer: timer * 60, id });
        setTimer(timer);
        setButtonText('start');
      }
    }

    if (submitterName === 'start' || submitterName === 'continue') {
      statusRef.current = 'start';
      socket.emit('start-timer', { statusRef, id });
      setButtonText('pause');
    }

    if (submitterName === 'pause') {
      statusRef.current = 'pause';
      socket.emit('pause-timer', { statusRef, id });
      setButtonText('continue');
    }

    if (submitterName === 'stop') {
      statusRef.current = 'stop';
      socket.emit('stop-timer', { statusRef, id });
      setButtonText('start');
    }
  };

  const timerChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setTimer(timerRef.current?.value);
    if (timerRef.current?.value > 1440) {
      if (!errorArr.includes(timerError)) {
        setErrorArr((prevErrors) => [...prevErrors, timerError]);
      }
    } else {
      setErrorArr((prevErrors) =>
        prevErrors.filter((error) => error !== timerError)
      );
    }
  };

  const messageChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setMessage(e.target.value);
    if (e.target.value.length > 50) {
      if (!errorArr.includes(messageError)) {
        setErrorArr((prevErrors) => [...prevErrors, messageError]);
      }
    } else {
      setErrorArr((prevErrors) =>
        prevErrors.filter((error) => error !== messageError)
      );
    }
  };

  const onlyShowErrorTimer = errorArr.includes(timerError) ? true : undefined;

  const onlyShowErrorMessage =
    message.length > 0 && errorArr.includes(messageError) ? true : undefined;

  return (
    <div className={styles.controller}>
      {isLoading && <h2>Loading...</h2>}
      {!isLoading && isControllerExist && (
        <>
          <h1 className={styles.title}>Timer controller</h1>
          <form className={styles.timerForm} onSubmit={submitHandler}>
            <Input
              placeholder="Minutes"
              onChange={timerChangeHandler}
              ref={timerRef}
              value={timer}
              type="number"
              error={onlyShowErrorTimer}
            />
            <div className={styles.controllerButtons}>
              <Button type="submit" text="send" name="send" />
              <Button type="submit" name={buttonText} text={buttonText} />
              <Button type="submit" name="stop" text="stop" />
            </div>
          </form>
          <form className={styles.messageForm} onSubmit={messageSubmitHandler}>
            <Input
              className={styles.input}
              placeholder="Message..."
              onChange={messageChangeHandler}
              value={message}
              ref={messageRef}
              error={onlyShowErrorMessage}
            />
            <Button
              className={styles.button}
              type="submit"
              name="send-message"
              text="Send Message"
            />
          </form>
          <p className={styles.activeController}>
            Check your timer:{' '}
            <a className={styles.link} href={`/${id}`} target="_blank">
              <span>{id}</span> <img src={arrow} width={12} />
            </a>
          </p>
          {/* <Time time={currentTime} /> */}
          {errorArr.length > 0 && (
            <p className={styles.error}>
              {errorArr.map((item, key) => (
                <span key={key}>{item}</span>
              ))}
            </p>
          )}
        </>
      )}
      {!isLoading && !isControllerExist && <h2>404</h2>}
    </div>
  );
};

export default Controller;
