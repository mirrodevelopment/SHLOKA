import { useState } from 'react';
import BloomingLotusIcon from '../BloomingLotusIcon/BloomingLotusIcon';
import styles from './DesktopCustomPages.module.css';

// Import images from assets to make pages look premium
import saree1Img from '../../assets/Saree-1.png';
import saree2Img from '../../assets/Saree-2.png';
import saree3Img from '../../assets/Saree-3.png';
import saree4Img from '../../assets/Saree-4.png';
import storyHero from '../../assets/story-hero.jpg';
import padmaBlouse from '../../assets/padma-blouse.jpg';
import padmaPotli from '../../assets/padma-potli.jpg';

export function CollectionsPage() {
  const collections = [
    {
      title: 'Chapter I',
      name: 'KANCHIPURAM SILKS',
      desc: 'Heavy-weight mulberry silk sarees with contrasting gold zari borders, handwoven in the temples of Tamil Nadu.',
      image: saree1Img,
      accent: 'Royal Crimson Red'
    },
    {
      title: 'Chapter II',
      name: 'VARANASI KADWA',
      desc: 'Intricate floral and foliate motifs hand-loomed with gold and silver zari in classic double-warp silks.',
      image: saree2Img,
      accent: 'Sage & Gold'
    },
    {
      title: 'Chapter III',
      name: 'HERITAGE SHENGOTTAI',
      desc: 'Traditional checks and structural stripes woven with fine cotton-silk blends for everyday luxury.',
      image: saree3Img,
      accent: 'Maroon & Mustard'
    },
    {
      title: 'Chapter IV',
      name: 'ORGANZA MEGH',
      desc: 'Translucent, weightless organzas finished with hand-embroidered border details and zari trims.',
      image: saree4Img,
      accent: 'Misty Blue'
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <BloomingLotusIcon width={24} height={16} stroke="#A98455" />
        <span className={styles.eyebrow}>CURATED ARCHIVES</span>
        <h1 className={styles.mainTitle}>THE COLLECTIONS</h1>
        <p className={styles.subtitle}>Explore the chapters of Shloka’s weaving heritage.</p>
      </header>

      <div className={styles.collectionsGrid}>
        {collections.map((col, idx) => (
          <div key={col.name} className={styles.collectionCard} style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className={styles.imageWrap}>
              <img src={col.image} alt={col.name} className={styles.image} />
              <span className={styles.cardAccent}>{col.accent}</span>
            </div>
            <div className={styles.cardInfo}>
              <span className={styles.cardChapter}>{col.title}</span>
              <h3 className={styles.cardName}>{col.name}</h3>
              <p className={styles.cardDesc}>{col.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StoryPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <BloomingLotusIcon width={24} height={16} stroke="#A98455" />
        <span className={styles.eyebrow}>OUR ORIGINS</span>
        <h1 className={styles.mainTitle}>THE LEGEND OF SHLOKA</h1>
        <p className={styles.subtitle}>A legacy woven through generations of master artisans.</p>
      </header>

      <div className={styles.storyLayout}>
        <div className={styles.storyImageContainer}>
          <img src={storyHero} alt="Handloom artisan weaving Shloka saree" className={styles.storyHeroImg} />
          <div className={styles.storyDecorativeFrame} />
        </div>

        <div className={styles.storyContent}>
          <h2 className={styles.storySectionTitle}>Chapter I: The Loom of Time</h2>
          <p className={styles.storyParagraph}>
            <span className={styles.dropCap}>S</span>hloka was founded on a simple promise: to safeguard the timeless heritage of Indian handloom weaving while expressing it in a contemporary design language. Our journey began in the heritage weaving clusters of southern India, where the rhythmic clack of the handloom has sung for centuries.
          </p>
          <p className={styles.storyParagraph}>
            Every Shloka saree is a collaboration between master weaver and designer. It takes between 15 to 40 days of meticulous manual work to finish a single piece. The threads are dyed in small batches, the gold zari is sourced from certified craftsmen, and the designs are sketched by hand before being translated onto the loom cards.
          </p>

          <div className={styles.storyQuoteBox}>
            <p className={styles.storyQuoteText}>
              "A saree is not merely six yards of silk. It is a canvas of memories, a record of time, and a living piece of our cultural history."
            </p>
            <span className={styles.storyQuoteAuthor}>— Lead Designer, Atelier Shloka</span>
          </div>

          <h2 className={styles.storySectionTitle}>Chapter II: Hand-Woven Preservation</h2>
          <p className={styles.storyParagraph}>
            In an era of rapid fashion and machine-made duplicates, Shloka stands for slow, conscious curation. We support over 120 traditional weaving families across Tamil Nadu, Uttar Pradesh, and Andhra Pradesh, ensuring fair wages, healthy working conditions, and the preservation of rare techniques like the Korvai border and Kadwa motifs.
          </p>
        </div>
      </div>
    </div>
  );
}

export function CraftPage() {
  const craftSteps = [
    {
      num: '01',
      title: 'Zari Curation',
      desc: 'We select genuine 24-karat gold-plated silver thread (zari), sourced from certified artisans, ensuring the border retains its rich antique patina for generations.'
    },
    {
      num: '02',
      title: 'Warp & Weft Alignment',
      desc: 'The mulberry silk threads are spun and loaded onto the loom. The alignment is calculated to micrometer accuracy to ensure a fluid drape and flawless weave.'
    },
    {
      num: '03',
      title: 'Handloom Weaving',
      desc: 'Using the traditional shuttle method, the weaver passes the weft thread manually. A single weaver finishes between 2 to 4 inches of intricate brocade daily.'
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <BloomingLotusIcon width={24} height={16} stroke="#A98455" />
        <span className={styles.eyebrow}>THE METICULOUS ART</span>
        <h1 className={styles.mainTitle}>THE CRAFTSMANSHIP</h1>
        <p className={styles.subtitle}>Understanding the intricate handloom process behind every weave.</p>
      </header>

      <div className={styles.craftDetailLayout}>
        <div className={styles.craftLeftColumn}>
          <div className={styles.craftCardBig}>
            <span className={styles.craftBigLabel}>THE WARP AND WEFT</span>
            <h2 className={styles.craftBigTitle}>A Symphony of Cotton, Silk & Pure Gold</h2>
            <p className={styles.craftBigDesc}>
              The texture of a Shloka saree is its fingerprint. By combining pure South Indian mulberry silks with lightweight organic cottons, we create sarees that offer the structure of heritage drapes alongside the breezy weightlessness needed for contemporary wear.
            </p>
            <div className={styles.craftMotifSeparator}>
              <span className={styles.motifLine} />
              <span className={styles.motifStar}>✦</span>
              <span className={styles.motifLine} />
            </div>
            <div className={styles.craftMiniGrid}>
              <div className={styles.craftMiniItem}>
                <img src={padmaBlouse} alt="Silk dye" className={styles.craftMiniImg} />
                <span>Vegetable Dye Baths</span>
              </div>
              <div className={styles.craftMiniItem}>
                <img src={padmaPotli} alt="Gold thread" className={styles.craftMiniImg} />
                <span>24K Gold Threading</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.craftRightColumn}>
          <h3 className={styles.craftStepsHeading}>THE THREE PILLARS</h3>
          <div className={styles.craftStepsList}>
            {craftSteps.map((step) => (
              <div key={step.num} className={styles.craftStepCard}>
                <span className={styles.stepNum}>{step.num}</span>
                <div className={styles.stepInfo}>
                  <h4 className={styles.stepTitle}>{step.title}</h4>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function JournalPage() {
  const articles = [
    {
      title: 'THE AUTUMN SILK EDIT',
      category: 'Atelier News',
      desc: 'A look into our upcoming palette: deep vermilions, mustard yellow, and sage greens inspired by South Indian temples.',
      date: 'Aug 24, 2026'
    },
    {
      title: 'PRESERVING THE KORVAI WEAVE',
      category: 'Weaving Heritage',
      desc: 'Why the interlocking border technique requires two weavers working in tandem, and why it is disappearing.',
      date: 'Aug 18, 2026'
    },
    {
      title: 'HOW TO CARE FOR PURE ZARI',
      category: 'Fabric Care',
      desc: 'Simple tips to store your bridal silks, preventing oxidation and keeping the gold thread glittering for generations.',
      date: 'Aug 09, 2026'
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <BloomingLotusIcon width={24} height={16} stroke="#A98455" />
        <span className={styles.eyebrow}>EDITORIAL ESSAYS</span>
        <h1 className={styles.mainTitle}>THE SHLOKA JOURNAL</h1>
        <p className={styles.subtitle}>Articles on style, craft, and the preservation of traditional weaving.</p>
      </header>

      <div className={styles.journalGrid}>
        {articles.map((art, idx) => (
          <article key={art.title} className={styles.journalCard} style={{ animationDelay: `${idx * 0.15}s` }}>
            <span className={styles.journalMeta}>{art.category} • {art.date}</span>
            <h3 className={styles.journalTitle}>{art.title}</h3>
            <p className={styles.journalDesc}>{art.desc}</p>
            <a href="#read" className={styles.readMoreLink} onClick={(e) => e.preventDefault()}>Read Essay →</a>
          </article>
        ))}
      </div>
    </div>
  );
}

export function AboutPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <BloomingLotusIcon width={24} height={16} stroke="#A98455" />
        <span className={styles.eyebrow}>OUR PHILOSOPHY</span>
        <h1 className={styles.mainTitle}>ABOUT SHLOKA</h1>
        <p className={styles.subtitle}>Redefining contemporary luxury through Indian handlooms.</p>
      </header>

      <div className={styles.aboutLayout}>
        <div className={styles.aboutCard}>
          <h2 className={styles.aboutSectionHeading}>DESIGN VISION</h2>
          <p className={styles.aboutText}>
            Shloka was established to create high-end couture that honors the past while styling the future. We believe that true luxury lies in detail—the precision of a handwoven motif, the weight of pure silk, and the ethical relationship with the artisans who breathe life into every design.
          </p>
        </div>

        <div className={styles.aboutCard}>
          <h2 className={styles.aboutSectionHeading}>THE WEAVER RELATIONSHIP</h2>
          <p className={styles.aboutText}>
            We operate on a direct-to-artisan model. By bypassing middlemen, we guarantee that over 70% of the value of each saree goes directly to the weaving clusters. This ensures sustainable income for the artisans and allows us to maintain strict quality standards at every step of production.
          </p>
        </div>
      </div>
    </div>
  );
}

export function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormState({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <BloomingLotusIcon width={24} height={16} stroke="#A98455" />
        <span className={styles.eyebrow}>GET IN TOUCH</span>
        <h1 className={styles.mainTitle}>CONTACT THE ATELIER</h1>
        <p className={styles.subtitle}>Visit our boutiques or request a private couture appointment.</p>
      </header>

      <div className={styles.contactLayout}>
        <div className={styles.contactFormCol}>
          <h3 className={styles.contactColHeading}>SEND A MESSAGE</h3>
          {submitted ? (
            <div className={styles.successMessage}>
              <span className={styles.successMotif}>✦</span>
              <p>Thank you. Our atelier representatives will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>NAME</label>
                <input
                  type="text"
                  required
                  className={styles.formInput}
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  className={styles.formInput}
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>MESSAGE</label>
                <textarea
                  rows="4"
                  required
                  className={styles.formTextarea}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                />
              </div>
              <button type="submit" className={styles.submitBtn}>
                SUBMIT INQUIRY
              </button>
            </form>
          )}
        </div>

        <div className={styles.contactDetailsCol}>
          <h3 className={styles.contactColHeading}>OUR BOUTIQUES</h3>
          <div className={styles.boutiqueList}>
            <div className={styles.boutiqueItem}>
              <h4 className={styles.boutiqueName}>COIMBATORE FLAGSHIP</h4>
              <p className={styles.boutiqueAddress}>
                The Heritage House, 82 Race Course Road,<br />
                Coimbatore, Tamil Nadu — 641018
              </p>
              <p className={styles.boutiqueContact}>atelier.cbe@shloka.com • +91 422 4567089</p>
            </div>
            <div className={styles.boutiqueItem}>
              <h4 className={styles.boutiqueName}>CHENNAI ATELIER</h4>
              <p className={styles.boutiqueAddress}>
                Khader Nawaz Khan Road, Nungambakkam,<br />
                Chennai, Tamil Nadu — 600006
              </p>
              <p className={styles.boutiqueContact}>atelier.mds@shloka.com • +91 44 28334091</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NewArrivalsPage() {
  const [filter, setFilter] = useState('ALL');

  const newSarees = [
    {
      id: 'saree-1',
      title: 'THE CRIMSON PURE ZARI KANCHI',
      category: 'KANCHIPURAM',
      desc: 'Heritage crimson silk saree featuring certified 24k gold pure zari Korvai borders.',
      price: '₹84,500',
      rawPrice: 84500,
      image: saree1Img,
    },
    {
      id: 'saree-2',
      title: 'THE SAGE FLOWERING MUSHROO',
      category: 'SILK',
      desc: 'Handwoven Mushroo silk with gold and silver zari floral buttis across the body.',
      price: '₹62,000',
      rawPrice: 62000,
      image: saree2Img,
    },
    {
      id: 'saree-3',
      title: 'THE MAROON STRUCTURAL SHENGOTTAI',
      category: 'SILK',
      desc: 'Shengottai checks woven with a light-weight silk-cotton blend for summer comfort.',
      price: '₹34,500',
      rawPrice: 34500,
      image: saree3Img,
    },
    {
      id: 'saree-4',
      title: 'THE CLOUD BLUE MEGH ORGANZA',
      category: 'ORGANZA',
      desc: 'Translucent cloud-blue organza with fine hand-spun zari borders and floral margins.',
      price: '₹48,000',
      rawPrice: 48000,
      image: saree4Img,
    }
  ];

  // Filter items
  const filteredSarees = filter === 'ALL' ? newSarees : newSarees.filter(s => s.category === filter);

  const handleAddToBag = (saree) => {
    const cartItem = {
      id: saree.id,
      name: saree.title,
      price: saree.rawPrice,
      image: saree.image,
      quantity: 1
    };
    import('../../utils/cart').then(({ addToCart }) => {
      addToCart(cartItem);
      window.dispatchEvent(new Event('shloka_cart_updated'));
    });
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <BloomingLotusIcon width={24} height={16} stroke="#A98455" />
        <span className={styles.eyebrow}>LATEST WEAVES</span>
        <h1 className={styles.mainTitle}>NEW ARRIVALS</h1>
        <p className={styles.subtitle}>Explore the newest additions to the Shloka heritage loom.</p>
      </header>

      {/* Interactive Category Filter Row */}
      <div className={styles.filterRow}>
        {['ALL', 'SILK', 'KANCHIPURAM', 'ORGANZA'].map((cat) => (
          <button
            key={cat}
            type="button"
            className={`${styles.filterChip} ${filter === cat ? styles.filterChipActive : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.newArrivalsGrid}>
        {filteredSarees.map((saree) => (
          <div key={saree.id} className={styles.arrivalCard}>
            <div className={styles.imageFrame}>
              <img src={saree.image} alt={saree.title} className={styles.arrivalImg} />
            </div>
            <div className={styles.arrivalInfo}>
              <span className={styles.arrivalCategory}>{saree.category}</span>
              <h3 className={styles.arrivalTitle}>{saree.title}</h3>
              <p className={styles.arrivalDesc}>{saree.desc}</p>
              <div className={styles.arrivalFooter}>
                <span className={styles.arrivalPrice}>{saree.price}</span>
                <button
                  type="button"
                  className={styles.addBtn}
                  onClick={() => handleAddToBag(saree)}
                >
                  ADD TO BAG
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
