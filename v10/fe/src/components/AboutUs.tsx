import React from 'react';

const AboutUs: React.FC = () => {
    return (
        <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Crafted for You. Powered by Purpose.</h2>
        {/* Optional image banner */}
        </div>
        <img
          src="../assets/banner.jpg" // Replace with actual banner
          alt="About Us"
          style={styles.image}
        />
      <div style={styles.container}>

        <p style={styles.subtext}>
          At My Store, we bring together cutting-edge electronics, fashion-forward apparel, 
          and everyday accessories—designed for modern lifestyles and built to last. 
          We believe quality and sustainability go hand in hand, so we source responsibly, 
          reduce waste, and deliver products that make you feel confident, connected, and conscious.
        </p>
        <button style={styles.button}>Learn more →</button>
        </div>

    </section>
  );
};

const styles = {
  section: {
    textAlign: 'center' as const,
    backgroundColor: '#fff',
    padding: '60px 20px',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '32px',
    fontWeight: 600,
    marginBottom: '20px',
    color: '#222',
  },
  subtext: {
    fontSize: '16px',
    color: '#555',
    lineHeight: 1.6,
    marginBottom: '30px',
  },
  button: {
    backgroundColor: '#222',
    color: '#fff',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s ease',
  },
  image: {
    marginTop: '40px',
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
};

export default AboutUs;
