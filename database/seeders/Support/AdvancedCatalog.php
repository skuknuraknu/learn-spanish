<?php

namespace Database\Seeders\Support;

/**
 * Modules 4-13: progressively harder content (upper beginner → advanced).
 * Every section has 3 sentences and 3 multiple-choice questions whose
 * distractors are deliberately near-identical (tense, accent, person, register traps).
 */
class AdvancedCatalog
{
    /** Words used by the sentences below that are not in the base lexicon. */
    public static function lexicon(): array
    {
        return AdvancedLexicon::words();
    }

    /**
     * Question tuple: [sentence index, prompt, stem, choices, correct answer, explanation].
     */
    private static function q(int $sentence, string $prompt, string $stem, array $choices, string $correct, string $why): array
    {
        return [$sentence, $prompt, $stem, $choices, $correct, $why];
    }

    private static function section(string $title, string $description, string $category, array $sentences, array $questions): array
    {
        return compact('title', 'description', 'category', 'sentences', 'questions');
    }

    /** @return array<int, array<string, mixed>> */
    public static function modules(): array
    {
        return [
            // ───────────────────────── Modul 4 ─────────────────────────
            [
                'title' => 'Modul 4: Rutinitas Harian dan Waktu',
                'description' => 'Verba refleksif, menyebut jam, dan menceritakan kegiatan sehari-hari.',
                'difficulty' => 'upper beginner',
                'sections' => [
                    self::section('Section 1: Verba refleksif', 'Kegiatan pagi hari dengan me/te/se/nos.', 'Rutina diaria', [
                        ['Me levanto a las siete.', 'I get up at seven.'],
                        ['Ella se ducha por la mañana.', 'She showers in the morning.'],
                        ['Nos vestimos y desayunamos juntos.', 'We get dressed and have breakfast together.'],
                    ], [
                        self::q(0, 'I get up at seven.', 'Yo ___ a las siete.', ['me levanto', 'me levantas', 'se levanta', 'te levanto'], 'me levanto', 'Subjek "yo" memakai pronomina refleksif "me" dan verba bentuk yo.'),
                        self::q(1, 'She showers in the morning.', 'Ella ___ por la mañana.', ['se ducha', 'me ducha', 'se duchan', 'te duchas'], 'se ducha', '"Ella" butuh "se" dan verba orang ketiga tunggal.'),
                        self::q(2, 'We get dressed and have breakfast together.', 'Nosotros ___ y desayunamos juntos.', ['nos vestimos', 'se vestimos', 'nos vestís', 'os vestimos'], 'nos vestimos', '"Nosotros" berpasangan dengan "nos" dan akhiran -imos.'),
                    ]),
                    self::section('Section 2: Menyebut jam', 'Bertanya dan menjawab pukul berapa.', 'La hora', [
                        ['¿Qué hora es?', 'What time is it?'],
                        ['Son las tres y media.', 'It is half past three.'],
                        ['La clase empieza a las ocho en punto.', 'The class starts at eight sharp.'],
                    ], [
                        self::q(1, 'It is half past three.', '___ las tres y media.', ['Son', 'Es', 'Están', 'Hay'], 'Son', 'Jam selain pukul satu memakai "son" (jamak).'),
                        self::q(1, 'It is one o\'clock.', '___ la una en punto.', ['Es', 'Son', 'Está', 'Hay'], 'Es', 'Pukul satu tunggal, jadi "es la una".'),
                        self::q(2, 'The class starts at eight sharp.', 'La clase empieza ___ las ocho en punto.', ['a', 'en', 'de', 'por'], 'a', 'Waktu tepat memakai preposisi "a".'),
                    ]),
                    self::section('Section 3: Rutinitas kerja', 'Jam kerja, makan siang, dan malam hari.', 'Trabajo y casa', [
                        ['Trabajo desde las nueve hasta las cinco.', 'I work from nine until five.'],
                        ['Siempre almuerzo con mis compañeros.', 'I always have lunch with my colleagues.'],
                        ['Después de cenar, veo la televisión.', 'After dinner, I watch television.'],
                    ], [
                        self::q(0, 'I work from nine until five.', 'Trabajo ___ las nueve ___ las cinco.', ['desde / hasta', 'hasta / desde', 'por / hasta', 'en / hasta'], 'desde / hasta', '"Desde" menandai awal, "hasta" menandai akhir.'),
                        self::q(1, 'I always have lunch with my colleagues.', 'Yo ___ con mis compañeros.', ['almuerzo', 'almorzo', 'almuerza', 'almorzamos'], 'almuerzo', 'Verba almorzar berubah o→ue pada bentuk yo.'),
                        self::q(2, 'After dinner, I watch television (present tense).', 'Después de cenar, ___ la televisión.', ['veo', 'veía', 'vi', 'vería'], 'veo', 'Kebiasaan sekarang memakai presente: yo veo.'),
                    ]),
                ],
            ],

            // ───────────────────────── Modul 5 ─────────────────────────
            [
                'title' => 'Modul 5: Belanja dan Pakaian',
                'description' => 'Membeli pakaian, menawar harga, dan menyebut jumlah di pasar.',
                'difficulty' => 'upper beginner',
                'sections' => [
                    self::section('Section 1: Pakaian', 'Mencari dan mencoba pakaian.', 'Ropa', [
                        ['Busco una camisa azul.', 'I am looking for a blue shirt.'],
                        ['Estos zapatos son muy cómodos.', 'These shoes are very comfortable.'],
                        ['¿Tiene esta chaqueta en otra talla?', 'Do you have this jacket in another size?'],
                    ], [
                        self::q(0, 'I am looking for a blue shirt.', 'Busco una camisa ___.', ['azul', 'azula', 'azules', 'azuls'], 'azul', '"Azul" berakhiran konsonan, tidak berubah untuk gender.'),
                        self::q(1, 'These shoes are very comfortable (near the speaker).', '___ zapatos son muy cómodos.', ['Estos', 'Esto', 'Estas', 'Esos'], 'Estos', '"Estos" = ini (maskulin jamak); "esos" = itu.'),
                        self::q(2, 'Do you have this jacket in another size?', '¿Tiene esta chaqueta en otra ___?', ['talla', 'tela', 'tienda', 'tarea'], 'talla', '"Talla" = ukuran; "tela" = kain; "tienda" = toko.'),
                    ]),
                    self::section('Section 2: Harga dan tawar-menawar', 'Menanyakan harga dan meminta diskon.', 'Precios', [
                        ['¿Cuánto cuestan estas manzanas?', 'How much do these apples cost?'],
                        ['Es demasiado caro para mí.', 'It is too expensive for me.'],
                        ['¿Me puede hacer un descuento?', 'Can you give me a discount?'],
                    ], [
                        self::q(0, 'How much do these apples cost?', '¿Cuánto ___ estas manzanas?', ['cuestan', 'cuesta', 'cuestas', 'cuestamos'], 'cuestan', 'Subjek jamak (manzanas) → cuestan.'),
                        self::q(1, 'It is too expensive for me.', 'Es demasiado caro para ___.', ['mí', 'mi', 'me', 'yo'], 'mí', 'Setelah preposisi dipakai "mí" (dengan aksen).'),
                        self::q(2, 'Can you give me a discount?', '¿___ puede hacer un descuento?', ['Me', 'Mi', 'Mí', 'Mis'], 'Me', 'Pronomina objek tak langsung "me" tanpa aksen.'),
                    ]),
                    self::section('Section 3: Jumlah di pasar', 'Mengungkapkan jumlah dan kecukupan.', 'Mercado', [
                        ['Quiero medio kilo de queso.', 'I want half a kilo of cheese.'],
                        ['Necesito un poco de pan.', 'I need a little bread.'],
                        ['No tengo suficiente dinero.', 'I do not have enough money.'],
                    ], [
                        self::q(0, 'I want half a kilo of cheese.', 'Quiero ___ kilo de queso.', ['medio', 'media', 'mitad', 'medios'], 'medio', '"Kilo" maskulin, jadi "medio" (bukan media).'),
                        self::q(1, 'I need a little bread.', 'Necesito un poco ___ pan.', ['de', 'da', 'desde', 'en'], 'de', '"Un poco de" + benda tak terhitung.'),
                        self::q(2, 'I do not have enough money.', 'No tengo ___ dinero.', ['suficiente', 'suficientes', 'suficientemente', 'bastar'], 'suficiente', 'Adjektiva "suficiente" sebelum nomina; bukan adverbia.'),
                    ]),
                ],
            ],

            // ───────────────────────── Modul 6 ─────────────────────────
            [
                'title' => 'Modul 6: Bercerita tentang Masa Lalu',
                'description' => 'Pretérito perfecto, pretérito indefinido, dan penanda waktu lampau.',
                'difficulty' => 'intermediate',
                'sections' => [
                    self::section('Section 1: Pretérito perfecto', 'Pengalaman yang masih terkait dengan sekarang.', 'Pretérito perfecto', [
                        ['Hoy he comido paella.', 'Today I have eaten paella.'],
                        ['¿Ya has visitado Madrid?', 'Have you already visited Madrid?'],
                        ['Todavía no hemos terminado.', 'We have not finished yet.'],
                    ], [
                        self::q(0, 'Today I have eaten paella (present perfect).', 'Hoy ___ paella.', ['he comido', 'comí', 'comía', 'había comido'], 'he comido', '"Hoy" masih berjalan → haber (presente) + participio.'),
                        self::q(1, 'Have you (tú) already visited Madrid?', '¿Ya ___ visitado Madrid?', ['has', 'ha', 'he', 'hemos'], 'has', 'Tú → "has"; "ha" untuk él/ella.'),
                        self::q(2, 'We have not finished yet.', 'Todavía no ___ terminado.', ['hemos', 'habemos', 'somos', 'estamos'], 'hemos', 'Bentuk nosotros dari haber adalah "hemos".'),
                    ]),
                    self::section('Section 2: Pretérito indefinido', 'Peristiwa selesai pada waktu tertentu.', 'Pretérito indefinido', [
                        ['Ayer fui al cine con mis amigos.', 'Yesterday I went to the cinema with my friends.'],
                        ['Ella salió de casa a las ocho.', 'She left home at eight.'],
                        ['Compramos el billete el lunes pasado.', 'We bought the ticket last Monday.'],
                    ], [
                        self::q(0, 'Yesterday I went to the cinema (one completed event).', 'Ayer ___ al cine con mis amigos.', ['fui', 'fue', 'iba', 'voy'], 'fui', 'Ir (indefinido, yo) = fui; "fue" untuk él/ella.'),
                        self::q(1, 'She left home at eight.', 'Ella ___ de casa a las ocho.', ['salió', 'salí', 'salía', 'sale'], 'salió', 'Indefinido orang ketiga tunggal: salió (beraksen).'),
                        self::q(2, 'We bought the ticket last Monday.', '___ el billete el lunes pasado.', ['Compramos', 'Compraremos', 'Comprábamos', 'Compremos'], 'Compramos', 'Peristiwa selesai: indefinido nosotros.'),
                    ]),
                    self::section('Section 3: Penanda waktu lampau', 'hace, anoche, nunca, dan pasangannya.', 'Marcadores de tiempo', [
                        ['Hace dos años viví en Barcelona.', 'Two years ago I lived in Barcelona.'],
                        ['Anoche dormí muy mal.', 'Last night I slept very badly.'],
                        ['Nunca he probado el pulpo.', 'I have never tried octopus.'],
                    ], [
                        self::q(0, 'Two years ago I lived in Barcelona.', '___ dos años viví en Barcelona.', ['Hace', 'Hay', 'Hacía', 'Desde'], 'Hace', '"Hace + waktu" = yang lalu.'),
                        self::q(1, 'Last night I slept very badly.', 'Anoche ___ muy mal.', ['dormí', 'dormió', 'dormía', 'dormiré'], 'dormí', 'Yo + indefinido: dormí (bukan dormió = ella).'),
                        self::q(2, 'I have never tried octopus (present perfect, I).', 'Nunca ___ probado el pulpo.', ['he', 'ha', 'había', 'hay'], 'he', 'Yo → "he"; "ha" untuk orang ketiga.'),
                    ]),
                ],
            ],

            // ───────────────────────── Modul 7 ─────────────────────────
            [
                'title' => 'Modul 7: Ser vs Estar dan Por vs Para',
                'description' => 'Membedakan dua pasang kata yang paling sering tertukar.',
                'difficulty' => 'intermediate',
                'sections' => [
                    self::section('Section 1: Ser dan estar dasar', 'Identitas dan keadaan sementara.', 'Ser y estar', [
                        ['Mi hermano es médico.', 'My brother is a doctor.'],
                        ['Hoy el café está frío.', 'Today the coffee is cold.'],
                        ['La fiesta es en mi casa.', 'The party is at my house.'],
                    ], [
                        self::q(0, 'My brother is a doctor (profession).', 'Mi hermano ___ médico.', ['es', 'está', 'hay', 'tiene'], 'es', 'Profesi memakai ser.'),
                        self::q(1, 'Today the coffee is cold (temporary state).', 'Hoy el café ___ frío.', ['está', 'es', 'hay', 'tiene'], 'está', 'Keadaan sementara memakai estar.'),
                        self::q(2, 'The party is at my house (location of an event).', 'La fiesta ___ en mi casa.', ['es', 'está', 'hay', 'sea'], 'es', 'Lokasi acara/peristiwa memakai ser.'),
                    ]),
                    self::section('Section 2: Makna berubah', 'Adjektiva yang artinya berbeda dengan ser/estar.', 'Cambio de significado', [
                        ['Ella es aburrida.', 'She is boring.'],
                        ['Ella está aburrida.', 'She is bored.'],
                        ['Los plátanos están verdes todavía.', 'The bananas are still green.'],
                    ], [
                        self::q(0, 'She is boring (personality).', 'Ella ___ aburrida.', ['es', 'está', 'ser', 'estar'], 'es', 'Ser + aburrida = membosankan (sifat).'),
                        self::q(1, 'She is bored (right now).', 'Ahora ella ___ aburrida.', ['está', 'es', 'ser', 'estar'], 'está', 'Estar + aburrida = sedang bosan.'),
                        self::q(2, 'The bananas are still green (unripe).', 'Los plátanos ___ verdes todavía.', ['están', 'son', 'es', 'está'], 'están', 'Belum matang = keadaan → estar (jamak).'),
                    ]),
                    self::section('Section 3: Por dan para', 'Sebab, tujuan, dan penerima.', 'Por y para', [
                        ['Este regalo es para ti.', 'This gift is for you.'],
                        ['Gracias por tu ayuda.', 'Thanks for your help.'],
                        ['Estudio para ser ingeniero.', 'I study to become an engineer.'],
                    ], [
                        self::q(0, 'This gift is for you (recipient).', 'Este regalo es ___ ti.', ['para', 'por', 'de', 'a'], 'para', 'Penerima → para.'),
                        self::q(1, 'Thanks for your help (reason).', 'Gracias ___ tu ayuda.', ['por', 'para', 'de', 'con'], 'por', 'Berterima kasih atas sesuatu → por.'),
                        self::q(2, 'I study in order to become an engineer (purpose).', 'Estudio ___ ser ingeniero.', ['para', 'por', 'pues', 'pro'], 'para', 'Tujuan + infinitivo → para.'),
                    ]),
                ],
            ],

            // ───────────────────────── Modul 8 ─────────────────────────
            [
                'title' => 'Modul 8: Kesehatan dan Keadaan Darurat',
                'description' => 'Di dokter, perintah formal, dan situasi darurat.',
                'difficulty' => 'intermediate',
                'sections' => [
                    self::section('Section 1: Di dokter', 'Menyebut keluhan dan membuat janji.', 'Salud', [
                        ['Me duele la cabeza.', 'My head hurts.'],
                        ['Tengo fiebre y tos.', 'I have a fever and a cough.'],
                        ['Necesito una cita con el médico.', 'I need an appointment with the doctor.'],
                    ], [
                        self::q(0, 'My head hurts.', 'Me ___ la cabeza.', ['duele', 'duelen', 'duela', 'duelo'], 'duele', 'Subjek tunggal (la cabeza) → duele.'),
                        self::q(0, 'My feet hurt.', 'Me ___ los pies.', ['duelen', 'duele', 'duelo', 'dolen'], 'duelen', 'Subjek jamak (los pies) → duelen.'),
                        self::q(2, 'I need an appointment with the doctor.', 'Necesito una ___ con el médico.', ['cita', 'cuenta', 'cima', 'cuota'], 'cita', '"Cita" = janji temu.'),
                    ]),
                    self::section('Section 2: Perintah formal', 'Imperativo usted dan perbedaannya dengan tú.', 'Imperativo', [
                        ['Tome esta medicina dos veces al día.', 'Take this medicine twice a day.'],
                        ['Beba mucha agua.', 'Drink a lot of water.'],
                        ['No salga de casa hoy.', 'Do not leave the house today.'],
                    ], [
                        self::q(0, 'Take this medicine (formal, usted).', '___ esta medicina.', ['Tome', 'Toma', 'Tomes', 'Tomar'], 'Tome', 'Imperativo formal memakai bentuk subjuntivo: tome.'),
                        self::q(1, 'Drink a lot of water (informal tú, affirmative).', '___ mucha agua.', ['Bebe', 'Beba', 'Bebes', 'Beber'], 'Bebe', 'Tú afirmatif = bentuk él/ella: bebe.'),
                        self::q(2, 'Do not leave home today (informal tú, negative).', 'No ___ de casa hoy.', ['salgas', 'sal', 'salga', 'sales'], 'salgas', 'Tú negatif memakai subjuntivo: no salgas.'),
                    ]),
                    self::section('Section 3: Keadaan darurat', 'Meminta pertolongan dan melapor.', 'Emergencias', [
                        ['¡Llame a una ambulancia!', 'Call an ambulance!'],
                        ['Me he perdido.', 'I have got lost.'],
                        ['Alguien ha robado mi mochila.', 'Someone has stolen my backpack.'],
                    ], [
                        self::q(0, 'Call an ambulance! (formal, usted)', '¡___ a una ambulancia!', ['Llame', 'Llama', 'Llamas', 'Llamar'], 'Llame', 'Perintah formal: llame.'),
                        self::q(1, 'I have got lost.', 'Me ___ perdido.', ['he', 'ha', 'hemos', 'hay'], 'he', '"Me" menunjukkan subjek yo → he.'),
                        self::q(2, 'Someone has stolen my backpack.', 'Alguien ha ___ mi mochila.', ['robado', 'robar', 'robando', 'robó'], 'robado', 'Haber + participio: robado.'),
                    ]),
                ],
            ],

            // ───────────────────────── Modul 9 ─────────────────────────
            [
                'title' => 'Modul 9: Kenangan dan Rencana Masa Depan',
                'description' => 'Imperfecto, kontras imperfecto vs indefinido, dan futuro.',
                'difficulty' => 'upper intermediate',
                'sections' => [
                    self::section('Section 1: Pretérito imperfecto', 'Kebiasaan dan latar masa lalu.', 'Imperfecto', [
                        ['De niño jugaba al fútbol todos los días.', 'As a child I played football every day.'],
                        ['Mi abuela siempre cocinaba para toda la familia.', 'My grandmother always cooked for the whole family.'],
                        ['Cuando llegué, ya llovía.', 'When I arrived, it was already raining.'],
                    ], [
                        self::q(0, 'As a child I used to play football every day.', 'De niño ___ al fútbol todos los días.', ['jugaba', 'jugué', 'he jugado', 'jugaría'], 'jugaba', 'Kebiasaan lampau → imperfecto.'),
                        self::q(1, 'My grandmother always cooked for the whole family (habit).', 'Mi abuela siempre ___ para toda la familia.', ['cocinaba', 'cocinaban', 'cocinó', 'cocinaría'], 'cocinaba', 'Abuela tunggal + kebiasaan → cocinaba.'),
                        self::q(2, 'When I arrived, it was already raining.', 'Cuando llegué, ya ___.', ['llovía', 'llovió', 'llueve', 'lloviera'], 'llovía', 'Kondisi latar yang sedang berlangsung → imperfecto.'),
                    ]),
                    self::section('Section 2: Imperfecto vs indefinido', 'Aksi latar belakang dan aksi yang menyela.', 'Contraste de pasados', [
                        ['Estaba cenando cuando sonó el teléfono.', 'I was having dinner when the phone rang.'],
                        ['Mientras ella leía, él cocinaba.', 'While she was reading, he was cooking.'],
                        ['Ayer hacía frío, así que me quedé en casa.', 'Yesterday it was cold, so I stayed home.'],
                    ], [
                        self::q(0, 'I was having dinner when the phone rang.', 'Estaba cenando cuando ___ el teléfono.', ['sonó', 'sonaba', 'suena', 'sonara'], 'sonó', 'Aksi menyela yang singkat → indefinido.'),
                        self::q(1, 'While she was reading, he was cooking.', 'Mientras ella ___, él cocinaba.', ['leía', 'leyó', 'lee', 'leyera'], 'leía', 'Dua aksi paralel → imperfecto keduanya.'),
                        self::q(2, 'Yesterday it was cold, so I stayed home.', 'Ayer hacía frío, así que me ___ en casa.', ['quedé', 'quedaba', 'quedo', 'quedaría'], 'quedé', 'Keputusan selesai → indefinido.'),
                    ]),
                    self::section('Section 3: Futuro', 'Rencana, prediksi, dan kondisi nyata.', 'Futuro', [
                        ['Mañana viajaré a Sevilla.', 'Tomorrow I will travel to Seville.'],
                        ['Voy a estudiar más el próximo año.', 'I am going to study more next year.'],
                        ['Si llueve, no saldremos.', 'If it rains, we will not go out.'],
                    ], [
                        self::q(0, 'Tomorrow I will travel to Seville (simple future).', 'Mañana ___ a Sevilla.', ['viajaré', 'viajé', 'viajaría', 'viajo'], 'viajaré', 'Futuro simple yo: viajaré (beraksen).'),
                        self::q(1, 'I am going to study more next year.', 'Voy a ___ más el próximo año.', ['estudiar', 'estudio', 'estudiaré', 'estudiando'], 'estudiar', 'Ir a + infinitivo.'),
                        self::q(2, 'If it rains, we will not go out (real condition).', 'Si llueve, no ___.', ['saldremos', 'saldríamos', 'saldrán', 'salgamos'], 'saldremos', 'Si + presente → futuro.'),
                    ]),
                ],
            ],

            // ───────────────────────── Modul 10 ─────────────────────────
            [
                'title' => 'Modul 10: Harapan dan Saran (Subjuntivo)',
                'description' => 'Pengenalan modo subjuntivo untuk harapan, saran, dan keraguan.',
                'difficulty' => 'upper intermediate',
                'sections' => [
                    self::section('Section 1: Keinginan dan harapan', 'Querer que, esperar que, ojalá.', 'Deseos', [
                        ['Quiero que vengas a mi fiesta.', 'I want you to come to my party.'],
                        ['Espero que tengas un buen viaje.', 'I hope you have a good trip.'],
                        ['Ojalá no llueva mañana.', 'I hope it does not rain tomorrow.'],
                    ], [
                        self::q(0, 'I want you to come to my party.', 'Quiero que ___ a mi fiesta.', ['vengas', 'vienes', 'venías', 'vendrás'], 'vengas', 'Querer que + subjuntivo.'),
                        self::q(1, 'I hope you have a good trip.', 'Espero que ___ un buen viaje.', ['tengas', 'tienes', 'tendrás', 'tuvieras'], 'tengas', 'Esperar que + subjuntivo presente.'),
                        self::q(2, 'I hope it does not rain tomorrow.', 'Ojalá no ___ mañana.', ['llueva', 'llueve', 'lloverá', 'llovía'], 'llueva', 'Ojalá + subjuntivo presente untuk harapan yang mungkin.'),
                    ]),
                    self::section('Section 2: Saran dan keraguan', 'Recomendar que, dudar que, es importante que.', 'Consejos y dudas', [
                        ['Te recomiendo que descanses más.', 'I recommend that you rest more.'],
                        ['Dudo que él sepa la respuesta.', 'I doubt he knows the answer.'],
                        ['Es importante que hables despacio.', 'It is important that you speak slowly.'],
                    ], [
                        self::q(0, 'I recommend that you rest more.', 'Te recomiendo que ___ más.', ['descanses', 'descansas', 'descansarás', 'descansar'], 'descanses', 'Recomendar que + subjuntivo (tú).'),
                        self::q(1, 'I doubt he knows the answer.', 'Dudo que él ___ la respuesta.', ['sepa', 'sabe', 'sabrá', 'supo'], 'sepa', 'Keraguan memicu subjuntivo: saber → sepa.'),
                        self::q(2, 'It is important that you (tú) speak slowly.', 'Es importante que ___ despacio.', ['hables', 'hable', 'hablas', 'hablaras'], 'hables', 'Tú subjuntivo: hables (bukan hable = usted/él).'),
                    ]),
                    self::section('Section 3: Indicativo atau subjuntivo?', 'Keyakinan memakai indikatif, ketidakyakinan memakai subjuntivo.', 'Creer y ser', [
                        ['Creo que tienes razón.', 'I think you are right.'],
                        ['No creo que tengas razón.', 'I do not think you are right.'],
                        ['Es verdad que ella trabaja mucho.', 'It is true that she works a lot.'],
                    ], [
                        self::q(0, 'I think you are right.', 'Creo que ___ razón.', ['tienes', 'tengas', 'tuvieras', 'tendrías'], 'tienes', 'Creer (afirmatif) + indikatif.'),
                        self::q(1, 'I do not think you are right.', 'No creo que ___ razón.', ['tengas', 'tienes', 'tendrás', 'tenías'], 'tengas', 'No creer que + subjuntivo.'),
                        self::q(2, 'It is true that she works a lot.', 'Es verdad que ella ___ mucho.', ['trabaja', 'trabaje', 'trabajara', 'trabajaría'], 'trabaja', 'Es verdad que = fakta → indikatif.'),
                    ]),
                ],
            ],

            // ───────────────────────── Modul 11 ─────────────────────────
            [
                'title' => 'Modul 11: Pengandaian dan Kalimat Sopan',
                'description' => 'Kondisional, kalimat si tidak nyata, dan harapan yang mustahil.',
                'difficulty' => 'advanced',
                'sections' => [
                    self::section('Section 1: Kondisional sopan', 'Permintaan halus dan saran.', 'Cortesía', [
                        ['Me gustaría reservar una mesa.', 'I would like to reserve a table.'],
                        ['¿Podría ayudarme, por favor?', 'Could you help me, please?'],
                        ['En tu lugar, yo hablaría con él.', 'In your place, I would talk to him.'],
                    ], [
                        self::q(0, 'I would like to reserve a table (polite conditional).', 'Me ___ reservar una mesa.', ['gustaría', 'gusta', 'gustaba', 'gustaré'], 'gustaría', 'Kesopanan: condicional.'),
                        self::q(1, 'Could you help me? (conditional)', '¿___ ayudarme, por favor?', ['Podría', 'Puede', 'Pudo', 'Podía'], 'Podría', 'Condicional poder untuk permintaan sopan.'),
                        self::q(2, 'In your place, I would talk to him.', 'En tu lugar, yo ___ con él.', ['hablaría', 'hablo', 'hablé', 'hablara'], 'hablaría', 'Saran hipotetis → condicional.'),
                    ]),
                    self::section('Section 2: Kalimat si (tidak nyata)', 'Si + imperfecto de subjuntivo, condicional.', 'Oraciones con si', [
                        ['Si tuviera tiempo, viajaría más.', 'If I had time, I would travel more.'],
                        ['Si hubiera estudiado, habría aprobado.', 'If I had studied, I would have passed.'],
                        ['Si fuera rico, compraría una isla.', 'If I were rich, I would buy an island.'],
                    ], [
                        self::q(0, 'If I had time (unreal present), I would travel more.', 'Si tuviera tiempo, ___ más.', ['viajaría', 'viajaré', 'viajaba', 'viajara'], 'viajaría', 'Si + subjuntivo imperfecto → condicional.'),
                        self::q(1, 'If I had studied, I would have passed (unreal past).', 'Si hubiera estudiado, ___ aprobado.', ['habría', 'había', 'he', 'hay'], 'habría', 'Si + pluscuamperfecto subj. → condicional perfecto.'),
                        self::q(2, 'If I were rich, I would buy an island.', 'Si ___ rico, compraría una isla.', ['fuera', 'soy', 'fui', 'seré'], 'fuera', 'Si tidak nyata → subjuntivo imperfecto.'),
                    ]),
                    self::section('Section 3: Hipotesis dan penyesalan', 'Ojalá, como si, dan condicional perfecto.', 'Hipótesis', [
                        ['Ojalá pudiera volar.', 'I wish I could fly.'],
                        ['Como si fuera su casa, entró sin llamar.', 'As if it were his house, he walked in without knocking.'],
                        ['Me habría gustado conocerte antes.', 'I would have liked to meet you earlier.'],
                    ], [
                        self::q(0, 'I wish I could fly (impossible wish).', 'Ojalá ___ volar.', ['pudiera', 'pueda', 'puedo', 'podría'], 'pudiera', 'Harapan mustahil → subjuntivo imperfecto.'),
                        self::q(1, 'As if it were his house, he walked in without knocking.', 'Como si ___ su casa, entró sin llamar.', ['fuera', 'es', 'era', 'sea'], 'fuera', 'Como si selalu memakai subjuntivo imperfecto.'),
                        self::q(2, 'I would have liked to meet you earlier.', 'Me ___ gustado conocerte antes.', ['habría', 'habrá', 'había', 'haya'], 'habría', 'Condicional perfecto: habría + participio.'),
                    ]),
                ],
            ],

            // ───────────────────────── Modul 12 ─────────────────────────
            [
                'title' => 'Modul 12: Pronomina, Se Impersonal, dan Pasif',
                'description' => 'Urutan pronomina objek, konstruksi se, dan kalimat pasif.',
                'difficulty' => 'advanced',
                'sections' => [
                    self::section('Section 1: Pronomina objek', 'Se lo, me lo, dan penempelan pada imperativo.', 'Pronombres', [
                        ['Se lo di ayer.', 'I gave it to him yesterday.'],
                        ['¿Me lo puedes explicar?', 'Can you explain it to me?'],
                        ['Dámelo ahora mismo.', 'Give it to me right now.'],
                    ], [
                        self::q(0, 'I gave it to him/her yesterday.', '___ lo di ayer.', ['Se', 'Le', 'Me', 'Te'], 'Se', 'Le + lo berubah menjadi "se lo".'),
                        self::q(1, 'Can you explain it to me?', '¿___ lo puedes explicar?', ['Me', 'Te', 'Se', 'Le'], 'Me', 'Urutan: tak langsung (me) sebelum langsung (lo).'),
                        self::q(2, 'Give it to me right now.', 'Dá___ ahora mismo.', ['melo', 'lome', 'selo', 'mela'], 'melo', 'Imperativo: pronomina menempel, me sebelum lo.'),
                    ]),
                    self::section('Section 2: Se impersonal dan pasif refleks', 'Se + verba untuk pernyataan umum.', 'Se impersonal', [
                        ['Aquí se habla español.', 'Spanish is spoken here.'],
                        ['Se venden casas en la costa.', 'Houses are sold on the coast.'],
                        ['No se permite fumar.', 'Smoking is not allowed.'],
                    ], [
                        self::q(0, 'Spanish is spoken here.', 'Aquí ___ español.', ['se habla', 'se hablan', 'me habla', 'hablan se'], 'se habla', '"Español" tunggal → se habla.'),
                        self::q(1, 'Houses are sold on the coast.', 'Se ___ casas en la costa.', ['venden', 'vende', 'vendemos', 'vendido'], 'venden', 'Nomina jamak → verba jamak.'),
                        self::q(2, 'Smoking is not allowed.', 'No se ___ fumar.', ['permite', 'permiten', 'permitir', 'permitido'], 'permite', 'Subjek infinitivo → verba tunggal.'),
                    ]),
                    self::section('Section 3: Kalimat pasif', 'Ser + participio vs estar + participio.', 'Voz pasiva', [
                        ['La carta fue escrita por mi abuelo.', 'The letter was written by my grandfather.'],
                        ['Las puertas están cerradas.', 'The doors are closed.'],
                        ['El puente fue construido en 1900.', 'The bridge was built in 1900.'],
                    ], [
                        self::q(0, 'The letter was written by my grandfather.', 'La carta fue ___ por mi abuelo.', ['escrita', 'escrito', 'escribió', 'escribiendo'], 'escrita', 'Participio sesuai gender nomina (carta → escrita).'),
                        self::q(1, 'The doors are closed (resulting state).', 'Las puertas ___ cerradas.', ['están', 'son', 'fueron', 'serán'], 'están', 'Hasil/keadaan → estar + participio.'),
                        self::q(2, 'The bridge was built in 1900.', 'El puente fue ___ en 1900.', ['construido', 'construida', 'construyó', 'construir'], 'construido', 'Puente maskulin → construido.'),
                    ]),
                ],
            ],

            // ───────────────────────── Modul 13 ─────────────────────────
            [
                'title' => 'Modul 13: Debat, Idiom, dan Subjuntivo Lanjutan',
                'description' => 'Subjuntivo dalam klausa waktu/konsesi, penghubung argumen, dan idiom.',
                'difficulty' => 'advanced',
                'sections' => [
                    self::section('Section 1: Subjuntivo lanjutan', 'Aunque, cuando, dan antecedente tak pasti.', 'Subjuntivo avanzado', [
                        ['Aunque llueva, saldremos.', 'Even if it rains, we will go out.'],
                        ['Cuando llegues, llámame.', 'When you arrive, call me.'],
                        ['Busco un libro que sea interesante.', 'I am looking for a book that is interesting.'],
                    ], [
                        self::q(0, 'Even if it rains (uncertain), we will go out.', 'Aunque ___, saldremos.', ['llueva', 'llueve', 'llovía', 'lloverá'], 'llueva', 'Aunque + hipotesis → subjuntivo.'),
                        self::q(1, 'When you arrive (in the future), call me.', 'Cuando ___, llámame.', ['llegues', 'llegas', 'llegaste', 'llegarás'], 'llegues', 'Cuando + aksi mendatang → subjuntivo.'),
                        self::q(2, 'I am looking for a book that is interesting (any, not a specific one).', 'Busco un libro que ___ interesante.', ['sea', 'es', 'fue', 'será'], 'sea', 'Antecedente belum spesifik → subjuntivo.'),
                    ]),
                    self::section('Section 2: Penghubung argumen', 'Menyusun pendapat dalam debat.', 'Conectores', [
                        ['Sin embargo, no estoy de acuerdo.', 'However, I do not agree.'],
                        ['A pesar de ser caro, lo compraré.', 'Despite being expensive, I will buy it.'],
                        ['Por lo tanto, debemos actuar ya.', 'Therefore, we must act now.'],
                    ], [
                        self::q(0, 'However, I do not agree (contrast).', '___, no estoy de acuerdo.', ['Sin embargo', 'Por lo tanto', 'Además', 'Es decir'], 'Sin embargo', 'Kontras → sin embargo.'),
                        self::q(1, 'Despite being expensive, I will buy it.', 'A pesar ___ ser caro, lo compraré.', ['de', 'que', 'en', 'por'], 'de', '"A pesar de" + infinitivo.'),
                        self::q(2, 'Therefore, we must act now (consequence).', '___, debemos actuar ya.', ['Por lo tanto', 'Sin embargo', 'Aunque', 'Mientras tanto'], 'Por lo tanto', 'Konsekuensi → por lo tanto.'),
                    ]),
                    self::section('Section 3: Idiom sehari-hari', 'Ungkapan kiasan yang tidak bisa diterjemahkan literal.', 'Modismos', [
                        ['Estoy en las nubes hoy.', 'I am in the clouds today.'],
                        ['Costó un ojo de la cara.', 'It cost an arm and a leg.'],
                        ['Me tomó el pelo con esa noticia.', 'He pulled my leg with that news.'],
                    ], [
                        self::q(0, 'What does "Estoy en las nubes hoy" mean?', 'Estoy en las nubes hoy.', ['I am distracted and daydreaming', 'I am disappointed', 'I am disoriented', 'I am disrespectful'], 'I am distracted and daydreaming', '"Estar en las nubes" = melamun.'),
                        self::q(1, 'What does "Costó un ojo de la cara" mean?', 'Costó un ojo de la cara.', ['It cost a fortune', 'It cost very little', 'It hurt my eyes', 'It was worth the effort'], 'It cost a fortune', 'Idiom untuk sangat mahal.'),
                        self::q(2, 'What does "Me tomó el pelo" mean?', 'Me tomó el pelo con esa noticia.', ['He fooled me / teased me', 'He pulled my hair', 'He complimented me', 'He took my side'], 'He fooled me / teased me', '"Tomar el pelo" = mengerjai.'),
                    ]),
                ],
            ],
        ];
    }
}
