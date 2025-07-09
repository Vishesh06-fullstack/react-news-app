import { useEffect, useState } from "react";
import "../css/style.css";
export default function NewsApp() {

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  console.log(API_KEY);
  const [news, setNews] = useState([]);
  const [loading , setLoading] = useState(false)
 

  // const url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${API_KEY}`;
  
  const fetch_News = async () => {
    try {
    let response = await fetch("https://news-app-backend-hzpj.onrender.com/news");
    response = await response.json();
    console.log(response.articles);
    setLoading(true)
    setNews(response.articles);
    setLoading(false)
    } catch (error) {
        console.log("error"+error)
    }
  };
  useEffect(() => {
    fetch_News();
  }, []);

  return (
    <div>
      <div className="head-section">
        <h1 className="heading">BBC NEWS</h1>
      </div>
    {
        loading ? (<p className="text-center"> Loading News....</p> ) : (
             news.map((News , index) => {
        const formattedDate = new Date(News.publishedAt).toLocaleString(
          "en-IN",
          {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }
        );
        return (
          <div key={index} className="un-list">
            <li  className="text-center">{News.title}</li>
            <img src={News.urlToImage} alt="news_Image" />
            
            
            <p className="content" >{News.content}</p>
            <p className="desc" >{News.description}</p>
            <p className="published">published at : <span className="span">{formattedDate}</span></p>
          </div>
        );
      })
 )
}
    
    </div>
  );
}
