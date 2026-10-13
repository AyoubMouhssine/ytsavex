export type SupportedLang = "en" | "fr" | "es" | "ar";
export type ToolSlug =
  | "youtube-to-mp3"
  | "youtube-to-mp4"
  | "youtube-shorts-downloader"
  | "youtube-playlist-downloader";

export const SUPPORTED_TOOLS: ToolSlug[] = [
  "youtube-to-mp3",
  "youtube-to-mp4",
  "youtube-shorts-downloader",
  "youtube-playlist-downloader",
];

export interface TechnicalSpec {
  label: string;
  value: string;
}

export interface ToolContent {
  badge: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroHighlight: string;
  heroSub: string;
  defaultFormat: "mp3" | "mp4";
  specs: TechnicalSpec[];
  features: { title: string; desc: string }[];
  deepGuide: { title: string; paragraphs: string[] };
  faqs: { q: string; a: string }[];
}

export interface Translation {
  dir: "ltr" | "rtl";
  badge: string;
  heroTitle: string;
  heroHighlight: string;
  heroSub: string;
  inputPlaceholder: string;
  pasteBtn: string;
  downloadBtn: string;
  analyzing: string;
  saveBtn: string;
  playlistDetected: string;
  videosFound: string;
  progressTitle: string;
  progressStep1: string;
  progressStep2: string;
  progressStep3: string;
  progressDone: string;
  howTitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  faqTitle: string;
  specsTitle: string;
  guideTitle: string;
  footerDisclaimer: string;
  relatedToolsTitle: string;
  tools: Record<ToolSlug, ToolContent>;
}

