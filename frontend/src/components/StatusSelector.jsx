import React, { useState, useEffect, useRef } from 'react';
import { getAnimeStatus, setAnimeStatus } from '../utils/statusStorage';

const STATUS_OPTIONS = [
    { value: 'watching', label: 'Watching', icon: '📺' },
    { value: 'planned', label: 'Planned', icon: '📋' },
    { value: 'on-hold', label: 'On Hold', icon: '⏸️' },
    { value: 'completed', label: 'Completed', icon: '✅' },
    { value: 'drop', label: 'Drop', icon: '❌' },
    { value: 'rewatching', label: 'Rewatching', icon: '🔄' }
];

function StatusSelector({ animeId, totalEpisodes = 0, className = '' }) {
    const [currentStatus, setCurrentStatus] = useState(null);
    const [currentEpisode, setCurrentEpisode] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownDirection, setDropdownDirection] = useState('down'); // 'up' or 'down'
    const dropdownRef = useRef(null);

    // Load status and episode from local storage on mount
    useEffect(() => {
        const savedData = getAnimeStatus(animeId);
        if (savedData) {
            setCurrentStatus(savedData.status || null);
            setCurrentEpisode(savedData.episode || 0);
        }
    }, [animeId]);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    // Calculate dropdown direction based on available space
    useEffect(() => {
        if (isOpen && dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const spaceBelow = viewportHeight - rect.bottom;
            const spaceAbove = rect.top;

            // Estimate dropdown height (approximately 300px for 6 options)
            const dropdownHeight = 300;

            // If not enough space below but enough space above, open upward
            if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
                setDropdownDirection('up');
            } else {
                setDropdownDirection('down');
            }
        }
    }, [isOpen]);

    const handleStatusChange = (status) => {
        const newData = { status, episode: currentEpisode };
        setAnimeStatus(animeId, newData);
        setCurrentStatus(status);
        setIsOpen(false);
    };

    const handleEpisodeChange = (newEpisode) => {
        const validEpisode = Math.max(0, Math.min(newEpisode, totalEpisodes));
        setCurrentEpisode(validEpisode);
        if (currentStatus) {
            const newData = { status: currentStatus, episode: validEpisode };
            setAnimeStatus(animeId, newData);
        }
    };

    const incrementEpisode = () => {
        handleEpisodeChange(currentEpisode + 1);
    };

    const decrementEpisode = () => {
        handleEpisodeChange(currentEpisode - 1);
    };

    const getCurrentStatusData = () => {
        if (!currentStatus) {
            return { label: 'Set Status', icon: '📝' };
        }
        return STATUS_OPTIONS.find(opt => opt.value === currentStatus) || { label: 'Set Status', icon: '📝' };
    };

    const statusData = getCurrentStatusData();

    return (
        <div className={`relative z-[10000] ${className}`} ref={dropdownRef}>
            {/* Main Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full py-3 px-4 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 ${currentStatus
                    ? 'bg-gradient-to-r from-[#ff4d4d] to-[#ff1a1a] text-white shadow-lg shadow-[#ff4d4d]/40 hover:shadow-[#ff4d4d]/60'
                    : 'bg-white/5 text-[#ff4d4d] border border-[#ff4d4d]/30 hover:bg-[#ff4d4d]/10 hover:border-[#ff4d4d]/60'
                    } hover:-translate-y-0.5`}
            >
                <span className="text-lg">{statusData.icon}</span>
                <span>{statusData.label}</span>
                <span className={`text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {/* Episode Progress (shown when status is set) */}
            {currentStatus && totalEpisodes > 0 && (
                <div className="mt-3 bg-[#1a1a3e] border border-[#ff4d4d]/30 rounded-xl p-4">
                    <div className="flex items-center justify-center mb-2">
                        <span className="text-[#ff8888] text-sm font-bold">{currentEpisode} / {totalEpisodes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={decrementEpisode}
                            disabled={currentEpisode === 0}
                            className="w-10 h-10 rounded-lg bg-white/5 border border-[#ff4d4d]/30 text-[#ff4d4d] font-bold hover:bg-[#ff4d4d]/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            −
                        </button>
                        <input
                            type="number"
                            min="0"
                            max={totalEpisodes}
                            value={currentEpisode}
                            onChange={(e) => handleEpisodeChange(parseInt(e.target.value) || 0)}
                            className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-[#ff4d4d]/30 text-white text-center font-bold focus:outline-none focus:border-[#ff4d4d] focus:bg-white/10 transition-all"
                        />
                        <button
                            onClick={incrementEpisode}
                            disabled={currentEpisode === totalEpisodes}
                            className="w-10 h-10 rounded-lg bg-white/5 border border-[#ff4d4d]/30 text-[#ff4d4d] font-bold hover:bg-[#ff4d4d]/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            +
                        </button>
                    </div>
                    {/* Progress Bar */}
                    <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-[#ff4d4d] to-[#ff1a1a] transition-all duration-300"
                            style={{ width: `${totalEpisodes > 0 ? (currentEpisode / totalEpisodes) * 100 : 0}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {/* Dropdown Menu */}
            {isOpen && (
                <div className={`absolute left-0 right-0 bg-[#1a1a3e] border border-[#ff4d4d]/30 rounded-2xl shadow-lg shadow-[#ff4d4d]/20 overflow-hidden z-[9999] animate-fadeIn ${dropdownDirection === 'up'
                    ? 'bottom-full mb-2'
                    : 'top-full mt-2'
                    }`}>
                    {STATUS_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleStatusChange(option.value)}
                            className={`w-full px-4 py-3 text-left transition-all duration-200 flex items-center gap-3 border-b border-[#ff4d4d]/10 last:border-b-0 ${currentStatus === option.value
                                ? 'bg-[#ff4d4d]/30 text-white'
                                : 'text-gray-300 hover:bg-[#ff4d4d]/20 hover:text-white'
                                }`}
                        >
                            <span className="text-xl">{option.icon}</span>
                            <span className="font-semibold">{option.label}</span>
                            {currentStatus === option.value && (
                                <span className="ml-auto text-green-400">✓</span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default StatusSelector;
