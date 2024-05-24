// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import './feed.css';


import {API_KEY , value_converter} from '../../data'
import moment from "moment";

// eslint-disable-next-line react/prop-types
const Feed = ({category}) =>{

    const [data,setData] = useState([]);
    

    const fetchData = async() =>{
        const videos_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
        await fetch(videos_url).then(response => response.json()).then(data =>setData(data.items))
    }

    useEffect(()=>{
        fetchData();
    },[category])

    return(
        <div className="feed">
            {data.map((item,index)=>{
                return(
                    <Link to={`video/${item.snippet.categoryId}/${item.id}`} key={index} className="card">
                    <img src={item.snippet.thumbnails.medium.url} alt="" />
                    <h2>{item.snippet.title}</h2>
                    <h3>{item.snippet.channelTitle}</h3>
                    <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                </Link>
                )
            })}
        </div>

    )
}

export default Feed;