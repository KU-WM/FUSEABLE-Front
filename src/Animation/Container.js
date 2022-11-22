import update from 'immutability-helper'
import { useCallback, useState } from 'react'
import { Card } from './Card.js'


const style = {
  width: 260,
}
export const Container = () => {
  {
    const [cards, setCards] = useState([
      {
        id: 1,
        text: '1번째 내용',
      },
      {
        id: 2,
        text: '2번째 내용입니다',
      },
      {
        id: 3,
        text: '3번째 Text Message',
      },
      {
        id: 4,
        text: '4번째 항목입니다',
      },
      {
        id: 5,
        text: '5번째 항목입니다. DnD test용',
      },
      {
        id: 6,
        text: '???',
      },
      {
        id: 7,
        text: 'PROFIT',
      },
    ])
    const moveCard = useCallback((dragIndex, hoverIndex) => {
      setCards((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        }),
      )
    }, [])
    const renderCard = useCallback((card, index) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
        />
      )
    }, [])
    return (
      <>
        <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
      </>
    )
  }
}
