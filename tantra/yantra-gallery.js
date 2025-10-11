// === COMPLETE YANTRA GALLERY DATA ===
// Comprehensive collection of all major, minor, and specialized yantras

const completeYantraLibrary = {
    planetary: [
        {
            name: "Surya Yantra",
            deity: "Sun God (Surya)",
            purpose: "Leadership, vitality, success, health, government positions, father relationships",
            mantra: "Om Hraam Hreem Hraum Sah Suryaya Namah",
            grid: "6x6 (36 cells - Solar number)",
            benefits: "Boosts confidence, strengthens immunity, improves eyesight, attracts authority",
            warnings: "May increase ego if misused",
            material: "Gold or copper plate",
            color: "Red/Orange"
        },
        {
            name: "Chandra Yantra",
            deity: "Moon God (Chandra)",
            purpose: "Emotional balance, mental peace, relationships, mother energy, intuition",
            mantra: "Om Shraam Shreem Shraum Sah Chandraaya Namah",
            grid: "9x9 (81 cells)",
            benefits: "Calms anxiety, enhances creativity, improves sleep, strengthens mind",
            warnings: "May increase emotional sensitivity",
            material: "Silver plate",
            color: "White/Silver"
        },
        {
            name: "Mangal Yantra",
            deity: "Mars (Mangal/Kuja)",
            purpose: "Courage, strength, victory over enemies, property, blood-related issues",
            mantra: "Om Kraam Kreem Kraum Sah Bhaumaaya Namah",
            grid: "5x5 (25 cells)",
            benefits: "Removes obstacles, gives courage, helps win competitions, protects from accidents",
            warnings: "May increase aggression, avoid during anger",
            material: "Copper or gold",
            color: "Red"
        },
        {
            name: "Budh Yantra",
            deity: "Mercury (Budha)",
            purpose: "Intelligence, communication, business, learning, writing, memory",
            mantra: "Om Braam Breem Braum Sah Budhaaya Namah",
            grid: "4x4 (16 cells)",
            benefits: "Sharpens intellect, improves speech, helps students, enhances business acumen",
            warnings: "May cause overthinking",
            material: "Bronze or brass",
            color: "Green"
        },
        {
            name: "Guru Yantra",
            deity: "Jupiter (Brihaspati)",
            purpose: "Wisdom, wealth, spiritual growth, children, teaching, guru blessings",
            mantra: "Om Graam Greem Graum Sah Gurave Namah",
            grid: "3x3 (9 cells - Sacred number)",
            benefits: "Attracts prosperity, gives wisdom, helps in childbirth, brings good fortune",
            warnings: "None - most benevolent",
            material: "Gold",
            color: "Yellow"
        },
        {
            name: "Shukra Yantra",
            deity: "Venus (Shukra)",
            purpose: "Love, beauty, luxury, arts, marriage, vehicles, pleasures",
            mantra: "Om Draam Dreem Draum Sah Shukraaya Namah",
            grid: "6x6 (36 cells)",
            benefits: "Enhances charm, attracts partner, brings luxuries, strengthens artistic talents",
            warnings: "May increase materialism",
            material: "Silver",
            color: "White/Pink"
        },
        {
            name: "Shani Yantra",
            deity: "Saturn (Shani)",
            purpose: "Discipline, removing obstacles, karmic balance, longevity, justice",
            mantra: "Om Praam Preem Praum Sah Shanaischaraya Namah",
            grid: "3x3 magic square (15 in all directions)",
            benefits: "Removes Sade Sati effects, brings discipline, grants justice, improves patience",
            warnings: "Requires purity of intent, never use for harming others",
            material: "Iron or black horseshoe",
            color: "Black/Blue"
        },
        {
            name: "Rahu Yantra",
            deity: "North Node (Rahu)",
            purpose: "Overcoming fears, material success, foreign connections, sudden gains",
            mantra: "Om Bhraam Bhreem Bhraum Sah Raahave Namah",
            grid: "4x4 (16 cells)",
            benefits: "Removes confusion, brings unexpected opportunities, helps with electronics/technology",
            warnings: "May bring sudden changes - be prepared",
            material: "Lead or silver",
            color: "Smoky grey"
        },
        {
            name: "Ketu Yantra",
            deity: "South Node (Ketu)",
            purpose: "Spiritual liberation, moksha, detachment, psychic abilities, healing",
            mantra: "Om Sraam Sreem Sraum Sah Ketave Namah",
            grid: "7x7 (49 cells)",
            benefits: "Enhances intuition, spiritual progress, removes black magic effects, grants moksha",
            warnings: "May increase detachment from worldly matters",
            material: "Silver or brass",
            color: "Brown/Multicolor"
        }
    ],
    
    deity: [
        {
            name: "Sri Yantra (Sri Chakra)",
            deity: "Tripura Sundari / Lalita Devi",
            type: "Master Yantra - Queen of all Yantras",
            purpose: "Universal harmony, wealth, enlightenment, complete cosmic integration",
            structure: "43 triangles (9 interlocking - 4 upward, 5 downward)",
            mantra: "Om Shreem Hreem Kleem Maha Tripura Sundaryai Namah",
            benefits: "Ultimate prosperity, spiritual enlightenment, fulfills all desires, protection",
            complexity: "Master level - requires proper initiation",
            material: "Gold, silver, or crystal",
            meditation: "Start from outer square, move inward layer by layer to Bindu"
        },
        {
            name: "Ganesha Yantra",
            deity: "Lord Ganesha (Vighnaharta)",
            purpose: "Removing obstacles, new beginnings, success, wisdom",
            structure: "Simple geometric with seed syllable 'Gam'",
            mantra: "Om Gam Ganapataye Namah",
            benefits: "Clears path for all endeavors, brings success, protects from negative energies",
            best_for: "Starting new business, exams, travel, any new venture",
            material: "Copper or brass",
            timing: "Worship on Wednesdays and during Ganesh Chaturthi"
        },
        {
            name: "Mahamrityunjaya Yantra",
            deity: "Lord Shiva (as Conqueror of Death)",
            purpose: "Conquering death, ultimate healing, protection from accidents",
            structure: "Complex triangular with protective square",
            mantra: "Om Tryambakam Yajamahe Sugandhim Pushti Vardhanam...",
            benefits: "Heals serious diseases, protects from untimely death, removes fear",
            power: "One of the most powerful protection yantras",
            material: "Silver or copper",
            warning: "Use with proper guidance for serious matters"
        },
        {
            name: "Shiva Yantra",
            deity: "Lord Shiva (Mahadeva)",
            purpose: "Transformation, meditation, spiritual power, destroying ego",
            structure: "Triangular sacred geometry with Trishul",
            mantra: "Om Namah Shivaya",
            benefits: "Deep meditation, spiritual awakening, destroys negative karma",
            practice: "Best for morning meditation during Brahma Muhurta",
            material: "Rudraksha or crystal",
            element: "Associated with Fire element"
        },
        {
            name: "Durga Yantra (Durga Bisa Yantra)",
            deity: "Goddess Durga (Shakti)",
            purpose: "Protection, victory over enemies, courage, removing black magic",
            structure: "20-triangle configuration for Dasha Mahavidya",
            mantra: "Om Dum Durgayei Namah",
            benefits: "Ultimate protection, removes enemies, gives fearlessness, destroys evil",
            special: "Extremely powerful for protection from all harm",
            material: "Copper or silver",
            worship: "Tuesdays and Fridays, especially during Navaratri"
        },
        {
            name: "Kali Yantra",
            deity: "Goddess Kali (Mahakal",
i)",
            purpose: "Ego destruction, liberation, tantric power, time mastery",
            structure: "Fierce triangular with cremation ground symbolism",
            mantra: "Om Kreem Kalikaye Namah",
            benefits: "Liberates from fear, destroys ego, grants tantric siddhis",
            warning: "ADVANCED ONLY - Requires guru initiation, extremely powerful",
            material: "Black stone or iron",
            danger_level: "High - not for beginners"
        },
        {
            name: "Lakshmi Yantra",
            deity: "Goddess Lakshmi (Maha Lakshmi)",
            purpose: "Wealth, prosperity, abundance, good fortune, business success",
            structure: "Lotus pattern with 8 or 16 petals",
            mantra: "Om Shreem Mahalakshmiyei Namah",
            benefits: "Attracts wealth, brings prosperity, ensures business growth, grants luxuries",
            best_day: "Friday - day of Venus and Lakshmi",
            material: "Silver or gold",
            placement: "North or East wall facing inside"
        },
        {
            name: "Saraswati Yantra",
            deity: "Goddess Saraswati",
            purpose: "Knowledge, learning, arts, creativity, music, speech",
            structure: "Triangular wisdom geometry",
            mantra: "Om Aim Saraswatyei Namah",
            benefits: "Enhances learning, improves memory, mastery of arts, eloquent speech",
            ideal_for: "Students, teachers, artists, musicians, writers",
            material: "White marble or silver",
            timing: "Basant Panchami, Thursdays"
        },
        {
            name: "Hanuman Yantra",
            deity: "Lord Hanuman (Vajrang Bali)",
            purpose: "Strength, devotion, protection, courage, Mars afflictions",
            structure: "Defensive protective pattern",
            mantra: "Om Hanumate Namah / Om Ham Hanumate Rudratmakaya Hum Phat",
            benefits: "Physical strength, protection from evil spirits, courage, cures Mars doshas",
            special_power: "Removes fear and black magic",
            material: "Copper or iron",
            day: "Tuesday and Saturday"
        },
        {
            name: "Krishna Yantra",
            deity: "Lord Krishna (Govinda)",
            purpose: "Love, devotion, spiritual joy, divine play, attraction",
            structure: "Circular divine pattern",
            mantra: "Om Kleem Krishnaya Namah",
            benefits: "Attracts love, spiritual joy, removes sadness, grants devotion",
            energy: "Playful, joyous, loving",
            material: "Gold or brass",
            offering: "Butter, peacock feathers, flute music"
        },
        {
            name: "Rama Yantra",
            deity: "Lord Rama (Maryada Purushottam)",
            purpose: "Righteousness, protection, family harmony, dharma",
            structure: "Square dharmic pattern",
            mantra: "Om Ram Ramaya Namah / Om Shri Ramaya Namah",
            benefits: "Family peace, righteous path, protection, removes obstacles",
            ideal_for: "Family harmony and following dharma",
            material: "Gold or copper",
            quality: "Establishes moral order"
        },
        {
            name: "Vishnu Yantra",
            deity: "Lord Vishnu (Narayana)",
            purpose: "Preservation, balance, cosmic order, protection from evil",
            structure: "Circular mandala with Sudarshan Chakra",
            mantra: "Om Namo Narayanaya / Om Namo Bhagavate Vasudevaya",
            benefits: "Universal protection, maintains balance, ensures preservation",
            power: "Preserves and protects all that is good",
            material: "Gold or yellow metal",
            symbol: "Conch, Chakra, Mace, Lotus"
        },
        {
            name: "Kuber Yantra (Kubera Yantra)",
            deity: "Lord Kubera (God of Wealth)",
            purpose: "Wealth accumulation, treasure, prosperity, abundance",
            structure: "3x3 magic square (72 in all directions)",
            mantra: "Om Shreem Om Hreem Shreem Hreem Kleem Shreem Kleem Vitteshvaraya Namah",
            benefits: "Rapid wealth accumulation, business profits, financial stability",
            placement: "North direction (Kubera's direction), cash box, safe",
            material: "Copper or silver",
            special: "One of the most popular yantras for wealth"
        },
        {
            name: "Baglamukhi Yantra (Bagalamukhi Yantra)",
            deity: "Goddess Baglamukhi (Pitambara)",
            purpose: "Victory over enemies, legal battles, stopping opponents, paralyzing enemies",
            structure: "Paralyzing geometric configuration",
            mantra: "Om Hleem Baglamukhi Sarva Dushtanam Vacham Mukham Padam Stambhaya Jivham Keelaya Buddhim Vinashaya Hleem Om Swaha",
            benefits: "Wins court cases, stops enemies, protects from hidden enemies, paralyzes opponents",
            power: "Extremely powerful for stopping negative forces",
            material: "Yellow cloth or gold",
            warning: "Use only for defense, never for attack",
            color: "Yellow - Pitambara (yellow garments)"
        },
        {
            name: "Bhairav Yantra (Bhairava Yantra)",
            deity: "Lord Bhairava (Fierce form of Shiva)",
            purpose: "Protection, tantric power, time mastery, removing fear",
            structure: "Fierce triangular geometry",
            mantra: "Om Hreem Ksham Bhairavaya Namah",
            benefits: "Ultimate protection, controls time, grants tantric siddhis",
            warning: "ADVANCED - Requires proper initiation",
            material: "Iron or black stone",
            nature: "Fierce protector deity"
        },
        {
            name: "Dhanvantari Yantra",
            deity: "Lord Dhanvantari (Divine Physician)",
            purpose: "Health, healing, medicine, curing diseases, medical profession",
            structure: "Healing grid with Amrita Kalasha",
            mantra: "Om Namo Bhagavate Vasudevaaya Dhanvantaraye Amrita Kalasha Hastaaya...",
            benefits: "Cures diseases, helps medical practitioners, improves health",
            ideal_for: "Chronic illness, health workers, hospitals",
            material: "Silver or copper",
            placement: "Northeast corner of house"
        },
        {
            name: "Gayatri Yantra",
            deity: "Goddess Gayatri (Mother of Vedas)",
            purpose: "Enlightenment, wisdom, spiritual awakening, purification",
            structure: "24-petal lotus (24 syllables of Gayatri)",
            mantra: "Om Bhur Bhuvah Svah, Tat Savitur Varenyam...",
            benefits: "Spiritual enlightenment, mental clarity, removes sins, grants wisdom",
            power: "Most sacred Vedic mantra in yantra form",
            material: "Gold or copper",
            practice: "Sunrise meditation"
        },
        {
            name: "Kamakhya Yantra (Kamakhya Peeth Yantra)",
            deity: "Goddess Kamakhya (Tantric Shakti)",
            purpose: "Desire fulfillment, tantric power, fertility",
            structure: "Yoni yantra base - triangular womb symbol",
            mantra: "Om Aim Hreem Kleem Chamundaye Viche",
            benefits: "Fulfills desires, tantric sadhana, grants fertility",
            location: "Based on Kamakhya temple, Assam",
            material: "Silver or brass",
            warning: "Sacred tantra practice - requires respect"
        },
        {
            name: "Pratyangira Yantra",
            deity: "Goddess Pratyangira (Lion-headed Goddess)",
            purpose: "Protection from black magic, removing curses, fierce protection",
            structure: "Lion-headed fierce protective geometry",
            mantra: "Om Ksham Hreem Kshem Pratyangira Swaha",
            benefits: "Removes black magic, protects from enemies, destroys evil spirits",
            power: "One of the most powerful protection yantras against occult attacks",
            material: "Copper or iron",
            nature: "Extremely fierce protective energy"
        },
        {
            name: "Tara Yantra",
            deity: "Goddess Tara (Ugra Tara)",
            purpose: "Compassion, protection, safe passage, overcoming obstacles",
            structure: "Star pattern (Tara = Star)",
            mantra: "Om Taarey Tuttaarey Turey Soha",
            benefits: "Protection during travel, compassionate energy, spiritual progress",
            origin: "Buddhist-Hindu syncretic yantra",
            material: "Silver or crystal",
            nature: "Compassionate yet powerful"
        },
        {
            name: "Bhuvaneshwari Yantra",
            deity: "Goddess Bhuvaneshwari (Queen of Universe)",
            purpose: "Material prosperity, royal power, worldly success",
            structure: "Square cosmic architecture",
            mantra: "Om Hreem Bhuvaneshwaryai Namah",
            benefits: "Grants dominion, material success, royal treatment",
            position: "Fourth Mahavidya",
            material: "Gold or copper"
        },
        {
            name: "Chinnamasta Yantra",
            deity: "Goddess Chinnamasta (Self-decapitated)",
            purpose: "Ego transcendence, kundalini awakening, self-sacrifice",
            structure: "Headless goddess - advanced geometry",
            mantra: "Om Shreem Hreem Kleem Aim Vajra Vairocaniye Hum Hum Phat Swaha",
            benefits: "Ego death, kundalini activation, ultimate liberation",
            danger: "EXTREMELY DANGEROUS - Guru essential, not for general practice",
            material: "Not for home worship - temple only",
            warning: "One of the most dangerous yantras - expert tantric only"
        },
        {
            name: "Dhumavati Yantra",
            deity: "Goddess Dhumavati (Widow Goddess)",
            purpose: "Detachment, removing misfortune, spiritual progress through hardship",
            structure: "Inauspicious yet powerful",
            mantra: "Om Dhumavatyai Namah",
            benefits: "Overcomes poverty, removes misfortune, grants detachment",
            nature: "Unpopular but powerful for overcoming adversity",
            material: "Iron or black stone"
        },
        {
            name: "Matangi Yantra",
            deity: "Goddess Matangi (Tantric Saraswati)",
            purpose: "Speech power, music, arts, domination, attraction",
            structure: "Artistic wisdom geometry",
            mantra: "Om Hreem Kleem Hum Matangai Phat Swaha",
            benefits: "Mastery of arts, powerful speech, attraction, control over others",
            power: "Grants power over speech and artistic expression",
            material: "Green cloth or emerald"
        },
        {
            name: "Kamala Yantra",
            deity: "Goddess Kamala (Lotus Goddess - form of Lakshmi)",
            purpose: "Wealth, prosperity, royalty, spiritual and material abundance",
            structure: "16-petal lotus",
            mantra: "Om Shreem Hreem Shreem Kamale Kamalaleyi Praseed Praseed...",
            benefits: "Complete prosperity, royal treatment, spiritual wealth",
            position: "Tenth and final Mahavidya",
            material: "Gold or lotus-shaped crystal"
        }
    ],
    
    specialized: [
        {
            name: "Vastu Yantra",
            purpose: "Home/space harmony, correcting vastu doshas, balancing five elements",
            type: "Environmental",
            structure: "Vastu Purusha Mandala - 81 divisions",
            benefit: "Balanced living space energy, removes vastu defects, harmonizes home",
            placement: "Center of house or each room",
            material: "Copper plate",
            power: "Corrects architectural defects energetically"
        },
        {
            name: "Sarva Karya Siddhi Yantra",
            purpose: "Success in all endeavors, completing pending tasks",
            type: "Achievement",
            mantra: "Om Hreem Kleem Shreem",
            benefit: "Universal success formula, completes stuck projects",
            ideal_for: "When multiple tasks are pending",
            material: "Gold or brass"
        },
        {
            name: "Vyapar Vridhi Yantra",
            purpose: "Business growth and expansion, increasing profits",
            type: "Commerce",
            benefit: "Trade prosperity, business expansion, customer attraction",
            placement: "Cash counter, office desk",
            material: "Copper or brass",
            day: "Wednesday (Mercury day - business)"
        },
        {
            name: "Santana Gopala Yantra",
            purpose: "Child conception, fertility, progeny blessings",
            type: "Family",
            deity: "Baby Krishna (Santana Gopala)",
            benefit: "Progeny blessing, healthy children, removes infertility",
            mantra: "Om Devakisutaya Namah",
            material: "Gold or silver",
            practice: "Worship by couple together"
        },
        {
            name: "Vashikaran Yantra",
            purpose: "Attraction, influence, controlling situations (CAUTION)",
            type: "Influence",
            benefit: "Magnetic personality, influence others positively",
            warning: "Ethical use only - can backfire if misused",
            danger: "Medium - requires pure intentions",
            material: "Copper",
            note: "Use for positive influence, not manipulation"
        },
        {
            name: "Mohini Yantra",
            purpose: "Enchantment, beauty, attraction, charm",
            type: "Charm",
            deity: "Mohini (Female form of Vishnu)",
            benefit: "Irresistible appeal, enhances beauty, attracts love",
            mantra: "Om Mohini Mohiniyai Namah",
            material: "Silver or gold",
            use: "Personal magnetism and charm"
        },
        {
            name: "Rog Nashak Yantra",
            purpose: "Disease removal, health restoration, immunity",
            type: "Healing",
            benefit: "Physical wellness, removes chronic disease, boosts immunity",
            mantra: "Om Hraum Namah",
            material: "Silver or copper",
            practice: "Keep under pillow or wear as amulet"
        },
        {
            name: "Kalsarp Yantra (Kaal Sarp Dosha Yantra)",
            purpose: "Neutralizing Kalsarp dosha, removing serpent curse",
            type: "Remedial",
            benefit: "Karmic clearing, removes snake-related fears, neutralizes Rahu-Ketu axis",
            structure: "Serpent energy configuration",
            material: "Silver or brass",
            worship: "Nag Panchami, Sundays"
        },
        {
            name: "Mangal Dosha Yantra (Manglik Dosha Yantra)",
            purpose: "Marriage obstacles removal, neutralizing Mars affliction",
            type: "Relationship",
            benefit: "Marital harmony, removes marriage delays, Mars pacification",
            mantra: "Mangal mantra + Hanuman mantra",
            material: "Copper (Mars metal)",
            day: "Tuesday"
        },
        {
            name: "Bhagya Samrajya Yantra",
            purpose: "Fortune enhancement, luck, favorable destiny",
            type: "Destiny",
            benefit: "Favorable fate, good luck in all matters, opens closed doors",
            structure: "Cosmic fortune grid",
            material: "Gold or copper",
            use: "Career advancement, life improvement"
        },
        {
            name: "Sarva Roga Nivaran Yantra",
            purpose: "All disease protection, immunity shield",
            type: "Health",
            benefit: "Immunity boost, protects from all diseases, energetic health shield",
            mantra: "Mahamrityunjaya mantra",
            material: "Silver",
            placement: "Wear as pendant or keep in bedroom"
        },
        {
            name: "Uchatana Yantra",
            purpose: "Removing unwanted people from life (DANGEROUS)",
            type: "Banishment",
            benefit: "Enemy removal, unwanted person leaves your life",
            warning: "DANGEROUS - High karmic backlash, use only as last resort",
            danger: "High - requires tantric knowledge",
            material: "Not recommended for personal use"
        },
        {
            name: "Vidya Yantra (Saraswati Vidya Yantra)",
            purpose: "Education, learning, exams, academic success",
            type: "Academic",
            benefit: "Intellectual brilliance, exam success, memory enhancement",
            deity: "Goddess Saraswati",
            material: "White marble or paper",
            placement: "Study desk, Northeast corner"
        },
        {
            name: "Shubh Labh Yantra",
            purpose: "Good fortune in business, auspicious gains",
            type: "Commerce",
            benefit: "Profit maximization, auspicious beginnings, good fortune in trade",
            symbol: "Ganesha + Lakshmi combined",
            material: "Copper or brass",
            placement: "Above entrance, shop/office"
        },
        {
            name: "Siddh Kuber Yantra",
            purpose: "Pre-energized wealth manifestation yantra",
            type: "Prosperity",
            benefit: "Financial abundance, rapid wealth attraction, treasure discovery",
            structure: "Kubera magic square - already energized",
            material: "Copper with gold plating",
            special: "More powerful than regular Kuber yantra"
        },
        {
            name: "Sampurna Maha Laxmi Yantra",
            purpose: "Complete wealth, prosperity in all 8 forms (Ashta Lakshmi)",
            type: "Wealth",
            structure: "Eight-petaled lotus for eight Lakshmis",
            benefit: "All 8 types of prosperity - wealth, food, courage, success, etc.",
            material: "Silver or gold",
            worship: "Fridays, Diwali"
        },
        {
            name: "Navgraha Yantra (Combined)",
            purpose: "Balancing all nine planetary influences",
            type: "Astrological",
            structure: "9-cell grid with all planetary yantras",
            benefit: "Complete astrological harmony, balances all planets",
            material: "Copper or Panchdhatu (5 metals)",
            use: "When multiple planets are afflicted"
        }
    ],
    
    chakra: [
        {
            name: "Muladhara Yantra",
            chakra: "Root Chakra (Base of spine)",
            element: "Earth (Prithvi)",
            color: "Red",
            petals: "4 petals",
            bija: "LAM",
            purpose: "Grounding, survival, stability, security, basic needs",
            animal: "Elephant (Airavata)",
            deity: "Ganesha / Brahma",
            benefits: "Financial security, physical health, fear removal, stability",
            meditation: "Red square, 4-petaled lotus"
        },
        {
            name: "Svadhisthana Yantra",
            chakra: "Sacral Chakra (Below navel)",
            element: "Water (Jala)",
            color: "Orange",
            petals: "6 petals",
            bija: "VAM",
            purpose: "Creativity, sexuality, emotions, pleasure, relationships",
            animal: "Crocodile (Makara)",
            deity: "Vishnu / Rakini",
            benefits: "Emotional balance, creative flow, sexual health, joy",
            meditation: "Orange crescent moon, 6-petaled lotus"
        },
        {
            name: "Manipura Yantra",
            chakra: "Solar Plexus Chakra (Navel)",
            element: "Fire (Agni)",
            color: "Yellow",
            petals: "10 petals",
            bija: "RAM",
            purpose: "Power, confidence, digestion, willpower, self-esteem",
            animal: "Ram",
            deity: "Rudra / Lakini",
            benefits: "Personal power, strong digestion, confidence, vitality",
            meditation: "Yellow inverted triangle, 10-petaled lotus"
        },
        {
            name: "Anahata Yantra",
            chakra: "Heart Chakra (Center of chest)",
            element: "Air (Vayu)",
            color: "Green",
            petals: "12 petals",
            bija: "YAM",
            purpose: "Love, compassion, healing, forgiveness, relationships",
            symbol: "Shatkona (Two interlaced triangles)",
            animal: "Antelope / Deer",
            deity: "Isha / Kakini",
            benefits: "Unconditional love, emotional healing, compassion, heart health",
            meditation: "Green hexagram (Star of David), 12-petaled lotus"
        },
        {
            name: "Vishuddha Yantra",
            chakra: "Throat Chakra (Throat)",
            element: "Ether/Space (Akasha)",
            color: "Blue",
            petals: "16 petals",
            bija: "HAM",
            purpose: "Communication, truth, expression, purification",
            animal: "White Elephant",
            deity: "Sadashiva / Shakini",
            benefits: "Clear communication, truthfulness, artistic expression, thyroid health",
            meditation: "Blue circle, 16-petaled lotus"
        },
        {
            name: "Ajna Yantra",
            chakra: "Third Eye Chakra (Between eyebrows)",
            element: "Light (Manas - Mind)",
            color: "Indigo",
            petals: "2 petals",
            bija: "OM (AUM)",
            purpose: "Intuition, vision, insight, wisdom, psychic abilities",
            symbol: "OM symbol, Inverted triangle",
            deity: "Ardhanarishvara (Shiva-Shakti united)",
            benefits: "Intuition enhancement, psychic powers, wisdom, vision clarity",
            meditation: "Indigo downward triangle, 2-petaled lotus"
        },
        {
            name: "Sahasrara Yantra",
            chakra: "Crown Chakra (Top of head)",
            element: "Consciousness (Pure awareness)",
            color: "Violet/White/Golden",
            petals: "1000 petals (Infinite)",
            bija: "Silence / OM",
            purpose: "Enlightenment, unity, transcendence, divine connection",
            symbol: "1000-petaled lotus",
            deity: "Shiva (Pure consciousness)",
            benefits: "Spiritual enlightenment, cosmic consciousness, liberation (Moksha)",
            meditation: "Violet/white infinite lotus, pure light",
            note: "Awakens only after all lower chakras are balanced"
        }
    ],
    
    directional: [
        {
            name: "Indra Yantra",
            direction: "East (Purva)",
            deity: "Indra (King of Gods)",
            element: "Lightning/Thunder",
            purpose: "Power, authority, leadership, rain, prosperity",
            benefit: "Leadership qualities, authority, royal power, success",
            color: "White/Silver",
            mantra: "Om Indraaya Namah"
        },
        {
            name: "Agni Yantra",
            direction: "Southeast (Agneya)",
            deity: "Agni (Fire God)",
            element: "Fire",
            purpose: "Purification, transformation, digestion, passion",
            benefit: "Digestive fire, purification, transformation, energy",
            color: "Red",
            mantra: "Om Agnaye Namah",
            vastu: "Kitchen should be in this direction"
        },
        {
            name: "Yama Yantra",
            direction: "South (Dakshina)",
            deity: "Yama (God of Death/Dharma)",
            element: "Death/Time",
            purpose: "Justice, dharma, ancestors, mortality",
            benefit: "Justice, dharma protection, ancestral blessings",
            color: "Black/Red",
            mantra: "Om Yamaaya Namah",
            note: "Inauspicious yet important for justice"
        },
        {
            name: "Nirrti Yantra",
            direction: "Southwest (Nairutya)",
            deity: "Nirrti/Nirriti (Goddess of Destruction)",
            element: "Destruction/Decay",
            purpose: "Protection from negativity, removing obstacles",
            benefit: "Protection from evil, removes negativity",
            color: "Black",
            mantra: "Om Nirityai Namah",
            vastu: "Master bedroom - heaviest part of house"
        },
        {
            name: "Varuna Yantra",
            direction: "West (Paschima)",
            deity: "Varuna (Water God)",
            element: "Water",
            purpose: "Emotions, intuition, fluidity, rain, ocean",
            benefit: "Emotional balance, intuition, water-related blessings",
            color: "Blue/Black",
            mantra: "Om Varunaaya Namah",
            vastu: "Water bodies should be in this direction"
        },
        {
            name: "Vayu Yantra",
            direction: "Northwest (Vayavya)",
            deity: "Vayu (Wind God)",
            element: "Air/Wind",
            purpose: "Movement, change, breath, communication",
            benefit: "Travel, change, movement, breath control, communication",
            color: "Grey/White",
            mantra: "Om Vayvae Namah",
            vastu: "Guest room, movement-related activities"
        },
        {
            name: "Kubera Yantra (Directional)",
            direction: "North (Uttara)",
            deity: "Kubera (God of Wealth)",
            element: "Wealth/Treasure",
            purpose: "Prosperity, abundance, wealth accumulation",
            benefit: "Financial prosperity, wealth attraction, treasure",
            color: "Yellow/Green",
            mantra: "Om Kuberaaya Namah",
            vastu: "Most auspicious direction - treasury, cash, valuables",
            special: "Direction of Kubera - Lord of wealth"
        },
        {
            name: "Ishana Yantra",
            direction: "Northeast (Ishanya)",
            deity: "Ishana (Form of Shiva)",
            element: "Spirit/Consciousness",
            purpose: "Spiritual growth, clarity, divine connection",
            benefit: "Spiritual enlightenment, mental clarity, divine grace",
            color: "White/Gold",
            mantra: "Om Ishanaya Namah",
            vastu: "Most sacred direction - meditation, prayer, water",
            special: "Direction of gods - most auspicious"
        },
        {
            name: "Brahma Yantra",
            direction: "Center (Madhya)",
            deity: "Brahma (Creator God)",
            element: "Creation/Ether",
            purpose: "Universal creation, manifestation, balance",
            benefit: "Creative power, manifestation, balance of all directions",
            color: "Golden",
            mantra: "Om Brahmane Namah",
            vastu: "Central courtyard, Brahmasthan - should be kept empty"
        },
        {
            name: "Ananta Yantra",
            direction: "Zenith (Above - Urdhva)",
            deity: "Ananta/Vishnu (Infinite Serpent)",
            element: "Sky/Infinity",
            purpose: "Infinite protection, cosmic shelter, divine grace",
            benefit: "Protection from above, cosmic blessings, infinity",
            color: "Blue",
            mantra: "Om Anantaaya Namah"
        }
    ],
    
    master: [
        {
            name: "Sri Yantra (Meru 3D Form)",
            type: "Ultimate 3D Master Yantra",
            structure: "43 triangles in 3D pyramid (Meru)",
            purpose: "Complete cosmic harmony, ultimate enlightenment, all desires fulfilled",
            difficulty: "Grandmaster level - requires lifetime practice",
            triangles: "9 interlocking (4 Shiva + 5 Shakti) in 3D",
            power: "Most powerful yantra in existence",
            material: "Crystal, gold, or specially carved stone",
            worship: "Complete Sri Vidya initiation required",
            benefits: "Everything - wealth, health, wisdom, liberation"
        },
        {
            name: "Kali Yantra (Tantric Master)",
            type: "Ultimate destruction/Liberation",
            structure: "Fierce triangular with cremation symbolism",
            purpose: "Ego death, moksha, time transcendence",
            difficulty: "Tantric expert only",
            power: "Destroys all that is false",
            danger: "Extreme - incorrect practice can cause psychological harm",
            material: "Black stone, iron, or special consecration",
            initiation: "Guru initiation absolutely essential"
        },
        {
            name: "Mahamrityunjaya Complex Yantra",
            type: "Ultimate healing/Life Protection",
            structure: "Multi-layered protective healing matrix",
            purpose: "Conquering death, ultimate healing, longevity",
            difficulty: "Ritual expert level",
            power: "Most powerful healing yantra",
            mantra: "Full Mahamrityunjaya with Rudra mantras",
            material: "Silver, crystal, or specialized metals",
            use: "Serious illness, life-threatening situations"
        },
        {
            name: "Batuk Bhairav Yantra",
            type: "Child Bhairava - Fierce yet innocent",
            structure: "Protective fierce geometry with childlike energy",
            purpose: "Protection for children, innocence preservation, tantric power",
            difficulty: "Specialized tantric knowledge",
            deity: "Batuka Bhairava (Child form of Bhairava)",
            power: "Powerful protection especially for children",
            material: "Copper or special yantra",
            nature: "Fierce protector with innocent energy"
        },
        {
            name: "Shodashi Yantra (16-Petaled Master)",
            type: "16-year-old Goddess - Ultimate beauty and power",
            structure: "16-petaled advanced Sri Yantra variant",
            purpose: "Beauty, youth, all 16 forms of desire fulfillment",
            difficulty: "Master level",
            deity: "Shodashi/Tripura Sundari (16-year form)",
            power: "Grants all worldly and spiritual desires",
            material: "Gold or crystal",
            initiation: "Sri Vidya initiation"
        }
    ],
    
    forbidden: [
        {
            name: "Maran Yantra",
            purpose: "Causing death or severe harm (ABSOLUTELY PROHIBITED)",
            danger: "EXTREME - Forbidden by all traditions",
            warning: "NEVER USE - Guaranteed severe karmic consequences, instant karmic return",
            note: "Only mentioned for educational awareness - DO NOT PRACTICE",
            karmic_result: "Instant destruction of practitioner's life",
            legal: "Criminal offense in most contexts"
        },
        {
            name: "Stambhan Yantra (Advanced)",
            purpose: "Paralyzing enemies, stopping opponents completely",
            danger: "High",
            warning: "Requires guru initiation, can backfire severely",
            use: "Defense only, never for attack",
            note: "Baglamukhi yantra is safer alternative",
            ethics: "Use only when all other options exhausted"
        },
        {
            name: "Mohan Yantra (Dark Version)",
            purpose: "Hypnotic control over others, mind control",
            danger: "High",
            warning: "Violates free will - severe karmic debt",
            use: "Ethical version for personal magnetism is acceptable",
            note: "Dark version attempts to control others - forbidden",
            alternative: "Use Mohini yantra for attraction without control"
        },
        {
            name: "Akarshan Yantra (Forced Attraction)",
            purpose: "Forcing someone to be attracted against their will",
            danger: "Medium to High",
            warning: "Free will violation - karmic consequences",
            note: "Attraction should be mutual and natural",
            ethics: "Use only for enhancing mutual attraction, not forcing",
            alternative: "Krishna yantra for natural divine love"
        },
        {
            name: "Videshan Yantra",
            purpose: "Creating discord, breaking relationships, separation",
            danger: "High",
            warning: "Destroys relationships - severe karmic backlash",
            use: "ONLY for separating from genuinely abusive situations",
            note: "Creates disharmony - use with extreme caution",
            karma: "What you break will break around you"
        },
        {
            name: "Uchatana Yantra (Extreme Banishment)",
            purpose: "Violent uprooting and banishment of people",
            danger: "Extreme",
            warning: "Tantric weapon - creates violent separation",
            note: "Milder versions exist for removing unwanted influences",
            use: "Last resort only, guru guidance essential",
            alternative: "Durga yantra for protection is safer"
        },
        {
            name: "Kritya Prayoga Yantra",
            purpose: "Sending psychic attacks, creating ghosts/entities",
            danger: "EXTREME",
            warning: "Creates negative entities - extremely dangerous",
            note: "Dark tantric practice - strictly forbidden",
            result: "Entities often turn on the practitioner",
            never: "Never practice - mentioned for awareness only"
        }
    ]
};

// Export for use in main page
if (typeof module !== 'undefined' && module.exports) {
    module.exports = completeYantraLibrary;
}
