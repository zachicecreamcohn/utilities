import styles from './Header.module.css';
import Link from 'next/link';

export default function Header() {
  return (
    <div className={styles.header}>
      <Link href="/">Utilities</Link>
    </div>
  );
}
