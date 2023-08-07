import React from 'react'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
        <p className={styles.copyright}>&copy; {new Date().getFullYear()} by WorldWise Inc.</p>
    </footer>
  )
}
