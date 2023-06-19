import React from "react";
const Input = (props) => {

    const handleInput = (event) => {
        event.preventDefault();
        var artist_mbid = event.target.artist_mbid.value;
        var limit = event.target.limit.value;
        props.setLimit(limit);
        props.fetchData(artist_mbid);
    }

    return (
        <div>
            <form method="post" onSubmit={handleInput}>
                <label>
                    Artist MBID:
                    <input type="text" name="artist_mbid" defaultValue="8f6bd1e4-fbe1-4f50-aa9b-94c450ec0f11"/>
                </label>
                <br/>
                <label>
                    Number of similar artists:
                    <input type="text" name="limit" defaultValue="18"/>
                </label>
                <br/>
                <button type="submit">Generate graph</button>
            </form>
        </div>
    );
}

export default Input;