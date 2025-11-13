import styles from './Slide.module.css';

const variantClassMap = {
  primary: styles.zigzagPrimary,
  secondary: styles.zigzagSecondary,
};

export default function Slide({ index, title, subtitle, points, variant = 'primary' }) {
  return (
    <article className={styles.slide} aria-label={`Slide ${index + 1}: ${title}`}>
      <div className={`${styles.zigzag} ${variantClassMap[variant]}`} />
      <div className={styles.content}>
        <header>
          <h2 className={styles.title}>{title}</h2>
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        </header>
        <ul className={styles.list}>
          {points.map((point) => (
            <li key={point.slice(0, 24)} className={styles.listItem}>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
