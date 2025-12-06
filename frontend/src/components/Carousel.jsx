import React from "react";
import "../styles/Carousel.css";

const items = [
  { id: 1, name: "", image: "https://static.zara.net/assets/public/2ae0/e55c/36e44f84964e/3c5c35081bda/07446490712-a1/07446490712-a1.jpg?ts=1747840250851&w=352&f=auto" },
  { id: 2, name: "", image: "https://static.zara.net/assets/public/4834/81c6/2b9748378ecb/52c128589869/04387054044-500-a1/04387054044-500-a1.jpg?ts=1733850607060&w=352&f=auto" },
  { id: 3, name: "", image: "https://static.zara.net/assets/public/0bb0/c771/e681469faec8/54ee3f9b84ba/06103415400-a1/06103415400-a1.jpg?ts=1746781289634&w=352&f=auto" },
  { id: 4, name: "", image: "https://static.zara.net/assets/public/b1d9/1cf6/c0784eebabd8/c345951a1d5c/02020200250-a2/02020200250-a2.jpg?ts=1738315327168&w=352&f=auto"},
]

function Carousel() {
  return (
    <div className="carousel">
      {items.map(item => (
        <div className="carousel-item" key={item.id}>
          <img src={item.image} alt={item.name} />
          <div className="info">
            <span>{item.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Carousel;
