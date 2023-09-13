import React from 'react'
import styles from './ProgressBar.module.scss';

type Props = { max: number, value: number };

const ProgressBar = ({max, value}: Props) => {
  return (
    <progress max={max} value={value}></progress>
  )
}

export default ProgressBar