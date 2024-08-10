import { Metadata } from 'next';

interface PageSEOProps {
    title: string;
    description?: string;
    canonicalUrl?: string;
    ogType?: 'website' | 'article' | 'book' | 'profile' | 'music.song' | 'music.album' | 'music.playlist' | 'music.radio_station' | 'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other';
    ogImage?: string;
    twitterCard?: 'summary_large_image' | 'summary' | 'player' | 'app';
    keywords?: string[];
}

export function customMetaDataGenerator({
    title,
    description = "NT Movers is your trusted partner for local and cross-border moves in Namibia, ensuring safe and reliable transportation of your belongings.",
    canonicalUrl = 'https://ntmovers.frans-nekongo.com',
    ogType = 'website',
    keywords = [
        "NT Movers", "moving company Windhoek", "Windhoek moving company", "Namibia moving company", "local moves", "cross-border moves", "reliable moving services", "moving company Namibia"
    ],
    ogImage = 'https://vrqkpbknrgocvvpnaios.supabase.co/storage/v1/object/public/Logos/NT_logo_large.png',
    twitterCard = 'summary_large_image',
}: PageSEOProps): Metadata {

    const siteTitle = 'Namibian Moving Company';
    const fullTitle = `${title} | ${siteTitle}`;

    return {
        metadataBase: new URL('https://ntmovers.frans-nekongo.com'), // Base URL for resolving relative URLs
        title: fullTitle,
        description,
        keywords: keywords.join(', '),
        authors: [{ name: "Frans Nekongo", url: "https://frans-nekongo.com/" }],
        robots: 'index, follow',
        openGraph: {
            title: fullTitle,
            description,
            type: ogType,
            url: canonicalUrl,
            locale: 'en_NA',
            siteName: 'NT Movers',
            images: [
                {
                    url: ogImage,
                },
            ],
        },
        twitter: {
            card: twitterCard,
            title: fullTitle,
            description,
            images: [ogImage],
            creator: '@NTMovers',
        },
        alternates: {
            canonical: canonicalUrl,
        },
    };
}
