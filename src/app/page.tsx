import styles from './home.module.css';
import Link from 'next/link';
export default function Home() {
  return (
      <table className={styles.utils}>
        <thead>
            <tr>
                <th>Tool</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><Link href="/converter">File Converter</Link></td>
                <td>A simple file converter (ffmpeg wrapper)</td>
            </tr>
        </tbody>
    </table>

  );
}
