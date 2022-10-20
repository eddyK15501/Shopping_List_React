import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faCircle,
  faCheckCircle,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const App = () => {
  
  const [items, setItems] = useState([
    { itemName: "item 1", quantity: 1, isSelected: false },
    { itemName: "item 2", quantity: 3, isSelected: true },
    { itemName: "item 3", quantity: 2, isSelected: false },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [totalItemCount, setTotalItemCount] = useState('');

  useEffect(() => {
    calculateTotal()
  }, [items])


  const calculateTotal = () => {
    const totalAmount = items.reduce((total, item) => {
      return total + item.quantity;
    }, 0)

    setTotalItemCount(totalAmount);
  } 

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddButtonClick();
    }
  };

  const handleAddButtonClick = () => {
    const newItems = [
      ...items,
      { itemName: inputValue, quantity: 1, isSelected: false },
    ];

    setItems(newItems);
    setInputValue("");
  };

  const handleClearItem = (index) => {
    const newItems = [...items];

    //console.log(newItems[index])

    const filteredArray = newItems.filter((newItem) => {
      return newItem !== newItems[index];
    });

    setItems(filteredArray);
  };

  const handleItemComplete = (i) => {
    const newItems = [...items];

    newItems[i].isSelected = !newItems[i].isSelected

    setItems(newItems);
  }

  const handleQuantityDecrease = (i) => {
    const newItems = [...items];

    if (newItems[i].quantity > 0) {
      newItems[i].quantity--;

      setItems(newItems);
      //calculateTotal();
    } else {
      return;
    }
  };

  const handleQuantityIncrease = (i) => {
    const newItems = [...items];

    newItems[i].quantity++;

    setItems(newItems);
    //calculateTotal();
  };

  return (
    <div className="app-background">
      <div className="main-container">
        <div className="add-item-box">
          <input
            className="add-item-input"
            placeholder="Add an item..."
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <FontAwesomeIcon
            icon={faPlus}
            onClick={handleAddButtonClick}
          />
        </div>
        <div className="item-list">
          {items.map((item, index) => {
            return (
              <div className="item-container" key={index}>
                <div className="item-name" onClick={() => handleItemComplete(index)}>
                  {item.isSelected ? (
                    <>
                      <FontAwesomeIcon icon={faCheckCircle} />
                      <span className="completed">{item.itemName}</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faCircle} />
                      <span>{item.itemName}</span>
                    </>
                  )}
                </div>

                <div className="item-container-two">
                  <div className="quantity">
                    <button>
                      <FontAwesomeIcon
                        icon={faChevronLeft}
                        onClick={() => handleQuantityDecrease(index)}
                      />
                    </button>
                    <span>{item.quantity}</span>
                    <button>
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        onClick={() => handleQuantityIncrease(index)}
                      />
                    </button>
                  </div>
                  <FontAwesomeIcon
                    className="clear-item-icon"
                    icon={faXmark}
                    onClick={() => handleClearItem(index)}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="total">Total: {totalItemCount}</div>
      </div>
    </div>
  );
};

export default App;
