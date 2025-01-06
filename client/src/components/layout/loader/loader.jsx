import React from 'react'
import styles from './loader.module.scss'

export default function Loader2() {
  return (
    <div>
      <div className={styles.lds_ellipsis}><div></div><div></div><div></div><div></div></div>
    </div>
  )
}