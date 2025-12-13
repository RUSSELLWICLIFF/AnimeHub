import React, { useState } from "react";
import { Link } from "react-router-dom";
import { animeData } from "../data/animeData";

function HomePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // Filter anime based on search query
    const searchResults = searchQuery.trim()
        ? animeData.filter(anime =>
            anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            anime.genre.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 5) // Limit to 5 suggestions
        : [];

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setShowSuggestions(true);
    };

    const handleSuggestionClick = (e) => {
        // Don't prevent default - let the Link navigate
        setShowSuggestions(false);
        setSearchQuery("");
    };

    const handleSearchBlur = () => {
        // Delay hiding to allow click to register
        setTimeout(() => {
            setShowSuggestions(false);
        }, 200);
    };

    const handleSearchFocus = () => {
        if (searchQuery.trim()) {
            setShowSuggestions(true);
        }
    };

    const scrollToAbout = () => {
        const footer = document.querySelector('footer');
        if (footer) {
            footer.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Pagination logic for Complete Collection
    const allAnime = animeData.slice(8);
    const totalPages = Math.ceil(allAnime.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentAnime = allAnime.slice(startIndex, endIndex);

    return (
        <div className="relative bg-black text-white min-h-screen overflow-x-hidden">
            {/* Premium Gradient Background */}
            <div className="fixed inset-0 bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0f0520] z-0"></div>

            {/* Animated Mesh Overlay */}
            <div className="fixed inset-0 opacity-30 z-0" style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255, 77, 77, 0.15) 0%, transparent 50%),
                                 radial-gradient(circle at 80% 80%, rgba(138, 43, 226, 0.15) 0%, transparent 50%),
                                 radial-gradient(circle at 40% 20%, rgba(255, 0, 102, 0.1) 0%, transparent 50%)`
            }}></div>

            {/* Floating Orbs Animation */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {/* Large red orb */}
                <div className="absolute w-[500px] h-[500px] bg-gradient-to-br from-red-600/20 to-pink-600/10 rounded-full filter blur-3xl top-[5%] right-[10%] animate-float"></div>

                {/* Purple orb */}
                <div className="absolute w-[400px] h-[400px] bg-gradient-to-br from-purple-600/15 to-red-600/10 rounded-full filter blur-3xl bottom-[15%] left-[5%] animate-float" style={{ animationDelay: "3s" }}></div>

                {/* Pink accent orb */}
                <div className="absolute w-[350px] h-[350px] bg-gradient-to-br from-pink-500/15 to-red-500/10 rounded-full filter blur-3xl top-[45%] right-[8%] animate-float" style={{ animationDelay: "6s" }}></div>

                {/* Small accent orbs */}
                <div className="absolute w-[200px] h-[200px] bg-red-500/10 rounded-full filter blur-2xl top-[70%] left-[40%] animate-float" style={{ animationDelay: "2s" }}></div>
                <div className="absolute w-[250px] h-[250px] bg-purple-500/10 rounded-full filter blur-2xl top-[30%] left-[15%] animate-float" style={{ animationDelay: "4s" }}></div>
            </div>

            {/* Navbar with Curved Search */}
            <nav className="sticky top-0 bg-[#0f0f1e]/95 backdrop-blur-2xl border-b border-[#ff4d4d]/15 z-50 shadow-lg">
                <div className="max-w-6xl mx-auto px-5 py-4">
                    <div className="flex justify-between items-center gap-4">
                        <div className="flex items-center gap-2 text-2xl font-bold">
                            <span className="text-4xl animate-bounce">🎌</span>
                            <span className="text-[#ff4d4d] drop-shadow-lg">AnimeHub</span>
                        </div>

                        <div className="flex items-center gap-6 flex-1 justify-end">
                            {/* Small Curved Search Bar */}
                            <div className="relative w-64">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onFocus={handleSearchFocus}
                                    onBlur={handleSearchBlur}
                                    placeholder="Search anime..."
                                    className="w-full px-5 py-2 rounded-full bg-white/10 border border-[#ff4d4d]/30 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-[#ff4d4d] focus:bg-white/15 transition-all"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg">🔍</span>

                                {/* Search Suggestions Dropdown */}
                                {showSuggestions && searchResults.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a3e] border border-[#ff4d4d]/30 rounded-2xl shadow-lg shadow-[#ff4d4d]/20 overflow-hidden z-50 max-h-96 overflow-y-auto">
                                        {searchResults.map((anime) => (
                                            <Link
                                                key={anime.id}
                                                to={`/anime/${anime.id}`}
                                                onMouseDown={(e) => {
                                                    // Use onMouseDown instead of onClick to fire before onBlur
                                                    e.preventDefault();
                                                    handleSuggestionClick();
                                                    // Navigate programmatically
                                                    window.location.href = `/anime/${anime.id}`;
                                                }}
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-[#ff4d4d]/20 transition-all border-b border-[#ff4d4d]/10 last:border-b-0 cursor-pointer"
                                            >
                                                {anime.thumbnail ? (
                                                    <img src={anime.thumbnail} alt={anime.title} className="w-10 h-10 object-cover rounded" />
                                                ) : (
                                                    <span className="text-2xl">{anime.image}</span>
                                                )}
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-white text-sm">
                                                        {anime.title}
                                                        {anime.season && ` Season ${anime.season}`}
                                                    </h4>
                                                    <p className="text-xs text-gray-400">{anime.genre}</p>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-sm">⭐</span>
                                                    <span className="text-[#ff8888] font-bold text-sm">{anime.rating}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-6 items-center text-sm">
                                <a href="#trending" className="text-gray-300 hover:text-[#ff4d4d] transition-colors whitespace-nowrap">Trending</a>
                                <a href="#popular" className="text-gray-300 hover:text-[#ff4d4d] transition-colors whitespace-nowrap">Popular</a>
                                <button onClick={scrollToAbout} className="text-gray-300 hover:text-[#ff4d4d] transition-colors whitespace-nowrap">About</button>
                                <Link to="/login" className="border border-[#ff4d4d]/50 text-[#ff4d4d] px-4 py-2 rounded-lg hover:bg-[#ff4d4d]/10 transition-all whitespace-nowrap">
                                    Login
                                </Link>
                                <Link to="/signup" className="bg-gradient-to-r from-[#ff4d4d] to-[#ff1a1a] text-white px-4 py-2 rounded-lg shadow-lg shadow-[#ff4d4d]/40 hover:shadow-[#ff4d4d]/60 hover:-translate-y-0.5 transition-all whitespace-nowrap">
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-5 py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="animate-slideInLeft">
                        <h1 className="text-5xl md:text-6xl font-black mb-5 bg-gradient-to-r from-[#ff4d4d] to-[#ffaaaa] bg-clip-text text-transparent">
                            Discover Your Next Favorite Anime
                        </h1>
                        <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                            Explore thousands of anime series and find your perfect match
                        </p>
                        <div className="flex gap-5 flex-col sm:flex-row">
                            <Link to="/signup" className="px-8 py-3 rounded-lg font-bold uppercase tracking-wider bg-gradient-to-r from-[#ff4d4d] to-[#ff1a1a] text-white shadow-lg shadow-[#ff4d4d]/40 hover:shadow-[#ff4d4d]/60 hover:-translate-y-1 transition-all text-center">
                                Start Watching
                            </Link>
                            <button className="px-8 py-3 rounded-lg font-bold uppercase tracking-wider bg-white/5 text-[#ff4d4d] border border-[#ff4d4d]/30 hover:bg-[#ff4d4d]/10 hover:border-[#ff4d4d]/60 transition-all text-center">
                                Explore Catalog
                            </button>
                        </div>
                    </div>
                    <div className="animate-slideInRight text-center">
                        <div className="text-9xl animate-float">🎬</div>
                    </div>
                </div>
            </section>

            {/* Trending Section */}
            <section id="trending" className="max-w-6xl mx-auto px-5 py-16 relative z-10">
                <div className="mb-10">
                    <h2 className="text-4xl font-black mb-2 text-[#ff4d4d] drop-shadow-lg">🔥 Trending Now</h2>
                    <p className="text-gray-400 text-sm">Most watched this week</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {animeData.slice(0, 4).map((anime, index) => (
                        <div
                            key={anime.id}
                            className="group glass rounded-2xl p-6 text-center hover:border-[#ff4d4d]/60 hover-lift will-change-transform animate-fadeIn overflow-hidden relative"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Gradient Overlay on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#ff4d4d]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

                            <div className="relative z-10">
                                {anime.thumbnail ? (
                                    <div className="relative overflow-hidden rounded-xl mb-3">
                                        <img
                                            src={anime.thumbnail}
                                            alt={anime.title}
                                            className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                ) : (
                                    <div className="text-6xl mb-3 animate-pulse group-hover:scale-110 transition-transform">{anime.image}</div>
                                )}
                                <h3 className="font-bold mb-2 text-white group-hover:text-[#ff8888] transition-colors">
                                    {anime.title}
                                    {anime.season && ` Season ${anime.season}`}
                                </h3>
                                <div className="flex items-center justify-center gap-2 mb-4">
                                    <span className="text-yellow-400">⭐</span>
                                    <span className="text-[#ff8888] font-bold text-lg">{anime.rating}</span>
                                </div>
                                <Link
                                    to={`/anime/${anime.id}`}
                                    className="block w-full bg-gradient-to-r from-[#ff4d4d] to-[#ff1a1a] text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-[#ff4d4d]/50 transform hover:scale-105 transition-all duration-300"
                                >
                                    Watch Now →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Popular Section */}
            <section id="popular" className="max-w-6xl mx-auto px-5 py-16 relative z-10">
                <div className="mb-10">
                    <h2 className="text-4xl font-black mb-2 text-[#ff4d4d] drop-shadow-lg">⭐ Popular Picks</h2>
                    <p className="text-gray-400 text-sm">Fan favorites from all time</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {animeData.slice(4, 8).map((anime, index) => (
                        <div
                            key={anime.id}
                            className="group glass rounded-2xl p-6 text-center hover:border-[#ff4d4d]/60 hover-lift will-change-transform animate-fadeIn overflow-hidden relative"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-[#ff4d4d]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

                            <div className="relative z-10">
                                {anime.thumbnail ? (
                                    <div className="relative overflow-hidden rounded-xl mb-3">
                                        <img
                                            src={anime.thumbnail}
                                            alt={anime.title}
                                            className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                ) : (
                                    <div className="text-6xl mb-3 animate-pulse group-hover:scale-110 transition-transform">{anime.image}</div>
                                )}
                                <h3 className="font-bold mb-2 text-white group-hover:text-[#ff8888] transition-colors">
                                    {anime.title}
                                    {anime.season && ` Season ${anime.season}`}
                                </h3>
                                <div className="flex items-center justify-center gap-2 mb-4">
                                    <span className="text-yellow-400">⭐</span>
                                    <span className="text-[#ff8888] font-bold text-lg">{anime.rating}</span>
                                </div>
                                <Link
                                    to={`/anime/${anime.id}`}
                                    className="block w-full bg-gradient-to-r from-[#ff4d4d] to-[#ff1a1a] text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-[#ff4d4d]/50 transform hover:scale-105 transition-all duration-300"
                                >
                                    Watch Now →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* All Anime Section with Pagination */}
            <section id="all-anime" className="max-w-6xl mx-auto px-5 py-16 relative z-10">
                <div className="mb-10">
                    <h2 className="text-4xl font-black mb-2 text-[#ff4d4d] drop-shadow-lg">📚 Complete Collection</h2>
                    <p className="text-gray-400 text-sm">Browse our entire anime library - Page {currentPage} of {totalPages}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {currentAnime.map((anime) => (
                        <div key={anime.id} className="bg-white/5 backdrop-blur-md border border-[#ff4d4d]/15 rounded-2xl p-6 text-center hover:border-[#ff4d4d]/40 hover:shadow-lg hover:shadow-[#ff4d4d]/20 hover:-translate-y-2 transition-all">
                            {anime.thumbnail ? (
                                <img src={anime.thumbnail} alt={anime.title} className="w-full h-48 object-cover rounded-xl mb-3" />
                            ) : (
                                <div className="text-6xl mb-3 animate-pulse">{anime.image}</div>
                            )}
                            <h3 className="font-bold mb-2 text-sm">
                                {anime.title}
                                {anime.season && ` Season ${anime.season}`}
                            </h3>
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <span>⭐</span>
                                <span className="text-[#ff8888] font-bold text-sm">{anime.rating}</span>
                            </div>
                            <Link to={`/anime/${anime.id}`} className="block w-full bg-gradient-to-r from-[#ff4d4d] to-[#ff1a1a] text-white py-2 rounded-lg font-bold hover:scale-105 transition-transform">
                                Watch Now
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center items-center gap-3 mt-10 flex-wrap">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-6 py-2 rounded-lg font-bold bg-white/5 border border-[#ff4d4d]/30 text-white hover:bg-[#ff4d4d]/20 hover:border-[#ff4d4d]/60 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        ← Previous
                    </button>

                    <div className="flex gap-2 flex-wrap justify-center">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-4 py-2 rounded-lg font-bold transition-all ${currentPage === page
                                    ? 'bg-gradient-to-r from-[#ff4d4d] to-[#ff1a1a] text-white shadow-lg shadow-[#ff4d4d]/40'
                                    : 'bg-white/5 border border-[#ff4d4d]/30 text-white hover:bg-[#ff4d4d]/20 hover:border-[#ff4d4d]/60'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-6 py-2 rounded-lg font-bold bg-white/5 border border-[#ff4d4d]/30 text-white hover:bg-[#ff4d4d]/20 hover:border-[#ff4d4d]/60 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        Next →
                    </button>
                </div>
            </section>

            {/* Stats Section */}
            <section className="max-w-6xl mx-auto px-5 py-16 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="bg-white/5 backdrop-blur-md border border-[#ff4d4d]/15 rounded-2xl p-10 text-center hover:border-[#ff4d4d]/40 hover:shadow-lg hover:shadow-[#ff4d4d]/20 hover:-translate-y-2 transition-all">
                        <div className="text-4xl font-black text-[#ff4d4d] mb-2">76+</div>
                        <div className="text-gray-400">Anime Series</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md border border-[#ff4d4d]/15 rounded-2xl p-10 text-center hover:border-[#ff4d4d]/40 hover:shadow-lg hover:shadow-[#ff4d4d]/20 hover:-translate-y-2 transition-all">
                        <div className="text-4xl font-black text-[#ff4d4d] mb-2">2M+</div>
                        <div className="text-gray-400">Active Users</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md border border-[#ff4d4d]/15 rounded-2xl p-10 text-center hover:border-[#ff4d4d]/40 hover:shadow-lg hover:shadow-[#ff4d4d]/20 hover:-translate-y-2 transition-all">
                        <div className="text-4xl font-black text-[#ff4d4d] mb-2">6</div>
                        <div className="text-gray-400">Watch Status</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md border border-[#ff4d4d]/15 rounded-2xl p-10 text-center hover:border-[#ff4d4d]/40 hover:shadow-lg hover:shadow-[#ff4d4d]/20 hover:-translate-y-2 transition-all">
                        <div className="text-4xl font-black text-[#ff4d4d] mb-2">100%</div>
                        <div className="text-gray-400">Free to Use</div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0a0a14]/90 backdrop-blur-md border-t border-[#ff4d4d]/15 relative z-10 mt-10">
                <div className="max-w-6xl mx-auto px-5 py-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
                        <div>
                            <h4 className="text-[#ff4d4d] font-bold mb-3">AnimeHub</h4>
                            <p className="text-gray-400 text-sm">Your ultimate anime tracking platform</p>
                        </div>
                        <div>
                            <h4 className="text-[#ff4d4d] font-bold mb-3">Quick Links</h4>
                            <a href="#trending" className="block text-gray-400 text-sm hover:text-[#ff8888] transition-colors mb-2">Trending</a>
                            <a href="#popular" className="block text-gray-400 text-sm hover:text-[#ff8888] transition-colors mb-2">Popular</a>
                            <a href="#about" className="block text-gray-400 text-sm hover:text-[#ff8888] transition-colors">About Us</a>
                        </div>
                        <div>
                            <h4 className="text-[#ff4d4d] font-bold mb-3">Legal</h4>
                            <a href="#privacy" className="block text-gray-400 text-sm hover:text-[#ff8888] transition-colors mb-2">Privacy Policy</a>
                            <a href="#terms" className="block text-gray-400 text-sm hover:text-[#ff8888] transition-colors">Terms of Service</a>
                        </div>
                    </div>
                    <div className="border-t border-[#ff4d4d]/10 pt-8 text-center text-gray-500 text-sm">
                        &copy; 2025 AnimeHub. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default HomePage;
