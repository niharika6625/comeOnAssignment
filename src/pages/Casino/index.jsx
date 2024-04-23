import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/styles.css";
import { ROUTE_PATH } from "../../helper/constants";

const { LOGIN, INGAME } = ROUTE_PATH;

const Casino = () => {
  const [userData, setUserData] = useState({});
  const [gamesData, setGamesData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(1);

  const navigate = useNavigate();

  const handlePlay = async (gameCode) => {
    navigate(INGAME + "/" + gameCode);
  };

  useEffect(() => {
    const userData = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : null;
    setUserData(userData);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gamesResponse = await fetch("http://localhost:3001/games");
        const gamesData = await gamesResponse.json();
        setGamesData(gamesData);

        const categoriesResponse = await fetch(
          "http://localhost:3001/categories"
        );
        const categoriesData = await categoriesResponse.json();
        setCategoriesData(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      const userData = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : null;
      const response = await fetch("http://localhost:3001/logout", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: userData.username }),
      });
      if (response.ok) {
        localStorage.setItem("isLogin", false);
        navigate(LOGIN);
      } else {
        throw new Error("Failed to Logout!");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const filteredGames = gamesData
    .filter((game) =>
      game.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((item) =>
      selectedCategory ? item.categoryIds.includes(selectedCategory) : true
    );

  const filteredCategories = categoriesData.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
  };

  return (
    <div className="casino">
      <div className="ui grid centered">
        <div className="twelve wide column">
          <div className="ui list">
            {/* player item template */}
            <div className="player item">
              <img
                className="ui avatar image"
                src={userData.avatar}
                alt="avatar"
              />

              <div className="content">
                <div className="header">
                  <b className="name"></b>
                </div>
                <div className="description event"></div>
              </div>
            </div>
            {/* end player item template */}
          </div>
          <div
            className="logout ui left floated secondary button inverted"
            onClick={() => handleLogout()}
          >
            <i className="left chevron icon"></i>Log Out
          </div>
        </div>
        <div className="four wide column">
          <div className="search ui small icon input ">
            <input
              type="text"
              placeholder="Search Game"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="search icon"></i>
          </div>
        </div>
      </div>
      <div className="ui grid">
        <div className="twelve wide column">
          <h3 className="ui dividing header">Games</h3>

          <div className="ui relaxed divided game items links">
            {/* game item template */}

            {filteredGames.map((game) => (
              <div className="game item">
                <div className="ui small image">
                  <img src="" alt="game-icon" />
                </div>
                <div className="content">
                  <div className="header">
                    <b className="name">{game.name}</b>
                  </div>
                  <div className="description">{game.description}</div>
                  <div className="extra">
                    <div
                      className="play ui right floated secondary button inverted"
                      onClick={() => handlePlay(game.code)}
                    >
                      Play
                      <i className="right chevron icon"></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* end game item template */}
          </div>
        </div>
        <div className="four wide column">
          <h3 className="ui dividing header">Categories</h3>

          <div className="ui selection animated list category items">
            {/* category item template */}

            {filteredCategories.map((category) => (
              <div className="category item">
                <div className="content">
                  <div
                    className={`header ${
                      category.id === setSelectedCategory ? "active" : ""
                    }`}
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    {category.name}
                  </div>
                </div>
              </div>
            ))}
            {/* end category item template */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Casino;
