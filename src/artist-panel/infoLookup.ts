import { type } from "os";

type WikiReponseType = {
    wikipediaExtract: WikiDataType;
};
type WikiDataType = {
    content: string;
    canonical: string;
    url: string;
    title: string;
    language: string;
}
type ArtistResponse = {
    lifeSpan: {
        begin: string;
        end: string;
        ended: boolean;
    };
    area: {
        name: string;
    };
};

const InfoLookup = async (artistMBID: string): Promise<string> => {
    const BASEURL = `https://musicbrainz.org/artist/${artistMBID}`;
    const wikiURL = `${BASEURL}/wikipedia-extract`;
    const artistURL = `https://musicbrainz.org/ws/2/artist/${artistMBID}?fmt=json`;
    // Default data in case of error
    var data: WikiReponseType = {
        wikipediaExtract: {
            content: "No wikipedia page found for this artist",
            canonical: "",
            url: "",
            title: "",
            language: "",
        }
    }
    try {
        const response = await fetch(artistURL);
        data = await response.json();
    }
    catch(error){
        alert(error);
    }
    return data.wikipediaExtract.content;
}
export default InfoLookup;
export type {WikiReponseType, WikiDataType};