import { forwardRef, useRef } from 'react';
import sec6_1Img from '../../assets/Sec-6-1.png';
import sec6_2Img from '../../assets/Sec-6-2.png';
import sec6_3Img from '../../assets/Sec-6-3.png';
import journalTextImg from '../../assets/Thejournal-text-image.png';
import viewAllStoriesBtnImg from '../../assets/ViewAllStories-Btn.png';
import viewAllStoriesBtnHoverImg from '../../assets/ViewAllStories-Btn2.png';
import BloomingLotusIcon from '../../components/BloomingLotusIcon/BloomingLotusIcon';
import ShlokaButton from '../../components/ShlokaButton/ShlokaButton';
import styles from './TheJournal.module.css';

const TheJournal = forwardRef(function TheJournal(props, ref) {
  const sectionRef = useRef(null);

  return (
    <section
      ref={(node) => {
        sectionRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className={styles.section}
      id="journal"
      aria-label="The Journal - Chapter IV"
    >
      <div className={styles.container}>
        {/* Header Block */}
        <header className={styles.header}>
          {/* The Journal Artwork Banner Image */}
          <div className={styles.journalArtwork}>
            <img src={journalTextImg} alt="" className={styles.journalArtworkImg} />
          </div>

          <div className={styles.topLotus} aria-hidden="true" data-journal-text>
            <BloomingLotusIcon width={22} height={16} stroke="#A98455" />
          </div>

          <span className={styles.eyebrow} data-journal-text>THE JOURNAL</span>

          <h2 className={styles.title} data-journal-text>
            C H R O N I C L E S
          </h2>

          <div className={styles.diamondDivider} aria-hidden="true" data-journal-text>
            <span className={styles.divLine} />
            <span className={styles.divDot} />
            <span className={styles.divLine} />
          </div>

          <p className={styles.subtitle} data-journal-text>Stories of craft. Notes on time. Reflections in thread.</p>
        </header>

        {/* Asymmetric Journal Grid */}
        <div className={styles.grid}>
          {/* Left Large Hero Feature Card */}
          <article className={styles.heroCard}>
            <div className={styles.heroImageWrapper}>
              <img
                src={sec6_1Img}
                alt="The Language of Handloom — SHLOKA Master Artisan weaving gold silk saree"
                className={styles.heroImage}
                loading="lazy"
              />
              <div className={styles.darkGradientOverlay} aria-hidden="true" />
            </div>

            <div className={styles.heroOverlayContent}>
              <span className={styles.heroCategory} data-journal-text>FEATURED</span>
              <span className={styles.categoryLine} aria-hidden="true" data-journal-text />
              <h3 className={styles.heroTitle} data-journal-text>
                The Language<br />of Handloom
              </h3>
              <p className={styles.heroSubtitle} data-journal-text>Craft remembered.</p>
              <ShlokaButton variant="text" href="#read-handloom" data-journal-text>
                READ STORY
              </ShlokaButton>
            </div>
          </article>

          {/* Right Column (2 Stacked Cards) */}
          <div className={styles.rightColumn}>
            {/* Top Right Card: Woven for Generations */}
            <article className={styles.splitCard}>
              <div className={styles.cardTextContent}>
                <span className={styles.cardCategory} data-journal-text>HERITAGE</span>
                <h3 className={styles.cardTitle} data-journal-text>
                  Woven for<br />Generations
                </h3>
                <p className={styles.cardSubtitle} data-journal-text>
                  Traditions carried forward.
                </p>
                <ShlokaButton variant="text" href="#woven-generations" data-journal-text>
                  READ STORY
                </ShlokaButton>
              </div>
              <div className={styles.cardImageWrapper}>
                <img
                  src={sec6_2Img}
                  alt="Woven for Generations — Palace Arch View"
                  className={styles.cardImage}
                  loading="lazy"
                />
              </div>
            </article>

            {/* Bottom Right Card: Myth, Meaning & Motif */}
            <article className={styles.splitCard}>
              <div className={styles.cardTextContent}>
                <span className={styles.cardCategory} data-journal-text>CULTURE</span>
                <h3 className={styles.cardTitle} data-journal-text>
                  Myth, Meaning<br />& Motif
                </h3>
                <p className={styles.cardSubtitle} data-journal-text>
                  Stories hidden in silk.
                </p>
                <ShlokaButton variant="text" href="#myth-meaning-motif" data-journal-text>
                  READ STORY
                </ShlokaButton>
              </div>
              <div className={styles.cardImageWrapper}>
                <img
                  src={sec6_3Img}
                  alt="Myth, Meaning & Motif — Gold Silk Saree Pallu & Brass Lamp"
                  className={styles.cardImage}
                  loading="lazy"
                />
              </div>
            </article>
          </div>
        </div>

        {/* Bottom View All Stories CTA */}
        <footer className={styles.footer} data-journal-text>
          <div className={styles.bottomLotus} aria-hidden="true">
            <BloomingLotusIcon width={20} height={15} stroke="#A98455" />
          </div>

          <a
            href="#journal-all"
            className={styles.viewAllBtnLink}
            aria-label="View All Stories"
          >
            <img
              src={viewAllStoriesBtnImg}
              alt="View All Stories"
              className={styles.viewAllBtnDefault}
            />
            <img
              src={viewAllStoriesBtnHoverImg}
              alt="View All Stories Hover"
              className={styles.viewAllBtnHover}
              aria-hidden="true"
            />
          </a>
        </footer>
      </div>
    </section>
  );
});

export default TheJournal;
