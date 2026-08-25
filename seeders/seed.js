'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    const userPasswordHash = await bcrypt.hash('user12345', 10);

    // 1. DEVELOPERS (10 Data)
    await queryInterface.bulkInsert('developers', [
      { id: 1, nama: 'Rockstar Games', negara: 'Amerika Serikat', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, nama: 'CD Projekt Red', negara: 'Polandia', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, nama: 'FromSoftware', negara: 'Jepang', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, nama: 'Capcom', negara: 'Jepang', createdAt: new Date(), updatedAt: new Date() },
      { id: 5, nama: 'Ubisoft', negara: 'Prancis', createdAt: new Date(), updatedAt: new Date() },
      { id: 6, nama: 'Bethesda Game Studios', negara: 'Amerika Serikat', createdAt: new Date(), updatedAt: new Date() },
      { id: 7, nama: 'Square Enix', negara: 'Jepang', createdAt: new Date(), updatedAt: new Date() },
      { id: 8, nama: 'Naughty Dog', negara: 'Amerika Serikat', createdAt: new Date(), updatedAt: new Date() },
      { id: 9, nama: 'Electronic Arts', negara: 'Amerika Serikat', createdAt: new Date(), updatedAt: new Date() },
      { id: 10, nama: 'Valve', negara: 'Amerika Serikat', createdAt: new Date(), updatedAt: new Date() }
    ], {});

    // 2. GENRES (8 Data)
    await queryInterface.bulkInsert('genres', [
      { id: 1, nama: 'Action RPG', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, nama: 'Open World', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, nama: 'Survival Horror', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, nama: 'First-Person Shooter', createdAt: new Date(), updatedAt: new Date() },
      { id: 5, nama: 'Adventure', createdAt: new Date(), updatedAt: new Date() },
      { id: 6, nama: 'Soulslike', createdAt: new Date(), updatedAt: new Date() },
      { id: 7, nama: 'Stealth', createdAt: new Date(), updatedAt: new Date() },
      { id: 8, nama: 'Sci-Fi', createdAt: new Date(), updatedAt: new Date() }
    ], {});

    // 3. USERS (Tanpa api_key/role)
   await queryInterface.bulkInsert('users', [
  {
    id: 1,
    username: 'gamer_pro',
    email: 'gamer@playdex.com',
    password_hash: userPasswordHash,
    api_key: 'sk-proj-demo1234567890abcdef',
    createdAt: new Date(),
    updatedAt: new Date()
  }
], {});

    // 4. GAMES (50 Data)
    const rawGames = [
      { id: 1, judul: 'Grand Theft Auto V', deskripsi: 'Tiga kriminal merencanakan pencurian besar di Los Santos.', tahun_rilis: 2013, developer_id: 1, img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e' },
      { id: 2, judul: 'Red Dead Redemption 2', deskripsi: 'Kisah Arthur Morgan dan geng Van der Linde di era koboi.', tahun_rilis: 2018, developer_id: 1, img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23' },
      { id: 3, judul: 'The Witcher 3: Wild Hunt', deskripsi: 'Petualangan Geralt of Rivia mencari anak angkatnya Ciri.', tahun_rilis: 2015, developer_id: 2, img: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc' },
      { id: 4, judul: 'Cyberpunk 2077', deskripsi: 'Mercenary V menjelajahi kota futuristik Night City.', tahun_rilis: 2020, developer_id: 2, img: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd' },
      { id: 5, judul: 'Elden Ring', deskripsi: 'Eksplorasi Lands Between untuk menjadi Elden Lord.', tahun_rilis: 2022, developer_id: 3, img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f' },
      { id: 6, judul: 'Dark Souls III', deskripsi: 'Perjalanan berbahaya membakar kembali First Flame.', tahun_rilis: 2016, developer_id: 3, img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420' },
      { id: 7, judul: 'Bloodborne', deskripsi: 'Memburu monster dan rahasia kuno di kota Yharnam.', tahun_rilis: 2015, developer_id: 3, img: 'https://images.unsplash.com/photo-1563089145-599997674d42' },
      { id: 8, judul: 'Sekiro: Shadows Die Twice', deskripsi: 'Shinobi bertangan satu membalas dendam di era Sengoku.', tahun_rilis: 2019, developer_id: 3, img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675' },
      { id: 9, judul: 'Resident Evil 4 Remake', deskripsi: 'Leon S. Kennedy menyelamatkan putri presiden di desa terpencil.', tahun_rilis: 2023, developer_id: 4, img: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5' },
      { id: 10, judul: 'Resident Evil Village', deskripsi: 'Ethan Winters mencari putrinya yang diculik di desa misterius.', tahun_rilis: 2021, developer_id: 4, img: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f' },
      { id: 11, judul: 'Monster Hunter: World', deskripsi: 'Memburu monster raksasa di ekosistem baru yang hidup.', tahun_rilis: 2018, developer_id: 4, img: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd' },
      { id: 12, judul: 'Devil May Cry 5', deskripsi: 'Aksi stylish Nero dan Dante melawan invasi iblis.', tahun_rilis: 2019, developer_id: 4, img: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119' },
      { id: 13, judul: "Assassin's Creed Valhalla", deskripsi: 'Viking Eivor memimpin klan menjelajahi Inggris abad kegelapan.', tahun_rilis: 2020, developer_id: 5, img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e' },
      { id: 14, judul: "Assassin's Creed Odyssey", deskripsi: 'Menjadi tentara bayaran di masa Yunani kuno.', tahun_rilis: 2018, developer_id: 5, img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23' },
      { id: 15, judul: 'Far Cry 6', deskripsi: 'Gerilya melawan rezim otoriter di pulau tropis Yara.', tahun_rilis: 2021, developer_id: 5, img: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc' },
      { id: 16, judul: 'The Elder Scrolls V: Skyrim', deskripsi: 'Dragonborn ditakdirkan mengalahkan naga Alduin.', tahun_rilis: 2011, developer_id: 6, img: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd' },
      { id: 17, judul: 'Fallout 4', deskripsi: 'Bertahan hidup di dunia post-apocalyptic Boston.', tahun_rilis: 2015, developer_id: 6, img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f' },
      { id: 18, judul: 'Starfield', deskripsi: 'Eksplorasi antariksa skala besar menemukan artefak kuno.', tahun_rilis: 2023, developer_id: 6, img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420' },
      { id: 19, judul: 'Final Fantasy VII Remake', deskripsi: 'Cloud Strife bertarung melawan Shinra Electric Power Company.', tahun_rilis: 2020, developer_id: 7, img: 'https://images.unsplash.com/photo-1563089145-599997674d42' },
      { id: 20, judul: 'Final Fantasy XVI', deskripsi: 'Kisah tragedi dan balas dendam Clive Rosfield.', tahun_rilis: 2023, developer_id: 7, img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675' },
      { id: 21, judul: 'Kingdom Hearts III', deskripsi: 'Sora menjelajahi dunia Disney mengalahkan Darkness.', tahun_rilis: 2019, developer_id: 7, img: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5' },
      { id: 22, judul: 'The Last of Us Part I', deskripsi: 'Joel mengawal Ellie melintasi Amerika yang hancur karena infeksi.', tahun_rilis: 2022, developer_id: 8, img: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f' },
      { id: 23, judul: 'The Last of Us Part II', deskripsi: 'Perjalanan balas dendam Ellie di Seattle.', tahun_rilis: 2020, developer_id: 8, img: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd' },
      { id: 24, judul: 'Uncharted 4: A Thief\'s End', deskripsi: 'Nathan Drake mencari harta karun bajak laut Henry Avery.', tahun_rilis: 2016, developer_id: 8, img: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119' },
      { id: 25, judul: 'Apex Legends', deskripsi: 'Battle royale serba cepat dengan berbagai karakter bertalenta.', tahun_rilis: 2019, developer_id: 9, img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e' },
      { id: 26, judul: 'Dead Space Remake', deskripsi: 'Isaac Clarke bertahan hidup dari wabah Necromorph di USG Ishimura.', tahun_rilis: 2023, developer_id: 9, img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23' },
      { id: 27, judul: 'Mass Effect Legendary Edition', deskripsi: 'Komandan Shepard memimpin perlawanan melawan Reaper.', tahun_rilis: 2021, developer_id: 9, img: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc' },
      { id: 28, judul: 'Half-Life: Alyx', deskripsi: 'Petualangan VR melawan pasukan luar angkasa Combine.', tahun_rilis: 2020, developer_id: 10, img: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd' },
      { id: 29, judul: 'Portal 2', deskripsi: 'Memecahkan teka-teki fisika ruang memakai Portal Gun.', tahun_rilis: 2011, developer_id: 10, img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f' },
      { id: 30, judul: 'Left 4 Dead 2', deskripsi: 'Kerjasama 4 orang bertahan hidup dari serbuan Zombie.', tahun_rilis: 2009, developer_id: 10, img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420' },
      { id: 31, judul: 'GTA San Andreas', deskripsi: 'CJ pulang ke Los Santos menyelamatkan keluarga dan gengnya.', tahun_rilis: 2004, developer_id: 1, img: 'https://images.unsplash.com/photo-1563089145-599997674d42' },
      { id: 32, judul: 'GTA Vice City', deskripsi: 'Tommy Vercetti membangun kekaisaran kriminal di Vice City.', tahun_rilis: 2002, developer_id: 1, img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675' },
      { id: 33, judul: 'The Witcher 2: Assassins of Kings', deskripsi: 'Geralt diburu karena dituduh membunuh Raja Temeria.', tahun_rilis: 2011, developer_id: 2, img: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5' },
      { id: 34, judul: 'Demon\'s Souls Remake', deskripsi: 'Awal dari genre soulslike di kerajaan Boletaria.', tahun_rilis: 2020, developer_id: 3, img: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f' },
      { id: 35, judul: 'Dark Souls Remastered', deskripsi: 'Menjelajahi Lordran dalam petualangan bertema kutukan Undead.', tahun_rilis: 2018, developer_id: 3, img: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd' },
      { id: 36, judul: 'Resident Evil 2 Remake', deskripsi: 'Leon dan Claire bertahan di kantor polisi Raccoon City.', tahun_rilis: 2019, developer_id: 4, img: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119' },
      { id: 37, judul: 'Resident Evil 7: Biohazard', deskripsi: 'Ethan Winters mencari istrinya di rumah keluarga Baker.', tahun_rilis: 2017, developer_id: 4, img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e' },
      { id: 38, judul: 'Street Fighter 6', deskripsi: 'Game pertarungan generasi baru dengan mode World Tour.', tahun_rilis: 2023, developer_id: 4, img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23' },
      { id: 39, judul: 'Watch Dogs 2', deskripsi: 'Hacker Marcus Holloway bergabung dengan DedSec di San Francisco.', tahun_rilis: 2016, developer_id: 5, img: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc' },
      { id: 40, judul: 'Tom Clancy\'s Rainbow Six Siege', deskripsi: 'Shooter taktis pertempuran jarak dekat 5v5.', tahun_rilis: 2015, developer_id: 5, img: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd' },
      { id: 41, judul: 'Fallout: New Vegas', deskripsi: 'Perang memperebutkan Hoover Dam di Mojave Wasteland.', tahun_rilis: 2010, developer_id: 6, img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f' },
      { id: 42, judul: 'NieR: Automata', deskripsi: 'Android 2B dan 9S bertarung merebut bumi dari mesin.', tahun_rilis: 2017, developer_id: 7, img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420' },
      { id: 43, judul: 'Dragon Quest XI', deskripsi: 'Luminary yang difitnah bertualang menyelamatkan Erdrea.', tahun_rilis: 2017, developer_id: 7, img: 'https://images.unsplash.com/photo-1563089145-599997674d42' },
      { id: 44, judul: 'Uncharted: The Nathan Drake Collection', deskripsi: 'Kompilasi trilogi petualangan Nathan Drake.', tahun_rilis: 2015, developer_id: 8, img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675' },
      { id: 45, judul: 'Star Wars Jedi: Survivor', deskripsi: 'Cal Kestis melanjutkan perlawanan terhadap Kekaisaran.', tahun_rilis: 2023, developer_id: 9, img: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5' },
      { id: 46, judul: 'Titanfall 2', deskripsi: 'Kemitraan antara Pilot Jack Cooper dan Titan BT-7274.', tahun_rilis: 2016, developer_id: 9, img: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f' },
      { id: 47, judul: 'Counter-Strike 2', deskripsi: 'Generasi baru dari FPS kompetitif legendaris.', tahun_rilis: 2023, developer_id: 10, img: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd' },
      { id: 48, judul: 'Team Fortress 2', deskripsi: 'Shooter multiplayer berbasis kelas yang legendaris.', tahun_rilis: 2007, developer_id: 10, img: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119' },
      { id: 49, judul: 'Bully: Scholarship Edition', deskripsi: 'Jimmy Hopkins menavigasi kehidupan sekolah Bullworth Academy.', tahun_rilis: 2006, developer_id: 1, img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e' },
      { id: 50, judul: 'Armored Core VI: Fires of Rubicon', deskripsi: 'Pertempuran robot Mech serba cepat di planet Rubicon 3.', tahun_rilis: 2023, developer_id: 3, img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23' }
    ];

    const gamesData = rawGames.map(g => ({
      id: g.id,
      judul: g.judul,
      deskripsi: g.deskripsi,
      tahun_rilis: g.tahun_rilis,
      gambar: g.img,
      developer_id: g.developer_id,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('games', gamesData, {});

    // 5. PIVOT TABLE (Game_genre)
    const pivotData = [];
    for (let i = 1; i <= 50; i++) {
      const primaryGenre = (i % 8) + 1;
      const secondaryGenre = ((i + 3) % 8) + 1;
      
      pivotData.push({ game_id: i, genre_id: primaryGenre, createdAt: new Date(), updatedAt: new Date() });
      if (primaryGenre !== secondaryGenre) {
        pivotData.push({ game_id: i, genre_id: secondaryGenre, createdAt: new Date(), updatedAt: new Date() });
      }
    }

    await queryInterface.bulkInsert('Game_genre', pivotData, {});

    // 6. CHAT DEMO
    await queryInterface.bulkInsert('chats', [
      {
        id: 1,
        user_id: 1,
        pesan_user: 'Rekomendasikan game open world dari Rockstar.',
        balasan_ai: 'Saya merekomendasikan Grand Theft Auto V dan Red Dead Redemption 2!',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('chats', null, {});
    await queryInterface.bulkDelete('Game_genre', null, {});
    await queryInterface.bulkDelete('games', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('genres', null, {});
    await queryInterface.bulkDelete('developers', null, {});
  }
};