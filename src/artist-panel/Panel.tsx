import React from "react";
import "./Panel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { ArtistType } from "../Data";
import infoLookup from "./infoLookup";
import { WikiReponseType, WikiDataType} from "./infoLookup";
import parse from 'html-react-parser';
interface PanelProps {
    artist: ArtistType | undefined;
}

type ArtistInfoType = {
    name: string;
    type: string;
    born: string;
    area: string;
    wikiData: string;
    mbLink: string;
}
const Panel = (props: PanelProps) => {
    var artistData: ArtistInfoType;
    let ARTIST_URL: string;
    let WIKI_URL: string;
    let wikipediaExtract;
    const lookup = async () => {
        if(props.artist) {
            ARTIST_URL = `https://musicbrainz.org/artist/${props.artist.artist_mbid}`;
            WIKI_URL = `${ARTIST_URL}/wikipedia-extract`;
            const response = await fetch(WIKI_URL);
            const data = await response.json();
            let wikiData = data.wikipediaExtract.content;
            const parser = new DOMParser();
            const doc = parser.parseFromString(wikiData, 'text/html');
            let paragraphs = Array.from(doc.querySelectorAll('p')).map((p) => p.textContent);
            if(paragraphs.length > 1) {
                wikipediaExtract = paragraphs[1]! + paragraphs[2]!;
                console.log(wikipediaExtract);
            }
        }    
    }
    lookup();
    return(
        props.artist ?
        <div 
        className="artist-panel"
        >
            <div 
            className="artist-header"
            >
                <h2>{props.artist.name}</h2>
                <p>{props.artist.type}</p>
            </div>
            <div
            className="artist-info"
            >
                <div
                className="area"
                >
                    <strong>Born: </strong>
                    <br />
                    <strong>Area: </strong>
                </div>
                <div
                className="wiki"
                >
                    <p>{wikipediaExtract}</p>
                </div>
                <div
                className="mb-link"
                >
                <a
                id="mb-link-button"
                href={`google.com`}
                target="_blank"
                >
                    More
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </a>
                </div>
            </div>
            <div
            className="artist-top-album"
            >
                <hr />
                Cover Art 
                <br />
                Album Name
            </div>
            <div
            className="artist-top-track"
            >
                <hr />
                Cover Art
                <br />
                Track Name
            </div>
        </div>
        :
        <>
        </>
    );
}

export default Panel;