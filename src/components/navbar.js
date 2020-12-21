import './navbar.css'
var unirest = require("unirest");

const { useState,useEffect } = require("react");
export default function Navbar(){

    const [data,setdata]=useState([])
    const [search,setSearch]=useState('')
    const [query,setQuery]=useState('avengers')
    const getData = ()=>{
        var req = unirest("GET", "https://imdb8.p.rapidapi.com/title/auto-complete");
    
    req.query({
        "q": `${query}`
    });
    
    req.headers({
        "x-rapidapi-key": "daa6ea4d83msh91c3f342abb86b1p133277jsn7eb4dd6e0124",
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
        "useQueryString": true
    });
    
        

    
    req.end(function (res) {
        if (res.error) throw new Error(res.error);
        setdata(res.body);
        console.log(res.body);
    });
        
    }
    
    useEffect(()=>{
        getData();
      },[query])
      
    
     const getSearch=(e)=>{
        e.preventDefault();
        setQuery(search)
        setSearch('')
    }
    
     const updateSearch=(e)=>{
        setSearch(e.target.value)
      }

        return(
    <div>
        <div className="navbar">
        <h2 className="heading">MOVIES </h2>
          <form  className="form" onSubmit={getSearch}>
            <input type="text" placeholder="Element Name" className="input" onChange={updateSearch}></input>
            <button className="button success">Search</button>
          </form>
          </div>
          <div className="box">{data && data.d && data.d.map(x=>{
            return(
                <div className="inner">
                <img src={x.i.imageUrl} className="image"></img>
                <div className="movie">{x.l}</div>
                <div className="stars"><span className="stars-title">STARS : </span>{x.s}</div>
                <div className="rank"><span className="rank-title">RANK : </span>{x.rank}</div>
                </div>
            )
        })}</div>
      </div>
        )
    
}