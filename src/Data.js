import React, {useState, useEffect} from "react";
import Graph from "./Graph";
import Input from "./Input";

Array.prototype.scaleBetween = function(scaledMin, scaledMax, num) {
    var max = Math.max.apply(Math, this);
    var min = Math.min.apply(Math, this);
    return ((scaledMax-scaledMin)*(num-min)/(max-min)+scaledMin);
}
const Data = () => {
    const LIMIT_VALUE = 18;
    var artist_mbid = "8f6bd1e4-fbe1-4f50-aa9b-94c450ec0f11";
    var url = "https://labs.api.listenbrainz.org/similar-artists/json?algorithm=session_based_days_7500_session_300_contribution_5_threshold_10_limit_100_filter_True_skip_30&artist_mbid=";
    const [similarArtists, setSimilarArtists] = useState([]);
    const [artist, setArtist] = useState("");
    const [limit, setLimit] = useState(LIMIT_VALUE);
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

    var scoreList = [];  
    var artistList = similarArtists && similarArtists.data && (similarArtists.data.map((artist) => artist));
    artistList = artistList && artistList.splice(0, limit);
    var mainArtist = artist && artist.data && artist.data[0];
    artistList && artistList.push(mainArtist);
    console.log(artistList);    
    transformedArtists = artistList && {
        "nodes": artistList.map((artist, index) => {
            artist.score && scoreList.push(artist.score);
            return {
                "id": artist.name,
                "artist_mbid": artist.artist_mbid,
                "size": artist.artist_mbid === mainArtist.artist_mbid ? 150 : 85,
                "color": artist.artist_mbid === mainArtist.artist_mbid ? "#00A6A6" : index < limit/3 ? "#F7B2AD" : index < limit/3*2 ? "#7D84B2" : "#E3D985",
                "seed": artist.artist_mbid === mainArtist.artist_mbid ? 1 : 0,
                "score": artist.score
            };
        }),
        "links": artistList.map((artist, index) => {
            
            return {
                "source": mainArtist.name,
                "target": artist.name,
                "distance": (artist.artist_mbid != mainArtist.artist_mbid ? scoreList.scaleBetween(300, 100, artist.score) : 0),
                "strength": artist.score < 5000 ? 2 : artist.score < 6000 ? 4 : 8,
                };
        }),
    }
    scoreList && console.log(scoreList);
    return (
        <div>
            <Input fetchData={fetchData} setLimit={setLimit}/>
            <Graph data={transformedArtists} fetchData={fetchData}/>
        </div>
    );
}

export default Data;