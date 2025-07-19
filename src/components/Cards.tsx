import React from 'react';
import Card from './Card';
import './Cards.css';

interface CardData {
  id: string;
  image?: string;
  title: string;
  description: string;
  tags: string[];
  buttonText: string;
  link: string | null;
}

interface CardsProps {
  cards: CardData[];
}

const Cards: React.FC<CardsProps> = ({ cards }) => {
  return (
    <section className="cards-container">
      <div className="cards-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            image={card.image}
            title={card.title}
            description={card.description}
            tags={card.tags}
            buttonText={card.buttonText}
            link={card.link}
          />
        ))}
      </div>
    </section>
  );
};

export default Cards;
