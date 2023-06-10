import React from "react";
import similar from "./similar.json";

const Process = () => {
    const regex = /(\<([^>]+)\>)/gi;
    const similarArtists = JSON.stringify(similar);
    const simiArt = similarArtists.replace(regex, "");
    const simArtJson = JSON.parse(simiArt);
    console.log(simArtJson);
    
    return (
        <div>
            <h1>Similar Artists</h1>
            <ul>
                {simiArt}
            </ul>
        </div>
    );
};
export default Process;