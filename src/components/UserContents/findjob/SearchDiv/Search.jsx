import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import queryString from "query-string";
import { message } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsHouseDoor } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import { SearchResultjob } from "../../../../apis/userapi";
import { SearchResultcompany } from "../../../../apis/userapi";
import { SearchResultlocation } from "../../../../apis/userapi";

const Search = () => {
  const [Searchtext1, setSearchtext1] = useState("");
  const [Searchtext2, setSearchtext2] = useState("");
  const [Searchtext3, setSearchtext3] = useState("");
  const [suggtiondata, setSuggetiondata] = useState([]);
  const [companysuggtiondata, setcompanySuggetiondata] = useState([]);
  const [locationsuggtiondata, setlocationSuggetiondata] = useState([]);

  const navigate = useNavigate();

  const param1 = Searchtext1;
  const param2 = Searchtext2;
  const param3 = Searchtext3;

  const query = queryString.stringify({ param1, param2, param3 });
  const token = localStorage.getItem("userToken");

  const setjobsearch = (event) => {
    setSearchtext1(event);
    if (event === null || event === undefined || event === "") {
      setSearchtext1(null);
    } else {
      SearchResultjob(token, event).then((res) => {
        if (res.data.success) {
          setSuggetiondata(res.data?.SearchResult);
        } else {
          setSuggetiondata([]);
        }
      });
    }
  };

  const setcompanysearch = (event) => {
    setSearchtext2(event);
    if (event === null || event === undefined || event === "") {
      setSearchtext2(null);
    } else {
      SearchResultcompany(token, event).then((res) => {
        if (res.data.success) {
          setcompanySuggetiondata(res.data?.SearchResult);
        } else {
          setcompanySuggetiondata([]);
        }
      });
    }
  };

  const setlocationsearch = (event) => {
    setSearchtext3(event);
    if (event === null || event === undefined || event === "") {
      setSearchtext3(null);
    } else {
      SearchResultlocation(token, event).then((res) => {
        if (res.data.success) {
          setlocationSuggetiondata(res.data?.SearchResult);
        } else {
          setlocationSuggetiondata([]);
        }
      });
    }
  };

  const handleClick = () => {
    const params = {
      param1: Searchtext1,
      param2: Searchtext2,
      param3: Searchtext3,
    };
    const query = queryString.stringify(params);

    navigate(`/search?${query}`);
  };

  function clearText(number) {
    if (number === 1) setSearchtext1("");
    setSuggetiondata([]);
    if (number === 2) setSearchtext2("");
    setcompanySuggetiondata([]);
    if (number === 3) setSearchtext3("");
    setlocationSuggetiondata([]);
  }

  return (
    <div className="searchDiv grid gap-10 bg-greyIsh rounded-[10px] p-[3rem]">
      <form action="">
        <div
          className="firstDiv md:flex justify-between items-center rounded-[8px] gap-[10px]
        bg-white p-5 shadow-lg shadow-greyIsh-700 flex-row"
        >
          <div className="flex gap-2 items-center">
            <AiOutlineSearch className="text-[25px] icon" />
            <input
              type="text"
              className="bg-transparent text-blue-500 focus:outline-none w-[100]"
              value={Searchtext1}
              onChange={(e) => setjobsearch(e.target.value)}
              placeholder="Search job Here..."
            />
            {Searchtext1 && (
              <AiOutlineCloseCircle
                className="text-[25px] text-[#a5a6a6] hover:text-black icon"
                onClick={() => {
                  clearText(1);
                }}
              />
            )}
          </div>

          <div className="flex gap-2 items-center">
            <BsHouseDoor className="text-[25px] icon" />
            <input
              type="text"
              className="bg-transparent text-blue-500 focus:outline-none w-[100]"
              value={Searchtext2}
              onChange={(e) => setcompanysearch(e.target.value)}
              placeholder="Search by combany..."
            />
            {Searchtext2 && (
              <AiOutlineCloseCircle
                className="text-[25px] text-[#a5a6a6] hover:text-black icon"
                onClick={() => {
                  clearText(2);
                }}
              />
            )}
          </div>

          <div className="flex gap-2 items-center">
            <GrLocation className="text-[25px] icon" />
            <input
              type="text"
              className="bg-transparent text-blue-500 focus:outline-none w-[100]"
              value={Searchtext3}
              onChange={(e) => setlocationsearch(e.target.value)}
              placeholder="Search by location..."
            />
            {Searchtext3 && (
              <AiOutlineCloseCircle
                className="text-[25px] text-[#a5a6a6] hover:text-black icon"
                onClick={() => {
                  clearText(3);
                }}
              />
            )}
          </div>

          <button
            className="bg-siteviolet h-full p-3 px-10 rounded-[10px] text-white
        curser-pointer hover:bg-violet-700"
            onClick={handleClick}
          >
            Search
          </button>
        </div>

        <div className="flex">
          {suggtiondata.length > 0 && Searchtext1 && (
            <div className="w-[26rem] bg-white  rounded-md py-2 text-siteviolet h-fit">
              {suggtiondata?.map((term,index) => (
                <Link>
                  <p key={index}
                    onClick={() => {
                      setSearchtext1(term.jobCategory);
                      setSuggetiondata([]);
                    }}
                  >
                    {term?.jobCategory}
                  </p>
                </Link>
              ))}
            </div>
          )}
          {companysuggtiondata?.length > 0 && Searchtext2 && (
            <div className="w-[26rem] bg-white md:ml-[25rem] rounded-md py-2 text-siteviolet h-fit">
              {companysuggtiondata?.map((term,index) => (
                <Link>
                  <p key={index}
                    onClick={() => {
                      setSearchtext2(term.companyname);
                      setcompanySuggetiondata([]);
                    }}
                  >
                    {term?.companyname}
                  </p>
                </Link>
              ))}
            </div>
          )}
          {locationsuggtiondata?.length > 0 && Searchtext3 && (
            <div className="w-[26rem] bg-white  md:ml-[50rem] rounded-md py-2 text-siteviolet h-fit">
              {locationsuggtiondata?.map((term,index) => (
                <Link>
                  <p key={index}
                    onClick={() => {
                      setSearchtext3(term.location);
                      setlocationSuggetiondata([]);
                    }}
                  >
                    {term?.location}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </form>

      {/* <div className='secDiv flex items-center gap-10 justify-center'>
    <div className='singleSearch flex items-center gap-8'>
     <label htmlFor='relavance' className='text-[#808080] font-semibold' >Sort:</label>
      <select name="" id="relevance" className='bg-white  rounded-[3px] px-4 py-1'>
        <option value="">Relevance</option>
        <option value="">inclusive</option>
        <option value="">StartWith</option>
        <option value="">Contains</option>
      </select>

      <label htmlFor='type' className='text-[#808080] font-semibold' >type:</label>
      <select name="" id="type" className='bg-white  rounded-[3px] px-4 py-1'>
        <option value="">on-site</option>
        <option value="">Remote</option>
        <option value="">Hybrid</option>
        
      </select>
      </div>

      <span className='text-[#a1a1a1] cursor-pointer'>Clear All</span>
  </div> */}
    </div>
  );
};

export default Search;
