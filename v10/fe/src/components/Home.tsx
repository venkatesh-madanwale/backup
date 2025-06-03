const Home: React.FC = () => {
    return (
        <div>
            <img
                src="../assets/banner2.jpg" // Replace with actual banner
                alt="About Us"
                style={{
                    marginTop: '40px',
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                }}
            />
            <h1>Welcome to Our Store</h1>
            <p>Discover our range of products.</p>
        </div>
    );
}

export default Home;