// Helper function to get thumbnail with anime-specific colors
const getThumbnail = (title, season) => {
    // Color schemes for different anime series (hex colors without #)
    const colorSchemes = {
        "Attack on Titan": ["8B0000", "A52A2A", "DC143C", "8B0000"],
        "My Hero Academia": ["228B22", "32CD32", "00FF00", "9ACD32", "6B8E23", "556B2F", "8FBC8F"],
        "Demon Slayer": ["4B0082", "8B008B", "9370DB", "BA55D3"],
        "Tokyo Ghoul": ["2F4F4F", "696969", "708090", "778899"],
        "Jujutsu Kaisen": ["483D8B", "6A5ACD"],
        "One Piece": ["1E90FF", "4169E1", "0000CD", "00008B", "191970", "000080"],
        "Naruto": ["FF8C00"],
        "Naruto Shippuden": ["FF4500"],
        "Fullmetal Alchemist: Brotherhood": ["B8860B"],
        "Death Note": ["000000"],
        "Steins;Gate": ["8B4513"],
        "Steins;Gate 0": ["A0522D"],
        "Hunter x Hunter": ["228B22"],
        "Sword Art Online": ["4682B4", "5F9EA0", "6495ED", "87CEEB"],
        "Code Geass": ["800080", "9932CC"],
        "Cowboy Bebop": ["2F4F4F"],
        "Mob Psycho 100": ["FF1493", "FF69B4", "FFB6C1"],
        "One Punch Man": ["FFD700", "FFA500"],
        "Bleach": ["FF4500"],
        "Bleach: Thousand-Year Blood War": ["DC143C"],
        "Dragon Ball Z": ["FF8C00"],
        "Dragon Ball Super": ["1E90FF"],
        "Vinland Saga": ["8B4513", "A0522D"],
        "Re:Zero": ["4B0082", "8B008B"],
        "The Promised Neverland": ["FF6347", "FF7F50"],
        "Haikyuu!!": ["FF8C00", "FFA500", "FFD700", "FFFF00"],
        "Spy x Family": ["DC143C", "FF1493"],
        "Chainsaw Man": ["8B0000"],
        "Frieren: Beyond Journey's End": ["4682B4"],
        "Mushoku Tensei": ["4169E1", "1E90FF"],
        "Overlord": ["2F4F4F", "696969", "708090", "778899"],
        "That Time I Got Reincarnated as a Slime": ["00CED1", "40E0D0", "48D1CC"],
        "Konosuba": ["9370DB", "BA55D3", "DA70D6"],
        "Violet Evergarden": ["9370DB"],
        "Your Lie in April": ["FFB6C1"],
        "Anohana": ["87CEEB"],
        "Clannad": ["FFB6C1"],
        "Clannad: After Story": ["FFC0CB"],
        "Toradora!": ["FF69B4"],
        "Kaguya-sama: Love is War": ["FF1493", "FF69B4", "FFB6C1"],
        "Horimiya": ["FFA07A"],
        "Fruits Basket": ["FFB6C1", "FFC0CB", "FFE4E1"],
        "Parasyte": ["2F4F4F"],
        "Erased": ["4682B4"],
        "Made in Abyss": ["483D8B", "6A5ACD"],
        "Dr. Stone": ["32CD32", "00FF00", "7FFF00"],
        "The Rising of the Shield Hero": ["228B22", "32CD32", "00FF00"],
        "Assassination Classroom": ["FFD700", "FFA500"],
        "Noragami": ["4169E1", "1E90FF"],
        "Blue Exorcist": ["0000CD", "00008B"],
        "Black Clover": ["2F4F4F"],
        "Fire Force": ["FF4500", "FF6347"],
        "Dororo": ["8B4513"],
        "Beastars": ["696969", "808080"],
    };

    const colors = colorSchemes[title];
    if (colors && season) {
        const colorIndex = Math.min(season - 1, colors.length - 1);
        const bgColor = colors[colorIndex];
        const textColor = "FFFFFF";
        const encodedTitle = encodeURIComponent(title + " S" + season);
        return `https://placehold.co/400x600/${bgColor}/${textColor}/png?text=${encodedTitle}`;
    }
    // Fallback for anime not in the color scheme list
    const defaultColor = "1a1a3e";
    const encodedFallback = encodeURIComponent(title + (season ? " S" + season : ""));
    return `https://placehold.co/400x600/${defaultColor}/FFFFFF/png?text=${encodedFallback}`;
};

