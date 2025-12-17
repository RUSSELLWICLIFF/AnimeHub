import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getAnimeById, getAnimeSeasons } from "../data/animeData";
import StatusSelector from "../components/StatusSelector";

function AnimeDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const anime = getAnimeById(id);

    if (!anime) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1a3e] to-[#0d0d2d] text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-[#ff4d4d] mb-4">Anime Not Found</h1>
                    <Link to="/" className="text-gray-400 hover:text-[#ff4d4d] transition-colors">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const relatedSeasons = getAnimeSeasons(anime.title).filter(a => a.id !== anime.id);

    return (
        <div className="relative bg-gradient-to-br from-[#0a0e27] via-[#1a1a3e] to-[#0d0d2d] text-white min-h-screen overflow-x-hidden">
            {/* Background Animation */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute w-96 h-96 bg-red-500 rounded-full filter blur-3xl opacity-10 top-[10%] right-[10%] animate-float"></div>
                <div className="absolute w-72 h-72 bg-red-700 rounded-full filter blur-3xl opacity-10 bottom-[20%] left-[5%] animate-float" style={{ animationDelay: "3s" }}></div>
                <div className="absolute w-80 h-80 bg-red-400 rounded-full filter blur-3xl opacity-10 top-[50%] right-[5%] animate-float" style={{ animationDelay: "6s" }}></div>
            </div>

            {/* Navbar */}
            <nav className="sticky top-0 bg-[#0f0f1e]/95 backdrop-blur-2xl border-b border-[#ff4d4d]/15 z-50 shadow-lg">
                <div className="max-w-6xl mx-auto px-5 py-5 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 text-2xl font-bold hover:opacity-80 transition-opacity">
                        <span className="text-4xl animate-bounce">🎌</span>
                        <span className="text-[#ff4d4d] drop-shadow-lg">AnimeHub</span>
                    </Link>
                    <button
                        onClick={() => navigate(-1)}
                        className="border border-[#ff4d4d]/50 text-[#ff4d4d] px-4 py-2 rounded-lg hover:bg-[#ff4d4d]/10 transition-all whitespace-nowrap flex items-center gap-2"
                    >
                        <span>←</span> Back
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-5 py-16 relative z-10">
                {/* Hero Section */}
                <div className="bg-white/5 backdrop-blur-md border border-[#ff4d4d]/15 rounded-3xl p-10 mb-10 hover:border-[#ff4d4d]/40 transition-all">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Anime Image/Icon */}
                        <div className="flex flex-col items-center justify-center">
                            {anime.thumbnail ? (
                                <img src={anime.thumbnail} alt={anime.title} className="w-full max-w-xs rounded-2xl mb-5 shadow-lg shadow-[#ff4d4d]/30" />
                            ) : (
                                <div className="text-9xl mb-5 animate-float">{anime.image}</div>
                            )}
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-3xl">⭐</span>
                                <span className="text-4xl font-bold text-[#ff4d4d]">{anime.rating}</span>
                            </div>
                            <div className="text-gray-400 text-sm">Rating</div>
                        </div>

                        {/* Anime Details */}
                        <div className="md:col-span-2">
                            <h1 className="text-5xl font-black mb-3 bg-gradient-to-r from-[#ff4d4d] to-[#ffaaaa] bg-clip-text text-transparent">
                                {anime.title}
                                {anime.season && <span className="text-3xl ml-3">Season {anime.season}</span>}
                            </h1>

                            <div className="flex flex-wrap gap-3 mb-6">
                                <span className="bg-[#ff4d4d]/20 text-[#ff8888] px-4 py-2 rounded-lg text-sm font-semibold border border-[#ff4d4d]/30">
                                    {anime.genre}
                                </span>
                                <span className="bg-white/10 text-gray-300 px-4 py-2 rounded-lg text-sm font-semibold">
                                    {anime.episodes} Episodes
                                </span>
                                {anime.year && (
                                    <span className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-lg text-sm font-semibold border border-blue-500/30">
                                        📅 {anime.year}
                                    </span>
                                )}
                                {anime.studio && (
                                    <span className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-lg text-sm font-semibold border border-purple-500/30">
                                        🎨 {anime.studio}
                                    </span>
                                )}
                                {anime.status && (
                                    <span className="bg-green-500/20 text-green-300 px-4 py-2 rounded-lg text-sm font-semibold border border-green-500/30">
                                        ✓ {anime.status}
                                    </span>
                                )}
                            </div>

                            <p className="text-gray-300 text-base leading-relaxed mb-6">
                                {anime.description}
                            </p>

                            <div className="flex gap-4 flex-wrap relative">
                                <StatusSelector animeId={anime.id} totalEpisodes={anime.episodes} className="flex-1 min-w-[200px]" />
                                <button className="px-8 py-4 rounded-lg font-bold uppercase tracking-wider bg-white/5 text-[#ff4d4d] border border-[#ff4d4d]/30 hover:bg-[#ff4d4d]/10 hover:border-[#ff4d4d]/60 transition-all whitespace-nowrap">
                                    + Add to List
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Seasons */}
                {relatedSeasons.length > 0 && (
                    <div className="mb-10">
                        <h2 className="text-3xl font-black mb-6 text-[#ff4d4d] drop-shadow-lg">
                            🎬 Other Seasons
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedSeasons.map((season) => (
                                <Link
                                    key={season.id}
                                    to={`/anime/${season.id}`}
                                    className="bg-white/5 backdrop-blur-md border border-[#ff4d4d]/15 rounded-2xl p-6 text-center hover:border-[#ff4d4d]/40 hover:shadow-lg hover:shadow-[#ff4d4d]/20 hover:-translate-y-2 transition-all"
                                >
                                    {season.thumbnail ? (
                                        <img src={season.thumbnail} alt={season.title} className="w-full h-32 object-cover rounded-xl mb-3" />
                                    ) : (
                                        <div className="text-6xl mb-3 animate-pulse">{season.image}</div>
                                    )}
                                    <h3 className="font-bold mb-2">Season {season.season}</h3>
                                    <div className="flex items-center justify-center gap-2 mb-4">
                                        <span>⭐</span>
                                        <span className="text-[#ff8888] font-bold text-sm">{season.rating}</span>
                                    </div>
                                    <div className="text-gray-400 text-sm mb-3">{season.episodes} Episodes</div>
                                    <div className="w-full bg-gradient-to-r from-[#ff4d4d] to-[#ff1a1a] text-white py-2 rounded-lg font-bold hover:scale-105 transition-transform">
                                        View Details
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white/5 backdrop-blur-md border border-[#ff4d4d]/15 rounded-2xl p-8 text-center hover:border-[#ff4d4d]/40 hover:shadow-lg hover:shadow-[#ff4d4d]/20 transition-all">
                        <div className="text-4xl mb-3">📺</div>
                        <div className="text-2xl font-bold text-[#ff4d4d] mb-2">{anime.episodes}</div>
                        <div className="text-gray-400">Total Episodes</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md border border-[#ff4d4d]/15 rounded-2xl p-8 text-center hover:border-[#ff4d4d]/40 hover:shadow-lg hover:shadow-[#ff4d4d]/20 transition-all">
                        <div className="text-4xl mb-3">🎭</div>
                        <div className="text-2xl font-bold text-[#ff4d4d] mb-2">{anime.genre.split(',')[0]}</div>
                        <div className="text-gray-400">Primary Genre</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md border border-[#ff4d4d]/15 rounded-2xl p-8 text-center hover:border-[#ff4d4d]/40 hover:shadow-lg hover:shadow-[#ff4d4d]/20 transition-all">
                        <div className="text-4xl mb-3">⭐</div>
                        <div className="text-2xl font-bold text-[#ff4d4d] mb-2">{anime.rating}/10</div>
                        <div className="text-gray-400">User Rating</div>
                    </div>
                </div>

                {/* User Reviews Section */}
                {anime.reviews && anime.reviews.length > 0 && (
                    <div className="mb-10">
                        <h2 className="text-3xl font-black mb-6 text-[#ff4d4d] drop-shadow-lg">
                            💬 User Reviews ({anime.reviews.length})
                        </h2>
                        <div className="grid grid-cols-1 gap-6">
                            {anime.reviews.map((review, index) => (
                                <div key={index} className="bg-white/5 backdrop-blur-md border border-[#ff4d4d]/15 rounded-2xl p-6 hover:border-[#ff4d4d]/40 transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-bold text-lg text-[#ff8888]">{review.user}</h3>
                                            <p className="text-gray-400 text-sm">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                        </div>
                                        <div className="flex items-center gap-2 bg-[#ff4d4d]/20 px-4 py-2 rounded-lg border border-[#ff4d4d]/30">
                                            <span className="text-2xl">⭐</span>
                                            <span className="text-2xl font-bold text-[#ff4d4d]">{review.rating}</span>
                                            <span className="text-gray-400">/10</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 leading-relaxed">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="bg-[#0a0a14]/90 backdrop-blur-md border-t border-[#ff4d4d]/15 relative z-10 mt-10">
                <div className="max-w-6xl mx-auto px-5 py-10">
                    <div className="border-t border-[#ff4d4d]/10 pt-8 text-center text-gray-500 text-sm">
                        &copy; 2025 AnimeHub. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default AnimeDetailPage;
