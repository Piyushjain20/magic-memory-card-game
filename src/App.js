import { useEffect, useState } from "react";
import SingleCard from "./SingleCard";
import "./App.css";

const cardImages = [
  { src: "./img/potion-1.png", matched: false },
  { src: "./img/helmet-1.png", matched: false },
  { src: "./img/sword-1.png", matched: false },
  { src: "./img/ring-1.png", matched: false },
  { src: "./img/scroll-1.png", matched: false },
  { src: "./img/shield-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turn, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5).map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
  };
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
  //compare that 2 cards are equal or not used useEffect as write it sequentially under handle choice a setChoiceTwo is async function.
  // dependency array contains only choiceTwo because accoring to handle click function choiceTwo can only be selected after choiceOne.
  useEffect(() => {
    if (choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id) {
        // updating card in cards state(array) which are selected in choiceOne and choiceTwo
        setCards((CardsArr) => {
          return CardsArr.map((card) => {
            if (card.id === choiceOne.id || card.id === choiceTwo.id) {
              return { ...card, matched: true };
            }
            return card;
          });
        });
      }
      setTimeout(() => resetTurn(), 1000);
    } else {
      resetTurn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    setTurns((t) => t + 1);
  };
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div
        className="card-grid"
        style={{
          marginTop: "40px",
          display: "grid",
          gridGap: "20px",
          gridTemplateColumns: `repeat(${4},1fr)`,
        }}>
        {cards.map((card) => {
          return <SingleCard card={card} handleChoice={handleChoice} key={card.id} flipped={card === choiceOne || card === choiceTwo || card.matched} disabled={disabled} />;
        })}
      </div>
      <p>Turns:{turn}</p>
    </div>
  );
}

export default App;
