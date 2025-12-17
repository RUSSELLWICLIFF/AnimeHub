import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { animeData } from "../data/animeData";

function HomePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedLetter, setSelectedLetter] = useState("All");
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

    // Update time every second for live clock
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Pagination logic for Complete Collection with alphabet filter
    const handleLetterClick = (letter) => {
        setSelectedLetter(letter);
        setCurrentPage(1); // Reset to first page when filter changes
        // Scroll to complete collection section
        const section = document.getElementById('complete-collection');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Filter anime based on selected letter
    let filteredAnime = animeData.slice(8); // Skip first 8 (trending/popular)

    if (selectedLetter !== "All") {
        if (selectedLetter === "#") {
            // Filter special characters
            filteredAnime = filteredAnime.filter(anime =>
                !anime.title[0].match(/[A-Za-z0-9]/)
            );
        } else if (selectedLetter === "0-9") {
            // Filter numbers
            filteredAnime = filteredAnime.filter(anime =>
                anime.title[0].match(/[0-9]/)
            );
        } else {
            // Filter by specific letter
            filteredAnime = filteredAnime.filter(anime =>
                anime.title[0].toUpperCase() === selectedLetter
            );
        }
    }

    const allAnime = filteredAnime;
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

            {/* Sidebar Navigation */}
            <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                {/* Overlay */}
                <div
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                ></div>

                {/* Sidebar Menu */}
                <div className={`absolute left-0 top-0 h-full w-80 bg-[#1e1e38] shadow-2xl transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex flex-col h-full">
                        {/* Close Menu Button */}
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="flex items-center gap-2 p-6 text-white hover:text-[#ff4d4d] transition-colors border-b border-white/10"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="font-semibold">Close menu</span>
                        </button>

                        {/* Community Button */}
                        <div className="px-4 pt-6 pb-4">
                            <button className="w-full flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/40 to-purple-800/40 text-white font-semibold hover:from-purple-600/60 hover:to-purple-800/60 transition-all">
                                <span className="text-xl">💬</span>
                                <span>Community</span>
                            </button>
                        </div>

                        {/* Navigation Menu Items */}
                        <nav className="flex-1 overflow-y-auto px-4">
                            <ul className="space-y-1">
                                <li>
                                    <Link
                                        to="/"
                                        onClick={() => setSidebarOpen(false)}
                                        className="block px-6 py-3 text-white font-semibold hover:bg-white/5 rounded-lg transition-all"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="#subbed"
                                        onClick={() => setSidebarOpen(false)}
                                        className="block px-6 py-3 text-white font-semibold hover:bg-white/5 rounded-lg transition-all"
                                    >
                                        Subbed Anime
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#dubbed"
                                        onClick={() => setSidebarOpen(false)}
                                        className="block px-6 py-3 text-white font-semibold hover:bg-white/5 rounded-lg transition-all"
                                    >
                                        Dubbed Anime
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#popular"
                                        onClick={() => setSidebarOpen(false)}
                                        className="block px-6 py-3 text-white font-semibold hover:bg-white/5 rounded-lg transition-all"
                                    >
                                        Most Popular
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#movies"
                                        onClick={() => setSidebarOpen(false)}
                                        className="block px-6 py-3 text-white font-semibold hover:bg-white/5 rounded-lg transition-all"
                                    >
                                        Movies
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#tv-series"
                                        onClick={() => setSidebarOpen(false)}
                                        className="block px-6 py-3 text-white font-semibold hover:bg-white/5 rounded-lg transition-all"
                                    >
                                        TV Series
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#ovas"
                                        onClick={() => setSidebarOpen(false)}
                                        className="block px-6 py-3 text-white font-semibold hover:bg-white/5 rounded-lg transition-all"
                                    >
                                        OVAs
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#onas"
                                        onClick={() => setSidebarOpen(false)}
                                        className="block px-6 py-3 text-white font-semibold hover:bg-white/5 rounded-lg transition-all"
                                    >
                                        ONAs
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#specials"
                                        onClick={() => setSidebarOpen(false)}
                                        className="block px-6 py-3 text-white font-semibold hover:bg-white/5 rounded-lg transition-all"
                                    >
                                        Specials
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#events"
                                        onClick={() => setSidebarOpen(false)}
                                        className="block px-6 py-3 text-white font-semibold hover:bg-white/5 rounded-lg transition-all"
                                    >
                                        Events
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Navbar with Curved Search */}
            <nav className="sticky top-0 bg-[#0f0f1e]/95 backdrop-blur-2xl border-b border-[#ff4d4d]/15 z-50 shadow-lg">
                <div className="max-w-6xl mx-auto px-5 py-4">
                    <div className="flex justify-between items-center gap-4">
                        {/* Hamburger Menu Button */}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="text-white hover:text-[#ff4d4d] transition-colors p-2"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

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

                            <div className="flex gap-3 items-center text-sm">
                                <a href="#trending" className="bg-white/5 border border-[#ff4d4d]/30 text-gray-300 hover:text-[#ff4d4d] hover:bg-[#ff4d4d]/10 hover:border-[#ff4d4d]/60 px-4 py-2 rounded-lg transition-all whitespace-nowrap">Trending</a>
                                <a href="#popular" className="bg-white/5 border border-[#ff4d4d]/30 text-gray-300 hover:text-[#ff4d4d] hover:bg-[#ff4d4d]/10 hover:border-[#ff4d4d]/60 px-4 py-2 rounded-lg transition-all whitespace-nowrap">Popular</a>
                                <button onClick={scrollToAbout} className="bg-white/5 border border-[#ff4d4d]/30 text-gray-300 hover:text-[#ff4d4d] hover:bg-[#ff4d4d]/10 hover:border-[#ff4d4d]/60 px-4 py-2 rounded-lg transition-all whitespace-nowrap">About</button>
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
            <section className="max-w-6xl mx-auto px-5 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="animate-slideInLeft">
                        <h1 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-[#ff4d4d] to-[#ffaaaa] bg-clip-text text-transparent">
                            Discover and fall in love with anime.
                        </h1>
                        <div className="flex gap-5 flex-col sm:flex-row">
                            <Link to="/signup" className="px-8 py-3 rounded-lg font-bold uppercase tracking-wider bg-gradient-to-r from-[#ff4d4d] to-[#ff1a1a] text-white shadow-lg shadow-[#ff4d4d]/40 hover:shadow-[#ff4d4d]/60 hover:-translate-y-1 transition-all text-center">
                                Start Watching
                            </Link>
                            <button className="px-8 py-3 rounded-lg font-bold uppercase tracking-wider bg-white/5 text-[#ff4d4d] border border-[#ff4d4d]/30 hover:bg-[#ff4d4d]/10 hover:border-[#ff4d4d]/60 transition-all text-center">
                                Explore Catalog
                            </button>
                        </div>

                        {/* Social Share Buttons */}
                        <div className="mt-6">
                            <p className="text-gray-400 text-sm mb-4">Share with friends:</p>
                            <div className="flex gap-4 items-center">
                                <a
                                    href="https://discord.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                                    title="Discord"
                                >
                                    <span className="text-2xl">💬</span>
                                </a>
                                <a
                                    href="https://t.me/share/url?url=https://animehub.com&text=Check out AnimeHub - Discover your next favorite anime!"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                                    title="Telegram"
                                >
                                    <span className="text-2xl">✈️</span>
                                </a>
                                <a
                                    href="https://reddit.com/submit?url=https://animehub.com&title=Check out AnimeHub - Discover your next favorite anime!"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-[#FF4500] flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                                    title="Reddit"
                                >
                                    <span className="text-2xl">🤖</span>
                                </a>
                                <a
                                    href="https://twitter.com/intent/tweet?url=https://animehub.com&text=Check out AnimeHub - Discover your next favorite anime!"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-[#1DA1F2] flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                                    title="Twitter"
                                >
                                    <span className="text-2xl">🐦</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="animate-slideInRight">
                        <img
                            src="/images/hero-banner.jpg"
                            alt="Anime Characters"
                            className="w-full h-auto rounded-2xl shadow-2xl opacity-70"
                        />
                    </div>
                </div>
            </section>

            {/* Trending Section */}
            <section id="trending" className="max-w-6xl mx-auto px-5 py-14 relative z-10">
                <div className="mb-10">
                    <h2 className="text-4xl font-black mb-2 text-[#ff4d4d] drop-shadow-lg">🔥 Trending Now</h2>
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
                                <div className="flex flex-col gap-2">
                                    <Link
                                        to={`/anime/${anime.id}`}
                                        className="block w-full bg-gradient-to-r from-[#ff4d4d] to-[#ff1a1a] text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-[#ff4d4d]/50 transform hover:scale-105 transition-all duration-300"
                                    >
                                        Watch Now →
                                    </Link>
                                    <button className="w-full bg-white/5 text-[#ff4d4d] border border-[#ff4d4d]/30 py-2 rounded-lg font-semibold hover:bg-[#ff4d4d]/10 hover:border-[#ff4d4d]/60 transition-all text-sm">
                                        + Add to List
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Popular Section */}
            <section id="popular" className="max-w-6xl mx-auto px-5 py-14 relative z-10">
                <div className="mb-10">
                    <h2 className="text-4xl font-black mb-2 text-[#ff4d4d] drop-shadow-lg">⭐ Popular Picks</h2>
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
                                <div className="flex flex-col gap-2">
                                    <Link
                                        to={`/anime/${anime.id}`}
                                        className="block w-full bg-gradient-to-r from-[#ff4d4d] to-[#ff1a1a] text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-[#ff4d4d]/50 transform hover:scale-105 transition-all duration-300"
                                    >
                                        Watch Now →
                                    </Link>
                                    <button className="w-full bg-white/5 text-[#ff4d4d] border border-[#ff4d4d]/30 py-2 rounded-lg font-semibold hover:bg-[#ff4d4d]/10 hover:border-[#ff4d4d]/60 transition-all text-sm">
                                        + Add to List
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* All Anime Section with Pagination */}
            <section id="complete-collection" className="max-w-6xl mx-auto px-5 py-14 relative z-10">
                <div className="mb-10">
                    <h2 className="text-4xl font-black mb-2 text-[#ff4d4d] drop-shadow-lg">📚 Complete Collection</h2>
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
                            <div className="flex flex-col gap-2">
                                <Link to={`/anime/${anime.id}`} className="block w-full bg-gradient-to-r from-[#ff4d4d] to-[#ff1a1a] text-white py-2 rounded-lg font-bold hover:scale-105 transition-transform">
                                    Watch Now
                                </Link>
                                <button className="w-full bg-white/5 text-[#ff4d4d] border border-[#ff4d4d]/30 py-2 rounded-lg font-semibold hover:bg-[#ff4d4d]/10 hover:border-[#ff4d4d]/60 transition-all text-xs">
                                    + Add to List
                                </button>
                            </div>
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

            {/* Community Comments Section */}
            <section className="max-w-6xl mx-auto px-5 py-14 relative z-10">
                <div className="bg-white/5 backdrop-blur-md border border-[#ff4d4d]/15 rounded-3xl p-10 hover:border-[#ff4d4d]/40 transition-all overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
                        {/* Anime Character Illustration */}
                        <div className="flex justify-center md:justify-start">
                            <div className="relative">
                                {/* Hinata Character Image */}
                                <div className="w-64 h-64 bg-gradient-to-br from-[#ff4d4d]/20 to-purple-600/20 rounded-full flex items-center justify-center border-4 border-[#ff4d4d]/30 overflow-hidden">
                                    <img
                                        src="/images/hinata-character.png"
                                        alt="Hinata Character"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute -top-2 -right-2 w-10 h-10 bg-red-500/30 rounded-full blur-xl"></div>
                                <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-pink-500/30 rounded-full blur-xl"></div>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div className="md:col-span-2">
                            {/* Tab Headers */}
                            <div className="flex gap-4 mb-6">
                                <button className="px-6 py-2 rounded-full bg-gradient-to-r from-[#ff4d4d] to-[#ff1a1a] text-white font-bold text-sm shadow-lg shadow-[#ff4d4d]/40">
                                    Newest Comments
                                </button>
                                <button className="px-6 py-2 rounded-full bg-white/5 border border-[#ff4d4d]/30 text-gray-400 font-bold text-sm hover:bg-[#ff4d4d]/10 hover:text-white transition-all">
                                    Top Comments
                                </button>
                            </div>

                            {/* Comment Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Comment 1 */}
                                <div className="bg-[#1a1a3e] border border-[#ff4d4d]/20 rounded-xl p-4 hover:border-[#ff4d4d]/40 transition-all">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl">
                                            👤
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-sm">admin</p>
                                            <p className="text-gray-400 text-xs">2 months ago</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 text-sm mb-3">check out also 9anime.cl</p>
                                    <div className="flex items-center gap-2 text-[#ff8888] text-xs">
                                        <span>📺</span>
                                        <span>Demon Slayer: Kimetsu no Yaib...</span>
                                    </div>
                                </div>

                                {/* Comment 2 */}
                                <div className="bg-[#1a1a3e] border border-[#ff4d4d]/20 rounded-xl p-4 hover:border-[#ff4d4d]/40 transition-all">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl">
                                            👤
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-sm">admin</p>
                                            <p className="text-gray-400 text-xs">2 months ago</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 text-sm mb-3">hello</p>
                                    <div className="flex items-center gap-2 text-[#ff8888] text-xs">
                                        <span>📺</span>
                                        <span>Ginga e Kickoff!! Episode 1</span>
                                    </div>
                                </div>

                                {/* Comment 3 */}
                                <div className="bg-[#1a1a3e] border border-[#ff4d4d]/20 rounded-xl p-4 hover:border-[#ff4d4d]/40 transition-all">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl">
                                            👤
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-sm">AnimeFan88</p>
                                            <p className="text-gray-400 text-xs">3 months ago</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 text-sm mb-3">This season is amazing!</p>
                                    <div className="flex items-center gap-2 text-[#ff8888] text-xs">
                                        <span>📺</span>
                                        <span>Attack on Titan Season 4</span>
                                    </div>
                                </div>

                                {/* Comment 4 */}
                                <div className="bg-[#1a1a3e] border border-[#ff4d4d]/20 rounded-xl p-4 hover:border-[#ff4d4d]/40 transition-all">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl">
                                            👤
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-sm">OtakuKing</p>
                                            <p className="text-gray-400 text-xs">4 months ago</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 text-sm mb-3">Can't wait for next episode!</p>
                                    <div className="flex items-center gap-2 text-[#ff8888] text-xs">
                                        <span>📺</span>
                                        <span>Jujutsu Kaisen Season 2</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Estimated Schedule Section */}
            <section className="max-w-6xl mx-auto px-5 py-14 relative z-10">
                <div className="bg-white/5 backdrop-blur-md border border-[#ff4d4d]/15 rounded-3xl p-8 hover:border-[#ff4d4d]/40 transition-all">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-black text-white">Estimated Schedule</h2>
                        <div className="bg-white/10 px-4 py-2 rounded-lg text-sm text-gray-300 font-mono">
                            (GMT+05:30) {currentTime.toLocaleString('en-US', {
                                month: '2-digit',
                                day: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: true
                            })}
                        </div>
                    </div>

                    {/* Day Selector */}
                    <div className="relative flex items-center gap-3 mb-6">
                        {/* Left Arrow */}
                        <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Days Scroll Container */}
                        <div className="flex-1 overflow-x-auto">
                            <div className="flex gap-3">
                                {/* Generate days of the week */}
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                                    const date = new Date();
                                    date.setDate(date.getDate() + index);
                                    const isToday = index === 0;

                                    return (
                                        <button
                                            key={day}
                                            className={`flex-shrink-0 rounded-xl px-6 py-3 transition-all ${isToday
                                                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                                                : 'bg-white/5 text-gray-300 hover:bg-white/10'
                                                }`}
                                        >
                                            <div className="text-center">
                                                <div className="font-bold">{day}</div>
                                                <div className="text-sm opacity-80">
                                                    Dec {date.getDate()}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right Arrow */}
                        <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Episodes Display */}
                    <div className="bg-[#1a1a3e] rounded-xl p-6 text-center">
                        <p className="text-gray-400">No episodes found for {new Date().toISOString().split('T')[0]}</p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="max-w-6xl mx-auto px-5 py-14 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="bg-white/5 backdrop-blur-md border border-[#ff4d4d]/15 rounded-2xl p-10 text-center hover:border-[#ff4d4d]/40 hover:shadow-lg hover:shadow-[#ff4d4d]/20 hover:-translate-y-2 transition-all">
                        <div className="text-4xl font-black text-[#ff4d4d] mb-2">69+</div>
                        <div className="text-gray-400">Anime Series</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md border border-[#ff4d4d]/15 rounded-2xl p-10 text-center hover:border-[#ff4d4d]/40 hover:shadow-lg hover:shadow-[#ff4d4d]/20 hover:-translate-y-2 transition-all">
                        <div className="text-4xl font-black text-[#ff4d4d] mb-2">2M+</div>
                        <div className="text-gray-400">Active Users</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md border border-[#ff4d4d]/15 rounded-2xl p-10 text-center hover:border-[#ff4d4d]/40 hover:shadow-lg hover:shadow-[#ff4d4d]/20 hover:-translate-y-2 transition-all">
                        <div className="text-4xl font-black text-[#ff4d4d] mb-2">7</div>
                        <div className="text-gray-400">Watch Status</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md border border-[#ff4d4d]/15 rounded-2xl p-10 text-center hover:border-[#ff4d4d]/40 hover:shadow-lg hover:shadow-[#ff4d4d]/20 hover:-translate-y-2 transition-all">
                        <div className="text-4xl font-black text-[#ff4d4d] mb-2">100%</div>
                        <div className="text-gray-400">Easy to Use</div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0a0a14]/95 backdrop-blur-md border-t border-[#ff4d4d]/15 relative z-10 mt-10">
                <div className="max-w-6xl mx-auto px-5 py-10">
                    {/* Top Section - Branding and Social */}
                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">🎌</span>
                            <h3 className="text-2xl font-black text-white">AnimeHub</h3>
                        </div>
                        <div className="flex gap-3">
                            <a
                                href="https://discord.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center hover:scale-110 transition-transform"
                                title="Discord"
                            >
                                <span className="text-xl">💬</span>
                            </a>
                            <a
                                href="https://t.me"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center hover:scale-110 transition-transform"
                                title="Telegram"
                            >
                                <span className="text-xl">✈️</span>
                            </a>
                            <a
                                href="https://reddit.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-[#FF4500] flex items-center justify-center hover:scale-110 transition-transform"
                                title="Reddit"
                            >
                                <span className="text-xl">🤖</span>
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-[#1DA1F2] flex items-center justify-center hover:scale-110 transition-transform"
                                title="Twitter"
                            >
                                <span className="text-xl">🐦</span>
                            </a>
                        </div>
                    </div>

                    {/* A-Z List Section */}
                    <div className="mb-8">
                        <h4 className="text-xl font-bold text-white mb-2">A-Z LIST</h4>
                        <p className="text-gray-400 text-sm mb-6">Searching anime order by alphabet name A to Z.</p>

                        {/* Alphabet Filter */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => handleLetterClick("All")}
                                className={`px-4 py-2 rounded-lg ${selectedLetter === "All" ? 'bg-[#ff4d4d] text-white' : 'bg-white/10 text-gray-400'} hover:bg-[#ff4d4d] hover:text-white transition-all font-semibold text-sm`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => handleLetterClick("#")}
                                className={`px-4 py-2 rounded-lg ${selectedLetter === "#" ? 'bg-[#ff4d4d] text-white' : 'bg-white/5 text-gray-400'} hover:bg-white/10 hover:text-white transition-all font-semibold text-sm`}
                            >
                                #
                            </button>
                            <button
                                onClick={() => handleLetterClick("0-9")}
                                className={`px-4 py-2 rounded-lg ${selectedLetter === "0-9" ? 'bg-[#ff4d4d] text-white' : 'bg-white/5 text-gray-400'} hover:bg-white/10 hover:text-white transition-all font-semibold text-sm`}
                            >
                                0-9
                            </button>
                            {/* A-Z Buttons */}
                            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
                                <button
                                    key={letter}
                                    onClick={() => handleLetterClick(letter)}
                                    className={`px-4 py-2 rounded-lg ${selectedLetter === letter ? 'bg-[#ff4d4d] text-white' : 'bg-white/5 text-gray-400'} hover:bg-white/10 hover:text-white transition-all font-semibold text-sm`}
                                >
                                    {letter}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="text-center text-gray-500 text-xs mb-6">
                        AnimeHub does not store any files on our server, we only linked to the media which is hosted on 3rd party services.
                    </div>

                    {/* Copyright */}
                    <div className="border-t border-[#ff4d4d]/10 pt-6 text-center text-gray-500 text-sm">
                        &copy; 2025 AnimeHub. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default HomePage;





