import React, {useState, useEffect} from "react";
import Graph from "./Graph";
import Input from "./Input";

Array.prototype.scaleBetween = function(scaledMin, scaledMax, num) {
    var max = Math.max.apply(Math, this);
    var min = Math.min.apply(Math, this);
    return ((scaledMax-scaledMin)*(num-min)/(max-min)+scaledMin);
}

const colorGenerator = () => {

    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue  = Math.floor(Math.random() * 256);
    /*var max = Math.max(Math.max(red, Math.max(green,blue)), 1);
    var step = 255 / (max * 5);
    var colors = [];

    for(var i = 1; i <= numOfColors; i++){
        var opacity = 1.0;
        if(i === numOfColors)
            opacity = 0.2;
        colors.push("rgba(" + Math.floor(red * i * step) + "," + Math.floor(green * i * step) + "," + Math.floor(blue * i * step) + ", " + opacity +")");
    }*/

    var color = {
        red: red,
        green: green,
        blue: blue,
        mixed1: ("rgba(" + red + "," + green + "," + blue + ", 1.0)"),
        mixed2: ("rgba(" + red + "," + green + "," + blue + ", 0.2)")
    };
    
    return color;
    
}

const computeColor = (color1, color2, weight, opacity) => {
    var red = Math.floor((color2.red - color1.red) * weight + color1.red);
    var green = Math.floor((color2.green - color1.green) * weight + color1.green);
    var blue = Math.floor((color2.blue - color1.blue) * weight + color1.blue);          

    return ("rgba(" + red + "," + green + "," + blue + ", " + opacity +" )");
}

const Data = () => {
    const LIMIT_VALUE = 18;
    const NUM_OF_COLORS = 5;
    var artist_mbid = "8f6bd1e4-fbe1-4f50-aa9b-94c450ec0f11";
    var url = "https://labs.api.listenbrainz.org/similar-artists/json?algorithm=session_based_days_7500_session_300_contribution_5_threshold_10_limit_100_filter_True_skip_30&artist_mbid=";
    const [similarArtists, setSimilarArtists] = useState([]);
    const [artist, setArtist] = useState("");
    const [limit, setLimit] = useState(LIMIT_VALUE);
    //const [colors, setColors] = useState([]);
    var color1 = colorGenerator();
    var color2 = colorGenerator();
    console.log(color1);
    console.log(color2);
    var transformedArtists = {};
    var maxScore = 0;
    
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
        //setColors(colorGenerator(NUM_OF_COLORS));
    }, []);

    var scoreList = [];  
    var artistList = similarArtists && similarArtists.data && (similarArtists.data.map((artist) => artist));
    artistList = artistList && artistList.splice(0, limit);
    var mainArtist = artist && artist.data && artist.data[0];
    
    
    maxScore = artistList && artistList[LIMIT_VALUE - 1].score;
    maxScore = Math.sqrt(maxScore);

    if(mainArtist) 
        mainArtist.score = 0;
    artistList && artistList.push(mainArtist);

    transformedArtists = artistList && {
        "nodes": artistList.map((artist, index) => {
            var computedScore = maxScore / Math.sqrt(artist.score);
            scoreList.push(computedScore);
            console.log(computedScore);

            if(artist === mainArtist){
                computedScore = 1;
                artistList.pop(mainArtist);
                scoreList.pop();
                index = 0;
            }
            
            return {
                "id": artist.name,
                "artist_mbid": artist.artist_mbid,
                "size": artist.artist_mbid === mainArtist.artist_mbid ? 150 : 85,
                //"color": artist.artist_mbid === mainArtist.artist_mbid ? colors[0] : index < limit/3 ? colors[1] : index < limit/3*2 ? colors[2] : colors[3],
                "color": computeColor(color1, color2, (index /LIMIT_VALUE * computedScore), 1),
                "seed": artist.artist_mbid === mainArtist.artist_mbid ? 1 : 0,
                "score": artist.score
            };
        }),
        "links": artistList.map((artist, index) => {
            return {
                "source": mainArtist.name,
                "target": artist.name,
                "distance": (artist.artist_mbid != mainArtist.artist_mbid ? /*scoreList.scaleBetween(300, 100, Math.sqrt(artist.score))*/ scoreList[index] * 250 : 0),
                "strength": artist.score < 5000 ? 2 : artist.score < 6000 ? 4 : 8,
                };
        }),
    }
    
    return (
        <div>
            <Input fetchData={fetchData} setLimit={setLimit}/>
            <Graph data={transformedArtists} fetchData={fetchData} backgroundColor={`linear-gradient(` + color2.mixed2 + `,` + color1.mixed2 + `)`}/>
        </div>
    );
}

export default Data;