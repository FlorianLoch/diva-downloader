const matcher = /.*(DIVA-([0-9]{4})-[0-9]+).*/;
const inputUrl = "http://mediaservice.bibliothek.kit.edu/#/details/DIVA-2016-182/10";

export function getMediaUrlForPageUrl(url: string) : string {
    const match = matcher.exec(inputUrl);
    if (match !== null && match.length === 3) {
        return constructMediaUrl(match[2], match[1]);
    }
    
    return null;
}

function constructMediaUrl(year: string, mediaName: string) : string {
    return `https://media.bibliothek.kit.edu/campus/${year}/${mediaName}_mp4.mp4`;
}