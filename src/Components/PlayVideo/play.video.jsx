// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

import './play.video.css';
import { API_KEY, value_converter } from '../../data'


import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import moment from "moment";
import { useParams } from "react-router-dom";

const PlayVideo = () => {

    const {videoId} = useParams();

    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);


    const fetchVideoData = async () => {
        const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        await fetch(url).then(response => response.json()).then(data => setApiData(data.items[0]))
    }

    const fetchChannelData = async () => {
        const channel_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
        await fetch(channel_url).then(response => response.json()).then(data => setChannelData(data.items[0]))
    }


    const fetchCommentData = async () => {
        const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
        await fetch(comment_url).then(response => response.json()).then(data => setCommentData(data.items));
    }

    useEffect(() => {
        fetchVideoData();
    }, [videoId]);

    useEffect(() => {
        fetchChannelData();
    }, [apiData]);

    useEffect(()=>{
        fetchCommentData();
    },[videoId])

    return (

        <div className="play-video">
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <h3>{apiData ? apiData.snippet.title : 'Title here'}</h3>
            <div className="play-video-info">
                <p>{apiData ? value_converter(apiData.statistics.viewCount) : '16k'} Views &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : '2 days ago'}</p>
                <div>
                    <span><img src={like} alt="" />{apiData ? value_converter(apiData.statistics.likeCount) : '12K'}</span>
                    <span><img src={dislike} alt="" /> 12</span>
                    <span><img src={share} alt="" /> Share</span>
                    <span><img src={save} alt="" /> Save</span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={channelData ? channelData.snippet.thumbnails.default.url : "img"} alt="" />
                <div>
                    <p>{apiData ? apiData.snippet.channelTitle : 'Channel Name'}</p>
                    <span>{channelData ? value_converter(channelData.statistics.subscriberCount) : "16K"} Subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-description">
                <p>{apiData ? apiData.snippet.description.slice(0, 250) : 'Decription here'}</p>
                <hr />
                <h4>{apiData ? value_converter(apiData.statistics.commentCount) : '14k'} Comments</h4>

                {commentData.map((item,index)=> {
                    return(
                        <div key={index} className="comment">
                        <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                        <div>
                            <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span> 1 day ago</span></h3>
                            <p>{item.snippet.topLevelComment.snippet.textOriginal}</p>
                            <div className="comment-action">
                                <img src={like} alt="" /> <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                <img src={dislike} alt="" />
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>

    )

}

export default PlayVideo;