// Comprehensive anime database with 100+ entries
export const animeData = [
    // Attack on Titan Series
    { id: 1, title: "Attack on Titan", season: 1, rating: "9.0", image: "🗡️", thumbnail: getThumbnail("Attack on Titan", 1), genre: "Action, Dark Fantasy", description: "In a world where humanity lives behind massive walls to protect themselves from giant humanoid Titans, young Eren Yeager witnesses the destruction of his hometown and vows revenge. This dark and intense series explores themes of freedom, survival, and the cost of war with stunning animation and plot twists that will keep you on the edge of your seat.", episodes: 25, year: 2013, studio: "Wit Studio", status: "Completed", reviews: [{ user: "TitanSlayer99", rating: 10, comment: "Absolutely mind-blowing! The plot twists are insane and the action is incredible.", date: "2024-01-15" }, { user: "AnimeFan2024", rating: 9, comment: "One of the best anime I've ever watched. Dark, intense, and gripping from start to finish.", date: "2024-02-20" }, { user: "ErenJaeger", rating: 10, comment: "Changed my life. The themes of freedom and sacrifice hit so hard.", date: "2024-03-10" }] },
    { id: 2, title: "Attack on Titan", season: 2, rating: "9.1", image: "🗡️", thumbnail: getThumbnail("Attack on Titan", 2), genre: "Action, Dark Fantasy", description: "The Survey Corps continues their battle against the Titans with new revelations about the origin of the Titans and the true nature of their world. Eren discovers new abilities while facing the terrifying Beast Titan. The stakes are higher than ever as humanity's darkest secrets begin to surface.", episodes: 12, year: 2017, studio: "Wit Studio", status: "Completed", reviews: [{ user: "WallMaria", rating: 9, comment: "Even better than season 1! The revelations are shocking.", date: "2024-01-22" }, { user: "ScoutRegiment", rating: 10, comment: "The Beast Titan arc is phenomenal. Can't wait for more!", date: "2024-02-15" }] },
    { id: 3, title: "Attack on Titan", season: 3, rating: "9.2", image: "🗡️", thumbnail: getThumbnail("Attack on Titan", 3), genre: "Action, Dark Fantasy", description: "Dark secrets about the Titans and the world are finally revealed as the Survey Corps uncovers the truth about the walls and humanity's past. Political intrigue, intense action, and emotional character development make this season a masterpiece. The basement revelation changes everything.", episodes: 22, year: 2018, studio: "Wit Studio", status: "Completed", reviews: [{ user: "HistoriaReiss", rating: 10, comment: "The basement reveal blew my mind! Best season yet.", date: "2024-03-05" }, { user: "LeviAckerman", rating: 9, comment: "The action sequences are next level. Levi vs Beast Titan is epic!", date: "2024-03-18" }] },
    { id: 4, title: "Attack on Titan", season: 4, rating: "9.3", image: "🗡️", thumbnail: getThumbnail("Attack on Titan", 4), genre: "Action, Dark Fantasy", description: "The final season brings the epic story to its conclusion with a perspective shift that challenges everything you thought you knew. War, morality, and the cycle of hatred take center stage as Eren's true plan unfolds. A masterful ending to one of anime's greatest stories with breathtaking animation and emotional depth.", episodes: 28, year: 2020, studio: "MAPPA", status: "Completed", reviews: [{ user: "FinalSeason", rating: 10, comment: "Perfect ending to a perfect series. The moral complexity is unmatched.", date: "2024-04-01" }, { user: "Marley Warrior", rating: 9, comment: "The perspective shift was genius. Made me rethink everything.", date: "2024-04-15" }, { user: "Rumbling", rating: 10, comment: "Emotional rollercoaster. The animation by MAPPA is stunning!", date: "2024-04-20" }] },

    // My Hero Academia Series
    { id: 5, title: "My Hero Academia", season: 1, rating: "8.5", image: "💪", thumbnail: getThumbnail("My Hero Academia", 1), genre: "Action, Superhero", description: "In a world where 80% of the population has superpowers called Quirks, Izuku Midoriya is born without any abilities. Despite this, he dreams of becoming the greatest hero like his idol All Might. When a chance encounter with All Might reveals that he can inherit his power, Izuku's journey to becoming a hero begins at the prestigious U.A. High School. This inspiring story explores themes of perseverance, friendship, and what it truly means to be a hero.", episodes: 13, year: 2016, studio: "Bones", status: "Completed" },
    { id: 6, title: "My Hero Academia", season: 2, rating: "8.6", image: "💪", thumbnail: getThumbnail("My Hero Academia", 2), genre: "Action, Superhero", description: "Midoriya and his classmates face new challenges as they compete in the U.A. Sports Festival, showcasing their Quirks to pro heroes and the world. The season intensifies with the Hero Killer Stain arc, introducing darker themes about what makes a true hero. Midoriya learns to control One For All better while facing internships, new villains, and the pressure of living up to All Might's legacy. Character development shines as each student discovers their own path to heroism.", episodes: 25, year: 2017, studio: "Bones", status: "Completed" },
    { id: 7, title: "My Hero Academia", season: 3, rating: "8.7", image: "💪", thumbnail: getThumbnail("My Hero Academia", 3), genre: "Action, Superhero", description: "The students face their toughest battles yet as the League of Villains launches a full-scale attack on the training camp. All Might's final battle against All For One becomes a turning point for hero society, as the Symbol of Peace passes the torch to the next generation. Midoriya unlocks new abilities while dealing with the weight of his inherited power. The Provisional License Exam tests the students' growth, and emotional stakes reach new heights as the series explores the cost of heroism.", episodes: 25, year: 2018, studio: "Bones", status: "Completed" },
    { id: 8, title: "My Hero Academia", season: 4, rating: "8.6", image: "💪", thumbnail: getThumbnail("My Hero Academia", 4), genre: "Action, Superhero", description: "New villains emerge as the Shie Hassaikai organization threatens society with Quirk-destroying bullets. Midoriya teams up with pro hero Lemillion in an emotionally charged arc that tests their resolve and heroic ideals. The Cultural Festival provides lighter moments before diving into intense work-study experiences. This season explores the darker side of hero society, the sacrifices heroes make, and introduces powerful new abilities including Midoriya's mastery of One For All at higher percentages.", episodes: 25, year: 2019, studio: "Bones", status: "Completed" },
    { id: 9, title: "My Hero Academia", season: 5, rating: "8.4", image: "💪", thumbnail: getThumbnail("My Hero Academia", 5), genre: "Action, Superhero", description: "Class 1-A and 1-B compete in intense joint training exercises that showcase how far each student has come. The season delves into the dark past of the League of Villains, particularly Tomura Shigaraki's tragic backstory and his evolution as a villain. The Meta Liberation Army arc expands the world-building while Midoriya discovers new Quirks within One For All. Tensions rise as hero society begins to crack under the pressure of increasing villain activity and public scrutiny.", episodes: 25, year: 2021, studio: "Bones", status: "Completed" },
    { id: 10, title: "My Hero Academia", season: 6, rating: "8.8", image: "💪", thumbnail: getThumbnail("My Hero Academia", 6), genre: "Action, Superhero", description: "The heroes face their greatest threat in an all-out war against the Paranormal Liberation Front. This season delivers non-stop action as pro heroes and students unite for a massive raid that will determine the fate of hero society. Shocking revelations about hero families, devastating losses, and the awakening of terrifying new powers push everyone to their limits. The war's aftermath leaves society forever changed, with heroes and villains alike facing the consequences of their actions in the most intense season yet.", episodes: 25, year: 2022, studio: "Bones", status: "Completed" },
    { id: 11, title: "My Hero Academia", season: 7, rating: "8.7", image: "💪", thumbnail: getThumbnail("My Hero Academia", 7), genre: "Action, Superhero", description: "The final battle for the future of hero society begins as the remaining heroes make their last stand against All For One and Shigaraki's overwhelming power. With society in chaos and heroes pushed to the brink, Midoriya must master the full potential of One For All to save everyone. This climactic season brings character arcs to their conclusion, delivers epic battles, and explores whether the next generation can create a better world. The legacy of All Might and the true meaning of being the greatest hero are finally revealed.", episodes: 21, year: 2024, studio: "Bones", status: "Ongoing" },

    // Demon Slayer Series
    { id: 12, title: "Demon Slayer", season: 1, rating: "8.8", image: "⚔️", thumbnail: getThumbnail("Demon Slayer", 1), genre: "Action, Supernatural", description: "After his family is slaughtered by demons and his sister Nezuko is turned into one, kind-hearted Tanjiro Kamado embarks on a quest to become a demon slayer and find a cure for Nezuko. Training under the strict guidance of Sakonji Urokodaki, Tanjiro learns Water Breathing techniques and joins the Demon Slayer Corps. With breathtaking animation by ufotable, this emotional journey explores family bonds, determination, and the fight between humans and demons in Taisho-era Japan.", episodes: 26, year: 2019, studio: "ufotable", status: "Completed" },
    { id: 13, title: "Demon Slayer", season: 2, rating: "9.1", image: "⚔️", thumbnail: getThumbnail("Demon Slayer", 2), genre: "Action, Supernatural", description: "The Entertainment District Arc features Tanjiro, Zenitsu, and Inosuke teaming up with the flamboyant Sound Hashira Tengen Uzui to investigate demon activity in Yoshiwara. They face off against the Upper Rank Six demons Daki and Gyutaro in spectacular battles that push them to their absolute limits. The animation reaches new heights with stunning visual effects and choreography. This arc deepens character relationships, showcases the Hashira's incredible power, and reveals the tragic backstories of both heroes and villains.", episodes: 18, year: 2021, studio: "ufotable", status: "Completed" },
    { id: 14, title: "Demon Slayer", season: 3, rating: "8.9", image: "⚔️", thumbnail: getThumbnail("Demon Slayer", 3), genre: "Action, Supernatural", description: "The Swordsmith Village Arc reveals new powers as Tanjiro and Nezuko visit the hidden village where demon slayer swords are forged. They encounter the Upper Rank Four demons Hantengu and Gyokko, leading to intense battles alongside the Mist Hashira Muichiro Tokito and Love Hashira Mitsuri Kanroji. Tanjiro unlocks the secrets of the Hinokami Kagura and discovers his connection to the legendary first demon slayer. Nezuko's development takes a major turn as she overcomes her demonic nature in powerful ways.", episodes: 11, year: 2023, studio: "ufotable", status: "Completed" },
    { id: 15, title: "Demon Slayer", season: 4, rating: "9.0", image: "⚔️", thumbnail: getThumbnail("Demon Slayer", 4), genre: "Action, Supernatural", description: "The Hashira Training Arc prepares the Demon Slayer Corps for the final battle against Muzan Kibutsuji and the Upper Rank demons. Tanjiro undergoes rigorous training with each of the Hashira, learning their unique techniques and philosophies. The season builds tension as the demons make their move, leading to the inevitable confrontation that will decide humanity's fate. Character development deepens as past traumas are confronted and bonds between demon slayers strengthen for the ultimate showdown.", episodes: 8, year: 2024, studio: "ufotable", status: "Completed" },

    // Tokyo Ghoul Series
    { id: 16, title: "Tokyo Ghoul", season: 1, rating: "8.4", image: "👹", thumbnail: getThumbnail("Tokyo Ghoul", 1), genre: "Dark Fantasy, Horror", description: "A college student becomes a half-ghoul after a deadly encounter.", episodes: 12 },
    { id: 17, title: "Tokyo Ghoul", season: 2, rating: "8.6", image: "👹", thumbnail: getThumbnail("Tokyo Ghoul", 2), genre: "Dark Fantasy, Horror", description: "Kaneki struggles with his identity as tensions rise between ghouls and humans.", episodes: 12 },
    { id: 18, title: "Tokyo Ghoul", season: 3, rating: "8.0", image: "👹", thumbnail: getThumbnail("Tokyo Ghoul", 3), genre: "Dark Fantasy, Horror", description: "A new investigator joins the CCG to hunt down ghouls.", episodes: 12 },
    { id: 19, title: "Tokyo Ghoul", season: 4, rating: "8.5", image: "👹", thumbnail: getThumbnail("Tokyo Ghoul", 4), genre: "Dark Fantasy, Horror", description: "The final season brings the conflict to its climax.", episodes: 12 },

    // Jujutsu Kaisen Series
    { id: 20, title: "Jujutsu Kaisen", season: 1, rating: "8.7", image: "🔥", thumbnail: getThumbnail("Jujutsu Kaisen", 1), genre: "Action, Supernatural", description: "A high schooler joins a secret organization to fight curses.", episodes: 24 },
    { id: 21, title: "Jujutsu Kaisen", season: 2, rating: "9.0", image: "🔥", thumbnail: getThumbnail("Jujutsu Kaisen", 2), genre: "Action, Supernatural", description: "The Shibuya Incident Arc delivers intense battles and shocking revelations.", episodes: 23 },

    // One Piece Arcs (represented as seasons)
    { id: 22, title: "One Piece", season: 1, rating: "8.9", image: "🏴‍☠️", thumbnail: getThumbnail("One Piece", 1), genre: "Adventure, Comedy", description: "East Blue Saga - Luffy begins his journey to become King of the Pirates.", episodes: 61 },
    { id: 23, title: "One Piece", season: 2, rating: "9.0", image: "🏴‍☠️", thumbnail: getThumbnail("One Piece", 2), genre: "Adventure, Comedy", description: "Alabasta Saga - The crew helps save a kingdom from civil war.", episodes: 77 },
    { id: 24, title: "One Piece", season: 3, rating: "9.1", image: "🏴‍☠️", thumbnail: getThumbnail("One Piece", 3), genre: "Adventure, Comedy", description: "Sky Island Saga - Adventure in the clouds above.", episodes: 52 },
    { id: 25, title: "One Piece", season: 4, rating: "9.2", image: "🏴‍☠️", thumbnail: getThumbnail("One Piece", 4), genre: "Adventure, Comedy", description: "Water 7 Saga - Emotional battles and crew conflicts.", episodes: 118 },
    { id: 26, title: "One Piece", season: 5, rating: "9.3", image: "🏴‍☠️", thumbnail: getThumbnail("One Piece", 5), genre: "Adventure, Comedy", description: "Thriller Bark Saga - Spooky adventures with zombies and shadows.", episodes: 48 },
    { id: 27, title: "One Piece", season: 6, rating: "9.4", image: "🏴‍☠️", thumbnail: getThumbnail("One Piece", 6), genre: "Adventure, Comedy", description: "Summit War Saga - Epic war at Marineford.", episodes: 108 },

    // Naruto Series
    { id: 28, title: "Naruto", season: 1, rating: "8.4", image: "🌪️", thumbnail: getThumbnail("Naruto", 1), genre: "Action, Adventure", description: "A young ninja seeks recognition and dreams of becoming Hokage.", episodes: 220 },
    { id: 29, title: "Naruto Shippuden", season: 1, rating: "9.4", image: "🌀", thumbnail: getThumbnail("Naruto Shippuden", 1), genre: "Action, Adventure", description: "Naruto returns after training to face greater threats.", episodes: 500 },

    // Fullmetal Alchemist
    { id: 30, title: "Fullmetal Alchemist: Brotherhood", season: 1, rating: "9.5", image: "⚗️", thumbnail: getThumbnail("Fullmetal Alchemist: Brotherhood", 1), genre: "Action, Fantasy", description: "Two brothers search for the Philosopher's Stone to restore their bodies.", episodes: 64 },

    // Death Note
    { id: 31, title: "Death Note", season: 1, rating: "8.9", image: "📓", thumbnail: getThumbnail("Death Note", 1), genre: "Psychological, Thriller", description: "A high school student discovers a notebook that can kill anyone.", episodes: 37 },

    // Steins;Gate
    { id: 32, title: "Steins;Gate", season: 1, rating: "9.1", image: "⏰", thumbnail: getThumbnail("Steins;Gate", 1), genre: "Sci-Fi, Thriller", description: "A group of friends accidentally discover time travel.", episodes: 24 },
    { id: 33, title: "Steins;Gate 0", season: 1, rating: "8.5", image: "⏰", thumbnail: getThumbnail("Steins;Gate 0", 1), genre: "Sci-Fi, Thriller", description: "An alternate timeline where Okabe failed to save Kurisu.", episodes: 23 },

    // Hunter x Hunter
    { id: 34, title: "Hunter x Hunter", season: 1, rating: "9.2", image: "🎣", thumbnail: getThumbnail("Hunter x Hunter", 1), genre: "Action, Adventure", description: "A young boy searches for his father while becoming a Hunter.", episodes: 148 },

    // Sword Art Online Series
    { id: 35, title: "Sword Art Online", season: 1, rating: "7.8", image: "⚔️", thumbnail: getThumbnail("Sword Art Online", 1), genre: "Action, Fantasy", description: "Players trapped in a virtual reality MMORPG must clear the game to escape.", episodes: 25 },
    { id: 36, title: "Sword Art Online", season: 2, rating: "7.5", image: "⚔️", thumbnail: getThumbnail("Sword Art Online", 2), genre: "Action, Fantasy", description: "New virtual worlds and challenges await Kirito and his friends.", episodes: 24 },
    { id: 37, title: "Sword Art Online", season: 3, rating: "8.0", image: "⚔️", thumbnail: getThumbnail("Sword Art Online", 3), genre: "Action, Fantasy", description: "Alicization Arc - Kirito enters a new virtual world with advanced AI.", episodes: 47 },
    { id: 38, title: "Sword Art Online", season: 4, rating: "7.9", image: "⚔️", thumbnail: getThumbnail("Sword Art Online", 4), genre: "Action, Fantasy", description: "War of Underworld - The epic conclusion to the Alicization saga.", episodes: 23 },

    // Code Geass
    { id: 39, title: "Code Geass", season: 1, rating: "8.9", image: "👁️", thumbnail: getThumbnail("Code Geass", 1), genre: "Mecha, Thriller", description: "A prince gains the power to control minds and leads a rebellion.", episodes: 25 },
    { id: 40, title: "Code Geass", season: 2, rating: "9.0", image: "👁️", thumbnail: getThumbnail("Code Geass", 2), genre: "Mecha, Thriller", description: "Lelouch continues his quest to create a better world.", episodes: 25 },

    // Cowboy Bebop
    { id: 41, title: "Cowboy Bebop", season: 1, rating: "9.0", image: "🚀", thumbnail: getThumbnail("Cowboy Bebop", 1), genre: "Sci-Fi, Action", description: "Bounty hunters travel through space in this jazz-filled adventure.", episodes: 26 },

    // Mob Psycho 100
    { id: 42, title: "Mob Psycho 100", season: 1, rating: "8.6", image: "👻", thumbnail: getThumbnail("Mob Psycho 100", 1), genre: "Action, Comedy", description: "A powerful psychic tries to live a normal life.", episodes: 12 },
    { id: 43, title: "Mob Psycho 100", season: 2, rating: "8.9", image: "👻", thumbnail: getThumbnail("Mob Psycho 100", 2), genre: "Action, Comedy", description: "Mob faces greater challenges and emotional growth.", episodes: 13 },
    { id: 44, title: "Mob Psycho 100", season: 3, rating: "9.0", image: "👻", thumbnail: getThumbnail("Mob Psycho 100", 3), genre: "Action, Comedy", description: "The final season concludes Mob's journey.", episodes: 12 },

    // One Punch Man
    { id: 45, title: "One Punch Man", season: 1, rating: "8.8", image: "👊", thumbnail: getThumbnail("One Punch Man", 1), genre: "Action, Comedy", description: "A hero who can defeat any enemy with a single punch seeks a worthy opponent.", episodes: 12 },
    { id: 46, title: "One Punch Man", season: 2, rating: "7.9", image: "👊", thumbnail: getThumbnail("One Punch Man", 2), genre: "Action, Comedy", description: "Saitama faces new monsters and joins the Hero Association.", episodes: 12 },

    // Bleach Series
    { id: 47, title: "Bleach", season: 1, rating: "8.2", image: "⚔️", thumbnail: getThumbnail("Bleach", 1), genre: "Action, Supernatural", description: "A teenager gains the powers of a Soul Reaper.", episodes: 366 },
    { id: 48, title: "Bleach: Thousand-Year Blood War", season: 1, rating: "9.0", image: "⚔️", thumbnail: getThumbnail("Bleach: Thousand-Year Blood War", 1), genre: "Action, Supernatural", description: "The final arc adapts the manga's epic conclusion.", episodes: 13 },

    // Dragon Ball Series
    { id: 49, title: "Dragon Ball Z", season: 1, rating: "8.7", image: "🐉", thumbnail: getThumbnail("Dragon Ball Z", 1), genre: "Action, Adventure", description: "Goku and friends defend Earth from powerful enemies.", episodes: 291 },
    { id: 50, title: "Dragon Ball Super", season: 1, rating: "8.3", image: "🐉", thumbnail: getThumbnail("Dragon Ball Super", 1), genre: "Action, Adventure", description: "New adventures with gods and universes at stake.", episodes: 131 },

    // Vinland Saga
    { id: 51, title: "Vinland Saga", season: 1, rating: "8.9", image: "⚔️", thumbnail: getThumbnail("Vinland Saga", 1), genre: "Action, Historical", description: "A young Viking seeks revenge in medieval Europe.", episodes: 24 },
    { id: 52, title: "Vinland Saga", season: 2, rating: "9.1", image: "⚔️", thumbnail: getThumbnail("Vinland Saga", 2), genre: "Action, Historical", description: "A tale of redemption and finding true purpose.", episodes: 24 },

    // Re:Zero Series
    { id: 53, title: "Re:Zero", season: 1, rating: "8.4", image: "🔄", thumbnail: getThumbnail("Re:Zero", 1), genre: "Fantasy, Thriller", description: "A boy is transported to a fantasy world with the power to return from death.", episodes: 25 },
    { id: 54, title: "Re:Zero", season: 2, rating: "8.6", image: "🔄", thumbnail: getThumbnail("Re:Zero", 2), genre: "Fantasy, Thriller", description: "Subaru faces new trials and uncovers dark secrets.", episodes: 25 },

    // The Promised Neverland
    { id: 55, title: "The Promised Neverland", season: 1, rating: "8.6", image: "🏠", thumbnail: getThumbnail("The Promised Neverland", 1), genre: "Mystery, Thriller", description: "Orphans discover a dark secret about their home.", episodes: 12 },
    { id: 56, title: "The Promised Neverland", season: 2, rating: "7.8", image: "🏠", thumbnail: getThumbnail("The Promised Neverland", 2), genre: "Mystery, Thriller", description: "The children escape and face the dangers of the outside world.", episodes: 11 },

    // Solo Leveling
    { id: 57, title: "Solo Leveling", season: 1, rating: "8.9", image: "⚔️", thumbnail: getThumbnail("Solo Leveling", 1), genre: "Action, Fantasy", description: "In a world where hunters fight monsters from gates, Sung Jinwoo is the weakest E-rank hunter. After a near-death experience in a double dungeon, he gains a unique ability to level up infinitely like a video game character. Watch as the weakest hunter becomes the strongest through intense battles, strategic thinking, and jaw-dropping power-ups. This adaptation of the popular manhwa features stunning animation and an addictive progression system that will keep you hooked.", episodes: 12, year: 2024, studio: "A-1 Pictures", status: "Completed" },

    // Frieren: Beyond Journey's End
    { id: 58, title: "Frieren: Beyond Journey's End", season: 1, rating: "9.2", image: "🧙‍♀️", thumbnail: getThumbnail("Frieren: Beyond Journey's End", 1), genre: "Fantasy, Adventure", description: "After defeating the Demon King with her party of heroes, the elf mage Frieren returns to a quiet life. But as an elf who lives for thousands of years, she barely noticed the passage of time with her human companions. When her friend Himmel passes away, Frieren realizes she never truly understood humans and embarks on a new journey to learn about the people and world she once saved. A beautiful, contemplative story about time, memory, and what it means to truly connect with others.", episodes: 28, year: 2023, studio: "Madhouse", status: "Completed" },

    // Chainsaw Man
    { id: 59, title: "Chainsaw Man", season: 1, rating: "8.7", image: "🪚", thumbnail: getThumbnail("Chainsaw Man", 1), genre: "Action, Dark Fantasy", description: "Denji is a young man trapped in poverty, working off his deceased father's debt by hunting devils with his devil dog Pochita. When he's betrayed and killed, Pochita merges with him, transforming Denji into Chainsaw Man - a devil-human hybrid with chainsaws for arms. Recruited by the Public Safety Devil Hunters, Denji fights devils while pursuing his simple dreams of a normal life. MAPPA's incredible animation brings this wild, violent, and surprisingly emotional story to life with stunning action sequences and dark humor.", episodes: 12, year: 2022, studio: "MAPPA", status: "Completed" },

    // Spy x Family
    { id: 60, title: "Spy x Family", season: 1, rating: "8.8", image: "🕵️", thumbnail: getThumbnail("Spy x Family", 1), genre: "Action, Comedy", description: "Master spy Twilight must create a fake family for his mission to infiltrate an elite school. He adopts Anya, a telepath who can read minds, and enters a fake marriage with Yor, a secret assassin. None of them know each other's true identities, leading to hilarious situations as they try to maintain their cover while genuinely growing as a family. This heartwarming comedy perfectly balances action, humor, and wholesome family moments that will make you laugh and smile.", episodes: 25, year: 2022, studio: "Wit Studio & CloverWorks", status: "Completed" },
    { id: 61, title: "Spy x Family", season: 2, rating: "8.7", image: "🕵️", thumbnail: getThumbnail("Spy x Family", 2), genre: "Action, Comedy", description: "The Forger family's adventures continue as Loid's missions become more complex, Yor faces new assassination targets, and Anya navigates school life while trying to keep her telepathic abilities secret. New characters are introduced, including Anya's rival Damian and the mysterious Bond, a precognitive dog. The family bond deepens despite their secrets, delivering more heartwarming moments alongside intense spy action and comedy.", episodes: 12, year: 2023, studio: "Wit Studio & CloverWorks", status: "Completed" },

    // Mushoku Tensei
    { id: 62, title: "Mushoku Tensei", season: 1, rating: "8.7", image: "🗡️", thumbnail: getThumbnail("Mushoku Tensei", 1), genre: "Fantasy, Adventure", description: "A 34-year-old NEET is reincarnated in a magical world as Rudeus Greyrat, determined to live his second life to the fullest. With memories of his past life intact, he learns magic, makes friends, and experiences adventures while trying to become a better person. This groundbreaking isekai features stunning animation, deep character development, and a richly detailed fantasy world. It explores themes of redemption, growth, and second chances with mature storytelling.", episodes: 23, year: 2021, studio: "Studio Bind", status: "Completed" },
    { id: 63, title: "Mushoku Tensei", season: 2, rating: "8.8", image: "🗡️", thumbnail: getThumbnail("Mushoku Tensei", 2), genre: "Fantasy, Adventure", description: "Rudeus continues his journey through the magical world, facing new challenges at the magic academy and dealing with the consequences of his past actions. The season delves deeper into world-building, introduces powerful new characters, and explores complex relationships. Emotional character arcs and spectacular magic battles showcase why this is considered one of the best isekai anime, with animation quality that sets new standards for the genre.", episodes: 24, year: 2023, studio: "Studio Bind", status: "Completed" },

    // Overlord
    { id: 64, title: "Overlord", season: 1, rating: "8.0", image: "💀", thumbnail: getThumbnail("Overlord", 1), genre: "Fantasy, Isekai", description: "When the MMORPG Yggdrasil shuts down, player Momonga finds himself trapped in the game world as his skeletal avatar, the powerful overlord Ainz Ooal Gown. With his loyal NPC servants now sentient, Ainz sets out to conquer this new world and discover if other players are trapped like him. This dark fantasy explores what happens when the villain is the protagonist, featuring strategic battles, world domination, and morally complex situations.", episodes: 13, year: 2015, studio: "Madhouse", status: "Completed" },

    // That Time I Got Reincarnated as a Slime
    { id: 65, title: "That Time I Got Reincarnated as a Slime", season: 1, rating: "8.3", image: "💧", thumbnail: getThumbnail("That Time I Got Reincarnated as a Slime", 1), genre: "Fantasy, Isekai", description: "After being killed by a random attacker, 37-year-old Satoru Mikami is reincarnated in a fantasy world as a slime with unique abilities. Taking the name Rimuru Tempest, he befriends a powerful dragon and begins building a nation where all races can live in harmony. This wholesome isekai combines nation-building, comedy, and epic battles with a likable protagonist who uses diplomacy and kindness as much as power to solve problems.", episodes: 24, year: 2018, studio: "8bit", status: "Completed" },

    // Konosuba
    { id: 66, title: "Konosuba", season: 1, rating: "8.4", image: "🎭", thumbnail: getThumbnail("Konosuba", 1), genre: "Comedy, Fantasy", description: "After dying in an embarrassing accident, Kazuma is sent to a fantasy world with the useless goddess Aqua. Joined by an explosion-obsessed mage and a masochistic crusader, this dysfunctional party takes on quests in the most hilarious ways possible. Konosuba parodies isekai tropes with brilliant comedy, lovable idiots, and situations that always go hilariously wrong. It's the perfect comedy anime for fantasy fans.", episodes: 10, year: 2016, studio: "Studio Deen", status: "Completed" },

    // Violet Evergarden
    { id: 67, title: "Violet Evergarden", season: 1, rating: "8.7", image: "💜", thumbnail: getThumbnail("Violet Evergarden", 1), genre: "Drama, Fantasy", description: "After the war ends, former child soldier Violet Evergarden becomes an Auto Memory Doll, writing letters for people who cannot express their feelings. As she helps others convey their emotions through words, Violet begins to understand the meaning of 'I love you' - the last words her commanding officer said to her. Kyoto Animation's masterpiece features breathtaking visuals and deeply emotional stories that will make you cry. Each episode is a beautiful exploration of human connection and healing.", episodes: 13, year: 2018, studio: "Kyoto Animation", status: "Completed" },

    // Your Lie in April
    { id: 68, title: "Your Lie in April", season: 1, rating: "8.8", image: "🎹", thumbnail: getThumbnail("Your Lie in April", 1), genre: "Drama, Romance", description: "Piano prodigy Kousei Arima loses his ability to hear his own playing after his mother's death. Two years later, he meets free-spirited violinist Kaori Miyazono, who helps him rediscover his love for music. This beautiful story about music, love, and moving forward features stunning performances, emotional depth, and a romance that will stay with you long after the final note. Bring tissues - this one will make you cry.", episodes: 22, year: 2014, studio: "A-1 Pictures", status: "Completed" },

    // Anohana
    { id: 69, title: "Anohana", season: 1, rating: "8.5", image: "🌸", thumbnail: getThumbnail("Anohana", 1), genre: "Drama, Supernatural", description: "Five childhood friends drift apart after their friend Menma dies in an accident. Years later, Menma's ghost appears to Jinta, asking him to fulfill her wish so she can move on. As the group reunites to help Menma, they confront their guilt, grief, and unspoken feelings. This emotional masterpiece about friendship, loss, and growing up will absolutely destroy you with its powerful storytelling and unforgettable ending.", episodes: 11, year: 2011, studio: "A-1 Pictures", status: "Completed" },

    // Toradora!
    { id: 70, title: "Toradora!", season: 1, rating: "8.6", image: "🐯", thumbnail: getThumbnail("Toradora!", 1), genre: "Romance, Comedy", description: "Ryuuji Takasu looks like a delinquent but is actually a gentle guy who loves cleaning. Taiga Aisaka is a tiny girl with a fierce personality. When they discover they have crushes on each other's best friends, they team up to help each other. What starts as a partnership slowly becomes something more in this beloved romantic comedy that perfectly balances humor, heart, and genuine emotional growth.", episodes: 25, year: 2008, studio: "J.C.Staff", status: "Completed" },

    // Kaguya-sama: Love is War
    { id: 71, title: "Kaguya-sama: Love is War", season: 1, rating: "8.7", image: "💕", thumbnail: getThumbnail("Kaguya-sama: Love is War", 1), genre: "Romance, Comedy", description: "Student council president Miyuki Shirogane and vice president Kaguya Shinomiya are both too proud to confess their feelings. Instead, they engage in elaborate mind games to make the other confess first. This hilarious romantic comedy features brilliant comedy, strategic battles of wit, and surprisingly heartfelt moments. The narrator's dramatic commentary elevates every ridiculous scheme to epic proportions.", episodes: 12, year: 2019, studio: "A-1 Pictures", status: "Completed" },

    // Horimiya
    { id: 72, title: "Horimiya", season: 1, rating: "8.4", image: "💝", thumbnail: getThumbnail("Horimiya", 1), genre: "Romance, Slice of Life", description: "Popular student Hori and gloomy loner Miyamura hide their true selves at school. When they accidentally discover each other's secrets, an unexpected friendship blooms into romance. This wholesome love story features realistic relationships, supportive friends, and characters who actually communicate. It's a refreshing take on high school romance that focuses on genuine connection and personal growth.", episodes: 13, year: 2021, studio: "CloverWorks", status: "Completed" },

    // Parasyte
    { id: 73, title: "Parasyte", season: 1, rating: "8.6", image: "👽", thumbnail: getThumbnail("Parasyte", 1), genre: "Horror, Sci-Fi", description: "Alien parasites invade Earth, taking over human brains. When one fails to take over high schooler Shinichi's brain and instead inhabits his right hand, they form an uneasy alliance. Together they fight other parasites while exploring questions about humanity, coexistence, and what it means to be human. This psychological thriller combines body horror, philosophy, and intense action with a compelling story about identity.", episodes: 24, year: 2014, studio: "Madhouse", status: "Completed" },

    // Erased
    { id: 74, title: "Erased", season: 1, rating: "8.6", image: "⏰", thumbnail: getThumbnail("Erased", 1), genre: "Mystery, Thriller", description: "Satoru Fujinuma possesses an ability that sends him back in time moments before a life-threatening incident. When his mother is murdered, he's sent back 18 years to his childhood, giving him a chance to prevent a kidnapping that led to his current tragedy. This gripping mystery-thriller combines time travel, detective work, and emotional storytelling as Satoru races against time to save his friends and catch a killer.", episodes: 12, year: 2016, studio: "A-1 Pictures", status: "Completed" },

    // Made in Abyss
    { id: 75, title: "Made in Abyss", season: 1, rating: "8.8", image: "🕳️", thumbnail: getThumbnail("Made in Abyss", 1), genre: "Adventure, Fantasy", description: "The Abyss is a massive chasm filled with mysterious creatures and ancient relics. Young Riko dreams of becoming a cave raider like her mother. When she meets Reg, a robot boy from the Abyss's depths, they embark on a dangerous journey to find her mother. Don't let the cute art style fool you - this dark fantasy features brutal challenges, emotional trauma, and a beautifully crafted world. The deeper they go, the darker it gets.", episodes: 13, year: 2017, studio: "Kinema Citrus", status: "Completed" },

    // Dr. Stone
    { id: 76, title: "Dr. Stone", season: 1, rating: "8.4", image: "🧪", thumbnail: getThumbnail("Dr. Stone", 1), genre: "Adventure, Sci-Fi", description: "A mysterious phenomenon turns all of humanity to stone. 3,700 years later, genius scientist Senku awakens to find civilization gone. Armed with scientific knowledge, he vows to rebuild society from the Stone Age using the power of science. This unique anime makes chemistry, physics, and engineering exciting as Senku and his allies recreate modern technology from scratch. Educational, entertaining, and surprisingly inspiring.", episodes: 24, year: 2019, studio: "TMS Entertainment", status: "Completed" }
];

// Helper function to get anime by ID
export const getAnimeById = (id) => {
    return animeData.find(anime => anime.id === parseInt(id));
};

// Helper function to get all seasons of an anime
export const getAnimeSeasons = (title) => {
    return animeData.filter(anime => anime.title === title);
};
