import { useState } from 'react';
import Slide from '@/components/Slide';
import { slides } from '@/lib/slides';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
      setStatus('Generating PDF slides…');
      const response = await fetch('/api/slides');

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'english-literature-benefits.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setStatus('Slides downloaded successfully.');
    } catch (error) {
      console.error(error);
      setStatus('Something went wrong while creating the PDF. Please try again.');
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(''), 6000);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>How English Literature Powers Practical Life</h1>
        <p className={styles.heroLead}>
          Explore five focused slides that translate literary study into everyday professional impact—from persuasive
          communication to empathetic leadership. Download the full deck as a polished PDF ready to share.
        </p>
        <div className={styles.actions}>
          <button className={styles.downloadButton} onClick={handleDownload} disabled={loading}>
            {loading ? 'Preparing…' : 'Download PDF'}
          </button>
        </div>
        {status ? <p className={styles.statusMessage}>{status}</p> : null}
      </section>
      <section className={styles.slideGrid}>
        {slides.map((slide, index) => (
          <Slide key={slide.title} index={index} {...slide} />
        ))}
      </section>
    </main>
  );
}