export const translations: Record<SupportedLang, Translation> = {
  en: {
    dir: "ltr",
    badge: "⚡ Lightning Fast & 100% Free",
    heroTitle: "YouTube Video & Playlist",
    heroHighlight: "Downloader",
    heroSub:
      "Download any YouTube video in 1080p, 720p, high-fidelity MP3 (320kbps), or full playlists with zero intrusive ads.",
    inputPlaceholder: "Paste YouTube video or playlist link here...",
    pasteBtn: "📋 Paste",
    downloadBtn: "Analyze",
    analyzing: "Analyzing...",
    saveBtn: "Save File",
    playlistDetected: "Playlist Detected",
    videosFound: "videos available",
    progressTitle: "Processing your file...",
    progressStep1: "Connecting to YouTube servers...",
    progressStep2: "Extracting stream and encoding with FFmpeg...",
    progressStep3: "Packaging final file...",
    progressDone: "Download started! Check your browser downloads.",
    howTitle: "How to Download in 3 Simple Steps?",
    step1Title: "Copy URL",
    step1Desc:
      "Copy the YouTube link directly from your browser or mobile app.",
    step2Title: "Choose Format",
    step2Desc: "Pick 1080p FHD, 720p HD, or pure 320kbps MP3 audio.",
    step3Title: "Instant Download",
    step3Desc:
      "Hit Save and the file transfers directly to your device storage.",
    faqTitle: "Frequently Asked Questions",
    specsTitle: "Technical Specifications & Compatibility",
    guideTitle: "Comprehensive User Guide",
    footerDisclaimer:
      "© 2026 YTSaveX. All rights reserved. Intended strictly for personal, non-commercial fair use.",
    relatedToolsTitle: "Explore More Free Downloader Tools",
    tools: {
      "youtube-to-mp3": {
        badge: "🎵 High-Quality Audio Ripper",
        metaTitle: "YouTube to MP3 Converter - Free 320kbps Audio Download",
        metaDescription:
          "Convert YouTube videos to high-bitrate MP3 audio (up to 320kbps). Fast, clean, free, and compatible with all mobile & desktop browsers.",
        heroTitle: "Fastest YouTube to",
        heroHighlight: "MP3 Converter",
        heroSub:
          "Extract crystal-clear audio from any YouTube video in seconds with genuine 320kbps bitrate support.",
        defaultFormat: "mp3",
        specs: [
          { label: "Maximum Audio Bitrate", value: "320 kbps (High Fidelity)" },
          { label: "Audio Sampling Rate", value: "44.1 kHz / 48 kHz Stereo" },
          {
            label: "Container & Extension",
            value: ".mp3 (MPEG-1 Audio Layer III)",
          },
          {
            label: "Hardware Compatibility",
            value: "iOS, Android, Windows, macOS, Linux, Car Audio",
          },
          { label: "Installation Required", value: "None (100% Web-based)" },
          {
            label: "Registration / Account",
            value: "Zero (No credentials required)",
          },
        ],
        features: [
          {
            title: "Studio-Grade 320kbps",
            desc: "Extracts original audio tracks preserved at the highest possible fidelity without clipping.",
          },
          {
            title: "No Duration Limits",
            desc: "Effortlessly convert long podcasts, full DJ mixes, audiobooks, and live concerts.",
          },
          {
            title: "Universal Playback",
            desc: "Output MP3s work flawlessly on smartphones, iTunes, Spotify local files, and car stereos.",
          },
        ],
        deepGuide: {
          title: "How to Convert YouTube Videos to MP3 Online Safely",
          paragraphs: [
            "Finding a trustworthy audio converter that does not overload your screen with malicious popups or hidden subscription traps can be difficult. YTSaveX is engineered specifically to provide a clean, secure, and instantaneous audio extraction experience directly through your browser.",
            "Our server-side pipeline utilizes high-performance FFmpeg post-processing engines. When you supply a valid YouTube link, our system parses the original Opus or AAC audio stream directly from the content distribution network and converts it to universal MP3 format with a target constant bitrate (CBR) of up to 320 kbps.",
            "Whether you need background music for your video editing workflow, study lectures for offline listening, or offline DJ track preparation, YTSaveX delivers unmatched audio transparency without sacrificing speed.",
          ],
        },
        faqs: [
          {
            q: "What is the true bitrate of the extracted MP3?",
            a: "We extract the highest quality audio stream available from the source (typically 160–256 kbps Opus/AAC on YouTube) and encode it into a pristine 320 kbps MP3 container to prevent further generation loss during playback.",
          },
          {
            q: "How can I download YouTube audio directly to my iPhone?",
            a: "Open Safari, paste the video link into YTSaveX, click Analyze, then click Save File. Safari will prompt you to download the file directly into your Files app or iCloud Drive.",
          },
          {
            q: "Can I convert long audiobooks and 3-hour DJ sets?",
            a: "Yes. YTSaveX supports long-form content. Our backend allows generous timeouts to process large media files smoothly.",
          },
          {
            q: "Is it legal to convert YouTube videos to MP3?",
            a: "Converting content for personal, offline fair use or public-domain educational material is standard practice. You must not redistribute copyrighted music commercially without permission.",
          },
          {
            q: "Do I need to install any browser extensions or APKs?",
            a: "No. YTSaveX is 100% cloud-based and operates natively in any web browser (Chrome, Safari, Firefox, Edge, Brave).",
          },
          {
            q: "Why is YTSaveX faster than other conversion sites?",
            a: "Our infrastructure uses dedicated conversion threads and asynchronous background processing, eliminating the artificial download delays and captcha walls found on older ad-heavy converters.",
          },
        ],
      },
      "youtube-to-mp4": {
        badge: "🎬 Full HD 1080p Video",
        metaTitle: "YouTube to MP4 Downloader - Free HD & 1080p Video Saver",
        metaDescription:
          "Download YouTube videos in MP4 format with audio included. Supports 1080p Full HD, 720p, and 60fps. Fast, free, and secure.",
        heroTitle: "Download YouTube to",
        heroHighlight: "MP4 Video",
        heroSub:
          "Save your favorite videos in crisp 1080p Full HD MP4 with synchronized high-quality audio.",
        defaultFormat: "mp4",
        specs: [
          {
            label: "Video Resolutions",
            value: "1080p Full HD, 720p HD, 480p, 360p",
          },
          { label: "Video Codec", value: "H.264 / AVC (High Profile)" },
          { label: "Audio Track", value: "Synchronized AAC Stereo (Merged)" },
          {
            label: "Frame Rate",
            value: "Up to 60 fps (Original source preservation)",
          },
          { label: "Watermarks Added", value: "Zero (Pure original stream)" },
        ],
        features: [
          {
            title: "Crisp 1080p Full HD",
            desc: "Preserves sharp detail and fluid 60fps motion exactly as uploaded by creators.",
          },
          {
            title: "Guaranteed Audio Sync",
            desc: "We merge separate high-definition video and audio streams seamlessly using FFmpeg.",
          },
          {
            title: "Zero Watermarks",
            desc: "Downloads are 100% clean, unaltered, and free of promotional logos or overlays.",
          },
        ],
        deepGuide: {
          title: "The Ultimate Guide to Saving High-Definition YouTube Videos",
          paragraphs: [
            "On modern YouTube, 1080p and higher resolution videos do not store audio and video together in a single stream; they use DASH (Dynamic Adaptive Streaming over HTTP). Many basic downloaders only give you 720p because they lack the server capability to merge video and audio.",
            "YTSaveX overcomes this limitation. Our backend automatically fetches the highest bitrate video feed alongside the best audio track, merging them into a standard, fully compatible MP4 file ready for offline viewing.",
            "This makes YTSaveX the preferred choice for educators building classroom presentations, travelers preparing offline entertainment, and digital creators gathering reference footage.",
          ],
        },
        faqs: [
          {
            q: "Do 1080p downloads include sound?",
            a: "Yes. Unlike primitive downloaders where 1080p videos come without audio, YTSaveX automatically combines the high-definition video and audio streams into one complete file.",
          },
          {
            q: "Can I download 60fps (frames per second) content?",
            a: "Yes. If the creator uploaded the video in 60fps, our converter preserves the fluid frame rate in the resulting MP4.",
          },
          {
            q: "Where do downloaded files get saved on Android?",
            a: "Files are saved immediately in your device's default 'Download' directory, accessible through any file manager or gallery app.",
          },
          {
            q: "Is there a limit on how many videos I can download per day?",
            a: "No. YTSaveX offers completely unrestricted access with no daily download caps.",
          },
          {
            q: "Why did a download fail or say 'unavailable'?",
            a: "Downloads may fail if the video is set to private, has age-gate restrictions requiring a YouTube login, or has been geo-blocked by the copyright holder.",
          },
          {
            q: "Does YTSaveX compress or degrade the original video quality?",
            a: "No. We extract the direct source streams from YouTube and remux them without lossy re-encoding.",
          },
        ],
      },
      "youtube-shorts-downloader": {
        badge: "📱 Vertical Shorts Saver",
        metaTitle: "YouTube Shorts Downloader - Save Shorts Videos Free",
        metaDescription:
          "Save YouTube Shorts directly to your phone or PC in highest quality MP4 without watermark. Quick, free, and instant.",
        heroTitle: "YouTube Shorts",
        heroHighlight: "Downloader",
        heroSub:
          "Download trending vertical Shorts clips in seconds. Perfect for offline viewing and sharing.",
        defaultFormat: "mp4",
        specs: [
          { label: "Aspect Ratio", value: "9:16 Vertical Mobile Format" },
          { label: "Format", value: "MP4 Video with Audio" },
          { label: "Watermark", value: "None" },
          { label: "Devices", value: "iPhone, iPad, Android Phones, PC" },
        ],
        features: [
          {
            title: "Instant Shorts Extraction",
            desc: "Optimized parser for vertical 9:16 mobile video URLs.",
          },
          {
            title: "Mobile Friendly",
            desc: "Download directly to your camera roll on iPhone and Android.",
          },
          {
            title: "No App Installation",
            desc: "Works 100% inside your mobile or desktop web browser.",
          },
        ],
        deepGuide: {
          title: "How to Download YouTube Shorts Directly to Mobile",
          paragraphs: [
            "YouTube Shorts have become one of the most engaging media formats on the internet. However, saving them to your phone gallery for offline viewing or remixing is not natively supported by the YouTube app.",
            "With YTSaveX, simply tap 'Share' on any Short in the YouTube app, tap 'Copy Link', and paste it here. Our parser isolates the vertical video track instantly.",
          ],
        },
        faqs: [
          {
            q: "How do I save a YouTube Short to my iPhone camera roll?",
            a: "After downloading the MP4 via Safari, open your Files app, find the video, tap the Share icon, and select 'Save Video' to add it to your Photos app.",
          },
          {
            q: "Are the Shorts downloaded with or without watermarks?",
            a: "Shorts downloaded through YTSaveX are 100% clean with no added logos or watermarks.",
          },
          {
            q: "Can I download audio only from a YouTube Short?",
            a: "Yes! Choose the MP3 option in the format selector to extract just the background music or voiceover.",
          },
          {
            q: "Does this tool work on Instagram Reels or TikTok links?",
            a: "Currently, YTSaveX is specialized for YouTube URLs, including YouTube Shorts, standard videos, and playlists.",
          },
        ],
      },
      "youtube-playlist-downloader": {
        badge: "📂 Batch & Playlist Saver",
        metaTitle: "YouTube Playlist Downloader - Download Full Playlists Free",
        metaDescription:
          "Batch download full YouTube playlists. Extract tracklists, videos, and music albums with a single click.",
        heroTitle: "YouTube Full",
        heroHighlight: "Playlist Downloader",
        heroSub:
          "Paste any playlist URL to explore all tracks and download individual items or albums smoothly.",
        defaultFormat: "mp4",
        specs: [
          {
            label: "Batch Parsing",
            value: "Up to 100 videos per playlist URL",
          },
          {
            label: "Output Options",
            value: "Individual MP4 Video or MP3 Audio",
          },
          {
            label: "Tracklist Preview",
            value: "Thumbnails, Titles, and Durations shown",
          },
        ],
        features: [
          {
            title: "Complete Tracklist Preview",
            desc: "View thumbnails, durations, and titles for every track before saving.",
          },
          {
            title: "Dual Format Choice",
            desc: "Choose between MP4 video or MP3 audio for each item on the playlist.",
          },
          {
            title: "No Channel Limits",
            desc: "Compatible with music albums, tutorials, and creator series.",
          },
        ],
        deepGuide: {
          title: "Fast Batch Downloading for Large YouTube Playlists",
          paragraphs: [
            "Manually copying and pasting URLs for 30 or 50 videos in an educational series or music album is tedious. Our playlist downloader parses the entire playlist metadata in one step.",
            "You get an organized interactive list where you can pick and choose exactly which items to download in either MP4 or MP3 format.",
          ],
        },
        faqs: [
          {
            q: "How many items in a playlist can be analyzed at once?",
            a: "Our parser handles playlists of up to 100 videos within seconds.",
          },
          {
            q: "Can I extract only the MP3 songs from a music playlist?",
            a: "Yes, every track displayed has a dedicated 'MP3' button for one-click audio extraction.",
          },
          {
            q: "What if some videos in the playlist are hidden or deleted?",
            a: "YTSaveX automatically skips unavailable, deleted, or private videos and lists all accessible public entries.",
          },
          {
            q: "Can I download private or unlisted playlists?",
            a: "Unlisted playlists work as long as you have the direct link. Private playlists requiring account logins cannot be accessed.",
          },
        ],
      },
    },
  },
  fr: {
    dir: "ltr",
    badge: "⚡ Ultra Rapide & 100% Gratuit",
    heroTitle: "Téléchargeur Vidéo & Playlist",
    heroHighlight: "YouTube",
    heroSub:
      "Téléchargez des vidéos en 1080p, 720p, audio MP3 (320kbps) ou des playlists complètes sans publicité intrusive.",
    inputPlaceholder: "Collez le lien YouTube (vidéo ou playlist) ici...",
    pasteBtn: "📋 Coller",
    downloadBtn: "Analyser",
    analyzing: "Analyse...",
    saveBtn: "Sauvegarder",
    playlistDetected: "Playlist Détectée",
    videosFound: "vidéos disponibles",
    progressTitle: "Préparation du fichier...",
    progressStep1: "Connexion aux serveurs YouTube...",
    progressStep2: "Extraction du flux et conversion FFmpeg en cours...",
    progressStep3: "Finalisation du fichier...",
    progressDone: "Téléchargement lancé ! Regardez dans vos téléchargements.",
    howTitle: "Comment Télécharger en 3 Clics Rapides ?",
    step1Title: "Copiez le lien",
    step1Desc: "Copiez l'URL de la vidéo ou de la playlist depuis YouTube.",
    step2Title: "Choisissez le format",
    step2Desc:
      "Sélectionnez la résolution MP4 (1080p, 720p) ou le format MP3 320 kbps.",
    step3Title: "Téléchargement direct",
    step3Desc:
      "Cliquez sur Sauvegarder pour recevoir directement votre fichier.",
    faqTitle: "Foire Aux Questions Fréquentes",
    specsTitle: "Spécifications Techniques & Compatibilité",
    guideTitle: "Guide d'Utilisation Complet",
    footerDisclaimer:
      "© 2026 YTSaveX. Tous droits réservés. Outil destiné à un usage personnel et légal.",
    relatedToolsTitle: "Découvrez nos autres outils de téléchargement gratuits",
    tools: {
      "youtube-to-mp3": {
        badge: "🎵 Extracteur Audio Haute Définition",
        metaTitle: "Convertisseur YouTube en MP3 Gratuit - 320 kbps Studio",
        metaDescription:
          "Convertissez et téléchargez des vidéos YouTube en MP3 320 kbps haute fidélité. Rapide, gratuit, sans inscription et sans pub intrusive.",
        heroTitle: "Convertisseur YouTube en",
        heroHighlight: "MP3 Haute Qualité",
        heroSub:
          "Extrayez la piste audio de n'importe quelle vidéo YouTube en MP3 320 kbps en quelques secondes.",
        defaultFormat: "mp3",
        specs: [
          {
            label: "Débit Binaire Audio",
            value: "Jusqu'à 320 kbps (Qualité Studio)",
          },
          {
            label: "Fréquence d'Échantillonnage",
            value: "44.1 kHz / 48 kHz Stéréo",
          },
          { label: "Format de Fichier", value: ".mp3 universel" },
          {
            label: "Compatibilité",
            value: "iPhone, Android, PC, Mac, Autoradio",
          },
          { label: "Installation Logiciel", value: "Aucune (100% en ligne)" },
        ],
        features: [
          {
            title: "Qualité Audio 320 kbps",
            desc: "Un son pur et riche sans perte de dynamique ni distorsion.",
          },
          {
            title: "Sans limitation de durée",
            desc: "Convertissez des podcasts, des cours et des mixes musicaux entiers.",
          },
          {
            title: "Compatibilité Universelle",
            desc: "Écoutez vos fichiers sur smartphone, autoradio ou lecteur MP3.",
          },
        ],
        deepGuide: {
          title:
            "Guide complet : Comment extraire le son d'une vidéo YouTube en MP3",
          paragraphs: [
            "Extraire la bande-son d'une conférence, d'un podcast ou d'un tutoriel permet de l'écouter partout hors-ligne, que ce soit en voiture, pendant vos séances de sport ou dans les transports.",
            "Notre convertisseur s'appuie sur une infrastructure de serveurs haute performance équipée de FFmpeg. Le flux audio source est extrait sans transcodage destructif pour vous garantir un fichier MP3 propre, balisé et compatible avec tous les lecteurs multimédias.",
            "Aucune création de compte n'est requise et aucune donnée personnelle n'est conservée. Collez simplement votre URL et lancez la conversion.",
          ],
        },
        faqs: [
          {
            q: "Quelle est la qualité réelle du MP3 extrait ?",
            a: "Nous récupérons le meilleur flux audio original disponible sur YouTube pour l'encoder dans un conteneur MP3 320 kbps afin de préserver l'intégralité de la bande passante sonore.",
          },
          {
            q: "Comment télécharger un MP3 directement sur iPhone ?",
            a: "Utilisez le navigateur Safari. Collez le lien, cliquez sur Analyser puis sur Sauvegarder. Safari affichera une invite de téléchargement et enregistrera le fichier dans l'application 'Fichiers' de votre iPhone.",
          },
          {
            q: "Puis-je convertir des vidéos très longues (ex: 2h ou plus) ?",
            a: "Oui, notre système prend en charge les vidéos de longue durée comme les DJ sets, les livres audio et les rediffusions de cours.",
          },
          {
            q: "Est-ce légal de convertir une vidéo YouTube en MP3 ?",
            a: "Le téléchargement est légal dans le cadre de la copie privée pour votre usage personnel ou pour des contenus sous licence libre / domaine public. La redistribution commerciale sans autorisation est interdite.",
          },
          {
            q: "Faut-il installer un logiciel ou une extension ?",
            a: "Non, YTSaveX fonctionne à 100% dans votre navigateur web sans aucun plugin requis.",
          },
          {
            q: "Le service est-il réellement gratuit ?",
            a: "Oui, totalement gratuit et sans limitation du nombre de téléchargements quotidiens.",
          },
        ],
      },
      "youtube-to-mp4": {
        badge: "🎬 Vidéo Full HD 1080p",
        metaTitle: "Télécharger Vidéo YouTube en MP4 - 1080p Full HD Gratuit",
        metaDescription:
          "Téléchargez des vidéos YouTube au format MP4 avec son inclus. Qualité 1080p FHD et 720p sans filigrane. Rapide et sécurisé.",
        heroTitle: "Télécharger YouTube en",
        heroHighlight: "Vidéo MP4",
        heroSub:
          "Enregistrez vos vidéos préférées en Full HD 1080p avec un son parfaitement synchronisé.",
        defaultFormat: "mp4",
        specs: [
          {
            label: "Résolutions Vidéo",
            value: "1080p FHD, 720p HD, 480p, 360p",
          },
          { label: "Codec Vidéo", value: "H.264 / MP4 universel" },
          {
            label: "Piste Audio",
            value: "Stéréo AAC fusionnée automatiquement",
          },
          {
            label: "Images par seconde",
            value: "Jusqu'à 60 fps (selon la source)",
          },
          { label: "Filigrane", value: "Aucun filigrane ajouté" },
        ],
        features: [
          {
            title: "Full HD 1080p net",
            desc: "Conservez chaque détail grâce aux flux vidéo haute définition d'origine.",
          },
          {
            title: "Son fusionné automatiquement",
            desc: "La vidéo et la piste sonore haute qualité sont assemblées sans décalage.",
          },
          {
            title: "Prêt pour tous vos écrans",
            desc: "Format MP4 universel lisible sur PC, Mac, Android, iPhone et TV.",
          },
        ],
        deepGuide: {
          title: "Pourquoi nos vidéos 1080p intègrent toujours le son",
          paragraphs: [
            "Sur YouTube, les flux vidéo en résolution 1080p sont séparés de la piste audio par la technologie DASH. C'est pourquoi de nombreux téléchargeurs basiques ne vous proposent que du 720p ou livrent une vidéo 1080p muette.",
            "YTSaveX résout ce problème côté serveur : nous téléchargeons simultanément le flux vidéo HD et le meilleur flux audio, puis nous les fusionnons avec FFmpeg dans un fichier MP4 parfaitement synchronisé.",
          ],
        },
        faqs: [
          {
            q: "Les vidéos 1080p ont-elles le son inclus ?",
            a: "Oui, notre moteur assemble automatiquement la vidéo HD et l'audio pour un fichier complet et prêt à regarder.",
          },
          {
            q: "Puis-je télécharger des vidéos à 60 images par seconde (60fps) ?",
            a: "Oui, la fluidité originale de 60fps est préservée si la vidéo source a été mise en ligne dans ce format.",
          },
          {
            q: "Où sont enregistrés les fichiers sur mon téléphone ?",
            a: "Sur Android, les fichiers vont directement dans le dossier 'Téléchargements'. Sur iPhone, ils se trouvent dans l'application 'Fichiers' ou dans l'album photo.",
          },
          {
            q: "Y a-t-il une limite de téléchargements ?",
            a: "Non, vous pouvez télécharger autant de vidéos que vous le souhaitez sans quota.",
          },
        ],
      },
      "youtube-shorts-downloader": {
        badge: "📱 Téléchargeur de Shorts",
        metaTitle: "Télécharger YouTube Shorts Gratuit - Format Vertical MP4",
        metaDescription:
          "Enregistrez les vidéos YouTube Shorts au format vertical MP4 directement sur votre smartphone ou PC. Sans filigrane et rapide.",
        heroTitle: "Téléchargeur de",
        heroHighlight: "YouTube Shorts",
        heroSub:
          "Téléchargez les Shorts verticaux tendances en un clic pour les regarder hors-ligne.",
        defaultFormat: "mp4",
        specs: [
          {
            label: "Format d'affichage",
            value: "Vertical 9:16 pour smartphone",
          },
          { label: "Format de fichier", value: "MP4 haute fluidité" },
          { label: "Marque / Logo", value: "Aucune marque ajoutée" },
        ],
        features: [
          {
            title: "Extraction Spéciale Shorts",
            desc: "Reconnaissance instantanée des liens verticaux 9:16.",
          },
          {
            title: "Optimisé Smartphone",
            desc: "Enregistrement direct dans la galerie ou l'application Fichiers.",
          },
          {
            title: "100% en Ligne",
            desc: "Aucune application tierce à installer.",
          },
        ],
        deepGuide: {
          title: "Comment enregistrer un YouTube Short sur son téléphone",
          paragraphs: [
            "Les Shorts sont conçus pour être consommés rapidement sur mobile. Pour en sauvegarder un, appuyez sur Partager dans l'application YouTube, copiez le lien et collez-le ici.",
            "Notre outil extrait la vidéo brute sans ajout de logos pour un visionnage hors-ligne impeccable.",
          ],
        },
        faqs: [
          {
            q: "Comment enregistrer un Short sur la pellicule iPhone ?",
            a: "Après le téléchargement, ouvrez le fichier dans 'Fichiers', appuyez sur le bouton Partager puis choisissez 'Enregistrer la vidéo'.",
          },
          {
            q: "Y a-t-il un filigrane ou un logo ajouté ?",
            a: "Non, la vidéo est sauvegardée dans sa qualité native pure.",
          },
        ],
      },
      "youtube-playlist-downloader": {
        badge: "📂 Téléchargeur de Playlist",
        metaTitle:
          "Télécharger Playlist YouTube Complète - Audio & Vidéo Gratuit",
        metaDescription:
          "Téléchargez des playlists YouTube entières en un clic. Extrayez les pistes en MP3 ou MP4 sans limite.",
        heroTitle: "Télécharger des",
        heroHighlight: "Playlists YouTube",
        heroSub:
          "Collez l'URL d'une playlist pour explorer la liste et télécharger chaque vidéo ou musique en toute simplicité.",
        defaultFormat: "mp4",
        specs: [
          {
            label: "Capacité d'analyse",
            value: "Jusqu'à 100 vidéos par playlist",
          },
          { label: "Formats disponibles", value: "MP4 (Vidéo) ou MP3 (Audio)" },
          {
            label: "Aperçu complet",
            value: "Titres, durées et miniatures affichés",
          },
        ],
        features: [
          {
            title: "Aperçu complet des pistes",
            desc: "Titres, miniatures et durées affichés avant le téléchargement.",
          },
          {
            title: "Choix MP3 ou MP4 par élément",
            desc: "Téléchargez chaque élément au format de votre choix.",
          },
          {
            title: "Idéal pour albums & tutoriels",
            desc: "Gagnez du temps sur les longues séries de vidéos.",
          },
        ],
        deepGuide: {
          title: "Télécharger rapidement tous les éléments d'une playlist",
          paragraphs: [
            "Télécharger les vidéos d'une série ou d'un album une à une prend beaucoup de temps. Notre téléchargeur de playlist lit l'ensemble de la liste en une seule analyse.",
            "Chaque vidéo dispose d'un bouton d'action dédié pour choisir entre la vidéo MP4 et la musique MP3.",
          ],
        },
        faqs: [
          {
            q: "Combien de vidéos une playlist peut-elle contenir ?",
            a: "Notre outil analyse instantanément les playlists jusqu'à 100 vidéos publiques.",
          },
          {
            q: "Puis-je extraire uniquement les musiques en MP3 ?",
            a: "Oui, un bouton MP3 direct est disponible en face de chaque piste de la playlist.",
          },
        ],
      },
    },
  },
  es: {
    // Structure identique avec les traductions espagnoles
    dir: "ltr",
    badge: "⚡ Ultra Rápido y 100% Gratis",
    heroTitle: "Descargador de Videos y Playlists de",
    heroHighlight: "YouTube",
    heroSub:
      "Descarga videos en 1080p, 720p o audio MP3 (320kbps) al instante.",
    inputPlaceholder: "Pega el enlace de YouTube aquí...",
    pasteBtn: "📋 Pegar",
    downloadBtn: "Analizar",
    analyzing: "Analizando...",
    saveBtn: "Guardar Archivo",
    playlistDetected: "Lista Detectada",
    videosFound: "videos disponibles",
    progressTitle: "Procesando archivo...",
    progressStep1: "Conectando con YouTube...",
    progressStep2: "Procesando con FFmpeg...",
    progressStep3: "Finalizando archivo...",
    progressDone: "¡Descarga iniciada!",
    howTitle: "¿Cómo Funciona?",
    step1Title: "Copia el enlace",
    step1Desc: "Copia la URL de YouTube.",
    step2Title: "Elige formato",
    step2Desc: "MP4 o MP3 320kbps.",
    step3Title: "Descarga",
    step3Desc: "Guarda tu archivo.",
    faqTitle: "Preguntas Frecuentes",
    specsTitle: "Especificaciones Técnicas",
    guideTitle: "Guía de Usuario",
    footerDisclaimer: "© 2026 YTSaveX. Todos los derechos reservados.",
    relatedToolsTitle: "Más Herramientas Gratuitas",
    tools: {
      "youtube-to-mp3": {
        badge: "🎵 Convertidor MP3",
        metaTitle: "YouTube a MP3 - Audio 320kbps Gratis",
        metaDescription:
          "Convierte videos de YouTube a MP3 320kbps gratis y rápido.",
        heroTitle: "Convertidor YouTube a",
        heroHighlight: "MP3 320kbps",
        heroSub: "Sonido de alta fidelidad en segundos.",
        defaultFormat: "mp3",
        specs: [{ label: "Bitrate", value: "320 kbps" }],
        features: [{ title: "320 kbps", desc: "Audio puro sin pérdidas." }],
        deepGuide: {
          title: "Cómo convertir a MP3",
          paragraphs: ["Pega tu enlace y descarga el audio en segundos."],
        },
        faqs: [{ q: "¿Es gratis?", a: "Sí, 100% gratuito y sin límites." }],
      },
      "youtube-to-mp4": {
        badge: "🎬 Video 1080p",
        metaTitle: "YouTube a MP4 1080p Gratis",
        metaDescription: "Descarga videos en 1080p con audio sincronizado.",
        heroTitle: "Descargar YouTube a",
        heroHighlight: "MP4 1080p",
        heroSub: "Videos en Full HD con audio.",
        defaultFormat: "mp4",
        specs: [{ label: "Resolución", value: "1080p Full HD" }],
        features: [{ title: "Full HD", desc: "Máxima nitidez." }],
        deepGuide: {
          title: "Cómo descargar en MP4",
          paragraphs: ["Descarga tus videos favoritos en calidad 1080p."],
        },
        faqs: [{ q: "¿Tiene audio?", a: "Sí, audio y video fusionados." }],
      },
      "youtube-shorts-downloader": {
        badge: "📱 YouTube Shorts",
        metaTitle: "Descargar YouTube Shorts MP4",
        metaDescription: "Guarda videos cortos verticales en MP4.",
        heroTitle: "Descargador de",
        heroHighlight: "Shorts",
        heroSub: "Videos verticales sin marcas de agua.",
        defaultFormat: "mp4",
        specs: [{ label: "Formato", value: "9:16 Vertical" }],
        features: [{ title: "Sin Marca", desc: "Videos limpios." }],
        deepGuide: {
          title: "Guardar Shorts",
          paragraphs: ["Copia el enlace del Short y descárgalo a tu galería."],
        },
        faqs: [
          { q: "¿Es compatible con móvil?", a: "Sí, totalmente compatible." },
        ],
      },
      "youtube-playlist-downloader": {
        badge: "📂 Playlists",
        metaTitle: "Descargar Playlist YouTube Completa",
        metaDescription: "Descarga listas enteras en MP3 o MP4.",
        heroTitle: "Descargador de",
        heroHighlight: "Playlists",
        heroSub: "Analiza y descarga listas completas.",
        defaultFormat: "mp4",
        specs: [{ label: "Capacidad", value: "Hasta 100 videos" }],
        features: [{ title: "Lotes", desc: "Ahorra tiempo." }],
        deepGuide: {
          title: "Descargar listas",
          paragraphs: ["Pega la lista y elige qué pistas guardar."],
        },
        faqs: [{ q: "¿Puedo bajar MP3?", a: "Sí, con un solo clic." }],
      },
    },
  },
  ar: {
    // Structure identique avec les traductions arabes (support RTL)
    dir: "rtl",
    badge: "⚡ سريع ومجاني 100%",
    heroTitle: "تحميل مقاطع وقوائم",
    heroHighlight: "يوتيوب",
    heroSub: "تحميل فيديوهات بدقة 1080p وصوت MP3 بدقة 320kbps مجاناً.",
    inputPlaceholder: "الصق رابط يوتيوب هنا...",
    pasteBtn: "📋 لصق",
    downloadBtn: "تحليل",
    analyzing: "جاري التحليل...",
    saveBtn: "حفظ الملف",
    playlistDetected: "قائمة تشغيل",
    videosFound: "فيديو متاح",
    progressTitle: "معالجة الملف...",
    progressStep1: "الاتصال بالخادم...",
    progressStep2: "التحويل بواسطة FFmpeg...",
    progressStep3: "تجهيز الملف...",
    progressDone: "بدأ التنزيل!",
    howTitle: "كيفية التحميل في 3 خطوات",
    step1Title: "نسخ الرابط",
    step1Desc: "انسخ رابط الفيديو من يوتيوب.",
    step2Title: "اختيار الصيغة",
    step2Desc: "اختر MP4 أو صوت MP3 320kbps.",
    step3Title: "تحميل فوري",
    step3Desc: "احفظ الملف مباشرة في جهازك.",
    faqTitle: "الأسئلة الشائعة",
    specsTitle: "المواصفات التقنية",
    guideTitle: "دليل الاستخدام الشامل",
    footerDisclaimer: "© 2026 YTSaveX. جميع الحقوق محفوظة.",
    relatedToolsTitle: "أدوات تنزيل أخرى",
    tools: {
      "youtube-to-mp3": {
        badge: "🎵 تحويل إلى MP3",
        metaTitle: "تحويل يوتيوب إلى MP3 بدقة 320kbps",
        metaDescription:
          "تحويل مقاطع يوتيوب إلى ملفات MP3 عالية الجودة مجاناً.",
        heroTitle: "أسرع محول يوتيوب إلى",
        heroHighlight: "صوت MP3",
        heroSub: "استخراج صوت نقي بدقة 320kbps.",
        defaultFormat: "mp3",
        specs: [{ label: "جودة الصوت", value: "320 كيلوبت/ثانية" }],
        features: [{ title: "جودة استوديو", desc: "صوت نقي بدون تشويش." }],
        deepGuide: {
          title: "طريقة استخراج الصوت",
          paragraphs: ["الصق الرابط وحمل الصوت مباشرة إلى هاتفك أو حاسوبك."],
        },
        faqs: [{ q: "هل التحويل مجاني؟", a: "نعم، مجاني تماماً وبدون تسجيل." }],
      },
      "youtube-to-mp4": {
        badge: "🎬 فيديو 1080p",
        metaTitle: "تحميل يوتيوب إلى MP4 Full HD",
        metaDescription: "تحميل مقاطع يوتيوب بصيغة MP4 بدقة 1080p مع الصوت.",
        heroTitle: "تحميل يوتيوب بصيغة",
        heroHighlight: "فيديو MP4",
        heroSub: "فيديو بدقة Full HD 1080p مع صوت نقي مدمج.",
        defaultFormat: "mp4",
        specs: [{ label: "الدقة", value: "1080p Full HD" }],
        features: [
          { title: "دقة عالية", desc: "صورة نقية بدون علامات مائية." },
        ],
        deepGuide: {
          title: "طريقة تحميل الفيديو",
          paragraphs: ["تحميل مقاطع الفيديو المفضلة لديك بأعلى دقة متوفرة."],
        },
        faqs: [
          {
            q: "هل يتضمن الفيديو الصوت؟",
            a: "نعم، الصوت والفيديو مدمجان بدقة.",
          },
        ],
      },
      "youtube-shorts-downloader": {
        badge: "📱 شورتس يوتيوب",
        metaTitle: "تحميل شورتس يوتيوب MP4",
        metaDescription: "تحميل مقاطع يوتيوب القصيرة بدون علامة مائية.",
        heroTitle: "تحميل مقاطع",
        heroHighlight: "يوتيوب شورتس",
        heroSub: "مقاطع رأسية سريعة لهاتفك.",
        defaultFormat: "mp4",
        specs: [{ label: "التنسيق", value: "رأسي 9:16 للهاتف" }],
        features: [
          { title: "بدون علامة مائية", desc: "فيديوهات نظيفة تماماً." },
        ],
        deepGuide: {
          title: "حفظ الشورتس في الهاتف",
          paragraphs: ["انسخ رابط الشورتس واحفظه مباشرة في ألبوم الصور."],
        },
        faqs: [
          { q: "هل يعمل على الآيفون؟", a: "نعم، عبر متصفح سفاري مباشرة." },
        ],
      },
      "youtube-playlist-downloader": {
        badge: "📂 قوائم التشغيل",
        metaTitle: "تحميل قائمة تشغيل يوتيوب كاملة",
        metaDescription: "تحميل قوائم تشغيل يوتيوب بصيغة MP3 أو MP4 بسهولة.",
        heroTitle: "تحميل قوائم",
        heroHighlight: "تشغيل يوتيوب",
        heroSub: "تحليل وتنزيل القوائم الكاملة بضغطة زر.",
        defaultFormat: "mp4",
        specs: [{ label: "السعة", value: "حتى 100 فيديو في القائمة" }],
        features: [
          { title: "تحميل جماعي", desc: "توفير الوقت للدروس والألبومات." },
        ],
        deepGuide: {
          title: "تحميل قوائم التشغيل",
          paragraphs: ["الصق رابط القائمة واختر الفيديوهات المراد حفظها."],
        },
        faqs: [{ q: "هل يمكن تحميل MP3؟", a: "نعم، بضغطة زر واحدة لكل مسار." }],
      },
    },
  },
};
