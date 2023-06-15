import React, {useState, useEffect} from "react";
import NetworkChart from "./NetworkChart";
const Data = () => {
    var artist_mbid = "8f6bd1e4-fbe1-4f50-aa9b-94c450ec0f11";
    var url = "https://labs.api.listenbrainz.org/similar-artists/json?algorithm=session_based_days_7500_session_300_contribution_5_threshold_10_limit_100_filter_True_skip_30&artist_mbid=";
    const [similarArtists, setSimilarArtists] = useState([]);
    const [artist, setArtist] = useState("");
    
    var transformedArtists = {}; 

    const fetchData = (artist_mbid) => {
        fetch(url + artist_mbid)
        .then((response) => response.json())
        .then((data) => setData(data))   
    }
    
    const setData = (data) => {
        setArtist(data[1]);
        setSimilarArtists(data[3]);
    }
    
    useEffect(() => {
        fetchData(artist_mbid);
    }, []);

      
    var artistList = similarArtists && similarArtists.data && (similarArtists.data.map((artist) => artist));
    var mainArtist = artist && artist.data && artist.data[0];
    artistList && artistList.push(mainArtist);
        
    transformedArtists = artistList && {
        "nodes": artistList.map((artist) => {
            return {
                "id": artist.name,
                "artist_mbid": artist.artist_mbid
            };
        }),
        "links": artistList.map((artist) => {
            return {
                "source": mainArtist.name,
                "target": artist.name,
                };
        }),
    }
    
    const logGraph = () => {
        console.log(artist_mbid);
        artist_mbid = document.getElementById("artist_name").value;
        console.log(document.getElementById("artist_name").value);
    }

    return (
        <div>
            <NetworkChart data={transformedArtists} fetchData={fetchData}/>
        </div>
    );
}

export default Data;