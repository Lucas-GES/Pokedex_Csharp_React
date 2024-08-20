import React, { useState } from 'react';
import { Card } from "react-bootstrap";
import ReactCardFlip from "react-card-flip";

export default function CardFlip({ values, typeCard }) {

    const [isFlipped, setIsFlipped] = useState(false);

    const card = {
        first: 'pokemon',
        second: 'region'
    }

    const handleFlip = (e) => {
        e.preventDefault();
        setIsFlipped(!isFlipped);
    }

    return (
        (() => {
            if (typeCard === card.first) {
                return <>

                    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                        <Card
                            style={{
                                width: "35rem",
                                height: "38rem",
                                cursor: "pointer",
                                marginBottom: "200px",
                            }}
                            onClick={handleFlip}
                        >
                            <img src={values.img} alt="day" style={{ height: "100%" }} />
                        </Card>
                        <Card
                            style={{
                                width: "35rem",
                                height: "38rem",
                                cursor: "pointer",
                                marginBottom: "200px",
                            }}
                            onClick={handleFlip}
                        >
                            <h1>{values.id}</h1>
                            <p>{values.name}</p>
                            <p>{values.type}</p>
                            <p>{values.moves}</p>
                            <p>{values.regionId}</p>
                        </Card>
                    </ReactCardFlip>
                </>;
            } else {
                return <>
                    <Card
                        style={{
                            width: "35rem",
                            height: "38rem",
                            cursor: "pointer",
                            marginBottom: "200px",
                        }}
                    >
                        <img src={values.img} alt="day" style={{ height: "100%" }} />
                        <h1>{values.name}</h1>
                    </Card>;
                </>
            }
        })()
    )
}
