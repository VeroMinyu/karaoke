require('dotenv').config();

const mongoose = require('mongoose');
const Song = require('../models/Song')
const dbName = 'karaoke';
mongoose.connect(`mongodb://localhost/${dbName}`);

const transform = lyrics => {
    const lyricsArr = lyrics.split(/\r\n|\n/);
    const result = [];
    lyricsArr.forEach(e => {
        if (e.search(/^(\[)(\d*)(:)(.*)(\])(.*)/i) >= 0) {
            const line = e.match(/^(\[)(\d*)(:)(.*)(\])(.*)/i);
            result.push({
                time: (parseInt(line[2]) * 60) + parseInt(line[4]),
                lyrics: line[6]
            });
        }
    });
    return result;
}

const songs = [
    {
        title: "Shape of you",
        artist: "Ed Sheeran",
        popularity: 10,
        video_name: "Ed Sheeran - Shape of You [Official Video]-JGwWNGJdvx8.mp4",
        video_img: "https://img.youtube.com/vi/JGwWNGJdvx8/0.jpg",
        lyrics: transform(`[00:14.60]The club isn't the best place to find a lover
[00:18.11]So the bar is where I go
[00:20.34]Me and my friends at the table doing shots
[00:22.84]Drinking fast and then we talk slow
[00:25.86]Come over and start up a conversation with just me
[00:27.85]And trust me I'll give it a chance now
[00:30.59]Take my hand, stop, put Van the Man on the jukebox
[00:33.11]And then we start to dance, and now I'm singing like
[00:35.62]Girl, you know I want your love
[00:38.08]Your love was handmade for somebody like me
[00:40.63]Come on now, follow my lead
[00:42.83]I may be crazy, don't mind me
[00:45.34]Say, boy, let's not talk too much
[00:47.84]Grab on my waist and put that body on me
[00:50.84]Come on now, follow my lead
[00:52.85]Come, come on now, follow my lead
[00:57.34]I'm in love with the shape of you
[00:59.34]We push and pull like a magnet do
[01:01.09]Although my heart is falling too
[01:03.59]I'm in love with your body
[01:06.60]And last night you were in my room
[01:08.84]And now my bedsheets smell like you
[01:11.34]Every day discovering something brand new
[01:13.62]I'm in love with your body
[01:15.84]Oh—I—oh—I—oh—I—oh—I
[01:18.60]I'm in love with your body
[01:20.84]Oh—I—oh—I—oh—I—oh—I
[01:23.36]I'm in love with your body
[01:25.85]Oh—I—oh—I—oh—I—oh—I
[01:28.33]I'm in love with your body
[01:31.10]Every day discovering something brand new
[01:33.59]I'm in love with the shape of you
[01:36.34]One week in we let the story begin
[01:37.84]We're going out on our first date
[01:40.59]You and me are thrifty, so go all you can eat
[01:42.84]Fill up your bag and I fill up a plate
[01:45.59]We talk for hours and hours about the sweet and the sour
[01:47.59]And how your family is doing okay
[01:49.84]Leave and get in a taxi, then kiss in the backseat
[01:52.84]Tell the driver make the radio play, and I'm singing like
[01:55.09]Girl, you know I want your love
[01:57.84]Your love was handmade for somebody like me
[02:00.84]Come on now, follow my lead
[02:02.86]I may be crazy, don't mind me
[02:05.34]Say, boy, let's not talk too much
[02:07.84]Grab on my waist and put that body on me
[02:10.84]Come on now, follow my lead
[02:12.84]Come, come on now, follow my lead
[02:14.59]I'm in love with the shape of you
[02:18.59]We push and pull like a magnet do
[02:21.09]Although my heart is falling too
[02:23.59]I'm in love with your body
[02:25.58]And last night you were in my room
[02:28.34]And now my bedsheets smell like you
[02:30.85]Every day discovering something brand new
[02:33.33]I'm in love with your body
[02:35.34]Oh—I—oh—I—oh—I—oh—I
[02:38.34]I'm in love with your body
[02:40.35]Oh—I—oh—I—oh—I—oh—I
[02:43.10]I'm in love with your body
[02:45.61]Oh—I—oh—I—oh—I—oh—I
[02:48.59]I'm in love with your body
[02:50.59]Every day discovering something brand new
[02:53.34]I'm in love with the shape of you
[02:56.34]Come on, be my baby, come on
[02:58.37]Come on, be my baby, come on
[03:00.59]Come on, be my baby, come on
[03:03.37]Come on, be my baby, come on
[03:05.59]Come on, be my baby, come on
[03:08.09]Come on, be my baby, come on
[03:10.61]Come on, be my baby, come on
[03:13.11]Come on, be my baby, come on
[03:17.13]I'm in love with the shape of you
[03:19.84]We push and pull like a magnet do
[03:22.86]Although my heart is falling too
[03:24.59]I'm in love with your body
[03:27.09]Last night you were in my room
[03:29.84]And now my bedsheets smell like you
[03:32.34]Every day discovering something brand new
[03:34.59]I'm in love with your body
[03:36.63]Come on, be my baby, come on
[03:39.34]Come on, be my baby, come on
[03:41.84]I'm in love with your body
[03:43.61]Come on, be my baby, come on
[03:44.09]Come on, be my baby, come on
[03:46.14]I'm in love with your body
[03:47.09]Come on, be my baby, come on
[03:49.13]Come on, be my baby, come on
[03:50.84]I'm in love with your body
[03:51.88]Every day discovering something brand new
[03:54.84]I'm in love with the shape of you`)
    },
    {
        title: "Believer",
        artist: "Imagine Dragons",
        popularity: 9,
        video_name: "Imagine Dragons - Believer-7wtfhZwyrcc.mp4",
        video_img: "https://img.youtube.com/vi/7wtfhZwyrcc/0.jpg",
        lyrics: transform(`[00:07.27]First things first
[00:09.07]I'ma say all the words inside my head
[00:11.26]I'm fired up and tired of the way that things have been, oh ooh
[00:18.02]The way that things have been, oh ooh
[00:23.02]Second thing second
[00:24.77]Don't you tell me what you think that I can be
[00:27.30]I'm the one at the sail, I'm the master of my sea, oh ooh
[00:33.27]The master of my sea, oh ooh
[00:38.01]I was broken from a young age
[00:39.77]Taking my sulking to the masses
[00:41.57]Write down my poems for the few
[00:44.02]That looked at me, took to me, shook to me, feeling me
[00:46.05]Singing from heartache from the pain
[00:47.52]Taking my message from the veins
[00:49.32]Speaking my lesson from the brain
[00:51.06]Seeing the beauty through the
[00:55.58]You made me a, you made me a believer, believer
[01:01.06](Pain, pain)
[01:03.27]You break me down, you build me up, believer, believer
[01:09.02](Pain)
[01:10.77]Oh let the bullets fly, oh let them rain
[01:14.77]My life, my love, my drive, it came from
[01:17.33](Pain)
[01:18.54]You made me a, you made me a believer, believer
[01:24.53]Third things third
[01:26.02]Send a prayer to the ones up above
[01:28.02]All the hate that you've heard has turned your spirit to a dove, oh ooh
[01:32.27]Your spirit up above, oh ooh
[01:39.55]I was choking in the crowd
[01:41.53]Building my rain up in the cloud
[01:42.79]Falling like ashes to the ground
[01:44.83]Hoping my feelings, they would drown
[01:46.81]But they never did, ever lived, ebbing and flowing
[01:49.53]Inhibited, limited
[01:51.02]'Til it broke up and it rained down
[01:52.77]It rained down, like
[01:54.79]You made me a, you made me a believer, believer
[02:02.57](Pain, pain)
[02:10.57]You break me down, you built me up, believer, believer
[02:11.28](Pain)
[02:12.06]I let the bullets fly, oh let them rain
[02:16.02]My life, my love, my drive, it came from
[02:18.76](Pain)
[02:20.02]You made me a, you made me a believer, believer
[02:25.77]Last things last
[02:27.02]By the grace of the fire and the flames
[02:29.01]You're the face of the future, the blood in my veins, oh ooh
[02:35.56]The blood in my veins, oh ooh
[02:40.52]But they never did, ever lived, ebbing and flowing
[02:42.03]Inhibited, limited
[02:44.27]'Til it broke up and it rained down
[02:46.02]It rained down, like
[02:48.79]You made me a, you made me a believer, believer
[03:05.51](Pain, pain)
[03:14.02]You break me down, you built me up, believer, believer
[03:14.81](Pain)
[03:15.75]I let the bullets fly, oh let them rain
[03:19.30]My life, my love, my drive, it came from
[03:22.52](Pain)
[03:24.01]You made me a, you made me a believer, believer`)
    }, {
        title: "X (EQUIS)",
        artist: "Nicky Jam x J. Balvin",
        popularity: 8,
        video_name: "Nicky Jam x J. Balvin - X (EQUIS) _ Video Oficial _ Prod. Afro Bros & Jeon-_I_D_8Z4sJE.mp4",
        video_img: "https://img.youtube.com/vi/_I_D_8Z4sJE/0.jpg",
        lyrics: transform(`[00:05.85]Aquel día te vi y tu energía sentí
[00:10.11]Desde eso no te quiero lejos de mí
[00:13.36]Sé que no sabes de mí y no te puedo mentir
[00:20.35]Lo que dicen en la calle sobre mí
[00:25.13]Y no te voy a negar
[00:31.35]Estamos claros y ya
[00:36.35]No te lo voy a negar (no te lo puedo negar)
[00:41.61]Estamos claros y ya (estamos claros, estamos claros)
[00:47.85]Solo deja que yo te agarre, baby
[00:50.10]Besos en el cuello pa' calmar la sed
[00:52.34]Mis manos en tus caderas pa' empezar como es
[00:55.09]No le vamo' a bajar más nunca mamá
[00:57.84]Ba-ba-ba-ba-baila y placata, placata
[01:00.09]Cómo ella lo mueve, sin parar, sin parar
[01:03.10]Mis ganas de comerte ahora son más fuertes
[01:06.34]Quiero tenerte
[01:07.60]Y no te voy a negar
[01:14.11]Estamos claros y ya
[01:18.85]No te lo voy a negar
[01:24.12]Estamos claros y ya
[01:29.64]Lo que he visto de ti mami, no es normal
[01:33.85]Pero no te preocupes que soy anormal
[01:36.35]Sé que a tus amigas no les debo gustar, eh
[01:40.89]Pero ve y cuéntales parte por parte
[01:45.59]Cómo tenemos sex y te quito el estrés
[01:48.35]Dale otra vez
[01:50.59]Y no te voy a negar
[01:56.45]Estamos claros y ya
[02:01.60]No te lo voy a negar
[02:06.72]Estamos claros y ya (no)
[02:12.73]Ba-ba-ba-ba-baila, placata, placata
[02:15.23]Como ella lo mueve, sin parar, sin parar
[02:17.73]Mis ganas de comerte ahora son más fuertes
[02:20.97]Quiero tenerte
[02:23.72]Y no te voy a negar (ah, ah)
[02:25.74]N.I.C.K
[02:27.22]J Balvin man
[02:29.74]Nicky, Nicky, Nicky Jam
[02:31.71]La Industria Inc.
[02:35.21]J Balvin
[02:36.46]No voy a hablar mucho
[02:40.72]Deja que el beat siga r-r-r-rompiendo
[02:43.71]Yeah
[02:44.22]Woah`)
    }, {
        title: "No Hay Nadie Más",
        artist: "Sebastián Yatra",
        popularity: 7,
        video_name: "No Hay Nadie Más-sD9_l3oDOag.mp4",
        video_img: "https://img.youtube.com/vi/sD9_l3oDOag/0.jpg",
        offset: 19,
        lyrics: transform(`[00:19.62]Recuerdo aquel día como si fuera un hoy
[00:26.61]No hay nada como ella, ni siquiera me encontró
[00:36.38]Recuerdo todavía la vez que la besé
[00:44.62]Fue mi primer amor y ahora escribo su canción
[00:54.11]Hay algo más inexplicable como su mirada
[01:01.12]Inigualable como la manera en que me cela
[01:07.66]Y trata de disimular que no está mal
[01:13.40]Voy a cuidarte por la noches
[01:17.12]Voy amarte sin reproches
[01:21.11]Te voy a extrañar en la tempestad
[01:25.88]Y aunque existan mil razones para renunciar
[01:31.42]No hay nadie más
[01:35.11]No hay nadie más
[01:41.12]Se llevó todo, se llevó tristeza
[01:43.37]Ya no existe espacio en la melancolía
[01:45.62]Porque a su lado todo tiene más razón
[01:50.37]Me llevé sus lágrimas, llegaron risas
[01:51.90]Cuando estamos juntos la tierra se paraliza
[01:56.36]Se paraliza
[01:58.40]Hay algo más inexplicable como su mirada
[02:05.36]Inigualable como la manera en que me cela
[02:11.87]Y trata de disimular que no está mal
[02:16.12]Voy a cuidarte por la noches
[02:20.86]Voy amarte sin reproches
[02:25.40]Te voy a extrañar en la tempestad
[02:29.36]Y aunque existan mil razones para renunciar
[02:34.87]Voy a cuidarte por la noches
[02:39.37]Voy amarte sin reproches
[02:43.37]Te voy a extrañar en la soledad
[02:47.91]Y aunque existan mil razones para terminar
[02:52.61]No hay nadie más
[02:57.37]No hay nadie más
[03:01.88]No quiero a nadie más, oh oh
[03:06.61]No hay nadie más
[03:11.36]No hay nadie`)
    }, {
        title: "What Lovers Do ft.SZA",
        artist: "Maroon 5",
        popularity: 6,
        video_name: "Maroon 5 - What Lovers Do ft. SZA-5Wiio4KoGe8.mp4",
        video_img: "https://img.youtube.com/vi/5Wiio4KoGe8/0.jpg",
        lyrics: transform(`[00:08.93]Say say say,
[00:09.42]hey hey now baby
[00:12.67]Oh mama,
[00:13.68]don't play now baby
[00:17.18]Say say say,
[00:18.42]hey hey now baby
[00:21.68]Said let's get one thing
[00:22.67]straight now baby
[00:25.18]Tell me, tell me
[00:26.18]if you love me or not,
[00:26.93]love me or not,
[00:27.43]love me or not?
[00:29.43]I'll bet the house on you,
[00:30.42]am I lucky or not,
[00:31.42]lucky or not,
[00:32.18]lucky or not?
[00:34.18]You gotta tell me
[00:34.93]if you love me or not,
[00:35.93]love me or not,
[00:36.43]love me or not?
[00:38.44]Been wishin' for you,
[00:39.17]am I lucky or not,
[00:39.69]lucky or not,
[00:40.68]lucky or not?
[00:43.43]Ooooh, oooh
[00:44.94]Been wishin' for you
[00:46.92]Ooh, ooh
[00:48.92]Tryna' do
[00:49.68]what lovers do (ooh)
[00:52.17]Ooooh, oooh
[00:53.68]Been wishin' for you
[00:55.93]Ooh, ooh
[00:56.92]Tryna' do
[00:58.44]what lovers do (ooh)
[01:00.67]Say say say,
[01:01.92]hey hey now baby
[01:04.68]You gonna make me hit you
[01:06.18]with that lay down,
[01:07.68]baby (ohhh)
[01:09.68](Ooh) Say say say,
[01:10.68]hey hey now baby
[01:13.67]You know what I need,
[01:14.68]not the game now baby
[01:16.42](oh, ohhh)
[01:17.93]Tell me, tell me
[01:18.92]if you love me or not,
[01:19.42]love me or not,
[01:19.93]love me or not?
[01:21.93]I'll bet the house on you,
[01:22.93]am I lucky or not,
[01:23.43]lucky or not,
[01:24.42]lucky or not?
[01:26.68]You gotta tell me
[01:27.18]if you love me or not,
[01:27.93]love me or not,
[01:28.93]love me or not?
[01:30.92]Been wishin' for you
[01:31.94]am I lucky or not,
[01:32.93]lucky or not,
[01:33.92]lucky or not?
[01:34.93]Ooooh, oooh
[01:37.18]Been wishin' for you
[01:39.68]Ooh, ooh
[01:40.69]Tryna' do
[01:41.68]what lovers do
[01:43.93](ooh)
[01:44.67]Ooooh, oooh
[01:46.17]Been wishin' for you
[01:48.42](wishin')
[01:48.93]Ooh, ooh
[01:49.93]Tryna' do
[01:50.94]what lovers do
[01:52.67](ooh)
[01:53.17](Hey yeah)
[01:56.19]What lovers do
[01:57.18](oh, ohh)
[02:00.43]What lovers do
[02:01.67](hmm na na na, hey yeah)
[02:04.42]What lovers do
[02:05.93](oh, hmm na na na, oh, ohh)
[02:10.43]Aren't we too grown
[02:11.43]for games?
[02:12.94]Aren't we too grown
[02:13.93]to play around?
[02:14.93]Young enough
[02:15.93]to chase
[02:17.19]But old enough
[02:18.18]to know better
[02:19.18]Are we too grown
[02:20.43]for changin'?
[02:21.43]Are we too grown
[02:22.68]to mess around?
[02:23.67]Ooh and I can't wait
[02:24.68]forever baby
[02:26.18]Both of us should know
[02:26.92]better
[02:28.67]Ooooh, oooh
[02:29.93]Been wishin' for you
[02:32.18]Ooh, ooh
[02:33.42]Tryna' do
[02:34.18]what lovers do (ooh)
[02:36.18]Ooooh, oooh
[02:40.92]Been wishin' for you
[02:42.93]Ooh, ooh
[02:43.93]Tryna' do
[02:45.43]what lovers do (ooh)
[02:47.68]Ooooh, oooh
[02:49.18]Been wishin' for you
[02:50.93](you, oh yeah)
[02:51.93]Ooh, ooh (ooh)
[02:53.43]Tryna' do
[02:54.42]what lovers do
[02:55.92](tryna' do what lovers do,ooh)
[02:56.18]Ooooh, oooh
[02:57.93]Been wishin' for you
[02:59.43](been wishin' for love)
[03:01.67]Ooh, ooh
[03:02.68]Tryna' do
[03:02.92]what lovers do
[03:04.42](do uhh,ooh)
[03:05.43]Ooooh, oooh
[03:06.68]Been wishin' for you
[03:09.43](tryna' do)
[03:10.43]Ooh, ooh
[03:11.42]Tryna' do
[03:12.42]what lovers do (ooh)`)
    }, {
        title: "Por Fin Te Encontré ft. Juan Magan, Sebastian Yatra",
        artist: "Cali Y El Dandee",
        popularity: 5,
        video_name: "Cali Y El Dandee - Por Fin Te Encontré ft. Juan Magan, Sebastian Yatra-_kxz7WX4mLU.mp4",
        video_img: "https://img.youtube.com/vi/_kxz7WX4mLU/0.jpg",
        lyrics: transform(`[00:36.62]Ohoh hee ouoh
[00:31.36]Cali Y El Dandee
[00:35.70]Juan Magan
[00:37.50]Sebastian Yatra
[00:39.46]Si tu supieras que por ti me muero
[00:43.00]Que yo te quiero, te quiero, te quiero, te quiero
[00:50.17]Si tu supieras lo que te he esperado
[00:54.14]Que yo te amo, te amo, te amo, te amo
[00:58.96]Y me dijeron que te vieron sola
[01:02.94]¿Por qué estas sola?
[01:04.60]Suelta el pasado y déjame ser
[01:06.90]El que te enamora (el que te enamora)
[01:09.60]Y me dijeron que te vieron sola
[01:12.59]¿Por qué tan sola?
[01:15.17]Si tu a mi lado vas a tener
[01:18.50]Al que mas te adora     
[01:20.89]Dime por qué tan sola, sola
[01:24.75]A estas horas, horas
[01:25.70]Solo quiero saber de ti
[01:27.31]Baila conmigo ahora, ahora
[01:29.23]Y olvida a los demás soy tuyo
[01:31.81]Haz de mi lo que tu quieras
[01:33.69]Tengo los sentimientos en regla
[01:37.73]Y ha sido tan larga la espera
[01:40.55]Que por fin esta soltera      
[01:42.75]Le tiro una mirada y me da Game Over
[01:45.81]Y así no puedo
[01:48.23]Me entrego y le digo
[01:51.50]You can be my lover
[01:51.89]Le suelto el freno     
[01:54.02]Le tiro una mirada y me da Game Over
[01:56.49]Y así no puedo
[01:58.72]Me entrego y le digo
[01:59.91]You can be my lover
[02:01.82]Le suelto el freno    
[02:04.28]Cuando tu me miras, yo te miro y me muero
[02:09.19]Nadie te quiere como yo te quiero
[02:12.53]Nadie te ve como te puedo ver
[02:15.27]Porque si me dejas
[02:18.38]Yo te llevare al cielo
[02:19.97]Te haré canciones con amor sincero
[02:22.31]Seré tu sol en este amanecer    
[02:25.80]Y por fin te encontré
[02:26.85](Nou nou nou)
[02:28.15]Yo por fin te encontré
[02:29.60](Nou nou nou)
[02:31.27]Yo por fin te encontré
[02:32.56](Nou nou nou)
[02:33.78]Yo por fin te encontré
[02:34.98](Nou nou nou)    
[02:38.08]Si tu supieras que por ti me muero
[02:42.45]Que yo te quiero, te quiero, te quiero, te quiero
[02:48.61]Si tu supieras lo que te he esperado
[02:52.50]Que yo te amo, te amo, te amo, te amo
[02:56.27]Y me dijeron que te vieron sola
[03:00.86]¿Por qué estas sola?
[03:03.13]Suelta el pasado y déjame ser
[03:05.53]El que te enamora (el que te enamora)
[03:08.31]Y me dijeron que te vieron sola
[03:10.98]¿Por qué tan sola?
[03:13.40]Si tu a mi lado vas a tener
[03:15.71]Al que mas te adora      
[03:22.62]Conmigo no estarás más sola, hoy llego la hora
[03:25.82]Tengo la receta para que volemos juntos
[03:27.97]En la Aurora Boreal
[03:28.81]Este amor es inmortal
[03:29.89]Yo te quiero desde siempre
[03:31.60]Y voy contigo hasta el final
[03:32.87]Dime que ese soy yo
[03:33.97]El que ves a tu lado
[03:35.49]Que cuando estoy cerca olvidas el pasado
[03:37.95]Y yo lo puedo ver dime qué vas a hacer
[03:40.44]Yo te quiero tener     
[03:42.32]Le tiro una mirada y me da Game Over
[03:43.97]Y así no puedo
[03:46.42]Me entrego y le digo
[03:49.93]You can be my lover
[03:51.28]Le suelto el freno     
[03:53.26]Cuando tu me miras, yo te miro y me muero
[03:58.55]Nadie te quiere como yo te quiero
[04:03.93]Nadie te ve como te puedo ver
[04:14.18]Porque si me dejas
[04:16.16]Yo te llevare al cielo
[04:18.61]Te haré canciones con amor sincero
[04:21.42]Seré tu sol en este amanecer    
[04:25.50]Y por fin te encontré
[04:26.36](Nou nou nou)
[04:27.61]Yo por fin te encontré
[04:28.60](Nou nou nou)
[04:30.29]Yo por fin te encontré
[04:32.18](Nou nou nou)
[04:33.66]Yo por fin te encontré
[04:34.70](Nou nou nou)`)
    },{
        title: "Despacito ft. Daddy Yankee",
        artist: "Luis Fonsi",
        popularity: 11,
        video_name: "Luis Fonsi - Despacito ft. Daddy Yankee-kJQP7kiw5Fk.mp4",
        video_img: "https://img.youtube.com/vi/kJQP7kiw5Fk/0.jpg",
        lyrics: transform(`[00:28.09]Ay
[00:30.10]Fonsi
[00:31.34]DY
[00:32.87]Oh
[00:34.34]Oh no, oh no
[00:37.34]Oh yeah
[00:39.38]Diridiri, dirididi Daddy
[00:39.38]Go
[00:41.61]Sí, sabes que ya llevo un rato mirándote
[00:46.37]Tengo que bailar contigo hoy (DY)
[00:52.10]Vi que tu mirada ya estaba llamándome
[00:57.09]Muéstrame el camino que yo voy (Oh)
[01:02.84]Tú, tú eres el imán y yo soy el metal
[01:06.10]Me voy acercando y voy armando el plan
[01:08.85]Solo con pensarlo se acelera el pulso (Oh yeah)
[01:13.38]Ya, ya me está gustando más de lo normal
[01:16.85]Todos mis sentidos van pidiendo más
[01:19.36]Esto hay que tomarlo sin ningún apuro
[01:23.11]Despacito
[01:25.38]Quiero respirar tu cuello despacito
[01:28.34]Deja que te diga cosas al oído
[01:30.87]Para que te acuerdes si no estás conmigo
[01:34.36]Despacito
[01:36.59]Quiero desnudarte a besos despacito
[01:38.84]Firmo en las paredes de tu laberinto
[01:41.37]Y hacer de tu cuerpo todo un manuscrito (sube, sube, sube)
[01:45.35](Sube, sube)
[01:46.59]Quiero ver bailar tu pelo
[01:48.35]Quiero ser tu ritmo
[01:50.10]Que le enseñes a mi boca
[01:52.61]Tus lugares favoritos (favoritos, favoritos baby)
[01:57.13]Déjame sobrepasar tus zonas de peligro
[02:00.59]Hasta provocar tus gritos
[02:03.59]Y que olvides tu apellido (Diridiri, dirididi Daddy)
[02:07.09]Si te pido un beso ven dámelo
[02:08.59]Yo sé que estás pensándolo
[02:09.84]Llevo tiempo intentándolo
[02:11.35]Mami, esto es dando y dándolo
[02:12.85]Sabes que tu corazón conmigo te hace bom, bom
[02:15.34]Sabes que esa beba está buscando de mi bom, bom
[02:18.10]Ven prueba de mi boca para ver cómo te sabe
[02:20.60]Quiero, quiero, quiero ver cuánto amor a ti te cabe
[02:23.39]Yo no tengo prisa, yo me quiero dar el viaje
[02:26.10]Empecemos lento, después salvaje
[02:28.86]Pasito a pasito, suave suavecito
[02:31.60]Nos vamos pegando poquito a poquito
[02:34.13]Cuando tú me besas con esa destreza
[02:36.85]Veo que eres malicia con delicadeza
[02:39.84]Pasito a pasito, suave suavecito
[02:42.35]Nos vamos pegando, poquito a poquito
[02:45.34]Y es que esa belleza es un rompecabezas
[02:47.86]Pero pa montarlo aquí tengo la pieza
[02:50.84]Despacito
[02:54.35]Quiero respirar tu cuello despacito
[02:55.85]Deja que te diga cosas al oído
[02:58.35]Para que te acuerdes si no estás conmigo
[03:01.84]Despacito
[03:03.86]Quiero desnudarte a besos despacito
[03:06.59]Firmo en las paredes de tu laberinto
[03:09.11]Y hacer de tu cuerpo todo un manuscrito (sube, sube, sube)
[03:12.63](Sube, sube)
[03:14.10]Quiero ver bailar tu pelo
[03:15.85]Quiero ser tu ritmo
[03:17.85]Que le enseñes a mi boca
[03:20.85]Tus lugares favoritos (favoritos, favoritos baby)
[03:24.85]Déjame sobrepasar tus zonas de peligro
[03:28.34]Hasta provocar tus gritos
[03:31.11]Y que olvides tu apellido
[03:34.10]Despacito
[03:36.38]Vamos a hacerlo en una playa en Puerto Rico
[03:38.85]Hasta que las olas griten "¡ay, bendito!"
[03:41.60]Para que mi sello se quede contigo
[03:45.10]Pasito a pasito, suave suavecito
[03:48.09]Nos vamos pegando, poquito a poquito
[03:51.09]Que le enseñes a mi boca
[03:52.85]Tus lugares favoritos (favoritos, favoritos baby)
[03:57.12]Pasito a pasito, suave suavecito
[03:58.87]Nos vamos pegando, poquito a poquito
[04:01.86]Hasta provocar tus gritos
[04:03.38]Y que olvides tu apellido (DY)
[04:06.59]Despacito`)
    }
]

Song.create(songs, (err) => {
    if (err) { throw (err) }
    console.log(`Created ${songs.length} songs`)
});