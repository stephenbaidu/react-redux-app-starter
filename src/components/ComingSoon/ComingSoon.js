import React from 'react'

import styles from './ComingSoon.module.scss';

export default function ComingSoon (props) {
  return (
    <div className={styles.ComingSoon}>
      <h1>Coming Soon</h1>
      { props.msg }
    </div>
  )
}
