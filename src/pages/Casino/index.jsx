import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/styles.css";
import { ROUTE_PATH, API_PATH } from "../../helper/constants";
import fetchData from "../../services/api.js";

const { LOGIN, INGAME } = ROUTE_PATH;
const { CATEGORY_API, GAMES_API, LOGOUT_API } = API_PATH;

const Casino = () => {
  const localAuth = localStorage.getItem("auth");
  const [userData, setUserData] = useState({});
  const [gamesData, setGamesData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);

  const navigate = useNavigate();

  const handlePlay = async (gameCode) => {
    navigate(INGAME + "/" + gameCode);
  };

  useEffect(() => {
    const userData = localAuth ? JSON.parse(localAuth) : null;
    setUserData(userData);
    const fetchDataLoad = async () => {
      fetchData(GAMES_API)
        .then((res) => {
          setGamesData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      fetchData(CATEGORY_API)
        .then((res) => {
          setCategoriesData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchDataLoad();
  }, []);

  const handleLogout = async () => {
    const userData = localAuth ? JSON.parse(localAuth) : null;
    fetchData(LOGOUT_API, "POST", { username: userData.username })
      .then(async (res) => {
        localStorage.setItem("isLogin", false);
        navigate(LOGIN);
      })
      .catch((err) => {
        console.error("Logout error:", err);
      });
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
                  <b className="name">{userData.name}</b>
                </div>
                <div className="description event">{userData.event}</div>
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
          <div className="search ui small icon input">
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

            {filteredGames.map((game, index) => (
              <div className="game item" key={index}>
                <div className="ui small image">
                  <img src={game.icon} alt="game-icon" />
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

            {filteredCategories.map((category, index) => (
              <div
                key={index}
                className={`category item ${
                  category.id === selectedCategory ? "active" : ""
                }`}
              >
                <div className="content">
                  <div
                    className={`header`}
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
